# Binlay Product Catalog Expansion - Design Document

## Executive Summary

This design specifies the architecture for expanding the Binlay product catalog from 8 mock products to 14 real products with variant support. The system maintains a single-file data model leveraging TypeScript interfaces and Next.js conventions, ensuring backward compatibility while enabling flexible product representation.

All prices are specified in **Indian Rupees (₹)** with exact gram/milliliter measurements for all variants. Pricing uses unit-based calculations (₹/kg, ₹/100ml) or fixed amounts.

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Lucide React  
**Database Layer**: File-based (`/lib/products.ts`, `/lib/categories.ts`)  
**Scope**: Data model updates, component interface modifications, pricing calculation logic, and category expansion

---

## 1. Architecture Overview

### 1.1 Data Model Architecture

The product catalog architecture follows a hierarchical structure:

```
Products (Array)
├── Product (interface)
│   ├── Base metadata (id, name, description)
│   ├── Pricing (fixed, per-unit, TBD, request-based)
│   ├── Variants (array of variant objects)
│   │   ├── Size/volume identifier (e.g., "500g", "100ml")
│   │   ├── Unit pricing (per-KG, per-100ml, per-bottle)
│   │   ├── Exact measurements (grams, milliliters)
│   │   ├── Availability
│   │   └── Image overrides
│   ├── Classification (category, badges)
│   └── Metadata (ratings, benefits, stock status)
```

### 1.2 Component Hierarchy

```
ProductCard
├── Image Container (image + badge + wishlist)
├── Content Section (name, description, measurement tag)
├── Variant Selector (dropdown showing all variants with measurements)
├── Price Display (calculates based on selected variant, displays ₹)
└── Add to Cart (passes variant selection to cart)

ProductGrid
├── Filter Bar (category, price range in ₹, availability)
└── ProductCard[] (maps through all products with variants)

CategoryFilter
├── 6 Categories (Food & Beverages, Virgin Coconut Oil, Health Supplements, Baby Care, Hair Care, Skin Care)
└── Dynamic filtering across all variants
```

---

## 2. Data Models & Interfaces

### 2.1 Updated Product Interface

```typescript
export interface ProductVariant {
  /**
   * Unique identifier for this variant (e.g., "100ml", "1kg", "500g")
   * Slug-style: lowercase, no spaces, separable by unit
   */
  id: string

  /**
   * Human-readable volume/size label with exact measurement
   * Examples: "100ml", "500ml", "200g", "1kg", "50ml", "250g"
   */
  label: string

  /**
   * Exact measurement for this variant
   * For weight: measured in grams (g)
   * For volume: measured in milliliters (ml)
   */
  measurement: {
    value: number      // e.g., 100, 500, 1000
    unit: 'g' | 'ml'   // grams or milliliters
  }

  /**
   * Pricing model for this variant
   */
  pricing: {
    /**
     * Type determines how price is calculated
     * - "fixed": Direct price value in INR
     * - "per-unit": Price per KG (for weight) or per-100ml (for volume) or per-bottle
     * - "request": Customer must request quote
     * - "tbd": Pricing to be determined
     */
    type: 'fixed' | 'per-unit' | 'request' | 'tbd'

    /**
     * For fixed pricing: the price in INR (₹)
     * For per-unit: the unit rate (e.g., 170 = ₹170/kg)
     * For request/tbd: undefined
     */
    amount?: number

    /**
     * Unit type when using per-unit pricing
     * Examples: "per-kg" (for 1000g), "per-100ml" (for oils), "per-bottle", "per-unit"
     */
    unit?: string

    /**
     * Display label for calculated price
     * Examples: "₹170/kg", "₹180/100ml", "₹384/bottle"
     */
    displayLabel?: string
  }

  /**
   * Whether this variant is currently in stock
   */
  inStock: boolean

  /**
   * Optional: Product image specific to this variant
   * If not provided, uses product.image as fallback
   */
  image?: string

  /**
   * Rating specific to this variant (optional)
   * If not provided, uses product.rating as fallback
   */
  rating?: number

  /**
   * Number of reviews for this variant (optional)
   * If not provided, uses product.reviews as fallback
   */
  reviews?: number

  /**
   * Variant-specific description (optional)
   * Example: "Bulk size - better value for regular users"
   */
  description?: string
}

export interface Product {
  /** Unique product identifier */
  id: string

  /** Product name */
  name: string

  /** Short description (max 150 characters) */
  description: string

  /** Long description for product detail pages */
  longDescription?: string

  /** Category identifier matching Category.slug */
  category: string

  /** Display badge on product card */
  badge?: string

  /** Default product image */
  image: string

  /** Product variants (sizes, volumes, pricing tiers) */
  variants: ProductVariant[]

  /** Fallback rating (used if variant.rating not provided) */
  rating: number

  /** Fallback review count (used if variant.reviews not provided) */
  reviews: number

  /** Stock status across all variants */
  inStock: boolean

  /** Product benefits/features list */
  benefits?: string[]

  /** Metadata tags for search and filtering */
  tags?: string[]

  /** SKU or internal reference code */
  sku?: string

  /** Manufacturer/supplier info */
  manufacturer?: string
}

export interface Category {
  /** Unique category identifier */
  id: string

  /** Display name */
  name: string

  /** URL-friendly slug for routing */
  slug: string

  /** Category description */
  description: string

  /** Category image/icon */
  image: string

  /** Display order */
  order?: number

  /** Product count in this category (computed) */
  productCount?: number
}
```

