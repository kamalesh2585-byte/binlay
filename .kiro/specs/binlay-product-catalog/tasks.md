# Implementation Plan: Binlay Product Catalog Update

## Overview

This implementation plan breaks down the product catalog update into discrete, sequential tasks. The approach starts with data layer foundation (types and database schema), moves through backend services and API implementation, then updates frontend components, integrates with the shopping cart, and finally performs the migration from mock to real products.

## Tasks

- [ ] 1. Define TypeScript Types and Database Models
  - Create TypeScript interfaces for Product, Variant, and related models
  - Define enum types for categories and pricing models
  - Define data transfer objects (DTOs) for create/update operations
  - Export types from a central types module for frontend and backend use
  - _Requirements: 1, 2, 6_

- [ ] 2. Set Up Database Schema for Products and Variants
  - Create `products` table with columns: id, name, description, category, basePrice, pricingModel, pricingUnit, imageUrl, createdAt, updatedAt
  - Create `variants` table with columns: id, productId, size, sizeInGrams, variantPrice, displayOrder
  - Create foreign key constraint from variants.productId to products.id
  - Create database indexes on products.category and products.pricingModel for query performance
  - Create unique constraint on (productId, size) to prevent duplicate variants per product
  - _Requirements: 1, 2_

- [ ] 3. Implement PricingEngine Service
  - Create `PricingEngine` class with method `calculateVariantPrice(product: Product, variant: Variant): number | null | string`
  - Implement logic to calculate FIXED_UNIT prices: convert sizeInGrams to appropriate unit (kg or 100ml), multiply by basePrice
  - Implement logic to return `null` for TBD pricing model
  - Implement logic to return `"REQUEST_QUOTE"` string for request-based pricing model
  - Create `getVariantDisplayPrice(product: Product, variant: Variant): string` method that formats prices with ₹ symbol and handles special cases
  - Add unit conversion helper functions (grams to kg, ml to 100ml units)
  - _Requirements: 3, 4, 10_

- [ ] 4. Implement ProductService with CRUD Operations
  - Create `ProductService` class with methods: getAllProducts(), getProductById(id), getProductsByCategory(category)
  - Implement `createProduct(data: CreateProductDTO): Promise<Product>` with validation
  - Implement `updateProduct(id: string, data: UpdateProductDTO): Promise<Product>` with validation
  - Implement `deleteProduct(id: string): Promise<void>` with cascade delete of variants
  - Implement `removeAllMockProducts(): Promise<number>` to delete all existing mock products
  - Add data validation: product must have name, category, pricingModel; variants must have non-empty size and sizeInGrams
  - _Requirements: 1, 2, 6, 7_

- [ ] 5. Create Product API Endpoints
  - Implement `GET /api/products` endpoint returning all products with variants
  - Add optional `category` query parameter to filter products by category
  - Implement `POST /api/products` admin endpoint to create single product
  - Implement `DELETE /api/products/:id` admin endpoint to delete single product
  - Add error handling and HTTP status codes (200, 201, 204, 400, 404, 500)
  - _Requirements: 1, 5_

- [ ] 6. Create Atomic Product Migration Endpoint
  - Implement `POST /api/products/migrate` admin endpoint
  - Body parameter: array of 14 product objects with all variants pre-populated
  - Logic: Begin transaction → Delete all existing products → Insert 14 new products with variants → Commit transaction
  - Return response with counts: { replacedCount: 8, addedCount: 14 }
  - Add error handling and rollback on failure
  - Ensure endpoint is protected (admin-only authentication)
  - _Requirements: 1, 7_

- [ ] 7. Add Caching Layer for Product Queries
  - Implement in-memory or Redis cache for getAllProducts() and getProductsByCategory()
  - Cache should be invalidated on product create, update, delete operations
  - Add 5-minute TTL to cache entries for automatic refresh
  - Ensure cache keys are unique per category or global
  - _Optimization for Requirements: 1, 5_

- [ ] 8. Update ProductCard Component to Display Variants
  - Modify existing ProductCard component to accept `product: Product` prop with variants array
  - Display product image, name, and category badge
  - Implement size range summary display (e.g., "500g - 5kg" or "Available in 3 sizes")
  - Add dynamic price display using PricingEngine: calculated price, "Price coming soon", or "Price on Request"
  - Add "View Details" or "Select Size" button that opens variant selector modal/expandable section
  - Ensure component is responsive for mobile (single column) and desktop (multiple columns)
  - _Requirements: 5, 8, 9_

- [ ] 9. Create VariantSelector Component
  - Create new VariantSelector component that displays all variants for a product
  - Render each variant as a selectable button/radio option showing size label and calculated price
  - Add quantity input field (number selector, default 1)
  - Implement "Add to Cart" button that's enabled only when variant is selected
  - On variant selection, update display to show total price (price × quantity)
  - Add visual feedback (highlight selected variant, show pricing summary)
  - Handle pricing display for TBD and request-quote products (disable add-to-cart or show contact CTA)
  - _Requirements: 2, 9, 10_

