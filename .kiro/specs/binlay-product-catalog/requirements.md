# Requirements Document: Binlay Product Catalog Update

## Introduction

This feature updates the Binlay website's product catalog by replacing 8 mock products with 14 real coconut-based products organized across 6 categories. Each product entry supports multiple size variants in a single database record. The catalog includes food products, beverages, health supplements, baby care items, hair care, and skin care products. Pricing is based on per-kilogram or per-bottle rates, with one product ("Coconut Soap") using a request-based pricing model.

## Glossary

- **Product**: A single item in the catalog with a unique identifier, name, category, and base pricing.
- **Variant**: A size option for a product (e.g., 500g, 1L, 5L) with optional variant-specific pricing.
- **Category**: A classification grouping products (Food, Beverages, Health Supplements, Baby Care, Hair Care, Skin Care).
- **Base Price**: The reference price per unit (per kilogram or per bottle).
- **Pricing Model**: Either fixed pricing based on unit rate, or request-based pricing for special items.
- **Product Card**: The UI component displaying product information (name, category, image, pricing).
- **Catalog System**: The backend and frontend components managing product data retrieval and display.

## Requirements

### Requirement 1: Add 14 Real Products to Catalog

**User Story:** As a website administrator, I want to populate the catalog with 14 real coconut products, so that customers see accurate, available items.

#### Acceptance Criteria

1. THE Catalog System SHALL store exactly 14 products with verified names, categories, and pricing data.
2. WHEN a product is added to the database, THE Product Manager SHALL ensure each product has a unique identifier, name, description, category, and base pricing.
3. WHERE a product has multiple size variants, THE Catalog System SHALL store variants within a single product record, not as separate product entries.
4. WHEN displaying products on the frontend, THE Product Card SHALL show the product name, category, and the range of available sizes.
5. THE Catalog System SHALL support the following product categories: Food, Beverages, Health Supplements, Baby Care, Hair Care, and Skin Care.

### Requirement 2: Support Product Variants for Multi-Size Items

**User Story:** As a customer, I want to select from multiple size options for products, so that I can purchase the quantity that best fits my needs.

#### Acceptance Criteria

1. WHEN a product has multiple size variants, THE Catalog System SHALL store all variants within a single product record.
2. THE Product Card SHALL display all available sizes for the product when variant options exist.
3. WHEN a customer views a product with variants, THE Product Display SHALL show each size option (e.g., 500g, 1kg, 5kg) for products like Desiccated Coconut Powder variants.
4. WHEN a variant is selected, THE Shopping Cart SHALL record both the product identifier and the selected variant size.
5. THE Catalog System SHALL allow up to 10 size variants per product without performance degradation.

### Requirement 3: Implement Fixed Pricing Model for Unit-Based Products

**User Story:** As a customer, I want to know the exact price for different sizes, so that I can compare costs and make informed purchasing decisions.

#### Acceptance Criteria

1. WHEN a product uses fixed pricing, THE Catalog System SHALL calculate the price based on the base price per unit (kilogram or bottle) multiplied by the variant size.
2. THE Product Card SHALL display the calculated price for each variant size (e.g., 170/KG results in 85₹ for 500g).
3. THE Pricing Engine SHALL support pricing in Indian Rupees (₹).
4. WHEN a customer selects a variant, THE Shopping Cart SHALL display the calculated total price for that selection.
5. THE Catalog System SHALL include base pricing for the following fixed-price products:
   - Desiccated Coconut Powder – Low Fat: 170/KG
   - Desiccated Coconut Powder – Full Fat: 280/KG
   - Virgin Coconut Oil: 780/KG
   - Filtered Coconut Oil: 420/KG
   - VCO Softgel Capsules: 384/BOTTLE
   - Baby Care Coconut Oil: 180/100ML
   - Coconut Hair Oil: 150/100ML
   - Coconut Skin Care Oil: 150/100ML

### Requirement 4: Support Request-Based Pricing for Special Products

**User Story:** As an administrator, I want to mark specific products with "Price on Request," so that customers know to contact us for pricing on special items.

#### Acceptance Criteria

1. WHERE a product uses request-based pricing, THE Product Card SHALL display "Price on Request" instead of a calculated price.
2. WHEN "Price on Request" is displayed, THE Product Page SHALL include a contact form or call-to-action button for customers to request pricing.
3. THE Catalog System SHALL flag the Coconut Soap product with request-based pricing enabled.
4. WHEN a customer attempts to add a request-based product to the cart, THE Shopping Cart SHALL require the customer to submit a pricing inquiry before proceeding.

### Requirement 5: Organize Products Across 6 Categories

**User Story:** As a customer, I want to browse products by category, so that I can quickly find the type of item I'm looking for.

#### Acceptance Criteria

1. THE Catalog System SHALL organize all 14 products into exactly 6 categories: Food, Beverages, Health Supplements, Baby Care, Hair Care, and Skin Care.
2. WHEN the product listing page loads, THE Category Filter SHALL display all 6 categories as selectable options.
3. WHEN a customer selects a category, THE Product Grid SHALL display only products assigned to that category.
4. THE Catalog System SHALL assign products to categories as follows:
   - **Food**: Desiccated Coconut Powder – Low Fat, Desiccated Coconut Powder – Full Fat, Coconut Vinegar
   - **Beverages**: Coconut Milk, Coconut Milk Powder, Tender Coconut Water
   - **Health Supplements**: VCO Softgel Capsules – 500mg, Virgin Coconut Oil
   - **Baby Care**: Baby Care Coconut Oil
   - **Hair Care**: Coconut Hair Oil
   - **Skin Care**: Coconut Skin Care Oil, Coconut Body Oil, Coconut Soap, Filtered Coconut Oil