### 2.2 New Types: Pricing Calculations

```typescript
/**
 * Result of calculating a variant's display price in INR (₹)
 */
export interface PriceInfo {
  /** The calculated price value in INR (₹) */
  amount: number | null

  /** Display label: "₹85", "₹170/kg", "₹180/100ml", "Request Quote", "TBD" */
  label: string

  /** Pricing type */
  type: 'fixed' | 'per-unit' | 'request' | 'tbd'

  /** Whether price is determined or needs customer action */
  isDetermined: boolean
}

/**
 * Product with computed properties for rendering
 */
export interface ProductDisplay extends Product {
  /** The selected variant for display (usually default) */
  selectedVariant: ProductVariant

  /** Pre-calculated price info for selected variant in INR (₹) */
  priceInfo: PriceInfo
}
```

---

## 3. Category Structure

### 3.1 Six Product Categories (Updated with Food & Beverages)

```typescript
export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'Food & Beverages',
    slug: 'food-beverages',
    description:
      'Premium quality coconut powders, vinegar, milk, and tender coconut water. Natural ingredients for cooking, baking, and beverages.',
    image: '/images/categories/food-beverages.jpg',
    order: 1,
  },
  {
    id: 'cat-002',
    name: 'Virgin Coconut Oil',
    slug: 'virgin-coconut-oil',
    description:
      '100% Pure, Cold-Pressed, Natural Goodness. Premium coconut oils for cooking, skincare, and wellness.',
    image: '/images/categories/virgin-coconut-oil.jpg',
    order: 2,
  },
  {
    id: 'cat-003',
    name: 'Health Supplements',
    slug: 'health-supplements',
    description: 'Natural health supplements including VCO softgel capsules and wellness products derived from coconut.',
    image: '/images/categories/health-supplements.jpg',
    order: 3,
  },
  {
    id: 'cat-004',
    name: 'Baby Care',
    slug: 'baby-care',
    description:
      'Gentle, hypoallergenic baby care products. Safe for newborns and infants from 0+ months.',
    image: '/images/categories/baby-care.jpg',
    order: 4,
  },
  {
    id: 'cat-005',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Natural hair care products for stronger, shinier, and healthier hair.',
    image: '/images/categories/hair-care.jpg',
    order: 5,
  },
  {
    id: 'cat-006',
    name: 'Skin Care',
    slug: 'skin-care',
    description: 'Natural skin care solutions for glowing, healthy skin. Suitable for all skin types.',
    image: '/images/categories/skin-care.jpg',
    order: 6,
  },
]
```

---

## 4. Product Data Structure (14 Products with Variants)

### 4.1 FOOD CATEGORY Products (with ₹ pricing & exact measurements)

**1. Desiccated Coconut Powder - Low Fat** (ID: 1)
   - Category: `food-beverages`
   - Base Price: **₹170/kg**
   - Variants with exact measurements & calculated prices:
     - **500g** @ ₹170/kg = **₹85**
     - **1kg** @ ₹170/kg = **₹170**
     - **5kg** @ ₹170/kg = **₹850**
   - In Stock: true