- [ ] 10. Create CategoryFilter Component
  - Create new CategoryFilter component displaying all 6 categories as selectable options
  - Add "All Products" option to clear current filter
  - Show visual indicator (highlight, checkbox, or selected state) for active category
  - Pass selected category to parent/ProductGrid via callback prop
  - _Requirements: 5_

- [ ] 11. Update ProductGrid Component for Category Filtering
  - Modify existing ProductGrid to accept `selectedCategory` prop
  - Filter products array by selectedCategory when prop is provided
  - Render updated ProductCard components with variant support
  - Show "No products found" message when filter returns empty results
  - Maintain responsive grid layout (1-2 columns mobile, 3-4 columns desktop)
  - _Requirements: 5, 8_

- [ ] 12. Update Shop Page to Include CategoryFilter
  - Import and render CategoryFilter component on shop page
  - Implement state management for selectedCategory (useState hook)
  - Pass selectedCategory to ProductGrid component
  - Add filter section UI with clear visual separation from product grid
  - _Requirements: 5_

- [ ] 13. Integrate Variant Selection with Shopping Cart
  - Modify cart data structure to store: productId, variantId (or variant size string), quantity, calculatedPrice
  - Update "Add to Cart" logic to accept product + variant combination
  - Recalculate price server-side when item is added (prevent client-side price manipulation)
  - Display selected variant size in cart item row (e.g., "Desiccated Coconut Powder - Low Fat 500g")
  - Show calculated price per item and line total in cart
  - _Requirements: 2, 3, 9_

- [ ] 14. Handle Request-Quote Products in Cart Flow
  - Identify products with pricingModel === REQUEST_QUOTE (Coconut Soap)
  - Prevent direct "Add to Cart" for request-quote products
  - Display "Price on Request" button that opens contact form/inquiry modal instead
  - Optionally allow adding to "wishlist" or "inquiry list" for request-quote items
  - Add CTA button: "Request Pricing Information" with form for customer to submit inquiry
  - _Requirements: 4, 10_

- [ ] 15. Handle TBD Pricing in Cart Flow
  - Identify products with pricingModel === TBD (Coconut Milk, Tender Coconut Water, etc.)
  - Display "Price coming soon" message
  - Disable "Add to Cart" button with tooltip explaining pricing not yet available
  - Show notification that customer can check back later for pricing
  - Alternatively, allow admin to set estimated price to enable early pre-orders
  - _Requirements: 10_

- [ ] 16. Create Database Seeder with 14 Products
  - Create seed script with hardcoded data for all 14 products and their variants
  - Include exact gram/ml measurements and ₹ pricing for each variant
  - Seeder should clear existing mock products before inserting real products
  - Seeder should be idempotent (safe to run multiple times)
  - Export seeder function for use in migration or manual data population
  - _Requirements: 1, 2, 6_

- [ ] 17. Unit Test PricingEngine Calculations
  - Write test cases for FIXED_UNIT pricing: verify price calculation for per-kg, per-100ml, and per-bottle models
  - Test case: 500g of ₹170/kg product should calculate to ₹85
  - Test case: 100ml of ₹150/100ml product should calculate to ₹150
  - Test case: 1L (1000ml) of ₹150/100ml product should calculate to ₹1500
  - Test case: TBD pricing model should return null
  - Test case: REQUEST_QUOTE pricing model should return "REQUEST_QUOTE" string
  - Test case: Display price formatting should include ₹ symbol and correct decimal places
  - _Requirements: 3, 4, 10_

- [ ] 18. Verify Category Assignment and Filtering
  - Create test or manual verification: all 14 products assigned to correct categories
  - Test category filter on shop page returns correct product subset for each category
  - Verify "All Products" filter displays all 14 products
  - Check that category badge displays correctly on ProductCard for each product
  - _Requirements: 5_

- [ ] 19. Test Variant Display and Selection
  - Test ProductCard displays correct variant summary for multi-variant products
  - Test VariantSelector shows all variants with correct sizes and prices
  - Test selecting different variants updates displayed price
  - Test quantity selector updates line total
  - Test "Add to Cart" button becomes enabled only after variant selection
  - Verify variant size and price display in cart after addition
  - _Requirements: 2, 8, 9_

- [ ] 20. Checkpoint - Ensure All Unit Tests Pass
  - Run test suite and verify all tests pass
  - Verify PricingEngine calculations are correct
  - Verify variant selection logic works correctly
  - Verify category filtering displays correct products
  - Ask the user if questions arise.

- [ ] 21. Perform Product Migration from Mock to Real
  - Call migration endpoint via admin interface or direct API call
  - Verify response indicates 8 products replaced and 14 products added
  - Confirm database contains exactly 14 products and zero mock products
  - Verify all products are queryable and correctly categorized
  - _Requirements: 1, 7_

