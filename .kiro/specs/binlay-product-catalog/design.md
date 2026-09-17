# Design Document: Binlay Product Catalog Update

## Overview

This design document specifies the implementation approach for updating the Binlay product catalog with 14 real coconut products across 6 categories, supporting multiple pricing models (fixed unit-based, TBD, and request-based), and enabling variant selection for multi-size products.

## Architecture

### Data Layer

#### Product Model
```
Product {
  id: string (unique identifier)
  name: string
  description: string
  category: string (enum: Food, Beverages, Health Supplements, Baby Care, Hair Care, Skin Care)
  basePrice: number | null (in ₹, null if TBD or request-based)
  pricingModel: string (enum: FIXED_UNIT, TBD, REQUEST_QUOTE)
  pricingUnit: string (enum: per-kg, per-100ml, per-bottle, none) - only for FIXED_UNIT
  imageUrl: string
  variants: Variant[]
  createdAt: timestamp
  updatedAt: timestamp
}

Variant {
  id: string
  productId: string (foreign key)
  size: string (e.g., "500g", "1L", "250ml")
  sizeInGrams: number (normalized to grams for calculations)
  variantPrice: number | null (optional override for this specific size)
  displayOrder: number (for consistent ordering)
}
```

#### Data Storage
- Products table: stores product metadata and pricing configuration
- Variants table: stores all size options for each product
- Product-category mapping: normalized many-to-many relationship (currently 1-to-1 per spec, but extensible)

### Backend Layer

#### Product Service
```
ProductService {
  getAllProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product | null>
  getProductsByCategory(category: string): Promise<Product[]>
  createProduct(data: CreateProductDTO): Promise<Product>
  updateProduct(id: string, data: UpdateProductDTO): Promise<Product>
  deleteProduct(id: string): Promise<void>
  removeAllMockProducts(): Promise<number> // returns count deleted
}
```

#### Pricing Engine
```
PricingEngine {
  calculateVariantPrice(product: Product, variant: Variant): number | null | string {
    // Returns: calculated price, null (for TBD), or "REQUEST_QUOTE" string
    - If product.pricingModel === FIXED_UNIT:
      - Convert variant.sizeInGrams to kilograms (or 100ml units)
      - Multiply by product.basePrice
      - Return calculated number
    - If product.pricingModel === TBD:
      - Return null
    - If product.pricingModel === REQUEST_QUOTE:
      - Return special string "REQUEST_QUOTE"
  }
  
  getVariantDisplayPrice(product: Product, variant: Variant): string {
    // Returns formatted display string for UI
    const price = calculateVariantPrice(product, variant)
    if (price === null) return "Price coming soon"
    if (price === "REQUEST_QUOTE") return "Price on Request"
    return `₹${price.toFixed(2)}`
  }
}
```

### Frontend Components

#### ProductCard Component
```
ProductCard {
  props: {
    product: Product
    onSelect: (product: Product, variant: Variant) => void
  }
  
  displays:
    - Product image
    - Product name
    - Category badge
    - Size range summary (e.g., "500g - 5kg" or "Available in 3 sizes")
    - Price display (calculated, "Price coming soon", or "Price on Request")
    - "View Details" button (if variants exist)
    - Optional: Click to expand variant selector
}
```

#### VariantSelector Component
```
VariantSelector {
  props: {
    product: Product
    onSelect: (variant: Variant) => void
    onAddToCart: (product: Product, variant: Variant, quantity: number) => void
  }
  
  displays:
    - All available variants as selectable buttons/radio options
    - Each variant shows: size label + calculated price
    - Quantity selector (number input)
    - "Add to Cart" button (enabled only if variant selected)
    - Pricing summary updates dynamically as user interacts
}
```

#### CategoryFilter Component
```
CategoryFilter {
  props: {
    categories: string[]
    selectedCategory: string | null
    onSelectCategory: (category: string | null) => void
  }
  
  displays:
    - List of 6 categories (Food, Beverages, Health Supplements, Baby Care, Hair Care, Skin Care)
    - "All Products" option to clear filter
    - Visual indicator of selected category
}
```

#### ProductGrid Component
```
ProductGrid {
  props: {
    products: Product[]
    selectedCategory: string | null
    onProductSelect: (product: Product) => void
  }
  
  behavior:
    - Filters products by selected category when provided
    - Renders ProductCard for each product
    - Responsive grid layout (1-2 columns mobile, 3-4 desktop)
    - Shows loading state while fetching
    - Shows "No products found" message if filter returns empty
}
```