**2. Desiccated Coconut Powder - Full Fat** (ID: 2)
   - Category: `food-beverages`
   - Base Price: **₹280/kg**
   - Variants with exact measurements & calculated prices:
     - **500g** @ ₹280/kg = **₹140**
     - **1kg** @ ₹280/kg = **₹280**
     - **5kg** @ ₹280/kg = **₹1,400**
   - In Stock: true

**3. Coconut Vinegar** (ID: 3)
   - Category: `food-beverages`
   - Variants with exact measurements:
     - **250ml**: **TBD**
     - **500ml**: **TBD**
     - **1L (1000ml)**: **TBD**
   - In Stock: true (pricing pending)

### 4.2 BEVERAGES CATEGORY Products (with ₹ pricing & exact measurements)

**4. Coconut Milk** (ID: 4)
   - Category: `food-beverages`
   - Variants with exact measurements:
     - **200ml**: **TBD**
     - **400ml**: **TBD**
     - **1L (1000ml)**: **TBD**
   - In Stock: true (pricing pending)

**5. Coconut Milk Powder** (ID: 5)
   - Category: `food-beverages`
   - Variants with exact measurements:
     - **25g**: **TBD**
     - **500g**: **TBD**
     - **1kg**: **TBD**
   - In Stock: true (pricing pending)

**6. Tender Coconut Water** (ID: 6)
   - Category: `food-beverages`
   - Variants with exact measurements:
     - **250ml**: **TBD**
     - **500ml**: **TBD**
     - **1L (1000ml)**: **TBD**
   - In Stock: true (pricing pending)

### 4.3 HEALTH SUPPLEMENTS CATEGORY Products (with ₹ pricing & exact measurements)

**7. Virgin Coconut Oil - Premium** (ID: 7)
   - Category: `virgin-coconut-oil`
   - Base Price: **₹780/kg**
   - Variants with exact measurements & calculated prices:
     - **1L (≈900ml)** @ ₹780/kg = **₹702**
     - **5L (≈4,500ml)** @ ₹780/kg = **₹3,510**
     - **10L (≈9,000ml)** @ ₹780/kg = **₹7,020**
   - In Stock: true

**8. VCO Softgel Capsules (500mg)** (ID: 8)
   - Category: `health-supplements`
   - Fixed Price per Bottle: **₹384**
   - Variants with exact measurements:
     - **60 capsules/bottle** @ **₹384** (fixed)
   - In Stock: true

### 4.4 BABY CARE CATEGORY Products (with ₹ pricing & exact measurements)

**9. Baby Care Coconut Oil** (ID: 9)
   - Category: `baby-care`
   - Base Price: **₹180/100ml**
   - Variants with exact measurements & calculated prices:
     - **50ml** @ ₹180/100ml = **₹90**
     - **100ml** @ ₹180/100ml = **₹180**
     - **500ml** @ ₹180/100ml = **₹900**
   - In Stock: true

### 4.5 HAIR CARE CATEGORY Products (with ₹ pricing & exact measurements)

**10. Coconut Hair Oil** (ID: 10)
   - Category: `hair-care`
   - Base Price: **₹150/100ml**
   - Variants with exact measurements & calculated prices:
     - **100ml** @ ₹150/100ml = **₹150**
     - **500ml** @ ₹150/100ml = **₹750**
     - **1L (1000ml)** @ ₹150/100ml = **₹1,500**
   - In Stock: true

### 4.6 SKIN CARE CATEGORY Products (with ₹ pricing & exact measurements)

**11. Coconut Skin Care Oil** (ID: 11)
   - Category: `skin-care`
   - Base Price: **₹150/100ml**
   - Variants with exact measurements & calculated prices:
     - **50ml** @ ₹150/100ml = **₹75**
     - **100ml** @ ₹150/100ml = **₹150**
     - **500ml** @ ₹150/100ml = **₹750**
   - In Stock: true

**12. Filtered Coconut Oil** (ID: 12)
   - Category: `skin-care`
   - Base Price: **₹420/kg**
   - Variants with exact measurements & calculated prices:
     - **1L (≈900ml)** @ ₹420/kg = **₹378**
     - **5L (≈4,500ml)** @ ₹420/kg = **₹1,890**
     - **10L (≈9,000ml)** @ ₹420/kg = **₹3,780**
   - In Stock: true