5. THE Product Card SHALL display the category name as a badge or label below the product image.

### Requirement 6: Define Product Details for All 14 Items

**User Story:** As an administrator, I want a complete product database with accurate details, so that customers have reliable information for purchasing decisions.

#### Acceptance Criteria

1. THE Catalog System SHALL store the following product information for each of the 14 items:

   **Food Category:**
   - Product 1: Desiccated Coconut Powder – Low Fat | 170/KG | Sizes: 500g, 1kg, 5kg
   - Product 2: Desiccated Coconut Powder – Full Fat | 280/KG | Sizes: 500g, 1kg, 5kg
   - Product 14: Coconut Vinegar | Pricing: TBD | Sizes: 250ml, 500ml, 1L

   **Beverages Category:**
   - Product 3: Coconut Milk | Pricing: TBD | Sizes: 250ml, 500ml, 1L
   - Product 5: Coconut Milk Powder | Pricing: TBD | Sizes: 25g, 500g, 1kg
   - Product 7: Tender Coconut Water | Pricing: TBD | Sizes: 500ml, 1L

   **Health Supplements Category:**
   - Product 4: Virgin Coconut Oil | 780/KG | Sizes: 1L, 5L, 10L
   - Product 8: VCO Softgel Capsules – 500mg | 384/BOTTLE | Format: 60 capsules per bottle (single variant)

   **Baby Care Category:**
   - Product 9: Baby Care Coconut Oil | 180/100ML | Sizes: 50ml, 100ml, 500ml

   **Hair Care Category:**
   - Product 10: Coconut Hair Oil | 150/100ML | Sizes: 500ml, 1L, 2L

   **Skin Care Category:**
   - Product 6: Filtered Coconut Oil | 420/KG | Sizes: 1L, 5L, 10L
   - Product 11: Coconut Skin Care Oil | 150/100ML | Sizes: 50ml, 100ml, 500ml
   - Product 12: Coconut Body Oil | Pricing: TBD | Sizes: 100ml, 500ml
   - Product 13: Coconut Soap | Pricing: Request-Based | Sizes: (to be determined)

2. WHEN product data is initially loaded, THE Catalog System SHALL validate that all required fields (name, category, pricing model, and at least one size variant) are populated before displaying products.

### Requirement 7: Replace Mock Products with Real Products

**User Story:** As an administrator, I want to update the catalog with real products, so that outdated mock data is completely removed.

#### Acceptance Criteria

1. WHEN the product catalog is updated, THE Catalog System SHALL remove all 8 existing mock products from the database.
2. WHEN mock products are deleted, THE Frontend Cache SHALL be invalidated to prevent stale data from being served to users.
3. WHEN the migration is complete, THE Catalog System SHALL contain exactly 14 products with no mock or placeholder entries.
4. THE Product Grid SHALL display only the 14 verified real products on all product listing pages (shop, category, homepage).

### Requirement 8: Display Products on Product Cards with Variant Information

**User Story:** As a customer, I want to see product information clearly on cards, so that I can make quick purchasing decisions.

#### Acceptance Criteria

1. THE Product Card SHALL display the following information for each product:
   - Product name
   - Product category (as a badge)
   - Product image
   - Base price (if fixed pricing) or "Price on Request" (if request-based)
   - Available sizes (e.g., "500g, 1kg, 5kg" or "1L, 5L, 10L")
2. WHEN a product has multiple variants, THE Product Card SHALL show the size range (minimum and maximum size) as a summary label.
3. WHEN a user hovers over the Product Card, THE Card Interaction SHALL display a "View Details" or "Select Size" button.
4. THE Product Card SHALL be responsive and maintain consistent formatting across all screen sizes (mobile, tablet, desktop).

### Requirement 9: Enable Size Selection and Cart Addition

**User Story:** As a customer, I want to select a specific size and add it to my cart, so that I can purchase exactly the quantity I need.

#### Acceptance Criteria

1. WHEN a customer clicks on a product card, THE Product Modal OR Expanded View SHALL display all available sizes with their calculated prices.
2. WHERE a product has variants, THE Size Selector SHALL display each size as a selectable option (radio buttons, buttons, or dropdown).
3. WHEN a size is selected, THE "Add to Cart" Button SHALL remain enabled and show the price for the selected variant.
4. WHEN a customer clicks "Add to Cart," THE Shopping Cart SHALL add the selected product variant with the chosen size.
5. WHEN a product is added to the cart, THE System SHALL display a confirmation message indicating the product name, size, and quantity added.

### Requirement 10: Handle TBD and Request-Based Pricing

**User Story:** As an administrator, I want to manage products with undetermined or special pricing, so that customers are not confused by missing prices.

#### Acceptance Criteria

1. WHERE a product has pricing marked as "TBD," THE Catalog System SHALL treat it as pending pricing and display a placeholder message (e.g., "Price coming soon" or "Contact for pricing").
2. WHERE a product uses request-based pricing, THE Product Card SHALL display "Price on Request" prominently.
3. WHEN pricing is TBD or request-based, THE Add to Cart Button SHALL either be disabled with an explanatory tooltip, or SHALL require the customer to initiate a contact inquiry.
4. THE Catalog System SHALL allow administrators to update pricing from TBD to a fixed price or request-based model without requiring product deletion.

---

## Implementation Notes

- Products should be stored in a database with a normalized schema supporting variants as related records.
- The variant calculation engine should be reusable across all pricing models.
- Pricing calculations should occur server-side to prevent price tampering.
- Product images should be preloaded or lazy-loaded for performance.
- The category filter should be cached on the frontend for rapid filtering.
