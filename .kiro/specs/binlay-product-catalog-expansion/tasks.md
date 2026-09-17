# Implementation Plan: Binlay Product Catalog Expansion

## Overview

This implementation plan expands the Binlay product catalog from 8 mock products to 14 real coconut-based products with variant support (multiple sizes/volumes per product). The work is organized in dependency order: data model updates first, then component updates, followed by testing and integration.

**Tech Stack**: Next.js 14, TypeScript, Tailwind CSS  
**Implementation Language**: TypeScript  
**Key Files Modified**: `/lib/products.ts`, `/lib/categories.ts`, `/lib/pricing.ts` (new), `/components/*`

---

## Tasks

- [ ] 1. Set up data model and utility infrastructure
  - Create `/lib/pricing.ts` with pricing calculation functions
  - Implement `calculatePrice()` and `getDefaultVariant()` functions
  - Implement `toProductDisplay()` helper for computed product properties
  - Add TypeScript types: `ProductVariant`, `PriceInfo`, `ProductDisplay`, `Category`
  - Export all types and functions from a central index
  - _Requirements: 2, 3, 4_

- [ ] 2. Expand categories to 6 items and update `/lib/categories.ts`
  - Replace existing categories array with 6 categories (Virgin Coconut Oil, Coconut Powder & Snacks, Health Supplements, Baby Care, Hair Care, Skin Care)
  - Add category metadata: id, slug, description, image path, order
  - Ensure slug values are URL-friendly and consistent
  - _Requirements: 5_

- [ ] 3. Migrate existing 8 products with variants to `/lib/products.ts`
  - Update ProductVariant interface definition in products.ts
  - Convert 8 existing mock products into variant-aware format
  - Each product must have at least 1 variant with id, label, pricing (type, amount, unit, displayLabel), inStock, and optional image
  - Ensure all variants use correct pricing types (fixed, per-unit, request, tbd)
  - Test that all variants have complete data before committing
  - _Requirements: 2, 6, 7_

- [ ]* 3.1 Write property test for variant completeness
  - **Property 1: Variant Completeness** — All variants must have id, label, pricing configuration, and inStock status
  - **Validates: Requirements 2, 3, 6**

- [ ] 4. Add 6 new real products to `/lib/products.ts`
  - Add products 9-14 from design spec with full variant data
  - Products include: Coconut Soap (request-based), Coconut Water (TBD), Coconut Milk (TBD), Hair Mask (fixed), Organic Coconut Sugar (per-KG), Coconut Charcoal Face Scrub (TBD)
  - Ensure all new products are assigned to the 6 categories
  - Validate pricing configurations match design requirements
  - _Requirements: 1, 6_

- [ ]* 4.1 Write unit tests for all 14 products
  - Test that all 14 products load correctly
  - Test category assignments are correct
  - Test variant counts and pricing types are as expected
  - _Requirements: 1, 6_

- [ ] 5. Create pricing calculation tests and validation
  - Create `/lib/product-validation.ts` with data validation functions
  - Implement variant validation: id uniqueness, label format, pricing completeness
  - Implement product validation: name, category reference, variants array
  - Add test cases for validation edge cases (missing fields, invalid types)
  - _Requirements: 6_

- [ ]* 5.1 Write property test for pricing consistency
  - **Property 2: Pricing Consistency** — Fixed/per-unit pricing must have amount and label; request/tbd must have null amount
  - **Validates: Requirements 3, 4_

- [ ]* 5.2 Write property test for default variant selection
  - **Property 3: Default Variant Selection** — Default variant must be first in-stock variant by (1) determined pricing, (2) lowest amount, else first variant
  - **Validates: Requirements 3, 6**

- [ ] 6. Update ProductCard component for variant selection
  - Modify ProductCard.tsx to accept Product interface with variants
  - Add variant selector UI (dropdown showing all variant labels)
  - Implement state management for selected variant
  - Display variant-specific pricing using calculatePrice()
  - Show "Request Quote" or "TBD" for undetermined pricing
  - Update add-to-cart button to pass selected variantId to handler
  - Maintain responsive design across all screen sizes
  - _Requirements: 8, 9_

- [ ] 7. Create VariantSelector.tsx component
  - Create new component in `/components/VariantSelector.tsx`
  - Display all available variants for a product
  - Handle variant selection with onChange callback
  - Show pricing info for each variant
  - Support single-variant products (hide selector if only 1 variant)
  - Support mobile and desktop layouts
  - _Requirements: 8, 9_

- [ ] 8. Create PriceDisplay.tsx component
  - Create new component in `/components/PriceDisplay.tsx`
  - Accept variant and display calculated price using calculatePrice()
  - Show ₹ symbol for fixed and per-unit pricing
  - Show "Request Quote" for request-based pricing
  - Show "TBD" or "Price coming soon" for tbd pricing
  - Handle edge cases: null amounts, missing displayLabel
  - _Requirements: 3, 4, 10_

- [ ] 9. Update ProductGrid component for variant handling
  - Modify ProductGrid.tsx to accept array of products with variants
  - Render ProductCard for each product (not per variant)
  - Pass variant data through to ProductCard
  - Maintain filtering logic for categories and pricing
  - _Requirements: 5, 8_