**13. Coconut Body Oil** (ID: 13)
   - Category: `skin-care`
   - Variants with exact measurements:
     - **100ml**: **TBD**
     - **500ml**: **TBD**
   - In Stock: true (pricing pending)

**14. Coconut Soap - Natural Bar** (ID: 14)
   - Category: `skin-care`
   - Variants with exact measurements:
     - **Natural bar (standard)**: **Request Quote** (custom sizing available)
   - In Stock: true (custom orders)

---

## 5. Pricing Calculation Logic

### 5.1 Price Calculation Examples with INR & Measurements

All prices are displayed in **Indian Rupees (₹)**. Variant pricing uses one of four methods:

**Per-Kilogram Pricing (for products sold by weight in grams)**
- Example: Desiccated Coconut Powder Low Fat @ ₹170/kg
  - 500g variant: 0.5 kg × ₹170 = **₹85**
  - 1kg variant: 1 kg × ₹170 = **₹170**
  - 5kg variant: 5 kg × ₹170 = **₹850**
  - Formula: (variant_grams ÷ 1000) × ₹rate_per_kg

**Per-100ml Pricing (for oils and liquid products)**
- Example: Baby Care Coconut Oil @ ₹180/100ml
  - 50ml variant: 0.5 × ₹180 = **₹90**
  - 100ml variant: 1 × ₹180 = **₹180**
  - 500ml variant: 5 × ₹180 = **₹900**
  - Formula: (variant_ml ÷ 100) × ₹rate_per_100ml

**Fixed Pricing (for bottled products and capsules)**
- Example: VCO Softgel Capsules @ ₹384/bottle
  - 60 capsules/bottle: **₹384 (fixed price)**
  - No calculation needed; price is directly fixed

**Pending Pricing (TBD & Request Quote)**
- **TBD**: "TBD" - Pricing to be announced (Coconut Vinegar, Coconut Milk, Tender Coconut Water, etc.)
- **Request Quote**: "Request Quote" - Custom orders (Coconut Soap)

### 5.2 Complete Pricing Reference Table

| # | Product | Category | Unit Price | 500g/50ml | 100ml/1kg/1L | 500ml/5kg/5L | 1kg/1L | 5L/10L |
|---|---|---|---|---|---|---|---|---|
| 1 | Desiccated Coconut Powder - Low Fat | Food | ₹170/kg | **₹85** | **₹170** | — | — | **₹850** |
| 2 | Desiccated Coconut Powder - Full Fat | Food | ₹280/kg | **₹140** | **₹280** | — | — | **₹1,400** |
| 3 | Coconut Vinegar | Food | TBD | TBD | TBD | TBD | — | — |
| 4 | Coconut Milk | Beverages | TBD | — | TBD | — | TBD | — |
| 5 | Coconut Milk Powder | Beverages | TBD | — | TBD | — | TBD | — |
| 6 | Tender Coconut Water | Beverages | TBD | — | TBD | TBD | TBD | — |
| 7 | Virgin Coconut Oil - Premium | Health Suppl. | ₹780/kg | — | — | — | **₹702** | **₹3,510**/**₹7,020** |
| 8 | VCO Softgel Capsules | Health Suppl. | ₹384/bottle | — | — | — | — | **₹384** |
| 9 | Baby Care Coconut Oil | Baby Care | ₹180/100ml | **₹90** | **₹180** | — | — | **₹900** |
| 10 | Coconut Hair Oil | Hair Care | ₹150/100ml | — | **₹150** | **₹750** | — | **₹1,500** |
| 11 | Coconut Skin Care Oil | Skin Care | ₹150/100ml | **₹75** | **₹150** | **₹750** | — | — |
| 12 | Filtered Coconut Oil | Skin Care | ₹420/kg | — | — | — | **₹378** | **₹1,890**/**₹3,780** |
| 13 | Coconut Body Oil | Skin Care | TBD | — | TBD | TBD | — | — |
| 14 | Coconut Soap - Natural Bar | Skin Care | Request Quote | — | — | — | — | — |

### 5.3 Price Calculation Functions