### API Endpoints

#### GET /api/products
```
Returns: Product[] (all products with variants populated)
Query params: category (optional, filter by category)
Response: 200 OK with array of products or empty array
```

#### POST /api/products (Admin only)
```
Body: CreateProductDTO
Returns: 201 Created with created Product object
```

#### DELETE /api/products/:id (Admin only)
```
Returns: 204 No Content on success
```

#### POST /api/products/migrate
```
Admin endpoint to replace mock products with real catalog
Body: { products: ProductDTO[] }
Returns: { replacedCount: number, addedCount: number }
Atomic operation: deletes all 8 mock products and inserts all 14 real products
```

## Product Catalog Definition

### Food & Beverages Category

#### 1. Desiccated Coconut Powder – Low Fat
- Category: Food
- Base Price: ₹170/kg
- Pricing Model: FIXED_UNIT
- Variants: 500g (₹85), 1kg (₹170), 5kg (₹850)

#### 2. Desiccated Coconut Powder – Full Fat
- Category: Food
- Base Price: ₹280/kg
- Pricing Model: FIXED_UNIT
- Variants: 500g (₹140), 1kg (₹280), 5kg (₹1,400)

#### 14. Coconut Vinegar
- Category: Food
- Base Price: TBD
- Pricing Model: TBD
- Variants: 250ml, 500ml, 1L

#### 3. Coconut Milk
- Category: Beverages
- Base Price: TBD
- Pricing Model: TBD
- Variants: 250ml, 500ml, 1L

#### 5. Coconut Milk Powder
- Category: Beverages
- Base Price: TBD
- Pricing Model: TBD
- Variants: 25g, 500g, 1kg

#### 7. Tender Coconut Water
- Category: Beverages
- Base Price: TBD
- Pricing Model: TBD
- Variants: 500ml, 1L

### Health Supplements Category

#### 4. Virgin Coconut Oil
- Category: Health Supplements
- Base Price: ₹780/kg
- Pricing Model: FIXED_UNIT
- Variants: 1L (≈900ml = ₹702), 5L (≈4.5L = ₹3,510), 10L (≈9L = ₹7,020)

#### 8. VCO Softgel Capsules – 500mg
- Category: Health Supplements
- Base Price: ₹384/bottle
- Pricing Model: FIXED_UNIT
- Pricing Unit: per-bottle
- Variants: 60 capsules (₹384) [single variant, fixed price]

### Baby Care Category

#### 9. Baby Care Coconut Oil
- Category: Baby Care
- Base Price: ₹180/100ml
- Pricing Model: FIXED_UNIT
- Pricing Unit: per-100ml
- Variants: 50ml (₹90), 100ml (₹180), 500ml (₹900)

### Hair Care Category

#### 10. Coconut Hair Oil
- Category: Hair Care
- Base Price: ₹150/100ml
- Pricing Model: FIXED_UNIT
- Pricing Unit: per-100ml
- Variants: 100ml (₹150), 500ml (₹750), 1L (₹1,500)

### Skin Care Category

#### 6. Filtered Coconut Oil
- Category: Skin Care
- Base Price: ₹420/kg
- Pricing Model: FIXED_UNIT
- Variants: 1L (≈900ml = ₹378), 5L (≈4.5L = ₹1,890), 10L (≈9L = ₹3,780)

#### 11. Coconut Skin Care Oil
- Category: Skin Care
- Base Price: ₹150/100ml
- Pricing Model: FIXED_UNIT
- Pricing Unit: per-100ml
- Variants: 50ml (₹75), 100ml (₹150), 500ml (₹750)

#### 12. Coconut Body Oil
- Category: Skin Care
- Base Price: TBD
- Pricing Model: TBD
- Variants: 100ml, 500ml

#### 13. Coconut Soap
- Category: Skin Care
- Base Price: N/A
- Pricing Model: REQUEST_QUOTE
- Variants: Natural bar (variable size, price on request)

## Implementation Strategy

### Phase 1: Data Layer Setup
1. Define TypeScript types for Product and Variant models
2. Create database schema for products and variants tables
3. Implement database seeders for the 14 products
4. Create indexes on category and pricing model for query performance

### Phase 2: Backend Services
1. Implement ProductService with CRUD operations
2. Implement PricingEngine with calculation logic
3. Create migration endpoint to replace 8 mock products with 14 real products
4. Add data validation and error handling

