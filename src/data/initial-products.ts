import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- FRAGRANCES ---
  {
    id: 'prod-frag-1',
    name: 'AURA NOIR Eau De Parfum (100ml)',
    slug: 'aura-noir-eau-de-parfum',
    category: 'fragrance',
    price: 1899,
    compareAtPrice: 2499,
    description: 'An enigmatic blend of smoked oud, Italian bergamot, dark vetiver, and black pepper. Crafted for the man who leaves a lasting signature without saying a word.',
    details: [
      'Top Notes: Calabrian Bergamot, Pink Peppercorn',
      'Heart Notes: Smoked Oud, Cypriol, French Lavender',
      'Base Notes: Bourbon Vetiver, Rich Amber, Leather Accord',
      'Concentration: 25% Eau De Parfum (10-12 hours longevity)',
      'Cruelty-free & IFRA Certified'
    ],
    features: ['Long Lasting (12+ Hours)', 'Pure French Essential Oils', 'Handcrafted Heavy Glass Flacon'],
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 45,
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 128,
    badge: 'Bestseller',
    sku: 'MA-FRAG-001',
    createdAt: '2026-01-15T00:00:00.000Z'
  },
  {
    id: 'prod-frag-2',
    name: 'VELVET SMOKE Extrait De Parfum (50ml)',
    slug: 'velvet-smoke-extrait-de-parfum',
    category: 'fragrance',
    price: 2199,
    compareAtPrice: 2999,
    description: 'A decadent and warm aroma infused with roasted tobacco leaves, Madagascar vanilla, tonka bean, and spicy cardamom.',
    details: [
      'Top Notes: Crushed Cardamom, Ginger, Cacao Pod',
      'Heart Notes: Golden Tobacco Blossom, Dark Honey, Nutmeg',
      'Base Notes: Cedarwood, Vanilla Absolute, Patchouli',
      'Concentration: 30% Extrait De Parfum (14+ hours longevity)',
      'Ideal for evenings, black-tie events, and intimate dates'
    ],
    features: ['High Projection & Sillage', 'Magnetic Cap Closure', 'Travel Friendly 50ml'],
    images: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 30,
    featured: true,
    rating: 4.8,
    reviewCount: 94,
    badge: 'Signature',
    sku: 'MA-FRAG-002',
    createdAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 'prod-frag-3',
    name: 'CYPRESS & COAST Sea Salt Parfum (100ml)',
    slug: 'cypress-and-coast-sea-salt-parfum',
    category: 'fragrance',
    price: 1699,
    compareAtPrice: 2199,
    description: 'Crisp oceanic minerals meet aromatic Mediterranean cypress and sage. Clean, sharp, and invigorating for daytime authority.',
    details: [
      'Top Notes: Mineral Sea Salt, Grapefruit, Cardamom',
      'Heart Notes: Wild Sage, Coastal Cypress, Rosemary',
      'Base Notes: Driftwood, White Amber, Oakmoss',
      'Ideal for boardroom focus and outdoor daytime vitality'
    ],
    features: ['All-Day Crisp Freshness', 'Non-Staining Formula', 'Luxury Matte Atomizer'],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 52,
    featured: false,
    rating: 4.7,
    reviewCount: 76,
    badge: 'Fresh',
    sku: 'MA-FRAG-003',
    createdAt: '2026-02-15T00:00:00.000Z'
  },

  // --- ACCESSORIES ---
  {
    id: 'prod-acc-1',
    name: 'MONOLITH Matte Black Chronograph Watch',
    slug: 'monolith-matte-black-chronograph-watch',
    category: 'accessories',
    price: 3499,
    compareAtPrice: 4999,
    description: 'Precision Japanese quartz movement encapsulated in a 42mm surgical-grade 316L black stainless steel casing with sapphire crystal glass.',
    details: [
      'Case Diameter: 42mm | Thickness: 9.5mm',
      'Material: 316L Solid Stainless Steel with PVD Matte Coating',
      'Glass: Scratch-Resistant Sapphire Crystal Glass',
      'Water Resistance: 5 ATM (50 meters)',
      'Strap: Interchangeable Solid Steel Link Bracelet with Butterfly Clasp'
    ],
    features: ['5 ATM Water Resistance', 'Sapphire Crystal Glass', 'Includes Link Adjustment Tool'],
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 22,
    featured: true,
    isNew: true,
    rating: 5.0,
    reviewCount: 88,
    badge: 'Limited Edition',
    sku: 'MA-ACC-001',
    createdAt: '2026-01-20T00:00:00.000Z'
  },
  {
    id: 'prod-acc-2',
    name: 'CARBON Bifold RFID-Blocking Leather Wallet',
    slug: 'carbon-bifold-rfid-leather-wallet',
    category: 'accessories',
    price: 1299,
    compareAtPrice: 1799,
    description: 'Handcrafted full-grain top layer Nappa leather integrated with carbon fiber reinforcement and certified RFID-shielding mesh.',
    details: [
      'Material: 100% Genuine Full Grain Nappa Leather',
      'Capacity: 8 Cards, 2 Hidden Slots, Full-length Currency Compartment',
      'Dimensions: 11cm x 8.5cm x 1.2cm (Ultra-slim profile)',
      'Protection: Military-grade RFID Blocking against digital theft'
    ],
    features: ['Slim Pocket Fit', 'Full Grain Leather', 'RFID Protection'],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606503829067-175a2d603e91?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 60,
    featured: false,
    rating: 4.8,
    reviewCount: 142,
    badge: 'Popular',
    sku: 'MA-ACC-002',
    createdAt: '2026-02-10T00:00:00.000Z'
  },
  {
    id: 'prod-acc-3',
    name: 'TITAN Matte Titanium Cuff Bangle',
    slug: 'titan-matte-titanium-cuff-bangle',
    category: 'accessories',
    price: 1499,
    compareAtPrice: 1999,
    description: 'Minimalist brushed aerospace titanium cuff bracelet. Hypoallergenic, feather-light, and virtually indestructible.',
    details: [
      'Material: Pure Grade 2 Titanium',
      'Finish: Hand-brushed Matte Obsidian',
      'Width: 6mm | Thickness: 2.5mm',
      'Adjustable sizing to fit all wrist contours comfortably'
    ],
    features: ['Hypoallergenic & Non-Tarnish', 'Featherlight 28 grams', 'Laser-engraved MANLY AURA Emblem'],
    images: [
      'https://images.unsplash.com/photo-1611591475819-79b8b73898c1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    featured: true,
    rating: 4.9,
    reviewCount: 63,
    badge: 'Trending',
    sku: 'MA-ACC-003',
    createdAt: '2026-02-18T00:00:00.000Z'
  },

  // --- GADGETS ---
  {
    id: 'prod-gad-1',
    name: 'EDGE-PRO Zero-Gap Precision Beard Trimmer',
    slug: 'edge-pro-zero-gap-precision-beard-trimmer',
    category: 'gadgets',
    price: 2499,
    compareAtPrice: 3299,
    description: 'Professional barber-grade self-sharpening titanium T-blade with high-torque 7200 RPM rotary motor and digital LED battery display.',
    details: [
      'Motor: High-speed 7200 RPM Japanese Magnetic Motor',
      'Blade: Titanium Ceramic DLC Self-Sharpening Blades',
      'Battery: 2000mAh Lithium-ion (180 minutes runtime per charge)',
      'Charging: Universal USB-C Fast Charge (0 to 100% in 90 mins)',
      'Accessories: 4 Guide Combs (1mm, 2mm, 3mm, 4mm), Cleaning Oil & Brush'
    ],
    features: ['Zero-Gap Detail Styling', '180-Minute Battery Life', 'Waterproof IPX7 Casing'],
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 28,
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 110,
    badge: 'Barber Choice',
    sku: 'MA-GAD-001',
    createdAt: '2026-01-25T00:00:00.000Z'
  },
  {
    id: 'prod-gad-2',
    name: 'STEALTH-PODS ANC Wireless Earbuds',
    slug: 'stealth-pods-anc-wireless-earbuds',
    category: 'gadgets',
    price: 2999,
    compareAtPrice: 3999,
    description: 'Active Noise Cancellation (-35dB) tuned for punchy deep bass and crystalline vocal clarity with touch gesture control and wireless charging.',
    details: [
      'Drivers: 12mm Graphene Dynamic Drivers',
      'Noise Cancellation: Hybrid Active Noise Cancellation + Environmental ENC',
      'Bluetooth: Version 5.4 with Low Latency Gaming Mode (40ms)',
      'Battery: 36 Hours Total Playback with Compact Charging Case',
      'Water Resistance: IPX5 Sweat & Splash Resistance'
    ],
    features: ['Hybrid Active Noise Cancelling', 'Quad Mics with ENC Call Clarity', 'Wireless Qi Charging'],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 40,
    featured: true,
    rating: 4.8,
    reviewCount: 95,
    badge: 'Top Tech',
    sku: 'MA-GAD-002',
    createdAt: '2026-02-05T00:00:00.000Z'
  },
  {
    id: 'prod-gad-3',
    name: 'AURA 3-in-1 Fast Magnetic Wireless Charging Station',
    slug: 'aura-3-in-1-fast-magnetic-wireless-station',
    category: 'gadgets',
    price: 1999,
    compareAtPrice: 2699,
    description: 'Machined aerospace aluminum charging stand. Simultaneously powers smartphone (15W), smartwatch, and wireless earbuds in one cable-free footprint.',
    details: [
      'Output: 15W Max MagSafe Fast Wireless, 5W Buds, 3W Watch',
      'Material: CNC Anodized Aluminum with Non-slip Silicone Base',
      'Safety: Foreign Object Detection, Over-temperature & Surge Protection',
      'Foldable travel-ready design'
    ],
    features: ['15W MagSafe Compatible', 'Machined Matte Metal Chassis', 'Clean Cable Management'],
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 50,
    featured: false,
    rating: 4.7,
    reviewCount: 54,
    badge: 'Smart Desk',
    sku: 'MA-GAD-003',
    createdAt: '2026-02-12T00:00:00.000Z'
  },

  // --- FASHION ---
  {
    id: 'prod-fash-1',
    name: 'HEAVYWEIGHT 280 GSM Structured Obsidian Tee',
    slug: 'heavyweight-280-gsm-structured-obsidian-tee',
    category: 'fashion',
    price: 1199,
    compareAtPrice: 1599,
    description: 'Custom-milled 280 GSM combed compact cotton. Clean boxy oversized fit designed to hold its architectural drape through countless washes.',
    details: [
      'Fabric: 100% Combed Compact Cotton (280 GSM Heavyweight)',
      'Fit: Modern Structured Relaxed Fit with Dropped Shoulders',
      'Collar: 1.25" Reinforced ribbed crew collar (Does not bacon or sag)',
      'Pre-shrunk, bio-washed and anti-pilling treated',
      'Available sizes: S, M, L, XL, XXL'
    ],
    features: ['280 GSM Heavy Fabric Weight', 'Zero Sag Reinforced Collar', 'Deep Carbon Black Dye'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 75,
    featured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 167,
    badge: 'Wardrobe Essential',
    sku: 'MA-FASH-001',
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'prod-fash-2',
    name: 'TACTICAL Stealth Cargo Pant - Carbon Black',
    slug: 'tactical-stealth-cargo-pant-carbon-black',
    category: 'fashion',
    price: 2299,
    compareAtPrice: 3199,
    description: 'Engineered stretch ripstop cotton blend with low-profile magnetic pocket flaps, articulated knees, and tailored tapered ankle cuffs.',
    details: [
      'Fabric: 97% Cotton Ripstop, 3% Elastane 4-Way Stretch',
      'Pockets: 6 Functional Pockets with Silent Magnetic Closures',
      'Waist: Elasticated internal drawstring waistband + belt loops',
      'Fit: Ergonomic Athletic Taper'
    ],
    features: ['Ripstop Durability', 'Comfort 4-Way Stretch', 'Reinforced Heavy-Stress Seams'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 35,
    featured: true,
    rating: 4.8,
    reviewCount: 89,
    badge: 'Popular',
    sku: 'MA-FASH-002',
    createdAt: '2026-02-08T00:00:00.000Z'
  },
  {
    id: 'prod-fash-3',
    name: 'NOIR Relaxed Linen-Cotton Overshirt',
    slug: 'noir-relaxed-linen-cotton-overshirt',
    category: 'fashion',
    price: 1899,
    compareAtPrice: 2499,
    description: 'Breathable European linen interwoven with soft cotton. Designed to layer effortlessly over tees or wear solo buttoned up.',
    details: [
      'Fabric: 55% Natural Linen, 45% Organic Cotton',
      'Buttons: Matte Black Engraved Urea Buttons',
      'Fit: Straight Cut Overshirt with Dual Chest Pockets',
      'Care: Machine wash cold, dry flat in shade'
    ],
    features: ['Breathable Year-Round Fabric', 'Dual Gusseted Utility Pockets', 'Custom Matte Hardware'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 42,
    featured: false,
    rating: 4.7,
    reviewCount: 52,
    badge: 'New Arrival',
    sku: 'MA-FASH-003',
    createdAt: '2026-02-20T00:00:00.000Z'
  }
];

export const CATEGORIES_DATA = [
  {
    slug: 'fragrance',
    name: 'Fragrance',
    tagline: 'Bold, mysterious olfactive statements crafted to linger.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    itemCount: '3 Signature Blends'
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    tagline: 'Precision-engineered chronographs, titanium jewelry, and full-grain leather.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    itemCount: '3 Everyday Essentials'
  },
  {
    slug: 'gadgets',
    name: 'Gadgets',
    tagline: 'Modern tactical electronics, zero-gap grooming, and audio excellence.',
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    itemCount: '3 Smart Innovations'
  },
  {
    slug: 'fashion',
    name: 'Fashion',
    tagline: 'Heavyweight architectural streetwear and tactical minimal silhouettes.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    itemCount: '3 Core Silhouettes'
  }
] as const;
