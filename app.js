/**
 * LUMORA SKIN - Main Application Controller & Router
 * Healthy skin, naturally.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- STATE VARIABLES ---
  let currentRoute = "home";
  let activePdpProduct = PRODUCTS_DATA[1]; // Vitamin C Glow Serum by default
  let activePdpQty = 1;
  let activeQuickViewProduct = null;
  let activeQuickViewQty = 1;

  // Active Routine Step Choices
  let routineStep2Product = PRODUCTS_DATA.find(p => p.id === "lumora-vitc");
  let routineStep3Product = PRODUCTS_DATA.find(p => p.id === "lumora-moisturizer");

  // Overlay management
  const activeOverlays = [];
  let lastFocusedElement = null;

  // --- DOM SELECTORS ---
  const views = {
    home: document.getElementById("view-home"),
    shop: document.getElementById("view-shop"),
    pdp: document.getElementById("view-pdp"),
    philosophy: document.getElementById("view-philosophy")
  };

  const navLinks = document.querySelectorAll("[data-nav-target]");
  const cartBadges = document.querySelectorAll(".cart-count-badge");
  const wishlistBadges = document.querySelectorAll(".wishlist-count-badge");

  // Drawers & Modals
  const cartDrawer = document.getElementById("cart-drawer");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const cartPanel = document.getElementById("cart-panel");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartEmptyState = document.getElementById("cart-empty-state");
  const cartFooter = document.getElementById("cart-footer");

  const wishlistDrawer = document.getElementById("wishlist-drawer");
  const wishlistBackdrop = document.getElementById("wishlist-backdrop");
  const wishlistPanel = document.getElementById("wishlist-panel");
  const closeWishlistBtn = document.getElementById("close-wishlist-btn");
  const wishlistItemsContainer = document.getElementById("wishlist-items-container");
  const wishlistEmptyState = document.getElementById("wishlist-empty-state");

  const quickViewModal = document.getElementById("quick-view-modal");
  const quickViewBackdrop = document.getElementById("quick-view-backdrop");
  const closeQuickViewBtn = document.getElementById("close-quick-view-btn");
  const quickViewBody = document.getElementById("quick-view-body");

  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckoutBtn = document.getElementById("close-checkout-btn");

  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("site-search-input");
  const searchResults = document.getElementById("search-results-list");
  const closeSearchBtn = document.getElementById("close-search-btn");

  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu-btn");

  const infoModal = document.getElementById("info-modal");
  const closeInfoModalBtn = document.getElementById("close-info-modal-btn");
  const infoModalTitle = document.getElementById("info-modal-title");
  const infoModalSubtitle = document.getElementById("info-modal-subtitle");
  const infoModalBody = document.getElementById("info-modal-body");

  // --- OVERLAY MANAGER ---
  function openOverlay(element, focusTarget = null) {
    if (!element) return;
    lastFocusedElement = document.activeElement;
    element.classList.remove("hidden");
    document.body.classList.add("modal-open");
    activeOverlays.push(element);

    setTimeout(() => {
      const backdrop = element.querySelector(".drawer-backdrop, .modal-backdrop");
      const panel = element.querySelector(".drawer-panel, .modal-content");
      if (backdrop) backdrop.classList.add("active");
      if (panel) panel.classList.add("active");

      if (focusTarget) focusTarget.focus();
      else {
        const focusable = element.querySelector("button, [href], input, select, textarea");
        if (focusable) focusable.focus();
      }
    }, 20);
  }

  function closeOverlay(element) {
    if (!element) return;
    const backdrop = element.querySelector(".drawer-backdrop, .modal-backdrop");
    const panel = element.querySelector(".drawer-panel, .modal-content");
    if (backdrop) backdrop.classList.remove("active");
    if (panel) panel.classList.remove("active");

    const idx = activeOverlays.indexOf(element);
    if (idx > -1) activeOverlays.splice(idx, 1);

    setTimeout(() => {
      element.classList.add("hidden");
      if (activeOverlays.length === 0) {
        document.body.classList.remove("modal-open");
      }
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }, 250);
  }

  // Export overlay controllers to global window
  window.openOverlay = openOverlay;
  window.closeOverlay = closeOverlay;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeOverlays.length > 0) {
      closeOverlay(activeOverlays[activeOverlays.length - 1]);
    }
  });

  // --- SVG BOTANICAL PLACEHOLDER ---
  window.handleImgError = function(img) {
    if (!img || img.getAttribute("data-error-handled")) return;
    img.setAttribute("data-error-handled", "true");
    img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800' fill='%23F8F5EF'><rect width='800' height='800' fill='%23F1EDE4'/><circle cx='400' cy='360' r='180' fill='%236F8B76' fill-opacity='0.12'/><path d='M400 240c-60 80-60 140 0 200 60-60 60-120 0-200z' fill='%236F8B76' fill-opacity='0.3'/><text x='400' y='590' font-family='serif' font-size='28' text-anchor='middle' fill='%2319382A' letter-spacing='4'>LUMORA SKIN</text><text x='400' y='630' font-family='sans-serif' font-size='14' text-anchor='middle' fill='%234D6855' letter-spacing='2'>HEALTHY SKIN, NATURALLY</text></svg>";
  };

  // --- ROBUST ROUTER & NAVIGATION CONTROLLER ---
  function navigateTo(targetRoute, scrollTargetId = null) {
    // Close mobile menu if open
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      closeOverlay(mobileMenu);
    }

    currentRoute = targetRoute;
    window.location.hash = targetRoute === "home" && !scrollTargetId ? "home" : (scrollTargetId ? scrollTargetId : targetRoute);

    // Switch visible view
    Object.keys(views).forEach(key => {
      if (views[key]) {
        if (key === targetRoute) {
          views[key].classList.remove("hidden");
        } else {
          views[key].classList.add("hidden");
        }
      }
    });

    // Render contents for target view
    if (targetRoute === "home") {
      renderHomeFeatured();
      renderRoutineWorkflow();
    } else if (targetRoute === "shop") {
      renderShopCatalog();
    } else if (targetRoute === "pdp") {
      renderPDP(activePdpProduct);
    }

    // Scroll handling
    if (scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(scrollTargetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    updateNavState(targetRoute, scrollTargetId);
    if (window.lucide) window.lucide.createIcons();
  }

  function updateNavState(route, scrollTargetId = null) {
    navLinks.forEach(link => {
      const target = link.getAttribute("data-nav-target");
      const isMatch = (target === route && !scrollTargetId) || (scrollTargetId && target === scrollTargetId);
      
      if (isMatch) {
        link.classList.add("text-[#19382A]", "font-bold", "border-b-2", "border-[#6F8B76]");
        link.classList.remove("text-neutral-500", "font-medium");
      } else {
        link.classList.remove("text-[#19382A]", "font-bold", "border-b-2", "border-[#6F8B76]");
        link.classList.add("text-neutral-500", "font-medium");
      }
    });
  }

  // Handle URL hash changes
  function handleHashRoute() {
    const rawHash = (window.location.hash || "#home").slice(1);
    
    if (rawHash.startsWith("product/")) {
      const slugOrId = rawHash.split("/")[1];
      const prod = PRODUCTS_DATA.find(p => p.id === slugOrId || p.slug === slugOrId);
      if (prod) {
        activePdpProduct = prod;
        activePdpQty = 1;
        navigateTo("pdp");
      } else {
        navigateTo("shop");
      }
    } else if (rawHash === "shop") {
      navigateTo("shop");
    } else if (rawHash === "philosophy") {
      navigateTo("philosophy");
    } else if (rawHash === "routine-section" || rawHash === "routine") {
      navigateTo("home", "routine-section");
    } else {
      navigateTo("home");
    }
  }

  window.addEventListener("hashchange", handleHashRoute);

  // Attach explicit direct click handlers to ALL navigation elements
  document.querySelectorAll("[data-nav-target]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.getAttribute("data-nav-target");
      if (target === "routine" || target === "routine-section") {
        navigateTo("home", "routine-section");
      } else if (target === "shop") {
        navigateTo("shop");
      } else if (target === "philosophy") {
        navigateTo("philosophy");
      } else {
        navigateTo("home");
      }
    });
  });

  // Support clicking any anchor tag with href matching #shop, #routine, #philosophy, #home
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href^='#']");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    
    if (href === "#shop") {
      e.preventDefault();
      navigateTo("shop");
    } else if (href === "#routine" || href === "#routine-section") {
      e.preventDefault();
      navigateTo("home", "routine-section");
    } else if (href === "#philosophy") {
      e.preventDefault();
      navigateTo("philosophy");
    } else if (href === "#home") {
      e.preventDefault();
      navigateTo("home");
    }
  });

  // --- TOAST NOTIFICATIONS ---
  function showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.setAttribute("role", "status");

    const iconSvg = type === "success"
      ? `<svg class="w-5 h-5 flex-shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`
      : `<svg class="w-5 h-5 flex-shrink-0 text-[#E8E0D5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="flex-1">
        <h4 class="text-xs font-bold uppercase tracking-wider text-white">${escapeHtml(title)}</h4>
        <p class="text-xs text-neutral-200 mt-0.5">${escapeHtml(message)}</p>
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Export to window for inline HTML handlers
  window.showToast = showToast;

  store.on("notification", data => {
    showToast(data.title, data.message, data.type);
  });

  // --- UNIVERSAL DOCUMENT CLICK DELEGATION ---
  // Guarantees all interactive triggers (Add to Bag, Wishlist, Quick View, PDP navigation)
  // always work seamlessly across all dynamic containers (catalog, featured, routine, search, modals)
  document.addEventListener("click", (e) => {
    // 1. ADD TO BAG / QUICK ADD
    const addBtn = e.target.closest("[data-add-to-bag], [data-quick-add], [data-add-cart]");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productId = addBtn.getAttribute("data-add-to-bag") || 
                        addBtn.getAttribute("data-quick-add") || 
                        addBtn.getAttribute("data-add-cart");
      const prod = PRODUCTS_DATA.find(p => p.id === productId);

      if (prod) {
        // Immediate visual tactile feedback on button
        const originalHtml = addBtn.innerHTML;
        addBtn.classList.add("btn-added-feedback");
        addBtn.innerHTML = `
          <span class="inline-flex items-center gap-1.5 font-bold">
            <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added
          </span>
        `;

        // Add to persistent store (triggers cart drawer and notification)
        store.addToCart(prod, prod.volumes[0].size, 1);

        setTimeout(() => {
          addBtn.classList.remove("btn-added-feedback");
          addBtn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }, 1200);
      }
      return;
    }

    // 2. WISHLIST TOGGLE
    const wishBtn = e.target.closest("[data-wishlist-toggle]");
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productId = wishBtn.getAttribute("data-wishlist-toggle");
      const isSaved = store.toggleWishlist(productId);

      const icon = wishBtn.querySelector("i, svg");
      if (icon) {
        icon.classList.toggle("fill-[#6F8B76]", isSaved);
        icon.classList.toggle("text-[#6F8B76]", isSaved);
      }
      return;
    }

    // 3. QUICK VIEW TRIGGER
    const qvBtn = e.target.closest("[data-quick-view]");
    if (qvBtn) {
      e.preventDefault();
      e.stopPropagation();

      const productId = qvBtn.getAttribute("data-quick-view");
      const prod = PRODUCTS_DATA.find(p => p.id === productId);
      if (prod) openQuickView(prod);
      return;
    }

    // 4. NAVIGATE TO PDP
    const pdpEl = e.target.closest("[data-go-pdp]");
    if (pdpEl && !e.target.closest("button")) {
      e.preventDefault();
      const productId = pdpEl.getAttribute("data-go-pdp");
      const prod = PRODUCTS_DATA.find(p => p.id === productId);
      if (prod) {
        activePdpProduct = prod;
        activePdpQty = 1;
        window.location.hash = `product/${prod.slug}`;
      }
      return;
    }
  });

  // --- PRODUCT CARD COMPONENT ---
  function createProductCardHtml(prod) {
    const isSaved = store.isInWishlist(prod.id);
    const secondaryImg = prod.images[1] || prod.images[0];

    return `
      <article class="product-card group relative flex flex-col rounded-lg overflow-hidden" data-product-id="${prod.id}">
        <!-- Image & Actions -->
        <div class="product-card-media cursor-pointer" data-go-pdp="${prod.id}">
          <img src="${prod.images[0]}" alt="${escapeHtml(prod.name)}" class="primary-img" loading="lazy" decoding="async" onerror="window.handleImgError(this)">
          <img src="${secondaryImg}" alt="${escapeHtml(prod.name)} alternate" class="secondary-img" loading="lazy" decoding="async" onerror="window.handleImgError(this)">
          
          <!-- Best For Badge -->
          <div class="absolute top-3 left-3 bg-[#19382A] text-white text-[9px] tracking-wider uppercase px-2.5 py-1 font-semibold rounded z-10 shadow-sm">
            ${escapeHtml(prod.bestFor)}
          </div>

          <!-- Wishlist Toggle -->
          <button data-wishlist-toggle="${prod.id}" aria-label="Save ${escapeHtml(prod.name)} to wishlist" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 flex items-center justify-center text-[#19382A] hover:bg-[#6F8B76] hover:text-white transition-colors z-10 shadow-sm">
            <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'fill-[#6F8B76] text-[#6F8B76]' : ''}"></i>
          </button>

          <!-- Quick View Trigger -->
          <button data-quick-view="${prod.id}" class="absolute bottom-3 left-3 right-3 bg-white/95 text-[#19382A] border border-[#6F8B76] py-2 text-xs uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-botanical hover:bg-[#6F8B76] hover:text-white rounded z-10 shadow-sm">
            Quick View
          </button>
        </div>

        <!-- Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] text-[#4D6855] uppercase tracking-wider mb-1 font-medium">
              <span>${escapeHtml(prod.category)}</span>
              <div class="flex items-center gap-1 text-[#19382A]">
                <i data-lucide="star" class="w-3 h-3 fill-[#6F8B76] text-[#6F8B76]"></i>
                <span class="font-bold">${prod.rating}</span>
                <span class="text-neutral-400">(${prod.reviewsCount})</span>
              </div>
            </div>

            <h3 class="font-serif text-lg text-[#19382A] font-semibold cursor-pointer group-hover:text-[#6F8B76] transition-colors leading-snug" data-go-pdp="${prod.id}">
              ${escapeHtml(prod.name)}
            </h3>

            <p class="text-xs text-[#4D6855] mt-1 line-clamp-2 leading-relaxed">
              ${escapeHtml(prod.shortDescription)}
            </p>

            <div class="mt-3 flex flex-wrap gap-1">
              ${prod.keyIngredients.slice(0, 2).map(ing => `
                <span class="text-[10px] bg-[#E8F0EA] text-[#19382A] px-2 py-0.5 rounded font-medium">${escapeHtml(ing)}</span>
              `).join("")}
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-[#E9E0D2] flex items-center justify-between gap-2">
            <div>
              <span class="text-base font-bold text-[#19382A]">₹${prod.price}</span>
              <span class="text-[11px] text-[#4D6855] ml-1 font-medium">(${prod.volumes[0].size})</span>
            </div>

            <button 
              data-add-to-bag="${prod.id}" 
              data-quick-add="${prod.id}" 
              class="btn-sage btn-add-bag py-1.5 px-3 text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm"
              aria-label="Add ${escapeHtml(prod.name)} to shopping bag">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5 flex-shrink-0"></i>
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function attachProductCardEvents(container) {
    if (!container) return;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- HOMEPAGE FEATURED PRODUCTS ---
  function renderHomeFeatured() {
    const featuredContainer = document.getElementById("home-featured-products");
    if (!featuredContainer) return;

    // Show top 4 LUMORA essentials
    const topProducts = [
      PRODUCTS_DATA.find(p => p.id === "lumora-cleanser"),
      PRODUCTS_DATA.find(p => p.id === "lumora-vitc"),
      PRODUCTS_DATA.find(p => p.id === "lumora-moisturizer"),
      PRODUCTS_DATA.find(p => p.id === "lumora-sunscreen")
    ].filter(Boolean);

    featuredContainer.innerHTML = topProducts.map(p => createProductCardHtml(p)).join("");
    attachProductCardEvents(featuredContainer);
  }

  // --- BUILD YOUR ROUTINE WORKFLOW ---
  function renderRoutineWorkflow() {
    const container = document.getElementById("routine-steps-container");
    const summaryBox = document.getElementById("routine-bundle-summary");
    if (!container || !summaryBox) return;

    const cleanser = PRODUCTS_DATA.find(p => p.id === "lumora-cleanser");
    const sunscreen = PRODUCTS_DATA.find(p => p.id === "lumora-sunscreen");

    // 4 Steps definition
    const activeSteps = [
      { stepNum: "Step 01", action: "Cleanse", product: cleanser, altText: "Aloe Vera & Glycerin gentle wash" },
      { stepNum: "Step 02", action: "Treat", product: routineStep2Product, altText: "Active Vitamin C or Niacinamide" },
      { stepNum: "Step 03", action: "Moisturize", product: routineStep3Product, altText: "Hyaluronic Acid or Overnight Peptides" },
      { stepNum: "Step 04", action: "Protect", product: sunscreen, altText: "Invisible SPF 50 Mineral Defense" }
    ];

    container.innerHTML = activeSteps.map((s, idx) => `
      <div class="routine-step-card p-5 flex flex-col justify-between relative bg-white">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-bold tracking-widest uppercase bg-[#E8F0EA] text-[#19382A] px-2 py-0.5 rounded">
              ${s.stepNum}
            </span>
            <span class="font-serif text-base font-semibold text-[#19382A]">${s.action}</span>
          </div>

          <div class="aspect-square bg-[#F8F5EF] rounded-md overflow-hidden mb-3 border border-[#E9E0D2]">
            <img src="${s.product.images[0]}" alt="${escapeHtml(s.product.name)}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
          </div>

          <h4 class="font-serif text-base font-bold text-[#19382A] leading-tight mb-1">
            ${escapeHtml(s.product.name)}
          </h4>
          <p class="text-[11px] text-[#4D6855] mb-2 leading-relaxed">
            ${escapeHtml(s.altText)}
          </p>

          ${idx === 1 ? `
            <!-- Switch Step 2 Option -->
            <div class="flex gap-1 mt-2 text-[10px] font-semibold">
              <button id="toggle-routine-vitc" class="flex-1 py-1 px-1.5 border ${routineStep2Product.id === 'lumora-vitc' ? 'bg-[#6F8B76] text-white border-[#6F8B76]' : 'bg-white text-[#19382A] border-[#E9E0D2]'} rounded">
                Vitamin C (Glow)
              </button>
              <button id="toggle-routine-niac" class="flex-1 py-1 px-1.5 border ${routineStep2Product.id === 'lumora-niacinamide' ? 'bg-[#6F8B76] text-white border-[#6F8B76]' : 'bg-white text-[#19382A] border-[#E9E0D2]'} rounded">
                Niacinamide (Pores)
              </button>
            </div>
          ` : ''}

          ${idx === 2 ? `
            <!-- Switch Step 3 Option -->
            <div class="flex gap-1 mt-2 text-[10px] font-semibold">
              <button id="toggle-routine-hyal" class="flex-1 py-1 px-1.5 border ${routineStep3Product.id === 'lumora-moisturizer' ? 'bg-[#6F8B76] text-white border-[#6F8B76]' : 'bg-white text-[#19382A] border-[#E9E0D2]'} rounded">
                Day Hydration
              </button>
              <button id="toggle-routine-night" class="flex-1 py-1 px-1.5 border ${routineStep3Product.id === 'lumora-nightcream' ? 'bg-[#6F8B76] text-white border-[#6F8B76]' : 'bg-white text-[#19382A] border-[#E9E0D2]'} rounded">
                Night Repair
              </button>
            </div>
          ` : ''}
        </div>

        <div class="mt-4 pt-3 border-t border-[#E9E0D2] flex items-center justify-between">
          <span class="text-sm font-bold text-[#19382A]">₹${s.product.price}</span>
          <button data-routine-detail="${s.product.id}" class="text-[11px] font-semibold text-[#6F8B76] hover:underline">
            View Details →
          </button>
        </div>
      </div>
    `).join("");

    // Calculate bundle prices
    const bundleProducts = [cleanser, routineStep2Product, routineStep3Product, sunscreen];
    const regularTotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
    const bundlePrice = Math.round(regularTotal * 0.85); // 15% bundle discount
    const savings = regularTotal - bundlePrice;

    summaryBox.innerHTML = `
      <div class="bg-white border-2 border-[#6F8B76] rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div class="inline-flex items-center gap-2 bg-[#E8F0EA] text-[#19382A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>🌿 4-Step Everyday Essential Protocol</span>
            <span class="bg-[#6F8B76] text-white px-2 py-0.5 rounded-full text-[10px]">SAVE 15%</span>
          </div>
          <h3 class="font-serif text-2xl md:text-3xl text-[#19382A] font-bold">Your Complete Everyday Routine</h3>
          <p class="text-xs text-[#4D6855] mt-1 max-w-xl leading-relaxed">
            Cleanse with Aloe Vera → Treat with Active Serum → Moisturize with Ceramides → Protect with Mineral SPF 50.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-4">
          <div class="text-left md:text-right">
            <div class="text-3xl font-bold font-serif text-[#19382A]">₹${bundlePrice.toLocaleString()}</div>
            <div class="text-xs text-[#4D6855]">
              <span class="line-through text-neutral-400 mr-1.5">Regular ₹${regularTotal.toLocaleString()}</span>
              <span class="font-bold text-[#6F8B76]">(Save ₹${savings})</span>
            </div>
          </div>

          <button id="add-routine-bundle-btn" class="btn-sage w-full sm:w-auto py-3.5 px-8 text-xs font-bold uppercase tracking-wider shadow-md">
            Add 4-Step Routine to Bag (₹${bundlePrice.toLocaleString()})
          </button>
        </div>
      </div>
    `;

    // Routine Step 2 & 3 Toggle handlers
    document.getElementById("toggle-routine-vitc")?.addEventListener("click", () => {
      routineStep2Product = PRODUCTS_DATA.find(p => p.id === "lumora-vitc");
      renderRoutineWorkflow();
    });

    document.getElementById("toggle-routine-niac")?.addEventListener("click", () => {
      routineStep2Product = PRODUCTS_DATA.find(p => p.id === "lumora-niacinamide");
      renderRoutineWorkflow();
    });

    document.getElementById("toggle-routine-hyal")?.addEventListener("click", () => {
      routineStep3Product = PRODUCTS_DATA.find(p => p.id === "lumora-moisturizer");
      renderRoutineWorkflow();
    });

    document.getElementById("toggle-routine-night")?.addEventListener("click", () => {
      routineStep3Product = PRODUCTS_DATA.find(p => p.id === "lumora-nightcream");
      renderRoutineWorkflow();
    });

    // Add Bundle to Cart
    document.getElementById("add-routine-bundle-btn")?.addEventListener("click", () => {
      store.addRoutineBundle(bundleProducts.map(p => p.id));
      openCart();
    });

    // Detail modal/navigate
    container.querySelectorAll("[data-routine-detail]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-routine-detail");
        const prod = PRODUCTS_DATA.find(p => p.id === id);
        if (prod) {
          activePdpProduct = prod;
          activePdpQty = 1;
          window.location.hash = `product/${prod.slug}`;
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // --- SHOP CATALOG (PLP) ---
  function renderShopCatalog() {
    const data = store.getFilteredProducts();
    const gridContainer = document.getElementById("shop-products-grid");
    const counterEl = document.getElementById("shop-results-counter");
    const emptyState = document.getElementById("shop-empty-state");

    // Synchronize active category button states
    const activeCategory = (store.filters.category || "all").toLowerCase();
    document.querySelectorAll("[data-filter-category]").forEach(b => {
      const cat = (b.getAttribute("data-filter-category") || "").toLowerCase();
      const isMatch = (cat === activeCategory) || 
                      (cat === "all" && (activeCategory === "all" || !activeCategory)) ||
                      (activeCategory.includes(cat) && cat !== "all") ||
                      (cat.includes(activeCategory) && activeCategory !== "all");
      if (isMatch) {
        b.classList.add("bg-[#6F8B76]", "text-white", "border-[#6F8B76]");
        b.classList.remove("bg-white", "text-[#19382A]", "border-[#E9E0D2]");
      } else {
        b.classList.remove("bg-[#6F8B76]", "text-white", "border-[#6F8B76]");
        b.classList.add("bg-white", "text-[#19382A]", "border-[#E9E0D2]");
      }
    });

    // Synchronize select dropdowns
    const concernSelect = document.getElementById("filter-concern-select");
    if (concernSelect && store.filters.concern) {
      concernSelect.value = store.filters.concern;
    }
    const sortSelect = document.getElementById("filter-sort-select");
    if (sortSelect && store.filters.sortBy) {
      sortSelect.value = store.filters.sortBy;
    }

    if (counterEl) {
      counterEl.innerHTML = `Showing <strong class="text-[#19382A]">${data.filteredCount}</strong> of ${data.total} simple everyday essentials`;
    }

    if (!gridContainer) return;

    if (data.filteredCount === 0) {
      gridContainer.classList.add("hidden");
      if (emptyState) emptyState.classList.remove("hidden");
      return;
    }

    gridContainer.classList.remove("hidden");
    if (emptyState) emptyState.classList.add("hidden");

    gridContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    gridContainer.innerHTML = data.products.map(prod => createProductCardHtml(prod)).join("");
    attachProductCardEvents(gridContainer);
  }

  function setupShopFilterListeners() {
    document.querySelectorAll("[data-filter-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-filter-category");
        store.setFilter("category", cat);
      });
    });

    const concernSelect = document.getElementById("filter-concern-select");
    if (concernSelect) {
      concernSelect.addEventListener("change", (e) => store.setFilter("concern", e.target.value));
    }

    const sortSelect = document.getElementById("filter-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => store.setFilter("sortBy", e.target.value));
    }

    document.getElementById("reset-empty-filters-btn")?.addEventListener("click", () => store.resetFilters());
  }

  store.on("filter:updated", () => renderShopCatalog());

  // --- PRODUCT DETAIL PAGE (PDP) WITH "− 1 +", "ADD TO CART", AND "BUY NOW" ---
  function renderPDP(product) {
    if (!product) return;

    // Breadcrumb
    const breadcrumbCat = document.getElementById("pdp-breadcrumb-category");
    const breadcrumbName = document.getElementById("pdp-breadcrumb-name");
    if (breadcrumbCat) breadcrumbCat.textContent = product.category;
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    // Images
    const mainImg = document.getElementById("pdp-main-image");
    const thumbContainer = document.getElementById("pdp-thumbnails-container");
    if (mainImg) {
      mainImg.src = product.images[0];
      mainImg.alt = `${product.name} product photo`;
      mainImg.onerror = () => window.handleImgError(mainImg);
    }

    if (thumbContainer) {
      thumbContainer.innerHTML = product.images.map((img, idx) => `
        <button class="pdp-thumb-btn w-16 h-16 md:w-20 md:h-20 rounded border-2 ${idx === 0 ? 'border-[#6F8B76]' : 'border-[#E9E0D2]'} overflow-hidden bg-white" data-thumb-src="${img}">
          <img src="${img}" alt="${product.name} photo ${idx + 1}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
        </button>
      `).join("");

      thumbContainer.querySelectorAll(".pdp-thumb-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const src = btn.getAttribute("data-thumb-src");
          if (mainImg) mainImg.src = src;
          thumbContainer.querySelectorAll(".pdp-thumb-btn").forEach(b => b.classList.replace("border-[#6F8B76]", "border-[#E9E0D2]"));
          btn.classList.replace("border-[#E9E0D2]", "border-[#6F8B76]");
        });
      });
    }

    // Title & Info
    document.getElementById("pdp-badge").textContent = product.badge;
    document.getElementById("pdp-title").textContent = product.name;
    document.getElementById("pdp-price").textContent = `₹${product.price}`;
    document.getElementById("pdp-subtitle").textContent = product.subtitle;
    document.getElementById("pdp-short-desc").textContent = product.shortDescription;
    document.getElementById("pdp-best-for").textContent = product.bestFor;

    // Key Benefits Checklist
    const benefitsList = document.getElementById("pdp-benefits-list");
    if (benefitsList && product.keyBenefits) {
      benefitsList.innerHTML = product.keyBenefits.map(b => `
        <li class="flex items-start gap-2 text-xs text-[#19382A]">
          <svg class="w-4 h-4 text-[#6F8B76] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="font-medium">${escapeHtml(b)}</span>
        </li>
      `).join("");
    }

    // Key Ingredients Badges
    const ingredientsContainer = document.getElementById("pdp-ingredients-tags");
    if (ingredientsContainer) {
      ingredientsContainer.innerHTML = product.keyIngredients.map(ing => `
        <span class="bg-[#E8F0EA] text-[#19382A] text-xs font-semibold px-3 py-1 rounded-full border border-[#D5E3D8]">
          🌿 ${escapeHtml(ing)}
        </span>
      `).join("");
    }

    // Actives Breakdown
    const activesGrid = document.getElementById("pdp-key-actives-grid");
    if (activesGrid && product.keyActivesList) {
      activesGrid.innerHTML = product.keyActivesList.map(a => `
        <div class="p-4 bg-white border border-[#E9E0D2] rounded-lg">
          <span class="text-[10px] uppercase font-bold text-[#6F8B76] tracking-wider block mb-1">${escapeHtml(a.role)}</span>
          <h5 class="font-serif text-base font-bold text-[#19382A] mb-1">${escapeHtml(a.name)}</h5>
          <p class="text-xs text-[#4D6855] leading-relaxed">${escapeHtml(a.desc)}</p>
        </div>
      `).join("");
    }

    // Usage
    const usageEl = document.getElementById("pdp-usage-instructions");
    if (usageEl) usageEl.textContent = product.usage.instructions;

    // Full INCI
    const inciEl = document.getElementById("pdp-full-inci");
    if (inciEl) inciEl.textContent = product.ingredients;

    // Quantity Counter: − 1 +
    const qtyVal = document.getElementById("pdp-qty-value");
    const qtyMinus = document.getElementById("pdp-qty-minus");
    const qtyPlus = document.getElementById("pdp-qty-plus");

    if (qtyVal) qtyVal.textContent = activePdpQty;
    if (qtyMinus) {
      qtyMinus.onclick = () => {
        if (activePdpQty > 1) {
          activePdpQty--;
          qtyVal.textContent = activePdpQty;
        }
      };
    }
    if (qtyPlus) {
      qtyPlus.onclick = () => {
        if (activePdpQty < 10) {
          activePdpQty++;
          qtyVal.textContent = activePdpQty;
        }
      };
    }

    // Add to Cart Button
    const addCartBtn = document.getElementById("pdp-add-to-cart-btn");
    if (addCartBtn) {
      addCartBtn.onclick = () => {
        const originalHtml = addCartBtn.innerHTML;
        addCartBtn.classList.add("btn-added-feedback");
        addCartBtn.innerHTML = `
          <span class="inline-flex items-center gap-1.5 font-bold">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added to Bag
          </span>
        `;
        store.addToCart(product, product.volumes[0].size, activePdpQty);
        setTimeout(() => {
          addCartBtn.classList.remove("btn-added-feedback");
          addCartBtn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }, 1200);
      };
    }

    // Buy Now Button (Instant Checkout)
    const buyNowBtn = document.getElementById("pdp-buy-now-btn");
    if (buyNowBtn) {
      buyNowBtn.onclick = () => {
        store.addToCart(product, product.volumes[0].size, activePdpQty);
        openCheckoutModal();
      };
    }

    // Customer Reviews (Sample Portfolio Content)
    const reviewsList = document.getElementById("pdp-reviews-list");
    if (reviewsList && product.reviews) {
      reviewsList.innerHTML = product.reviews.map(r => `
        <div class="py-4 border-b border-[#E9E0D2] last:border-0">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <div class="flex text-[#6F8B76]">
                ${'<i data-lucide="star" class="w-3.5 h-3.5 fill-[#6F8B76] text-[#6F8B76]"></i>'.repeat(r.rating)}
              </div>
              <span class="font-bold text-xs text-[#19382A]">${escapeHtml(r.author)}</span>
              <span class="text-[10px] bg-[#E8F0EA] text-[#19382A] px-2 py-0.5 rounded font-semibold border border-[#D5E3D8]">Sample Review</span>
            </div>
            <span class="text-[11px] text-neutral-400">${escapeHtml(r.date)}</span>
          </div>
          <h5 class="text-xs font-bold text-[#19382A] mb-1">${escapeHtml(r.title)}</h5>
          <p class="text-xs text-[#4D6855] leading-relaxed">${escapeHtml(r.comment)}</p>
        </div>
      `).join("");
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --- QUICK VIEW MODAL ---
  function openQuickView(product) {
    activeQuickViewProduct = product;
    activeQuickViewQty = 1;
    openOverlay(quickViewModal);

    quickViewBody.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div class="aspect-square bg-[#F8F5EF] rounded-lg overflow-hidden border border-[#E9E0D2]">
          <img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
        </div>
        <div class="flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-bold tracking-widest uppercase bg-[#E8F0EA] text-[#19382A] px-2 py-0.5 rounded inline-block mb-2">
              ${escapeHtml(product.bestFor)}
            </span>
            <h3 class="font-serif text-2xl font-bold text-[#19382A] mb-1">${escapeHtml(product.name)}</h3>
            <div class="text-xl font-bold text-[#19382A] mb-3">₹${product.price}</div>
            
            <p class="text-xs text-[#4D6855] leading-relaxed mb-4">
              ${escapeHtml(product.shortDescription)}
            </p>

            <div class="mb-4">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#19382A] block mb-2">Key Ingredients:</span>
              <div class="flex flex-wrap gap-1">
                ${product.keyIngredients.map(ing => `
                  <span class="text-xs bg-[#E8F0EA] text-[#19382A] px-2.5 py-1 rounded font-medium">${escapeHtml(ing)}</span>
                `).join("")}
              </div>
            </div>
          </div>

          <div class="space-y-2 pt-4 border-t border-[#E9E0D2]">
            <div class="flex gap-3">
              <button id="qv-add-cart" class="btn-sage flex-1 py-3 text-xs">
                Add to Bag · ₹${product.price}
              </button>
              <button id="qv-buy-now" class="btn-buynow flex-1 py-3 text-xs">
                Buy Now
              </button>
            </div>
            <a href="#product/${product.slug}" id="qv-view-full" class="block text-center text-xs font-semibold text-[#6F8B76] hover:underline py-1">
              View Full Product Details & Routine Guide →
            </a>
          </div>
        </div>
      </div>
    `;

    document.getElementById("qv-add-cart")?.addEventListener("click", () => {
      store.addToCart(product, product.volumes[0].size, 1);
      closeOverlay(quickViewModal);
    });

    document.getElementById("qv-buy-now")?.addEventListener("click", () => {
      store.addToCart(product, product.volumes[0].size, 1);
      closeOverlay(quickViewModal);
      openCheckoutModal();
    });

    document.getElementById("qv-view-full")?.addEventListener("click", () => {
      closeOverlay(quickViewModal);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  if (closeQuickViewBtn) closeQuickViewBtn.onclick = () => closeOverlay(quickViewModal);
  if (quickViewBackdrop) quickViewBackdrop.onclick = () => closeOverlay(quickViewModal);

  // --- CART DRAWER RENDERING ---
  function openCart() {
    openOverlay(cartDrawer);
    renderCart();
  }

  function closeCart() {
    closeOverlay(cartDrawer);
  }

  function renderCart() {
    const summary = store.getCartSummary();

    cartBadges.forEach(b => {
      b.textContent = summary.count;
      b.classList.toggle("hidden", summary.count === 0);
    });

    const shippingBar = document.getElementById("cart-shipping-bar");
    const shippingMsg = document.getElementById("cart-shipping-message");
    if (shippingBar && shippingMsg) {
      shippingBar.style.width = `${summary.freeShippingProgress}%`;
      if (summary.amountForFreeShipping === 0 && summary.subtotal > 0) {
        shippingMsg.innerHTML = `<span class="font-bold text-[#19382A]">✓ Complimentary Free Delivery Unlocked!</span>`;
      } else {
        shippingMsg.innerHTML = `Add <strong class="text-[#19382A]">₹${summary.amountForFreeShipping}</strong> more for <strong class="text-[#6F8B76]">Free Express Delivery</strong>`;
      }
    }

    if (summary.items.length === 0) {
      cartItemsContainer?.classList.add("hidden");
      cartEmptyState?.classList.remove("hidden");
      cartFooter?.classList.add("hidden");
      return;
    }

    cartItemsContainer?.classList.remove("hidden");
    cartEmptyState?.classList.add("hidden");
    cartFooter?.classList.remove("hidden");

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = summary.items.map(item => `
        <div class="flex gap-4 py-4 border-b border-[#E9E0D2]">
          <a href="#product/${item.productId}" onclick="closeOverlay(document.getElementById('cart-drawer'));" class="w-16 h-16 bg-[#F8F5EF] rounded border border-[#E9E0D2] overflow-hidden flex-shrink-0">
            <img src="${item.image}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
          </a>
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <a href="#product/${item.productId}" onclick="closeOverlay(document.getElementById('cart-drawer'));" class="text-xs font-bold text-[#19382A] hover:text-[#6F8B76] block">
                  ${escapeHtml(item.name)}
                </a>
                <span class="text-[11px] text-[#4D6855]">${escapeHtml(item.size)}</span>
              </div>
              <button data-remove-item="${item.cartItemId}" class="text-neutral-400 hover:text-[#19382A] p-1" aria-label="Remove item">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>

            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-[#E9E0D2] rounded bg-white">
                <button data-qty-change="-1" data-cart-item="${item.cartItemId}" class="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-[#E8F0EA]">−</button>
                <span class="w-8 text-center text-xs font-bold text-[#19382A]">${item.quantity}</span>
                <button data-qty-change="1" data-cart-item="${item.cartItemId}" class="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-[#E8F0EA]">+</button>
              </div>
              <span class="text-xs font-bold text-[#19382A]">₹${item.price * item.quantity}</span>
            </div>
          </div>
        </div>
      `).join("");

      cartItemsContainer.querySelectorAll("[data-qty-change]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const delta = parseInt(e.currentTarget.getAttribute("data-qty-change"));
          const cartItemId = e.currentTarget.getAttribute("data-cart-item");
          const item = summary.items.find(i => i.cartItemId === cartItemId);
          if (item) store.updateCartQuantity(cartItemId, item.quantity + delta);
        });
      });

      cartItemsContainer.querySelectorAll("[data-remove-item]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const cartItemId = e.currentTarget.getAttribute("data-remove-item");
          store.removeFromCart(cartItemId);
        });
      });
    }

    // Totals
    document.getElementById("cart-subtotal").textContent = `₹${summary.subtotal}`;
    const discRow = document.getElementById("cart-discount-row");
    const discAmt = document.getElementById("cart-discount-amount");
    if (summary.discountAmount > 0) {
      discRow?.classList.remove("hidden");
      if (discAmt) discAmt.textContent = `-₹${summary.discountAmount}`;
    } else {
      discRow?.classList.add("hidden");
    }

    document.getElementById("cart-shipping").textContent = summary.shipping === 0 ? "Free" : `₹${summary.shipping}`;
    document.getElementById("cart-total").textContent = `₹${summary.total}`;

    // Promo code
    const promoDisp = document.getElementById("cart-promo-active");
    if (summary.promo && promoDisp) {
      promoDisp.classList.remove("hidden");
      promoDisp.innerHTML = `
        <div class="flex items-center justify-between text-xs bg-[#E8F0EA] p-2.5 rounded border border-[#D5E3D8] text-[#19382A]">
          <span class="font-bold">CODE: ${summary.promo.code} (${summary.promo.label})</span>
          <button id="remove-promo-btn" class="text-[#6F8B76] font-bold underline ml-2">Remove</button>
        </div>
      `;
      document.getElementById("remove-promo-btn")?.addEventListener("click", () => store.removePromoCode());
    } else if (promoDisp) {
      promoDisp.classList.add("hidden");
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Promo code form
  document.getElementById("cart-promo-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("cart-promo-input");
    if (input) {
      store.applyPromoCode(input.value);
      input.value = "";
    }
  });

  document.querySelectorAll("[data-cart-trigger]").forEach(b => b.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  }));

  if (closeCartBtn) closeCartBtn.onclick = () => closeCart();
  if (cartBackdrop) cartBackdrop.onclick = () => closeCart();

  store.on("cart:updated", () => renderCart());
  store.on("cart:item_added", () => openCart());

  // --- WISHLIST DRAWER ---
  function openWishlist() {
    openOverlay(wishlistDrawer);
    renderWishlist();
  }

  function renderWishlist() {
    const products = store.getWishlistProducts();
    wishlistBadges.forEach(b => {
      b.textContent = products.length;
      b.classList.toggle("hidden", products.length === 0);
    });

    if (products.length === 0) {
      wishlistItemsContainer?.classList.add("hidden");
      wishlistEmptyState?.classList.remove("hidden");
      return;
    }

    wishlistItemsContainer?.classList.remove("hidden");
    wishlistEmptyState?.classList.add("hidden");

    if (wishlistItemsContainer) {
      wishlistItemsContainer.innerHTML = products.map(p => `
        <div class="flex gap-4 py-4 border-b border-[#E9E0D2]">
          <a href="#product/${p.slug}" onclick="closeOverlay(document.getElementById('wishlist-drawer'));" class="w-16 h-16 bg-[#F8F5EF] rounded border border-[#E9E0D2] overflow-hidden flex-shrink-0">
            <img src="${p.images[0]}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
          </a>
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <a href="#product/${p.slug}" onclick="closeOverlay(document.getElementById('wishlist-drawer'));" class="text-xs font-bold text-[#19382A] hover:text-[#6F8B76] block">
                  ${escapeHtml(p.name)}
                </a>
                <span class="text-xs font-bold text-[#6F8B76]">₹${p.price}</span>
              </div>
              <button data-wishlist-remove="${p.id}" class="text-neutral-400 hover:text-[#19382A] p-1">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
            <button data-move-to-cart="${p.id}" class="btn-sage w-full py-1.5 text-xs font-bold rounded mt-2">
              Move to Bag
            </button>
          </div>
        </div>
      `).join("");

      wishlistItemsContainer.querySelectorAll("[data-wishlist-remove]").forEach(btn => {
        btn.addEventListener("click", () => {
          store.toggleWishlist(btn.getAttribute("data-wishlist-remove"));
        });
      });

      wishlistItemsContainer.querySelectorAll("[data-move-to-cart]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-move-to-cart");
          const p = PRODUCTS_DATA.find(x => x.id === id);
          if (p) {
            store.addToCart(p, p.volumes[0].size, 1);
            store.toggleWishlist(id);
            closeOverlay(wishlistDrawer);
            openCart();
          }
        });
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  document.querySelectorAll("[data-wishlist-trigger]").forEach(b => b.addEventListener("click", (e) => {
    e.preventDefault();
    openWishlist();
  }));

  if (closeWishlistBtn) closeWishlistBtn.onclick = () => closeOverlay(wishlistDrawer);
  if (wishlistBackdrop) wishlistBackdrop.onclick = () => closeOverlay(wishlistDrawer);
  store.on("wishlist:updated", () => renderWishlist());

  // --- CHECKOUT SIMULATION WITH FORM VALIDATION ---
  function openCheckoutModal() {
    const summary = store.getCartSummary();
    if (summary.items.length === 0) return;

    openOverlay(checkoutModal);

    const itemsSummary = document.getElementById("checkout-summary-items");
    const totalEl = document.getElementById("checkout-final-total");

    if (itemsSummary) {
      itemsSummary.innerHTML = summary.items.map(i => `
        <div class="flex items-center justify-between py-1.5 text-xs text-[#19382A] border-b border-[#E9E0D2]">
          <div class="flex items-center gap-2">
            <span class="font-bold text-[#6F8B76]">${i.quantity}x</span>
            <span>${escapeHtml(i.name)} (${escapeHtml(i.size)})</span>
          </div>
          <span class="font-bold">₹${i.price * i.quantity}</span>
        </div>
      `).join("");
    }

    if (totalEl) totalEl.textContent = `₹${summary.total}`;

    document.getElementById("checkout-step-container")?.classList.remove("hidden");
    document.getElementById("checkout-success-container")?.classList.add("hidden");
  }

  document.getElementById("proceed-checkout-btn")?.addEventListener("click", () => {
    closeCart();
    openCheckoutModal();
  });

  if (closeCheckoutBtn) closeCheckoutBtn.onclick = () => closeOverlay(checkoutModal);

  // Card formatting
  const cardInput = document.getElementById("checkout-card-number");
  if (cardInput) {
    cardInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      e.target.value = val.replace(/(\d{4})(?=\d)/g, "$1 ");
    });
  }

  const expInput = document.getElementById("checkout-card-exp");
  if (expInput) {
    expInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) e.target.value = val.substring(0, 2) + "/" + val.substring(2);
      else e.target.value = val;
    });
  }

  document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const pinInput = document.getElementById("checkout-postal");
    const pin = (pinInput?.value || "").trim();
    if (pinInput && !/^[1-9][0-9]{5}$/.test(pin)) {
      showToast("PIN Code Error", "Please enter a valid 6-digit Indian postal PIN code (e.g. 110001).", "info");
      pinInput.focus();
      return;
    }

    const submitBtn = document.getElementById("checkout-submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Simulating Secure Order Authorization...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const summary = store.getCartSummary();
      const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;

      document.getElementById("checkout-step-container")?.classList.add("hidden");
      const successContainer = document.getElementById("checkout-success-container");
      if (successContainer) successContainer.classList.remove("hidden");

      document.getElementById("confirmation-order-id").textContent = orderId;
      document.getElementById("confirmation-total").textContent = `₹${summary.total}`;

      store.clearCart();

      document.getElementById("confirmation-continue-btn").onclick = () => {
        closeOverlay(checkoutModal);
        navigateTo("home");
      };

      if (window.lucide) window.lucide.createIcons();
    }, 1200);
  });

  // --- FOOTER INFORMATION MODALS ---
  function openInfo(title, subtitle, contentHtml) {
    if (infoModalTitle) infoModalTitle.textContent = title;
    if (infoModalSubtitle) infoModalSubtitle.textContent = subtitle;
    if (infoModalBody) infoModalBody.innerHTML = contentHtml;
    openOverlay(infoModal);
  }

  if (closeInfoModalBtn) closeInfoModalBtn.onclick = () => closeOverlay(infoModal);

  document.querySelectorAll("[data-info-trigger]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const type = btn.getAttribute("data-info-trigger");

      if (type === "shipping") {
        openInfo(
          "Delivery & Dispatch Policy",
          "Everyday Free Shipping Over ₹999",
          `
            <div class="space-y-4 text-xs text-[#19382A] leading-relaxed">
              <p><strong>Free Express Delivery:</strong> All orders above ₹999 qualify for complimentary express courier dispatch across India. Standard orders under ₹999 carry a flat ₹99 delivery fee.</p>
              <p><strong>Dispatch Timelines:</strong> Freshly formulated products are packed within 24 hours. Metro deliveries arrive in 2–3 business days; all-India deliveries within 3–5 business days.</p>
              <p><strong>30-Day Glow Guarantee:</strong> If an essential product does not suit your skin, return the remainder within 30 days for a friendly refund.</p>
              <div class="p-3 bg-[#E8F0EA] border border-[#D5E3D8] rounded text-[11px] text-[#19382A]">
                <em>*Note: This is an educational storefront demo project. No actual orders are shipped.</em>
              </div>
            </div>
          `
        );
      } else if (type === "philosophy") {
        openInfo(
          "The LUMORA Skincare Philosophy",
          "Healthy skin, naturally.",
          `
            <div class="space-y-4 text-xs text-[#19382A] leading-relaxed">
              <p><strong>Simple, Everyday Skincare:</strong> Skincare shouldn't feel like a chemistry exam. We believe in gentle, clinically tested ingredients like Aloe Vera, Vitamin C, Hyaluronic Acid, and Ceramides that respect your skin barrier.</p>
              <p><strong>Clean Standards:</strong> No harsh sulfates, no artificial dyes, no overpowering synthetic fragrances. Formulated at pH 5.5 to harmonize with your skin's natural microbiome.</p>
              <p><strong>Cruelty-Free & Vegan:</strong> 100% Leaping Bunny certified cruelty-free. Never tested on animals.</p>
            </div>
          `
        );
      } else if (type === "privacy") {
        openInfo(
          "Privacy & Data Transparency",
          "Portfolio Prototype Privacy Standard",
          `
            <div class="space-y-4 text-xs text-[#19382A] leading-relaxed">
              <p><strong>No Data Tracking:</strong> LUMORA SKIN is a student/intern design assessment submission. We do not harvest, monetize, or sell user information to third-party ad brokers.</p>
              <p><strong>Client-Side Storage:</strong> Shopping bag and saved favorites persist strictly in your own browser's local cache (<code>localStorage</code>).</p>
            </div>
          `
        );
      } else if (type === "terms") {
        openInfo(
          "Terms of Service",
          "Demo Storefront Disclaimers",
          `
            <div class="space-y-4 text-xs text-[#19382A] leading-relaxed">
              <p>This website is built purely as a frontend engineering and design showcase. All transactions, checkout flows, and review quotes are simulated.</p>
            </div>
          `
        );
      }
    });
  });

  // --- SITE SEARCH ---
  document.querySelectorAll("[data-search-trigger]").forEach(btn => {
    btn.addEventListener("click", () => {
      openOverlay(searchModal, searchInput);
      handleSearch("");
    });
  });

  if (closeSearchBtn) closeSearchBtn.onclick = () => closeOverlay(searchModal);

  function handleSearch(q) {
    const query = q.toLowerCase().trim();
    const matches = query === ""
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.skinType.toLowerCase().includes(query) ||
          p.bestFor.toLowerCase().includes(query) ||
          p.keyIngredients.some(ing => ing.toLowerCase().includes(query))
        );

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="p-8 text-center text-xs text-[#4D6855]">
          <p class="font-serif text-base text-[#19382A] font-bold mb-1">No essentials found</p>
          <p>We couldn't find any products matching "${escapeHtml(q)}".</p>
          <div class="mt-3">
            <button id="search-clear-hint-btn" class="text-xs font-bold text-[#6F8B76] underline hover:text-[#19382A]">
              View All 6 Essentials
            </button>
          </div>
        </div>
      `;
      document.getElementById("search-clear-hint-btn")?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        handleSearch("");
      });
      return;
    }

    searchResults.innerHTML = matches.map(p => `
      <div class="flex items-center justify-between gap-3 p-3 hover:bg-[#E8F0EA] transition-colors border-b border-[#E9E0D2] rounded">
        <a href="#product/${p.slug}" class="flex items-center gap-3 flex-1 min-w-0" onclick="closeOverlay(document.getElementById('search-modal'));">
          <div class="w-12 h-12 bg-[#F8F5EF] rounded border border-[#E9E0D2] overflow-hidden flex-shrink-0">
            <img src="${p.images[0]}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover" onerror="window.handleImgError(this)">
          </div>
          <div class="min-w-0">
            <span class="text-[10px] font-bold text-[#6F8B76] uppercase block truncate">${escapeHtml(p.category)} · ${escapeHtml(p.bestFor)}</span>
            <div class="text-xs font-bold text-[#19382A] truncate">${escapeHtml(p.name)}</div>
            <div class="text-xs font-semibold text-[#19382A]">₹${p.price}</div>
          </div>
        </a>
        <button 
          data-add-to-bag="${p.id}" 
          class="btn-sage btn-add-bag py-1 px-2.5 text-[11px] font-bold rounded flex-shrink-0 flex items-center gap-1 shadow-sm"
          aria-label="Add ${escapeHtml(p.name)} to shopping bag">
          <i data-lucide="shopping-bag" class="w-3 h-3"></i>
          <span>Add</span>
        </button>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }

  // --- MOBILE MENU ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      openOverlay(mobileMenu);
      mobileMenuBtn.setAttribute("aria-expanded", "true");
    });
  }

  if (closeMobileMenuBtn && mobileMenu) {
    closeMobileMenuBtn.addEventListener("click", () => {
      closeOverlay(mobileMenu);
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
    });
  }

  mobileMenu?.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeOverlay(mobileMenu);
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
    }
  });

  // Helper HTML escaper
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- INITIALIZE EVERYTHING ---
  setupShopFilterListeners();
  renderCart();
  renderWishlist();
  handleHashRoute();
});