### Phase 3: API Layer
1. Create REST endpoints for product retrieval
2. Implement category filtering
3. Add admin endpoints for product management
4. Implement atomic migration operation

### Phase 4: Frontend Components
1. Update ProductCard to display variants and pricing
2. Create VariantSelector component with size selection
3. Implement CategoryFilter component
4. Update ProductGrid to use new components and filtering logic

### Phase 5: Cart Integration
1. Update cart to accept product + variant combinations
2. Display selected size and calculated price in cart
3. Prevent adding request-quote items without contact inquiry
4. Calculate order totals correctly with variant pricing

### Phase 6: Testing & Migration
1. Write unit tests for PricingEngine calculations
2. Test variant selector interactions
3. Run migration to replace mock products
4. Verify all 14 products display correctly across pages

## Key Design Decisions

1. **Variants as Related Records**: Variants are stored in a separate table rather than as nested JSON to enable indexing, filtering, and independent queries.

2. **Server-Side Price Calculation**: Price calculations happen server-side to prevent tampering and ensure consistency across all clients.

3. **Normalized Size Representation**: All sizes are converted to grams/ml internally for consistent calculations, regardless of display format (500g, 1L, etc.).

4. **Pricing Model Enum**: The pricing model is explicit (FIXED_UNIT, TBD, REQUEST_QUOTE) rather than nullable fields, making the business logic clearer and reducing ambiguous states.

5. **Atomic Migration**: The mock-to-real product migration is a single atomic operation to prevent partial states where old and new products coexist.

## Correctness Properties

The following properties ensure the catalog maintains data integrity and correct pricing:

### Property 1: Unit Price Consistency
**Statement**: For any product with FIXED_UNIT pricing, the calculated price for a variant must equal `basePrice × (variantSize / unitDivisor)` where unitDivisor is 1000 for per-kg, 100 for per-100ml, or 1 for per-bottle.

**Validates**: Requirement 3 (Fixed Pricing Model)

### Property 2: Pricing Model Isolation
**Statement**: A product can only have one pricing model active at a time. If pricingModel is FIXED_UNIT, basePrice must be a positive number. If pricingModel is TBD, basePrice must be null. If pricingModel is REQUEST_QUOTE, basePrice must be null and no prices should be calculated for variants.

**Validates**: Requirement 4 (Request-Based Pricing), Requirement 10 (Handle TBD and Request-Based Pricing)

### Property 3: Category Assignment
**Statement**: Every product must be assigned to exactly one of the 6 valid categories. Queries filtering by category should only return products assigned to that category.

**Validates**: Requirement 5 (Organize Products Across 6 Categories)

### Property 4: Variant Completeness
**Statement**: Every product must have at least one variant. Variants must have non-empty size strings and valid sizeInGrams values.

**Validates**: Requirement 2 (Support Product Variants)

### Property 5: Variant Ordering
**Statement**: When displaying variants, they must be ordered by sizeInGrams in ascending order (smallest to largest).

**Validates**: Requirement 2 (Support Product Variants), Requirement 8 (Display Products on Product Cards)

### Property 6: Product Count Invariant
**Statement**: After a successful migration, the catalog contains exactly 14 products and zero mock products. No query should return mock products.

**Validates**: Requirement 1 (Add 14 Real Products), Requirement 7 (Replace Mock Products)

### Property 7: Price Display Correctness
**Statement**: The display price shown to users matches the calculated price from PricingEngine. For FIXED_UNIT, display shows "₹X.XX". For TBD, display shows "Price coming soon". For REQUEST_QUOTE, display shows "Price on Request".

**Validates**: Requirement 3 (Fixed Pricing Model), Requirement 8 (Display Products on Product Cards), Requirement 10 (Handle TBD Pricing)

### Property 8: Cart Addition Restrictions
**Statement**: A product with pricingModel === REQUEST_QUOTE cannot be added to cart directly. A product with pricingModel === TBD can be added to cart only if an estimated price has been provided by admin.

**Validates**: Requirement 4 (Request-Based Pricing), Requirement 9 (Enable Size Selection)

## Performance Considerations

- Product queries should use caching (Redis) with invalidation on create/update/delete
- Category filter should be computed on the frontend after initial product load
- Variant calculations use simple arithmetic and should complete in <1ms
- Product images should use Next.js Image component for optimization
- Database indexes on category and pricingModel for filtering performance