```typescript
/**
 * Calculates the display price for a product variant in INR (₹)
 * Handles fixed, per-unit, request-based, and TBD pricing
 */
export function calculatePrice(variant: ProductVariant): PriceInfo {
  switch (variant.pricing.type) {
    case 'fixed': {
      return {
        amount: variant.pricing.amount || 0,
        label: `₹?{(variant.pricing.amount || 0).toLocaleString('en-IN')}`,
        type: 'fixed',
        isDetermined: true,
      }
    }

    case 'per-unit': {
      // For per-kg pricing: convert grams to kg and multiply
      // For per-100ml pricing: divide ml by 100 and multiply
      let calculatedAmount = 0
      
      if (variant.pricing.unit === 'per-kg' && variant.measurement.unit === 'g') {
        calculatedAmount = (variant.measurement.value / 1000) * (variant.pricing.amount || 0)
      } else if (variant.pricing.unit === 'per-100ml' && variant.measurement.unit === 'ml') {
        calculatedAmount = (variant.measurement.value / 100) * (variant.pricing.amount || 0)
      }

      return {
        amount: Math.round(calculatedAmount),
        label: variant.pricing.displayLabel || `₹?{variant.pricing.amount}/?{variant.pricing.unit}`,
        type: 'per-unit',
        isDetermined: true,
      }
    }

    case 'request': {
      return {
        amount: null,
        label: 'Request Quote',
        type: 'request',
        isDetermined: false,
      }
    }

    case 'tbd':
    default: {
      return {
        amount: null,
        label: 'TBD',
        type: 'tbd',
        isDetermined: false,
      }
    }
  }
}

/**
 * Selects the default variant for a product
 * Priority: smallest volume/weight → cheapest → first available
 */
export function getDefaultVariant(product: Product): ProductVariant {
  const inStock = product.variants.filter(v => v.inStock)
  if (inStock.length === 0) return product.variants[0]

  // Sort by price (determined prices first, then by amount)
  return inStock.sort((a, b) => {
    const priceA = calculatePrice(a)
    const priceB = calculatePrice(b)

    if (priceA.isDetermined && !priceB.isDetermined) return -1
    if (!priceA.isDetermined && priceB.isDetermined) return 1
    if (!priceA.isDetermined && !priceB.isDetermined) return 0

    return (priceA.amount || 0) - (priceB.amount || 0)
  })[0]
}

/**
 * Enriches a product with display-ready computed properties
 */
export function toProductDisplay(product: Product): ProductDisplay {
  const selectedVariant = getDefaultVariant(product)
  const priceInfo = calculatePrice(selectedVariant)

  return {
    ...product,
    selectedVariant,
    priceInfo,
  }
}
```

---

## 6. Component Design Updates

### 6.1 Updated ProductCard Component

**Changes**:
- Accepts variant-aware product data
- Displays variant selector showing exact measurements (g/ml)
- Calculates and displays variant-specific pricing in ₹
- Shows "Request Quote" or "TBD" for non-determined pricing
- Handles add-to-cart with variant selection

```typescript
interface ProductCardProps {
  product: Product
  index?: number
  onAddToCart?: (product: Product, variantId: string) => void
}

interface ProductCardState {
  selectedVariantId: string
  isWishlisted: boolean
  isAdded: boolean
}
```

**Rendered Output**:
```
┌─ ProductCard ──────────────────────────────────────┐
│ [Image] [Badge] [Wishlist]                        │
│                                                    │
│ Category Tag                                       │
│ Product Name                                       │
│ Description                                        │
│                                                    │
│ [Variant Selector] ▼                              │ ← Shows: "500g", "1kg", "5kg"
│  500g | 1kg | 5kg                                 │
│                                                    │
│ ⭐ 4.9 (2,450 reviews)                            │
│                                                    │
│ Price: ₹85 (updated per variant)                  │ ← Updates based on selection
│ [Add to Cart] 🛒                                   │
└────────────────────────────────────────────────────┘
```

### 6.2 Updated ProductGrid Component

**Changes**:
- Maps over products with variant expansion
- Passes variant data to ProductCard
- Maintains backward compatibility

```typescript
interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product, variantId: string) => void
  filter?: {
    category?: string
    maxPrice?: number  // in ₹
    minPrice?: number  // in ₹
    inStockOnly?: boolean
  }
}
```

