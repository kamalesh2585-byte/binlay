import { Product, ProductVariant } from './products'
import { calculatePrice } from './pricing'

export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// In-memory cart state (for frontend only)
export class CartManager {
  private static items: CartItem[] = []

  static getCart(): Cart {
    const total = this.items.reduce((sum, item) => {
      const variantPrice = calculatePrice(item.variant.measurement, item.variant.pricing)
      return sum + (variantPrice * item.quantity)
    }, 0)
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0)
    
    return {
      items: this.items,
      total: Math.round(total * 100) / 100,
      itemCount,
    }
  }

  static addItem(product: Product, variant: ProductVariant, quantity: number = 1): void {
    const existingItem = this.items.find(item => item.product.id === product.id && item.variant.id === variant.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({ product, variant, quantity })
    }
  }

  static removeItem(productId: string, variantId: string): void {
    this.items = this.items.filter(item => !(item.product.id === productId && item.variant.id === variantId))
  }

  static updateQuantity(productId: string, variantId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId && item.variant.id === variantId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId, variantId)
      } else {
        item.quantity = quantity
      }
    }
  }

  static clear(): void {
    this.items = []
  }

  static getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }
}
