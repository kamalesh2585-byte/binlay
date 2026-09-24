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
  private static readonly storageKey = 'binlay-cart'

  private static load(): void {
    if (typeof window === 'undefined') return
    try {
      const savedCart = window.localStorage.getItem(this.storageKey)
      this.items = savedCart ? JSON.parse(savedCart) : []
    } catch {
      this.items = []
    }
  }

  private static save(): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.items))
    window.dispatchEvent(new Event('binlay-cart-updated'))
  }

  static getCart(): Cart {
    this.load()
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
    this.load()
    const existingItem = this.items.find(item => item.product.id === product.id && item.variant.id === variant.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.items.push({ product, variant, quantity })
    }
    this.save()
  }

  static removeItem(productId: string, variantId: string): void {
    this.load()
    this.items = this.items.filter(item => !(item.product.id === productId && item.variant.id === variantId))
    this.save()
  }

  static updateQuantity(productId: string, variantId: string, quantity: number): void {
    this.load()
    const item = this.items.find(item => item.product.id === productId && item.variant.id === variantId)
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId, variantId)
      } else {
        item.quantity = quantity
      }
    }
    this.save()
  }

  static clear(): void {
    this.items = []
    this.save()
  }

  static getItemCount(): number {
    return this.getCart().itemCount
  }
}