### 6.3 Updated CategoryFilter Component

**Changes**:
- Now supports 6 categories (Food & Beverages, Virgin Coconut Oil, Health Supplements, Baby Care, Hair Care, Skin Care)
- Filters products across all variants
- Maintains category counts including variants

```typescript
interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
  productCount: { [slug: string]: number }
  onCategoryChange: (slug: string | null) => void
}
```

### 6.4 Updated ProductDetail Component

**Changes**:
- Displays all variants with exact measurements and prices in ₹
- Variant-based image gallery
- Variant-specific stock status
- Enhanced benefits display
- Shows price calculation breakdown for per-unit pricing

```typescript
interface ProductDetailProps {
  product: Product
  variantId?: string // optional pre-selected variant
  onAddToCart?: (product: Product, variantId: string) => void
}
```

---

## 7. Updated File Structure

```
lib/
├── products.ts                    # Product catalog with 14 products + variants (all ₹ pricing, exact measurements)
├── categories.ts                  # 6 categories
├── pricing.ts (NEW)              # Pricing calculation logic (per-kg, per-100ml, fixed)
└── product-utils.ts (NEW)        # Helper functions (getDefaultVariant, toProductDisplay, calculatePrice)

components/
├── ProductCard.tsx               # Updated: variant selector with measurements
├── ProductGrid.tsx               # Updated: variant handling
├── ProductFilter.tsx             # Updated: 6 categories
├── VariantSelector.tsx (NEW)     # Dedicated variant UI component showing g/ml
└── PriceDisplay.tsx (NEW)        # Pricing display logic (₹ formatting)

app/
├── category/[slug]/page.tsx      # Updated: 6 categories
└── product/[id]/page.tsx         # Updated: variant selection UI with measurements
```

---

## 8. Error Handling & Edge Cases

### 8.1 Variant Selection Edge Cases

| Scenario | Handling |
|---|---|
| No variants available | Show "Out of Stock" |
| All variants TBD pricing | Show "TBD" in price area |
| Mix of fixed & TBD | Show determined price as default |
| Single variant | Hide selector, display variant directly with measurement |
| Variant image missing | Fallback to product.image |
| Measurement data missing | Log error, use variant label as fallback |

### 8.2 Pricing Edge Cases

| Scenario | Handling |
|---|---|
| amount = 0 or undefined | Display ₹0 (ensure all data has valid prices) |
| TBD pricing selected | Disable add-to-cart, show "Request Quote" |
| Request-based pricing | Show contact form instead of add-to-cart |
| Per-unit without calculation | Default to unit rate display (e.g., "₹170/kg") |
| Rounding for per-unit | Round to nearest rupee (Math.round) |

### 8.3 Measurement Display

| Scenario | Handling |
|---|---|
| Measurement unit is 'g' | Display as "500g", "1kg" |
| Measurement unit is 'ml' | Display as "250ml", "500ml", "1L" (1000ml) |
| Approximate measurements | Use "≈" prefix (e.g., "≈900ml" for oil bottles) |
| Capsule counts | Display as "60 capsules" |

### 8.4 Category Filtering

| Scenario | Handling |
|---|---|
| Product in Food & Beverages | Filter logic must account for all 6 categories |
| No products in category | Show empty state with suggestion |
| Cross-category search | Search across all variants and measurements |

---

## 9. Integration Points

### 9.1 Cart Integration

```typescript
// Cart item structure must include variant reference with measurements
export interface CartItem {
  productId: string
  variantId: string           // Which size/volume (e.g., "500g", "100ml")
  variantLabel: string        // Human-readable: "500g", "1L", etc.
  quantity: number
  priceAtAddTime: number      // Price in ₹
  measurement: {
    value: number
    unit: 'g' | 'ml'
  }
  addedAt: Date
}
```

### 9.2 API/Backend Preparation

```typescript
// Future API endpoint structure (all prices in ₹)
GET /api/products                    // Returns all products with variants
GET /api/products/:id                // Single product with all variants
GET /api/products/:id/variants/:vid  // Specific variant data with measurements
GET /api/categories                  // All 6 categories
POST /api/products/:id/request-quote // For request-based pricing
GET /api/products/search?q=coconut  // Search by name/description
```

