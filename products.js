/**
 * LUMORA SKIN - Comprehensive Product Catalog & Routine Data
 * Brand: LUMORA SKIN
 * Tagline: Healthy skin, naturally.
 * Concept: Simple, everyday skincare using gentle and effective ingredients.
 */

const LUMORA_BRAND = {
  name: "LUMORA SKIN",
  tagline: "Healthy skin, naturally.",
  concept: "LUMORA is a modern skincare brand focused on simple, everyday skincare using gentle and effective ingredients.",
  isDemo: true,
  demoNotice: "Portfolio Project · Fictional Brand Concept & Demo Storefront · No Commercial Transactions"
};

const PRODUCTS_DATA = [
  {
    id: "lumora-cleanser",
    slug: "hydrating-face-cleanser",
    name: "Hydrating Face Cleanser",
    subtitle: "Gentle daily gel-to-milk moisture wash",
    price: 499,
    category: "Cleansers",
    categorySlug: "cleansers",
    stepName: "Cleanse",
    stepOrder: 1,
    badge: "EVERYDAY ESSENTIAL",
    bestFor: "Dry & normal skin",
    skinType: "Dry, Normal & Sensitive Skin",
    inStock: true,
    stockRemaining: 24,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556228722-d9b3be373b98?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A gentle, non-stripping daily cleanser formulated with organic Aloe Vera and vegetable Glycerin to wash away daily impurities while keeping your skin barrier soft and hydrated.",
    fullDescription: "Start your everyday routine with pure comfort. Our Hydrating Face Cleanser washes away pollution, excess oil, and makeup without disturbing your skin's natural moisture mantle. Formulated at a skin-friendly pH of 5.5, it leaves skin feeling supple, fresh, and thoroughly clean.",
    keyIngredients: ["Aloe Vera", "Glycerin", "Cucumber Hydrosol", "Apple Amino Acids"],
    keyActivesList: [
      { name: "Organic Aloe Vera Extract", role: "Hydration & Calming", desc: "Soothes everyday irritation, cools redness, and delivers vital electrolytes directly to the epidermis." },
      { name: "Vegetable Glycerin", role: "Moisture Magnet", desc: "A biocompatible humectant that draws ambient moisture into skin cells, preventing post-wash tightness." },
      { name: "Apple Amino Acid Cleansing Base", role: "Ultra-Mild Wash", desc: "Natural foaming agents derived from apple juice that cleanse without stripping essential surface lipids." }
    ],
    keyBenefits: [
      "Gently cleanses without stripping natural moisture",
      "Soothes tightness and calms redness with pure Aloe Vera",
      "pH-balanced at 5.5 to support healthy acid mantle",
      "Soap-free and sulfate-free for daily morning and night use"
    ],
    usage: {
      step: "Step 01 · Cleanse",
      amPm: "Morning & Evening",
      instructions: "Wet face with lukewarm water. Dispense 1–2 pumps onto fingertips and gently massage over face and neck in circular motions for 60 seconds. Rinse thoroughly and pat dry with a soft towel."
    },
    ingredients: "Aqua, Aloe Barbadensis Leaf Juice, Vegetable Glycerin, Sodium Cocoyl Apple Amino Acids, Cocamidopropyl Hydroxysultaine, Cucumis Sativus (Cucumber) Fruit Extract, Panthenol (Pro-Vitamin B5), Citric Acid, Phenoxyethanol, Ethylhexylglycerin.",
    volumes: [
      { size: "150ml", price: 499, label: "150ml / 5.1 fl. oz (Pump Bottle)" }
    ],
    pairsWellWith: ["lumora-vitc", "lumora-moisturizer", "lumora-sunscreen"],
    reviews: [
      {
        author: "Sample Review (Aanya P.)",
        isDemoReview: true,
        rating: 5,
        date: "3 days ago",
        title: "Leaves skin soft without dryness",
        skinProfile: "Dry / Sensitive",
        comment: "Most cleansers leave my skin feeling tight. This feels like a soothing cream wash that rinses clean. My skin feels soft immediately."
      },
      {
        author: "Sample Review (Rohit K.)",
        isDemoReview: true,
        rating: 5,
        date: "2 weeks ago",
        title: "Perfect daily cleanser",
        skinProfile: "Normal skin",
        comment: "Light natural scent, lathers gently, and doesn't sting the eyes. Exactly what simple everyday skincare should be."
      }
    ]
  },
  {
    id: "lumora-vitc",
    slug: "vitamin-c-glow-serum",
    name: "Vitamin C Glow Serum",
    subtitle: "Radiance-boosting antioxidant daily elixir",
    price: 799,
    category: "Serums",
    categorySlug: "serums",
    stepName: "Treat",
    stepOrder: 2,
    badge: "BESTSELLER",
    bestFor: "Dull skin",
    skinType: "All Skin Types / Dull & Uneven Tone",
    inStock: true,
    stockRemaining: 18,
    rating: 5.0,
    reviewsCount: 284,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1608248597359-57e0342371cf?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A lightweight daily serum designed to give your skincare routine a fresh, radiant feel with stable Vitamin C, Niacinamide, and Hyaluronic Acid.",
    fullDescription: "Wake up your complexion with our signature glow elixir. Formulated with stable Ethyl Ascorbic Acid (Vitamin C), Niacinamide, and multi-molecular Hyaluronic Acid, this silky serum sinks in immediately to fade post-blemish marks, brighten fatigue, and protect against daily environmental stress.",
    keyIngredients: ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Aloe Vera"],
    keyActivesList: [
      { name: "Stable Vitamin C (10%)", role: "Radiance & Glow", desc: "Promotes an even, lit-from-within luminosity while shielding skin from daily free radical pollution." },
      { name: "Niacinamide (Vitamin B3)", role: "Texture & Tone", desc: "Refines enlarged pores, softens subtle discoloration, and supports the lipid barrier." },
      { name: "Hyaluronic Acid", role: "Hydration Plump", desc: "Delivers multi-depth moisture to keep skin looking dewy, supple, and fresh all day long." },
      { name: "Soothing Aloe Vera", role: "Calm & Balance", desc: "Prevents tingling or redness, ensuring comfortable daily use for all skin types." }
    ],
    keyBenefits: [
      "Helps improve the appearance of dull skin",
      "Lightweight and fast-absorbing with zero sticky residue",
      "Helps maintain hydrated-looking, bouncy skin",
      "Suitable for everyday morning and evening skincare routines"
    ],
    usage: {
      step: "Step 02 · Treat & Glow",
      amPm: "Morning & Evening",
      instructions: "Apply 3–4 drops to clean, slightly damp skin and gently massage upward. Follow with Hyaluronic Moisturizer and always finish with Daily Sunscreen SPF 50 during daytime."
    },
    ingredients: "Aqua, 3-O-Ethyl Ascorbic Acid (Vitamin C), Niacinamide, Aloe Barbadensis Leaf Juice, Sodium Hyaluronate, Propanediol, Ferulic Acid, Tocopherol (Vitamin E), Allantoin, Sodium Benzoate, Potassium Sorbate.",
    volumes: [
      { size: "30ml", price: 799, label: "30ml / 1.0 fl. oz (Dropper Dispenser)" }
    ],
    pairsWellWith: ["lumora-cleanser", "lumora-moisturizer", "lumora-sunscreen"],
    reviews: [
      {
        author: "Sample Review (Pooja M.)",
        isDemoReview: true,
        rating: 5,
        date: "4 days ago",
        title: "Visible glow within a week!",
        skinProfile: "Dull / Tired complexion",
        comment: "This has become my morning holy grail. It doesn't oxidize or turn sticky, and my skin genuinely looks brighter and more awake."
      },
      {
        author: "Sample Review (Priya S.)",
        isDemoReview: true,
        rating: 5,
        date: "2 days ago",
        title: "Gentle and very effective",
        skinProfile: "Combination skin",
        comment: "I have sensitive skin that usually feels uncomfortable with Vitamin C. Lumora formulated this so gently with soothing botanicals—so comfortable and gentle, leaves my skin feeling fresh and radiant!"
      }
    ]
  },
  {
    id: "lumora-moisturizer",
    slug: "hyaluronic-moisturizer",
    name: "Hyaluronic Moisturizer",
    subtitle: "Daily moisture lock & dewy cloud cream",
    price: 699,
    category: "Moisturizers",
    categorySlug: "moisturizers",
    stepName: "Moisturize",
    stepOrder: 3,
    badge: "CUSTOMER FAVORITE",
    bestFor: "Dry skin",
    skinType: "Dry, Normal & Dehydrated Skin",
    inStock: true,
    stockRemaining: 20,
    rating: 4.9,
    reviewsCount: 198,
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A cushiony, fast-absorbing daily gel-cream formulated with multi-weight Hyaluronic Acid and skin-identical Ceramides to support lasting skin hydration.",
    fullDescription: "A daily breath of hydration for thirsty skin. Our Hyaluronic Moisturizer melts upon contact, delivering a cushion of comfortable hydration while essential ceramides help support the skin's protective moisture barrier throughout your day.",
    keyIngredients: ["Hyaluronic Acid", "Ceramides", "Squalane", "Centella Asiatica"],
    keyActivesList: [
      { name: "Triple Hyaluronic Acid Matrix", role: "Multi-Depth Hydration", desc: "Reaches different epidermal layers to provide instant surface smoothing and deep moisture plumping." },
      { name: "Bio-Identical Ceramide Complex (NP, AP, EOP)", role: "Barrier Fortification", desc: "Rebuilds intercellular lipid mortar to defend against dry air and environmental irritation." },
      { name: "Plant-Derived Squalane", role: "Weightless Sealing", desc: "Softens dry, flaky patches without clogging pores or leaving an oily film." }
    ],
    keyBenefits: [
      "Leaves skin feeling deeply hydrated, soft, and supple",
      "Replenishes essential ceramides to support moisture barrier",
      "Lightweight cloud texture that absorbs seamlessly",
      "Creates a smooth, dewy base under makeup"
    ],
    usage: {
      step: "Step 03 · Moisturize & Seal",
      amPm: "Morning & Evening",
      instructions: "Take a blueberry-sized amount between fingertips. Smooth evenly across face and neck using gentle upward strokes until completely absorbed."
    },
    ingredients: "Aqua, Caprylic/Capric Triglyceride, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Squalane, Butylene Glycol, Carbomer, Phenoxyethanol.",
    volumes: [
      { size: "50g", price: 699, label: "50g / 1.7 oz (Frosted Glass Jar)" }
    ],
    pairsWellWith: ["lumora-cleanser", "lumora-vitc", "lumora-sunscreen"],
    reviews: [
      {
        author: "Sample Review (Meera T.)",
        isDemoReview: true,
        rating: 5,
        date: "5 days ago",
        title: "Deeply moisturizing yet lightweight",
        skinProfile: "Dry skin",
        comment: "I love how rich it feels without feeling heavy or greasy. My dry patches around my nose disappeared after just three days."
      }
    ]
  },
  {
    id: "lumora-niacinamide",
    slug: "niacinamide-serum",
    name: "Niacinamide Serum",
    subtitle: "Pore-refining & sebum balance clarifying drop",
    price: 649,
    category: "Serums",
    categorySlug: "serums",
    stepName: "Treat",
    stepOrder: 2,
    badge: "CLARIFYING PICK",
    bestFor: "Oily skin",
    skinType: "Oily, Combination & Blemish-Prone Skin",
    inStock: true,
    stockRemaining: 15,
    rating: 4.8,
    reviewsCount: 164,
    images: [
      "https://images.unsplash.com/photo-1608248597359-57e0342371cf?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A gentle yet targeted clarifying serum with 5% pure Niacinamide and Zinc PCA to balance excess sebum, refine enlarged pores, and calm redness.",
    fullDescription: "Formulated specifically for oily and breakout-prone complexions. By combining optimal 5% Niacinamide with Zinc PCA and Green Tea extract, this refreshing serum clears congested pores and evens out post-acne redness without causing dryness or flaking.",
    keyIngredients: ["Niacinamide", "Zinc PCA", "Green Tea", "Hyaluronic Acid"],
    keyActivesList: [
      { name: "Niacinamide (Vitamin B3) 5%", role: "Pore & Oil Balance", desc: "Optimal 5% concentration designed to help regulate excess sebum and soothe sensitive skin." },
      { name: "Zinc PCA 1%", role: "Antimicrobial Calming", desc: "Soothes active breakouts and prevents shiny T-zone buildup throughout the day." },
      { name: "Organic Green Tea Extract", role: "Antioxidant Shield", desc: "Neutralizes pollution particles and calms inflamed blemishes." }
    ],
    keyBenefits: [
      "Regulates excess oil and shine throughout the day",
      "Visibly refines the look of enlarged pores",
      "Calms redness and soothes reactive blemishes",
      "Water-light texture that layers cleanly under moisturizer"
    ],
    usage: {
      step: "Step 02 · Treat & Balance",
      amPm: "Morning & Evening",
      instructions: "Apply 2–3 drops to cleansed skin, focusing on the T-zone and areas prone to excess oil or pores. Allow 30 seconds to absorb before applying moisturizer."
    },
    ingredients: "Aqua, Niacinamide (5%), Propanediol, Zinc PCA (1%), Camellia Sinensis (Green Tea) Leaf Extract, Sodium Hyaluronate, Hydroxyethylcellulose, Allantoin, Phenoxyethanol, Ethylhexylglycerin.",
    volumes: [
      { size: "30ml", price: 649, label: "30ml / 1.0 fl. oz (Dropper Bottle)" }
    ],
    pairsWellWith: ["lumora-cleanser", "lumora-moisturizer", "lumora-sunscreen"],
    reviews: [
      {
        author: "Sample Review (Karan B.)",
        isDemoReview: true,
        rating: 5,
        date: "1 week ago",
        title: "T-zone shine is comfortably balanced",
        skinProfile: "Oily / Acne-prone",
        comment: "Most 10% niacinamide serums feel harsh on my skin. Lumora's gentle 5% formula is just right. Keeps my skin looking fresh and balanced all afternoon."
      }
    ]
  },
  {
    id: "lumora-sunscreen",
    slug: "daily-sunscreen-spf-50",
    name: "Daily Sunscreen SPF 50",
    subtitle: "Invisible broad spectrum mineral shield",
    price: 599,
    category: "Sun Protection",
    categorySlug: "sunscreen",
    stepName: "Protect",
    stepOrder: 4,
    badge: "MUST HAVE",
    bestFor: "All skin types",
    skinType: "All Skin Types including Sensitive",
    inStock: true,
    stockRemaining: 26,
    rating: 5.0,
    reviewsCount: 310,
    images: [
      "https://images.unsplash.com/photo-1567928815116-f288283a0050?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A sheer, ultra-lightweight broad spectrum SPF 50 PA++++ sunscreen powered by non-nano Zinc Oxide and antioxidant Vitamin E for a comfortable, sheer finish.",
    fullDescription: "The ultimate daily shield your skin will actually look forward to wearing. Our Daily Sunscreen glides on like a featherweight lotion, absorbing comfortably into all skin tones with a weightless, non-greasy, natural finish.",
    keyIngredients: ["Zinc Oxide", "Vitamin E", "Aloe Vera", "Niacinamide"],
    keyActivesList: [
      { name: "Non-Nano Zinc Oxide (15%)", role: "Mineral UV Shield", desc: "Physical sun filter that sits weightlessly on skin to deflect UVA (aging) and UVB (burning) rays." },
      { name: "Vitamin E (Tocopherol)", role: "Antioxidant Defender", desc: "Synergizes with mineral filters to neutralize sun-induced free radicals and pollution." },
      { name: "Aloe Vera Gel", role: "Hydration Cooling", desc: "Prevents sun-induced skin dehydration and soothes the skin barrier." }
    ],
    keyBenefits: [
      "High broad-spectrum UVA/UVB SPF 50 PA++++ defense",
      "Sheer, weightless mineral finish designed for comfortable everyday wear on all skin tones",
      "Non-greasy, fast-absorbing, and sits smoothly under makeup",
      "Safe and gentle for sensitive, blemish-prone skin"
    ],
    usage: {
      step: "Step 04 · Protect & Defend",
      amPm: "Every Morning (Year-Round)",
      instructions: "Apply two finger lengths generously to face, neck, and ears as the final step of your morning skincare routine. Apply 15 minutes before going outside and reapply every 2 hours when in direct sun."
    },
    ingredients: "Aqua, Zinc Oxide, Caprylic/Capric Triglyceride, Aloe Barbadensis Leaf Juice, Propanediol, Tocopherol (Vitamin E), Niacinamide, Silica, Polyhydroxystearic Acid, Phenoxyethanol, Ethylhexylglycerin.",
    volumes: [
      { size: "50g", price: 599, label: "50g / 1.7 oz (Airless Pump Tube)" }
    ],
    pairsWellWith: ["lumora-cleanser", "lumora-vitc", "lumora-moisturizer"],
    reviews: [
      {
        author: "Sample Review (Ananya G.)",
        isDemoReview: true,
        rating: 5,
        date: "2 days ago",
        title: "Blends beautifully without heaviness",
        skinProfile: "Medium brown skin tone",
        comment: "I have tried so many mineral sunscreens that felt heavy or sticky. This one blends effortlessly in seconds and feels like a light day lotion. Very pleased!"
      }
    ]
  },
  {
    id: "lumora-nightcream",
    slug: "overnight-repair-cream",
    name: "Overnight Repair Cream",
    subtitle: "Restorative peptide & rich botanical butter balm",
    price: 899,
    category: "Night Care",
    categorySlug: "moisturizers",
    stepName: "Moisturize",
    stepOrder: 3,
    badge: "NOCTURNAL REPAIR",
    bestFor: "Dry & tired skin",
    skinType: "Dry, Mature & Fatigued Skin",
    inStock: true,
    stockRemaining: 16,
    rating: 4.9,
    reviewsCount: 175,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=85"
    ],
    shortDescription: "A rich, cocooning overnight treatment cream infused with multi-peptides, organic Shea Butter, and ceramides to repair tired, stressed skin while you sleep.",
    fullDescription: "Your skin does its most important cellular repair work while you sleep. Our Overnight Repair Cream envelops fatigued skin in a nourishing cocoon of firming peptides and organic shea butter, waking up to a complexion that feels supple, rested, and deeply revived.",
    keyIngredients: ["Peptides", "Shea Butter", "Ceramides", "Vitamin E"],
    keyActivesList: [
      { name: "Multi-Peptide Complex (Matrixyl 3000)", role: "Elasticity & Firmness", desc: "Designed to help support skin elasticity and smooth fine expression lines." },
      { name: "Organic Raw Shea Butter", role: "Rich Lipid Replenishment", desc: "Deeply restores moisture to parched skin cells, helping seal in essential hydration." },
      { name: "Centella Asiatica (Cica)", role: "Nighttime Soothing", desc: "Helps support skin barrier comfort and calms everyday environmental dryness." }
    ],
    keyBenefits: [
      "Deep nocturnal hydration designed to comfort tired, stressed skin",
      "Helps improve skin elasticity and soft feel with peptides",
      "Nourishing rich cream texture that never suffocates pores",
      "Wake up to visibly soft, supple, comfortable skin"
    ],
    usage: {
      step: "Evening Step 03 · Overnight Renewal",
      amPm: "Every Evening",
      instructions: "Warm a pea-sized amount between clean fingertips and gently press into cleansed face and neck as the final step of your nighttime routine."
    },
    ingredients: "Aqua, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Glycerin, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Ceramide NP, Centella Asiatica Extract, Tocopherol, Carbomer, Phenoxyethanol.",
    volumes: [
      { size: "50g", price: 899, label: "50g / 1.7 oz (Frosted Glass Jar)" }
    ],
    pairsWellWith: ["lumora-cleanser", "lumora-vitc", "lumora-niacinamide"],
    reviews: [
      {
        author: "Sample Review (Shreya V.)",
        isDemoReview: true,
        rating: 5,
        date: "6 days ago",
        title: "Wake up with plumper, softer skin",
        skinProfile: "Dry / 30s",
        comment: "This cream is wonderful for nighttime dryness. It feels nourishing and comfortable every night, leaving my skin feeling soft and supple in the morning."
      }
    ]
  }
];

// Curated 4-Step Routine sequence
const ROUTINE_STEPS = [
  {
    stepNumber: "01",
    stepName: "Cleanse",
    productId: "lumora-cleanser",
    headline: "Gently wash without stripping",
    description: "Wash away impurities, excess sebum, and makeup with Aloe Vera & Glycerin while keeping your natural barrier calm and supple."
  },
  {
    stepNumber: "02",
    stepName: "Treat",
    productId: "lumora-vitc",
    alternativeId: "lumora-niacinamide",
    headline: "Target dullness or excess oil",
    description: "Deliver active vitamins directly into skin. Choose Vitamin C Glow Serum for morning radiance or Niacinamide for pore balance."
  },
  {
    stepNumber: "03",
    stepName: "Moisturize",
    productId: "lumora-moisturizer",
    alternativeId: "lumora-nightcream",
    headline: "Lock in lasting moisture",
    description: "Seal in active moisture with Hyaluronic Acid & Ceramides for daytime bounce, or Overnight Repair Cream for deep night nourishment."
  },
  {
    stepNumber: "04",
    stepName: "Protect",
    productId: "lumora-sunscreen",
    headline: "Shield from UV & environmental stress",
    description: "Everyday broad-spectrum SPF 50 with non-nano Zinc Oxide and Vitamin E for weightless, comfortable daily mineral defense."
  }
];

// Product Categories for PLP Filter Tabs
const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products", count: 6 },
  { id: "cleansers", name: "Cleansers", count: 1 },
  { id: "serums", name: "Serums", count: 2 },
  { id: "moisturizers", name: "Moisturizers", count: 2 },
  { id: "sunscreen", name: "Sun Protection", count: 1 }
];

