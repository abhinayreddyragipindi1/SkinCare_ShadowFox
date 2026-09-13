/**
 * LUMORA SKIN - Reactive State Store
 * Manages Cart, Wishlist, Promo Codes, and Filtering in ₹ (INR)
 */

class LumoraStore {
  constructor() {
    this.storageKeyCart = "lumora_skin_cart_v1";
    this.storageKeyWishlist = "lumora_skin_wishlist_v1";
    this.storageKeyPromo = "lumora_skin_promo_v1";
    this.listeners = {};

    // Pricing & Delivery Config in ₹
    this.currencySymbol = "₹";
    this.freeShippingThreshold = 999;
    this.standardShippingFee = 99;

    // Load persisted state
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.promo = this.loadPromo();

    // Valid demo promo codes
    this.validPromoCodes = {
      "LUMORA15": { discountPercent: 15, label: "15% Off Your First Routine", type: "percent" },
      "GLOW10": { discountPercent: 10, label: "Glow Club 10% Off", type: "percent" },
      "FREESHIP": { label: "Free Express Delivery", type: "shipping" }
    };

    // Filter state for Shop All
    this.filters = {
      category: "all",
      concern: "all",
      searchQuery: "",
      sortBy: "featured"
    };
  }

  // --- PUB / SUB SYSTEM ---
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try { cb(payload); } catch (e) { console.error(`Error in ${event} listener:`, e); }
      });
    }
  }

  formatPrice(amount) {
    return `₹${Math.round(amount).toLocaleString()}`;
  }

  // --- CART MANAGEMENT ---
  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKeyCart);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKeyCart, JSON.stringify(this.cart));
    } catch (e) {
      console.warn("Unable to persist cart", e);
    }
    this.emit("cart:updated", this.getCartSummary());
  }

  addToCart(productOrId, volumeSize = null, quantity = 1) {
    let product = productOrId;
    if (typeof productOrId === "string") {
      product = PRODUCTS_DATA.find(p => p.id === productOrId || p.slug === productOrId);
    }

    if (!product) {
      console.warn("Attempted to add invalid product to cart:", productOrId);
      this.emit("notification", {
        type: "info",
        title: "Product Unavailable",
        message: "This formulation could not be found."
      });
      return false;
    }

    if (product.inStock === false || (typeof product.stockRemaining === "number" && product.stockRemaining <= 0)) {
      this.emit("notification", {
        type: "info",
        title: "Out of Stock",
        message: `${product.name} is currently out of stock. Check back soon!`
      });
      return false;
    }

    const selectedVol = volumeSize 
      ? (product.volumes.find(v => v.size === volumeSize) || product.volumes[0])
      : product.volumes[0];

    const safeQty = Math.max(1, Math.min(10, parseInt(quantity) || 1));
    const cartItemId = `${product.id}_${selectedVol.size}`;
    const maxStock = typeof product.stockRemaining === "number" ? product.stockRemaining : 10;

    const existingIndex = this.cart.findIndex(i => i.cartItemId === cartItemId);

    if (existingIndex > -1) {
      const currentQty = this.cart[existingIndex].quantity;
      if (currentQty >= maxStock) {
        this.emit("notification", {
          type: "info",
          title: "Maximum Stock Limit",
          message: `All available ${maxStock} units of ${product.name} are already in your bag.`
        });
        return false;
      }
      const newQty = Math.min(maxStock, currentQty + safeQty);
      this.cart[existingIndex].quantity = newQty;
    } else {
      this.cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle || "",
        category: product.category,
        image: product.images[0],
        size: selectedVol.size,
        price: selectedVol.price,
        stockRemaining: maxStock,
        quantity: Math.min(safeQty, maxStock)
      });
    }

    this.saveCart();
    this.emit("cart:item_added", { product, volume: selectedVol, quantity: safeQty });
    this.emit("notification", {
      type: "success",
      title: "Added to Bag",
      message: `${product.name} (${selectedVol.size}) added to your shopping bag.`
    });
    return true;
  }

  addRoutineBundle(productIds) {
    const prods = productIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
    prods.forEach(p => {
      this.addToCart(p, p.volumes[0].size, 1);
    });

    this.emit("notification", {
      type: "success",
      title: "Routine Added to Bag",
      message: "Added your 4-step LUMORA routine to your shopping bag."
    });
  }

  updateCartQuantity(cartItemId, quantity) {
    const index = this.cart.findIndex(i => i.cartItemId === cartItemId);
    if (index === -1) return;

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      this.removeFromCart(cartItemId);
    } else {
      const maxStock = this.cart[index].stockRemaining || 10;
      this.cart[index].quantity = Math.min(10, Math.min(qty, maxStock));
      this.saveCart();
    }
  }

  removeFromCart(cartItemId) {
    const item = this.cart.find(i => i.cartItemId === cartItemId);
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();

    if (item) {
      this.emit("notification", {
        type: "info",
        title: "Item Removed",
        message: `${item.name} was removed from your bag.`
      });
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartSummary() {
    const count = this.getCartCount();
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let discountAmount = 0;
    let freeShippingPromo = false;

    if (this.promo && this.validPromoCodes[this.promo.code]) {
      const p = this.validPromoCodes[this.promo.code];
      if (p.type === "percent") {
        discountAmount = Math.round(subtotal * (p.discountPercent / 100));
      } else if (p.type === "shipping") {
        freeShippingPromo = true;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const isFreeShipping = (discountedSubtotal >= this.freeShippingThreshold || freeShippingPromo || subtotal === 0);
    const shipping = isFreeShipping ? 0 : this.standardShippingFee;
    const amountForFreeShipping = Math.max(0, this.freeShippingThreshold - discountedSubtotal);
    const freeShippingProgress = Math.min(100, Math.round((discountedSubtotal / this.freeShippingThreshold) * 100));

    // GST is included in MRP (inclusive 18%)
    const gstIncluded = discountedSubtotal > 0 ? Math.round(discountedSubtotal * (0.18 / 1.18)) : 0;
    const total = discountedSubtotal + shipping;

    return {
      items: this.cart,
      count,
      subtotal,
      discountAmount,
      promo: this.promo,
      shipping,
      freeShippingThreshold: this.freeShippingThreshold,
      amountForFreeShipping,
      freeShippingProgress,
      gstIncluded,
      total
    };
  }

  // --- PROMO CODES ---
  loadPromo() {
    try {
      const saved = localStorage.getItem(this.storageKeyPromo);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  applyPromoCode(rawCode) {
    const code = (rawCode || "").trim().toUpperCase();
    if (!code) {
      const msg = "Please enter a demo promo code (e.g. LUMORA15 or GLOW10).";
      this.emit("notification", { type: "info", title: "Promo Code", message: msg });
      return { success: false, message: msg };
    }

    if (this.promo && this.promo.code === code) {
      const msg = `Code ${code} is already applied to your bag.`;
      this.emit("notification", { type: "info", title: "Promo Active", message: msg });
      return { success: false, message: msg };
    }

    if (this.validPromoCodes[code]) {
      this.promo = { code, ...this.validPromoCodes[code] };
      localStorage.setItem(this.storageKeyPromo, JSON.stringify(this.promo));
      this.saveCart();
      this.emit("notification", {
        type: "success",
        title: "Promo Code Applied!",
        message: `${code}: ${this.promo.label} (Demo Storefront)`
      });
      return { success: true, message: `Applied: ${this.promo.label}` };
    } else {
      const msg = `Code "${code}" is invalid. Available demo codes: LUMORA15 (15% off) or GLOW10 (10% off).`;
      this.emit("notification", { type: "info", title: "Invalid Code", message: msg });
      return { success: false, message: msg };
    }
  }

  removePromoCode() {
    this.promo = null;
    localStorage.removeItem(this.storageKeyPromo);
    this.saveCart();
    this.emit("notification", {
      type: "info",
      title: "Offer Removed",
      message: "Promotional discount has been removed."
    });
  }

  // --- WISHLIST MANAGEMENT ---
  loadWishlist() {
    try {
      const saved = localStorage.getItem(this.storageKeyWishlist);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.storageKeyWishlist, JSON.stringify(this.wishlist));
    } catch (e) {}
    this.emit("wishlist:updated", { items: this.wishlist, count: this.wishlist.length });
  }

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    const prod = PRODUCTS_DATA.find(p => p.id === productId);

    if (index > -1) {
      this.wishlist.splice(index, 1);
      added = false;
      this.emit("notification", {
        type: "info",
        title: "Wishlist Updated",
        message: `${prod ? prod.name : 'Item'} removed from saved essentials.`
      });
    } else {
      this.wishlist.push(productId);
      added = true;
      this.emit("notification", {
        type: "success",
        title: "Saved to Wishlist",
        message: `${prod ? prod.name : 'Item'} added to your saved essentials.`
      });
    }

    this.saveWishlist();
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistProducts() {
    return this.wishlist.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
  }

  // --- CATALOG FILTERING & SORTING ---
  setFilter(key, value) {
    this.filters[key] = value;
    this.emit("filter:updated", this.getFilteredProducts());
  }

  resetFilters() {
    this.filters = { category: "all", concern: "all", searchQuery: "", sortBy: "featured" };
    this.emit("filter:updated", this.getFilteredProducts());
  }

  getFilteredProducts() {
    let result = [...PRODUCTS_DATA];

    if (this.filters.category && this.filters.category !== "all") {
      const catTarget = this.filters.category.toLowerCase();
      result = result.filter(p => {
        const slug = (p.categorySlug || "").toLowerCase();
        const name = (p.category || "").toLowerCase();
        return slug === catTarget || name === catTarget || slug.includes(catTarget) || catTarget.includes(slug);
      });
    }

    if (this.filters.concern && this.filters.concern !== "all") {
      const c = this.filters.concern.toLowerCase();
      result = result.filter(p => 
        p.bestFor.toLowerCase().includes(c) || p.skinType.toLowerCase().includes(c)
      );
    }

    if (this.filters.searchQuery && this.filters.searchQuery.trim() !== "") {
      const q = this.filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.keyIngredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    switch (this.filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Cleanser -> Serums -> Moisturizers -> Sunscreen
        result.sort((a, b) => (a.stepOrder || 99) - (b.stepOrder || 99));
        break;
    }

    return {
      products: result,
      total: PRODUCTS_DATA.length,
      filteredCount: result.length,
      filters: { ...this.filters }
    };
  }
}

// Global Singleton Store
const store = new LumoraStore();
