export type PricingType = 'fixed' | 'per-kg' | 'per-100ml' | 'tbd' | 'request-quote'

export interface PricingInfo {
  type: PricingType
  amount?: number
  unit?: string
  displayLabel?: string
}

export interface Measurement {
  value: number
  unit: 'g' | 'ml' | 'l' | 'kg'
}

export function calculatePrice(measurement: Measurement, pricing: PricingInfo): number {
  if (pricing.type === 'fixed') {
    return pricing.amount || 0
  }
  
  if (pricing.type === 'per-kg' && pricing.amount) {
    const grams = convertToGrams(measurement)
    return Math.round((grams / 1000) * pricing.amount * 100) / 100
  }
  
  if (pricing.type === 'per-100ml' && pricing.amount) {
    const ml = convertToMl(measurement)
    return Math.round((ml / 100) * pricing.amount * 100) / 100
  }
  
  return 0
}

function convertToGrams(measurement: Measurement): number {
  switch (measurement.unit) {
    case 'g':
      return measurement.value
    case 'kg':
      return measurement.value * 1000
    default:
      return measurement.value
  }
}

function convertToMl(measurement: Measurement): number {
  switch (measurement.unit) {
    case 'ml':
      return measurement.value
    case 'l':
      return measurement.value * 1000
    default:
      return measurement.value
  }
}

export function formatPrice(amount: number): string {
  const rupeeByte = String.fromCharCode(0x20B9)
  return `${rupeeByte}${amount.toFixed(2)}`
}

export function formatMeasurement(measurement: Measurement): string {
  return `${measurement.value}${measurement.unit}`
}

export function getDefaultVariant(variants: any[]): any {
  if (!variants || variants.length === 0) return null
  return variants[0]
}