// Skin Concerns for Filtering
const SKIN_CONCERNS = [
  { id: "all", name: "All Skin Types", desc: "Simple essentials for everyone" },
  { id: "dry", name: "Dry & Dehydrated", desc: "Aloe Vera, Hyaluronic Acid & Ceramides" },
  { id: "dull", name: "Dull & Uneven Tone", desc: "Vitamin C & Niacinamide glow" },
  { id: "oily", name: "Oily & Pores", desc: "Zinc PCA & 5% Niacinamide balance" },
  { id: "tired", name: "Tired & Stressed", desc: "Peptides & nourishing Shea Butter" }
];

// Rich Ingredient Imagery & Science Showcase
const INGREDIENT_SHOWCASE = [
  {
    id: "aloe",
    name: "Organic Aloe Vera",
    role: "Deep Soothing & Cellular Moisture",
    category: "Botanical Hydrator",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    description: "Rich in polysaccharides and essential amino acids, cold-extracted aloe juice calms daily micro-irritation and replenishes the natural moisture reservoir.",
    products: ["Hydrating Face Cleanser", "Vitamin C Glow Serum", "Daily Sunscreen SPF 50"]
  },
  {
    id: "vitc",
    name: "Stabilized Vitamin C",
    role: "Antioxidant Shield & Radiance",
    category: "Skin Illuminator",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
    description: "Gentle 3-O-Ethyl Ascorbic Acid targets environmental stress, softens the look of uneven tone, and restores fresh vitality with a comfortable feel.",
    products: ["Vitamin C Glow Serum"]
  },
  {
    id: "hyaluronic",
    name: "Multi-Weight Hyaluronic Acid",
    role: "Multi-Layer Epidermal Hydration",
    category: "Moisture Magnet",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    description: "Multi-depth molecular weights penetrate multiple skin layers to bind up to 1,000x its weight in water, leaving skin plump, dewy, and bouncy.",
    products: ["Hyaluronic Moisturizer", "Vitamin C Glow Serum"]
  },
  {
    id: "ceramides",
    name: "Skin-Identical Ceramides",
    role: "Skin Barrier Fortification",
    category: "Barrier Restorative",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    description: "Bio-identical Ceramide complex (NP, AP, EOP) seals the intercellular lipid matrix, protecting skin from moisture evaporation and urban pollution.",
    products: ["Hyaluronic Moisturizer", "Overnight Repair Cream"]
  },
  {
    id: "niacinamide",
    name: "Niacinamide (Vitamin B3) + Zinc",
    role: "Pore Refining & Sebum Harmonizing",
    category: "Clarifying Essential",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    description: "Strengthens cellular resilience, reduces excess midday shine, and visibly clarifies enlarged pores without drying out the skin.",
    products: ["Niacinamide Serum", "Vitamin C Glow Serum"]
  },
  {
    id: "peptides",
    name: "Peptides & Raw Shea Butter",
    role: "Nocturnal Elasticity & Cushion Recovery",
    category: "Firming Complex",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    description: "Signaling peptides promote natural collagen elasticity while raw whipped shea butter envelopes parched skin in a breathable protective cocoon.",
    products: ["Overnight Repair Cream"]
  }
];
