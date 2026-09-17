import { Measurement, PricingInfo } from './pricing'

export interface ProductVariant {
  id: string
  label: string // e.g., '100ml', '250g', '1kg'
  measurement: Measurement // { value: 100, unit: 'ml' }
  pricing: PricingInfo
  inStock: boolean
}

export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  category: string
  image: string
  rating: number
  reviews: number
  benefits?: string[]
  variants: ProductVariant[]
}

// 14 Binlay Products with multi-variant support

export const products: Product[] = [
  {
    id: '1',
    name: 'Virgin Coconut Oil - Cold Pressed',
    description: '100% Pure. Cold-Pressed. Natural Goodness.',
    longDescription:
      'Premium virgin coconut oil made from fresh tender coconuts using traditional cold-pressed technology. No chemicals, no preservatives. Perfect for hair, skin care, baby care, cooking, and daily wellness.',
    category: 'virgin-coconut-oil',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.08.06 PM.jpeg',
    rating: 4.9,
    reviews: 2450,
    benefits: [
      'Supports Heart Health',
      'Boosts Immunity',
      'Glowing Healthy Skin',
      'Stronger & Shinier Hair',
    ],
    variants: [
      {
        id: '1-100ml',
        label: '100ml',
        measurement: { value: 100, unit: 'ml' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
      {
        id: '1-250ml',
        label: '250ml',
        measurement: { value: 250, unit: 'ml' },
        pricing: { type: 'fixed', amount: 599 },
        inStock: true,
      },
      {
        id: '1-500ml',
        label: '500ml',
        measurement: { value: 500, unit: 'ml' },
        pricing: { type: 'fixed', amount: 999 },
        inStock: true,
      },
      {
        id: '1-1l',
        label: '1L',
        measurement: { value: 1, unit: 'l' },
        pricing: { type: 'fixed', amount: 1799 },
        inStock: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Coconut Water - Natural Hydration',
    description: 'Pure. Fresh. Natural Electrolytes in Every Sip.',
    longDescription:
      'Natural coconut water from fresh tender coconuts. Rich in electrolytes, naturally hydrating, no added sugars or preservatives. Perfect for hydration, recovery, and wellness.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.18 PM (1).jpeg',
    rating: 4.8,
    reviews: 1856,
    benefits: ['Natural Hydration', 'Rich in Electrolytes', 'No Added Sugars', 'Pure & Fresh'],
    variants: [
      {
        id: '2-200ml',
        label: '200ml',
        measurement: { value: 200, unit: 'ml' },
        pricing: { type: 'fixed', amount: 149 },
        inStock: true,
      },
      {
        id: '2-500ml',
        label: '500ml',
        measurement: { value: 500, unit: 'ml' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
      {
        id: '2-1l',
        label: '1L',
        measurement: { value: 1, unit: 'l' },
        pricing: { type: 'fixed', amount: 499 },
        inStock: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Baby Care VCO - Virgin Coconut Oil',
    description: 'Gentle Care for Precious Beginnings. Pure Care from Nature',
    longDescription:
      'Specially formulated baby-safe virgin coconut oil for newborns and infants. Hypoallergenic formula suitable from 0+ months. Gentle on delicate baby skin.',
    category: 'baby-care',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.17 PM (2).jpeg',
    rating: 4.9,
    reviews: 1624,
    benefits: ['Baby-Safe Formula', 'Gentle on Skin', 'Moisturises & Protects', 'Hypoallergenic'],
    variants: [
      {
        id: '3-100ml',
        label: '100ml',
        measurement: { value: 100, unit: 'ml' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
      {
        id: '3-200ml',
        label: '200ml',
        measurement: { value: 200, unit: 'ml' },
        pricing: { type: 'fixed', amount: 499 },
        inStock: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Dessiccated Coconut Powder - Premium',
    description: 'Pure. Fresh. Natural. Goodness of Coconut in Every Bite.',
    longDescription:
      'Premium quality dessiccated coconut powder made from 100% pure coconut. Finely ground and naturally sweet. Perfect for sweets, cakes, cookies, smoothies, and baking.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.09.49 PM.jpeg',
    rating: 4.7,
    reviews: 945,
    benefits: ['100% Pure Coconut', 'No Preservatives', 'Rich in Fiber', 'Natural Energy'],
    variants: [
      {
        id: '4-100g',
        label: '100g',
        measurement: { value: 100, unit: 'g' },
        pricing: { type: 'fixed', amount: 99 },
        inStock: true,
      },
      {
        id: '4-250g',
        label: '250g',
        measurement: { value: 250, unit: 'g' },
        pricing: { type: 'fixed', amount: 199 },
        inStock: true,
      },
      {
        id: '4-500g',
        label: '500g',
        measurement: { value: 500, unit: 'g' },
        pricing: { type: 'fixed', amount: 349 },
        inStock: true,
      },
      {
        id: '4-1kg',
        label: '1kg',
        measurement: { value: 1, unit: 'kg' },
        pricing: { type: 'fixed', amount: 599 },
        inStock: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Coconut Chips - Crunchy & Tasty',
    description: 'Sweet & Tasty. Premium Quality Coconut Chips.',
    longDescription:
      'Delicious and crunchy coconut chips made from premium quality coconuts. Perfect for snacking, desserts, and culinary creations.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.00.46 PM.jpeg',
    rating: 4.6,
    reviews: 732,
    benefits: ['100% Natural', 'Crunchy Texture', 'Sweet Taste', 'No Additives'],
    variants: [
      {
        id: '5-150g',
        label: '150g',
        measurement: { value: 150, unit: 'g' },
        pricing: { type: 'fixed', amount: 149 },
        inStock: true,
      },
      {
        id: '5-250g',
        label: '250g',
        measurement: { value: 250, unit: 'g' },
        pricing: { type: 'fixed', amount: 249 },
        inStock: true,
      },
      {
        id: '5-500g',
        label: '500g',
        measurement: { value: 500, unit: 'g' },
        pricing: { type: 'fixed', amount: 449 },
        inStock: true,
      },
    ],
  },
  {
    id: '6',
    name: 'Coconut Milk - Rich & Creamy',
    description: 'Pure Coconut Goodness. Rich, Creamy, Natural.',
    longDescription:
      'Premium coconut milk made from fresh coconut meat. Perfect for curries, desserts, smoothies, and cooking. Rich, creamy, and naturally flavorful.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.30 PM.jpeg',
    rating: 4.7,
    reviews: 618,
    benefits: ['Pure & Natural', 'Creamy Texture', 'Rich Flavor', 'Versatile'],
    variants: [
      {
        id: '6-400ml',
        label: '400ml',
        measurement: { value: 400, unit: 'ml' },
        pricing: { type: 'fixed', amount: 179 },
        inStock: true,
      },
      {
        id: '6-800ml',
        label: '800ml',
        measurement: { value: 800, unit: 'ml' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
    ],
  },
  {
    id: '7',
    name: 'Virgin Coconut Oil - 1kg Family Pack',
    description: 'The Pure Touch of Nature. For Your Family, For A Better Tomorrow',
    longDescription:
      'Large family pack of 100% pure virgin coconut oil. Cold-pressed from fresh tender coconuts. Multi-purpose formula for cooking, skincare, and wellness.',
    category: 'virgin-coconut-oil',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.18 PM.jpeg',
    rating: 4.9,
    reviews: 1523,
    benefits: ['Cold Pressed', 'Chemical Free', '100% Natural', 'Multi Purpose'],
    variants: [
      {
        id: '7-1kg',
        label: '1kg',
        measurement: { value: 1, unit: 'kg' },
        pricing: { type: 'fixed', amount: 1799 },
        inStock: true,
      },
    ],
  },
  {
    id: '8',
    name: 'Hair Care VCO - Virgin Coconut Oil',
    description: 'Nourishes Hair Naturally. Stronger & Shinier Hair',
    longDescription:
      'Premium virgin coconut oil specially formulated for hair care. Nourishes scalp, strengthens hair roots, adds natural shine and softness.',
    category: 'hair-care',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.17 PM (1).jpeg',
    rating: 4.8,
    reviews: 892,
    benefits: ['Strengthens Hair', 'Adds Shine', 'Nourishes Scalp', 'Natural & Pure'],
    variants: [
      {
        id: '8-100ml',
        label: '100ml',
        measurement: { value: 100, unit: 'ml' },
        pricing: { type: 'fixed', amount: 249 },
        inStock: true,
      },
      {
        id: '8-250ml',
        label: '250ml',
        measurement: { value: 250, unit: 'ml' },
        pricing: { type: 'fixed', amount: 499 },
        inStock: true,
      },
      {
        id: '8-500ml',
        label: '500ml',
        measurement: { value: 500, unit: 'ml' },
        pricing: { type: 'fixed', amount: 799 },
        inStock: true,
      },
    ],
  },
  {
    id: '9',
    name: 'Skin Care VCO - Virgin Coconut Oil',
    description: 'Glowing Healthy Skin. Natural Beauty from Within',
    longDescription:
      'Premium virgin coconut oil for skincare. Deep moisturizing, reduces acne, improves skin texture, and promotes natural radiance.',
    category: 'skin-care',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.59.17 PM.jpeg',
    rating: 4.8,
    reviews: 756,
    benefits: ['Deep Moisturizing', 'Reduces Acne', 'Improves Texture', 'Natural Radiance'],
    variants: [
      {
        id: '9-50ml',
        label: '50ml',
        measurement: { value: 50, unit: 'ml' },
        pricing: { type: 'fixed', amount: 179 },
        inStock: true,
      },
      {
        id: '9-100ml',
        label: '100ml',
        measurement: { value: 100, unit: 'ml' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
      {
        id: '9-200ml',
        label: '200ml',
        measurement: { value: 200, unit: 'ml' },
        pricing: { type: 'fixed', amount: 499 },
        inStock: true,
      },
    ],
  },
  {
    id: '10',
    name: 'Coconut Health Supplement - Wellness',
    description: 'Premium Wellness Supplement. Boost Your Health Daily',
    longDescription:
      'Premium coconut-based health supplement packed with MCTs, antioxidants, and essential nutrients. Supports immunity, energy, and overall wellness.',
    category: 'health-supplements',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.01.25 PM.jpeg',
    rating: 4.7,
    reviews: 643,
    benefits: ['Boosts Immunity', 'Increases Energy', 'Rich in MCTs', 'Supports Wellness'],
    variants: [
      {
        id: '10-200g',
        label: '200g',
        measurement: { value: 200, unit: 'g' },
        pricing: { type: 'fixed', amount: 399 },
        inStock: true,
      },
      {
        id: '10-500g',
        label: '500g',
        measurement: { value: 500, unit: 'g' },
        pricing: { type: 'fixed', amount: 799 },
        inStock: true,
      },
    ],
  },
  {
    id: '11',
    name: 'Organic Coconut Sugar - Natural Sweetener',
    description: 'Pure Organic Coconut Sugar. Low GI Natural Sweetness',
    longDescription:
      'Pure organic coconut sugar made from coconut palm blossoms. Low glycemic index, naturally sweet, perfect for baking, beverages, and cooking.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.08.06 PM.jpeg',
    rating: 4.6,
    reviews: 534,
    benefits: ['Low GI', 'Organic', 'Natural Sweetness', 'Sustainable'],
    variants: [
      {
        id: '11-250g',
        label: '250g',
        measurement: { value: 250, unit: 'g' },
        pricing: { type: 'fixed', amount: 199 },
        inStock: true,
      },
      {
        id: '11-500g',
        label: '500g',
        measurement: { value: 500, unit: 'g' },
        pricing: { type: 'fixed', amount: 349 },
        inStock: true,
      },
      {
        id: '11-1kg',
        label: '1kg',
        measurement: { value: 1, unit: 'kg' },
        pricing: { type: 'fixed', amount: 599 },
        inStock: true,
      },
    ],
  },
  {
    id: '12',
    name: 'Coconut Flour - High Fiber Baking',
    description: 'Pure Coconut Flour. High Fiber, Gluten-Free Goodness',
    longDescription:
      'Premium coconut flour made from dried coconut meat. High in fiber, gluten-free, perfect for healthy baking and gluten-free recipes.',
    category: 'food-beverages',
    image: '/images/products/WhatsApp Image 2026-09-10 at 3.09.49 PM.jpeg',
    rating: 4.5,
    reviews: 478,
    benefits: ['High Fiber', 'Gluten-Free', 'Healthy Baking', 'Nutrient Dense'],
    variants: [
      {
        id: '12-200g',
        label: '200g',
        measurement: { value: 200, unit: 'g' },
        pricing: { type: 'fixed', amount: 149 },
        inStock: true,
      },
      {
        id: '12-500g',
        label: '500g',
        measurement: { value: 500, unit: 'g' },
        pricing: { type: 'fixed', amount: 299 },
        inStock: true,
      },
    ],
  },
  {
    id: '13',
    name: 'Virgin Coconut Oil - Premium Cooking',
    description: 'Premium Cooking Oil. Perfect for Stir-Fry & Sautéing',
    longDescription:
      'Premium virgin coconut oil optimized for cooking. Smoke point 350°F. Perfect for stir-fry, sautéing, and everyday cooking. Pure and natural.',
    category: 'virgin-coconut-oil',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.58.48 PM.jpeg',
    rating: 4.8,
    reviews: 891,
    benefits: ['High Smoke Point', 'Pure & Natural', 'Perfect for Cooking', 'Healthy Fat'],
    variants: [
      {
        id: '13-500ml',
        label: '500ml',
        measurement: { value: 500, unit: 'ml' },
        pricing: { type: 'fixed', amount: 899 },
        inStock: true,
      },
      {
        id: '13-1l',
        label: '1L',
        measurement: { value: 1, unit: 'l' },
        pricing: { type: 'fixed', amount: 1599 },
        inStock: true,
      },
    ],
  },
  {
    id: '14',
    name: 'Coconut Health Tea - Wellness Beverage',
    description: 'Wellness Tea Blend. Natural Energy & Health Boost',
    longDescription:
      'Premium coconut-based wellness tea blend with natural herbs. Perfect daily beverage for energy, immunity, and digestive health.',
    category: 'health-supplements',
    image: '/images/products/WhatsApp Image 2026-09-10 at 2.58.48 PM (1).jpeg',
    rating: 4.7,
    reviews: 612,
    benefits: ['Boosts Energy', 'Supports Immunity', 'Aids Digestion', 'Natural Blend'],
    variants: [
      {
        id: '14-100g',
        label: '100g',
        measurement: { value: 100, unit: 'g' },
        pricing: { type: 'fixed', amount: 249 },
        inStock: true,
      },
      {
        id: '14-250g',
        label: '250g',
        measurement: { value: 250, unit: 'g' },
        pricing: { type: 'fixed', amount: 499 },
        inStock: true,
      },
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery),
  )
}

export function getAllProducts(): Product[] {
  return products
}