- [ ] 10. Update ProductFilter component for 6 categories
  - Modify ProductFilter.tsx to display all 6 categories
  - Update filtering logic to work with new category structure
  - Show category badges/buttons with product counts
  - Maintain backward compatibility with existing filter UI
  - _Requirements: 5_

- [ ]* 10.1 Write property test for category coverage
  - **Property 4: Category Coverage** — Every product must be retrievable by its assigned category slug
  - **Validates: Requirements 5, 7**

- [ ] 11. Update cart integration for variant references
  - Modify `/lib/cart.ts` to include variantId in CartItem structure
  - Update addToCart() function to accept and store variantId
  - Update cart display to show selected variant size/label
  - Update price calculation in cart to use variant-specific pricing
  - Update cart serialization/deserialization for variant data
  - _Requirements: 2, 9_

- [ ] 12. Checkpoint - Verify data model and component integration
  - Ensure all products load without errors
  - Verify ProductCard displays all products with variant selectors
  - Verify pricing displays correctly for all pricing types
  - Ensure add-to-cart passes variant information correctly
  - Ask the user if questions arise

- [ ]* 12.1 Write unit tests for cart variant handling
  - Test adding product with variant to cart
  - Test cart displays correct price for selected variant
  - Test multiple items of same product with different variants
  - _Requirements: 9_

- [ ] 13. Update product detail page for variant display
  - Modify `/app/product/[id]/page.tsx` to display all product variants
  - Show variant gallery (images per variant if available)
  - Display all available sizes with individual prices
  - Implement variant selection for detail page
  - Show stock status per variant
  - Update meta tags and SEO for variant products
  - _Requirements: 8, 9_

- [ ]* 13.1 Write unit tests for product detail page
  - Test loading product with multiple variants
  - Test variant selection updates displayed information
  - Test variant-specific images display correctly
  - _Requirements: 8, 9_

- [ ] 14. Update category pages for 6-category structure
  - Modify `/app/category/[slug]/page.tsx` to work with new categories
  - Update category page to show products from new 6-category system
  - Ensure all products are correctly filtered by category
  - Add category descriptions and images to category pages
  - _Requirements: 5, 7_

- [ ]* 14.1 Write unit tests for category filtering
  - **Property 5: Product-Variant Relationship** — Each variant id must be unique within product variants
  - Test all 6 categories display correct products
  - Test category counts are accurate with variants
  - Test category switching works correctly
  - **Validates: Requirements 2, 3, 5, 7**

- [ ] 15. Add data validation on product load
  - Implement validation checks in `/lib/product-utils.ts`
  - Add function to validate all products on app startup
  - Check for: variant id uniqueness, required fields, valid category references
  - Log validation errors to console and optionally disable invalid products
  - _Requirements: 6_

- [ ] 16. Update homepage and shop pages with new catalog
  - Verify `/app/page.tsx` displays products from new 14-product catalog
  - Verify `/app/shop/page.tsx` shows all 14 products with variant support
  - Test category filter on shop page works with all 6 categories
  - Ensure responsive layout for new products
  - _Requirements: 1, 5, 7_

- [ ]* 16.1 Write integration tests for shop page
  - Test shop page loads all 14 products
  - Test category filtering returns correct products
  - Test variant selection on shop page works end-to-end
  - Test adding product with variant to cart from shop page
  - _Requirements: 5, 9_

- [ ] 17. Final checkpoint - Ensure all tests pass and products are live
  - Run all unit tests and integration tests
  - Verify no console errors or warnings
  - Test complete user flow: browse → select category → select product → select variant → add to cart
  - Verify cart shows correct pricing for variants
  - Verify all 14 products are visible and functional
  - Ask the user if questions arise or if additional changes needed

---

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for faster MVP delivery
- Core implementation tasks (without `*`) must be completed for functionality
- Property tests (marked with properties) validate design correctness properties and are optional
- Variant selector behavior: show dropdown only if product has 2+ variants; single-variant products skip selector
- Pricing types must match exactly: "fixed", "per-unit", "request", "tbd" (case-sensitive)
- All new category slugs must be lowercase, hyphen-separated (e.g., "virgin-coconut-oil")
- Each task builds on previous steps; complete in listed order for smooth integration
- Data validation should run on app startup to catch schema violations early
- Test frameworks available: Jest for unit tests, React Testing Library for component tests

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2", "3"] },
    { "id": 2, "tasks": ["3.1", "4"] },
    { "id": 3, "tasks": ["4.1", "5"] },
    { "id": 4, "tasks": ["5.1", "5.2"] },
    { "id": 5, "tasks": ["6", "7", "8", "9", "10", "11"] },
    { "id": 6, "tasks": ["10.1"] },
    { "id": 7, "tasks": ["12.1", "13"] },
    { "id": 8, "tasks": ["13.1", "14"] },
    { "id": 9, "tasks": ["14.1", "15"] },
    { "id": 10, "tasks": ["16"] },
    { "id": 11, "tasks": ["16.1", "17"] }
  ]
}
```

---

**Plan Version**: 1.0  
**Language**: TypeScript  
**Status**: Ready for Implementation  
**Estimated Duration**: 6-8 hours for full implementation + testing