- [ ] 22. Verify All Products Display Correctly on Frontend
  - Load shop page and verify 14 real products display (no mock products)
  - Load each category filter and verify correct products appear
  - Click on each product and verify variant selector shows all available sizes with correct pricing
  - Verify price calculations are correct for sample variants
  - Test adding products with different pricing models to cart
  - _Requirements: 1, 5, 8, 9_

- [ ] 23. Test Request-Quote Product Interaction
  - Navigate to Coconut Soap product (request-quote model)
  - Verify "Price on Request" displays instead of calculated price
  - Verify "Add to Cart" button is disabled or shows contact form
  - Verify customer can submit pricing inquiry
  - Test inquiry form submission and confirmation message
  - _Requirements: 4, 10_

- [ ] 24. Test TBD Pricing Products
  - Navigate to Coconut Milk product (TBD pricing model)
  - Verify "Price coming soon" message displays
  - Verify "Add to Cart" button is disabled with explanatory tooltip
  - Test other TBD products: Coconut Milk Powder, Tender Coconut Water, Coconut Vinegar, Coconut Body Oil
  - Verify consistent UX across all TBD products
  - _Requirements: 10_

- [ ] 25. Test Price Consistency Across Variants
  - For each FIXED_UNIT product, verify all variant prices are calculated correctly
  - Spot-check Virgin Coconut Oil (₹780/kg): 1L should be ₹702, 5L should be ₹3,510
  - Spot-check Baby Care Oil (₹180/100ml): 50ml should be ₹90, 500ml should be ₹900
  - Verify prices remain consistent when viewing from different pages (shop, category, product detail)
  - Verify prices are calculated server-side (no price variation based on client state)
  - _Requirements: 3_

- [ ] 26. Checkout - Ensure All Integration Tests Pass
  - Run full integration test suite
  - Verify end-to-end flows: browse → filter → select variant → add to cart → checkout
  - Test with different product types (FIXED_UNIT, TBD, REQUEST_QUOTE)
  - Verify cart calculations are correct
  - Ask the user if questions arise.

- [ ] 27. Performance Testing and Optimization
  - Measure product query performance (target: <100ms for getAllProducts)
  - Test category filtering performance with 14 products
  - Verify cache invalidation works correctly
  - Check that product images load efficiently
  - Monitor database query execution time for variant calculations
  - _Optimization for Requirements: 1, 5_

- [ ] 28. Verify Homepage and Other Category Pages Display Real Products
  - Check homepage product showcase displays real products (not mocks)
  - Verify category-specific pages (e.g., /category/food) display correct products
  - Verify product detail pages (/product/[id]) show variant selector and correct pricing
  - Verify product recommendations/carousel use real products
  - Check all product references throughout site show real products
  - _Requirements: 1, 7_

- [ ] 29. Final Checkpoint - Ensure All Tests Pass and Documentation Complete
  - Run full test suite (unit + integration)
  - Verify all 14 products display correctly across all pages
  - Verify pricing calculations are accurate for all products
  - Verify category filtering works on all pages
  - Verify variant selection works on all products
  - Confirm no mock products remain in database or caches
  - Document any deviations or edge cases discovered
  - Ask the user if questions arise.

## Notes

- All prices are in Indian Rupees (₹) as specified
- All measurements are exact in grams (g) or milliliters (ml) as specified
- VCO Softgel Capsules is the only product with a single fixed-price variant (no per-unit calculation needed)
- Virgin Coconut Oil and Filtered Coconut Oil use volume-to-weight conversion (1L ≈ 900ml = 900g equivalent)
- Tasks are ordered to build incrementally: data layer → backend → frontend components → integration → migration → testing
- Variant calculations should occur server-side to prevent price tampering
- Category filter is applied on frontend after initial data load for performance
- Product caching with TTL ensures fast queries while allowing admin updates
- All optional test tasks are marked with `*` and can be skipped for MVP

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2"] },
    { "id": 1, "tasks": ["3", "4"] },
    { "id": 2, "tasks": ["5", "6", "7"] },
    { "id": 3, "tasks": ["8", "10"] },
    { "id": 4, "tasks": ["9", "11"] },
    { "id": 5, "tasks": ["12", "13", "14", "15"] },
    { "id": 6, "tasks": ["16"] },
    { "id": 7, "tasks": ["17", "18", "19"] },
    { "id": 8, "tasks": ["20"] },
    { "id": 9, "tasks": ["21"] },
    { "id": 10, "tasks": ["22", "23", "24", "25"] },
    { "id": 11, "tasks": ["26"] },
    { "id": 12, "tasks": ["27", "28"] },
    { "id": 13, "tasks": ["29"] }
  ]
}
```