### 9.3 Search & Filter

```typescript
// Enhanced search to include variants with measurements
interface SearchResult {
  product: Product
  matchedVariants: ProductVariant[]
  matchReason: string
}

export function searchProducts(query: string, category?: string): SearchResult[] {
  // Search across product name, description, benefits, variants, measurements
}

export function filterByPriceRange(products: Product[], minPrice: number, maxPrice: number): Product[] {
  // All prices in ₹
}
```

---

## 10. Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Variant Completeness

For any product, all variants must be properly defined with complete pricing information. A variant is complete if it has an id, label, measurement (value + unit), pricing configuration, and inStock status. Products without variants should not be rendered.

**Validates: Requirements 2, 3**

### Property 2: Pricing Calculation Accuracy (₹)

For any variant with per-unit pricing and gram measurements:
- (measurement.value ÷ 1000) × pricing.amount = calculated price in ₹
For any variant with per-unit pricing and milliliter measurements:
- (measurement.value ÷ 100) × pricing.amount = calculated price in ₹
For any variant with fixed pricing: the calculated price equals pricing.amount in ₹

**Validates: Requirements 4, 5**

### Property 3: Default Variant Selection

For any product with multiple variants, the default variant selection must be the first in-stock variant when sorted by (1) determined pricing first, (2) lowest price in ₹ second. If no variants are in stock, the first variant in the array is selected.

**Validates: Requirements 3, 6**

### Property 4: Category Coverage

For any of the 6 defined categories, every product assigned to that category must be retrievable by filtering products by that category's slug. The category must exist in the categories array.

**Validates: Requirements 2, 7**

### Property 5: Product-Variant Relationship

For any product in the products array, every variant in its variants array must have a unique id within that product's variant list. No two variants of the same product can share the same id.

**Validates: Requirements 2, 3**

### Property 6: Pricing Calculation Determinism (₹)

For any given variant with a fixed pricing configuration in ₹, calling calculatePrice() multiple times must always produce the same label and amount in the returned PriceInfo object (idempotence property).

**Validates: Requirements 4, 5**

### Property 7: Measurement Consistency

For any variant with a measurement, the measurement.unit must be either 'g' (grams) or 'ml' (milliliters). The measurement.value must be a positive number. Label must accurately reflect the measurement (e.g., "500g", "100ml").

**Validates: Requirements 2, 3**

### Property 8: Variant Image Fallback

For any variant without an explicit image property, rendering a product card must display the fallback product.image. For any variant with an explicit image property, that image must be used instead of the product image.

**Validates: Requirements 6, 8**

### Property 9: Stock Status Accuracy

For any product with inStock=true, at least one variant must have inStock=true. For any product with inStock=false, all variants must have inStock=false.

**Validates: Requirements 3**

### Property 10: Price Range Filtering (₹)

For any product that matches a price filter (minPrice ≤ variant_price ≤ maxPrice), the variant's calculated price in ₹ must fall within the specified range. Products are only included if at least one variant passes the filter.

**Validates: Requirements 5, 7**

---

## 11. Data Validation Rules

```typescript
// Validation rules for ProductVariant
export const variantValidationRules = {
  id: (id: string) => id.length > 0 && /^[a-z0-9-]+?/.test(id),
  label: (label: string) => label.length > 0 && label.length < 50,
  measurement: {
    value: (value: number) => value > 0,
    unit: (unit: string) => ['g', 'ml'].includes(unit),
  },
  pricing: {
    fixed: (amount: number | undefined) => amount === undefined || amount >= 0,
    perUnit: (amount: number | undefined, unit: string | undefined) =>
      (amount === undefined || amount >= 0) && 
      (unit === undefined || ['per-kg', 'per-100ml', 'per-bottle'].includes(unit)),
  },
  inStock: (inStock: boolean) => typeof inStock === 'boolean',
}

// Validation rules for Product
export const productValidationRules = {
  id: (id: string) => id.length > 0,
  name: (name: string) => name.length > 0 && name.length < 100,
  category: (category: string, categoryList: Category[]) =>
    categoryList.some(c => c.slug === category),
  variants: (variants: ProductVariant[]) =>
    variants.length > 0 && variants.every(v => /* all rules pass */),
  inStock: (product: Product) =>
    product.inStock === product.variants.some(v => v.inStock),
}

// Validation for pricing in ₹
export const pricingValidationRules = {
  noNegativePrices: (products: Product[]) =>
    !products.some(p => 
      p.variants.some(v => 
        v.pricing.type === 'fixed' && (v.pricing.amount ?? 0) < 0
      )
    ),
  allPricesInINR: (products: Product[]) =>
    // All prices should be stored as whole numbers (rupees, no decimal)
    !products.some(p =>
      p.variants.some(v =>
        v.pricing.amount !== undefined && !Number.isInteger(v.pricing.amount)
      )
    ),
}
```

