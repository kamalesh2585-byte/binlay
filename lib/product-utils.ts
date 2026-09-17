import { Product, ProductVariant } from './products'
import { calculatePrice, formatPrice, formatMeasurement } from './pricing'

export interface ProductDisplayItem {
  product: Product
  defaultVariant: ProductVariant
  defaultPrice: number
  defaultPriceFormatted: string
  defaultMeasurement: string
  allVariantCounts: number
}

/**
 * Transform product for display with calculated pricing
 */
export function toProductDisplay(product: Product): ProductDisplayItem {
  const defaultVariant = product.variants[0] || null
  const defaultPrice = defaultVariant ? calculatePrice(defaultVariant.measurement, defaultVariant.pricing) : 0
  
  return {
    product,
    defaultVariant,
    defaultPrice,
    defaultPriceFormatted: formatPrice(defaultPrice),
    defaultMeasurement: defaultVariant ? formatMeasurement(defaultVariant.measurement) : '',
    allVariantCounts: product.variants.length,
  }
}

/**
 * Validate products have proper variant structure
 */
export function validateProducts(products: Product[]): boolean {
  return products.every(p => {
    if (!p.variants || p.variants.length === 0) {
      console.warn('Product has no variants')
      return false
    }
    return true
  })
}

/**
 * Get all products for display
 */
export function getAllProductsForDisplay(products: Product[]): ProductDisplayItem[] {
  return products.map(toProductDisplay)
}