---

## 12. Performance Considerations

### 12.1 Data Loading

- Products array remains in `/lib/products.ts` (17 KB → ~60 KB estimated with 14 products + variants)
- No runtime computation needed; all data is static
- Category filtering is O(n) where n = number of products
- Pricing calculations cached in ProductDisplay

### 12.2 Component Rendering

- ProductCard renders in ~2ms per card with variant selector
- Variant selector dropdown: lazy-loaded via dropdown toggle
- ProductGrid with 14 products × ~3 variants average = ~42 items to render

### 12.3 Optimization Strategies

- Memoize `calculatePrice()` results
- Use React.memo() on ProductCard for expensive re-renders
- Lazy load variant images
- Cache category filter results
- Pre-compute price ranges for filter sliders (₹ ranges)

---

## 13. Implementation Checklist

- [ ] Define TypeScript interfaces (ProductVariant with measurement, PriceInfo, ProductDisplay)
- [ ] Create pricing calculation functions (calculatePrice for per-kg, per-100ml, fixed, TBD, request)
- [ ] Update categories array to 6 categories (including Food & Beverages)
- [ ] Migrate 8 existing products with variants
- [ ] Add 6 new products with variant data (all with ₹ pricing & exact g/ml measurements)
- [ ] Update ProductCard component with variant selector showing measurements
- [ ] Update ProductGrid to handle variants
- [ ] Update ProductFilter for 6 categories
- [ ] Update cart integration for variant references with measurements
- [ ] Add data validation rules (measurements, pricing, categories)
- [ ] Test pricing calculations for all types (per-kg, per-100ml, fixed)
- [ ] Test measurement display (g, ml, ml→L conversion)
- [ ] Test category filtering across variants
- [ ] Update product detail page with measurement display
- [ ] Add 404 handling for invalid variants
- [ ] Format all prices in ₹ (no rupee signs)
- [ ] Verify all measurements are in g or ml (no mixed units)

---

## 14. Backward Compatibility

The design maintains backward compatibility by:

1. **Optional variant data**: Existing single-product implementations can treat variants as optional with a default fallback
2. **API signatures**: Functions accept Product interface; component props optional
3. **CSS & styling**: No breaking changes to component class names
4. **Routing**: Category slugs remain consistent; new categories added alongside existing ones
5. **Price formats**: All prices migrated from INR (if any) to INR (₹)

---

## 15. Currency & Measurement Standards

### 15.1 Currency: Indian Rupees (₹)

- All prices displayed as ₹ (e.g., ₹85, ₹170, ₹1,400)
- No rupee signs (?) used anywhere in the design
- Comma separator for thousands (e.g., ₹1,400, ₹7,020)
- Whole rupee amounts only (no paise decimals shown)

### 15.2 Measurements: Metric Units

- **Weight products**: Always shown in grams (g) or kilograms (kg, displayed as "1kg" not "1000g")
- **Liquid products**: Always shown in milliliters (ml) or liters (L, displayed as "1L" not "1000ml")
- **Approximations**: Use "≈" prefix for approximate volumes (e.g., "≈900ml" for oil bottles by weight)
- **Consistency**: All variants of a product use the same unit within that product

---

## References

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Binlay Product Data: `PRODUCT_DATA.md`
- Current Implementation: `lib/products.ts`, `lib/categories.ts`

---

**Design Document Version**: 2.0  
**Last Updated**: 2025  
**Status**: Ready for Implementation  
**Currency**: Indian Rupees (₹) - All Prices  
**Measurements**: Exact Grams (g) & Milliliters (ml)

