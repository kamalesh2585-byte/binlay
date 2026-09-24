'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Minus, Plus, ShieldCheck, ShoppingCart, Tag, Trash2, Truck } from 'lucide-react'
import { CartItem, CartManager } from '@/lib/cart'
import { calculatePrice, formatPrice } from '@/lib/pricing'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')

  const refreshCart = () => setCartItems([...CartManager.getCart().items])

  useEffect(() => {
    refreshCart()
    setIsLoading(false)
  }, [])

  const updateQuantity = (item: CartItem, quantity: number) => {
    CartManager.updateQuantity(item.product.id, item.variant.id, quantity)
    refreshCart()
  }

  const removeItem = (item: CartItem) => {
    CartManager.removeItem(item.product.id, item.variant.id)
    refreshCart()
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = calculatePrice(item.variant.measurement, item.variant.pricing)
    return sum + price * item.quantity
  }, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + tax + shipping

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center bg-coconut-light text-sm text-gray-600">Loading cart...</div>
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      <section className="border-b border-sage-100 bg-white">
        <div className="container-custom py-6 md:py-8">
          <h1 className="flex items-center gap-3 text-forest-900">
            <ShoppingCart size={24} />
            Shopping Cart {itemCount > 0 && <span className="text-base font-medium text-gray-500">({itemCount})</span>}
          </h1>
        </div>
      </section>

      <section className="py-7 md:py-10">
        <div className="container-custom">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingCart size={52} className="mx-auto mb-4 text-sage-300" />
              <h2 className="mb-3 text-forest-900">Your cart is empty</h2>
              <p className="mb-7 text-sm text-gray-600">Add some products to get started.</p>
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                <ArrowLeft size={17} /> Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <div className="space-y-3">
                {cartItems.map(item => {
                  const unitPrice = calculatePrice(item.variant.measurement, item.variant.pricing)
                  return (
                    <article key={`${item.product.id}-${item.variant.id}`} className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 rounded-lg border border-sage-100 bg-white p-4 shadow-soft sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:p-5">
                      <Link href={`/product/${item.product.id}`} className="row-span-2 sm:row-span-1">
                        <img src={item.product.image} alt={item.product.name} className="h-24 w-full rounded-md bg-sage-50 object-contain p-2 sm:h-28" />
                      </Link>

                      <div className="min-w-0">
                        <Link href={`/product/${item.product.id}`}>
                          <h2 className="mb-1 text-sm font-semibold leading-snug text-forest-900 sm:text-base">{item.product.name}</h2>
                        </Link>
                        <p className="text-xs font-medium text-sage-600">Size: {item.variant.label}</p>
                        <p className="mt-2 text-xs font-medium text-forest-600">In stock</p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500"><Truck size={14} /> Free shipping</div>
                      </div>

                      <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-3 sm:row-start-1 sm:flex-col sm:items-end">
                        <p className="whitespace-nowrap text-base font-bold text-forest-900 sm:text-lg">{formatPrice(unitPrice * item.quantity)}</p>
                        <div className="flex h-8 items-center rounded-full border border-sage-200 bg-sage-50">
                          <button onClick={() => updateQuantity(item, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-sage-100" aria-label="Decrease quantity"><Minus size={14} /></button>
                          <span className="w-7 text-center text-xs font-semibold text-forest-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-sage-100" aria-label="Increase quantity"><Plus size={14} /></button>
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end border-t border-sage-100 pt-3 sm:col-start-2 sm:col-end-4">
                        <button onClick={() => removeItem(item)} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-red-600"><Trash2 size={14} /> Remove</button>
                      </div>
                    </article>
                  )
                })}

                <Link href="/shop" className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-forest-600 hover:text-forest-700"><ArrowLeft size={16} /> Continue Shopping</Link>
              </div>

              <aside className="rounded-lg border border-sage-100 bg-white p-5 shadow-soft lg:sticky lg:top-24">
                <h2 className="mb-5 text-lg font-bold text-forest-900">Order Summary</h2>
                <div className="mb-4 flex gap-2">
                  <label className="relative min-w-0 flex-1">
                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-600" />
                    <input value={couponCode} onChange={event => setCouponCode(event.target.value)} placeholder="Enter coupon code" className="h-10 w-full rounded-lg border border-sage-200 bg-white pl-9 pr-3 text-xs outline-none focus:border-forest-600" />
                  </label>
                  <button className="h-10 rounded-lg border border-forest-600 px-4 text-xs font-semibold text-forest-600 hover:bg-sage-50">Apply</button>
                </div>
                <button className="mb-5 flex h-10 w-full items-center justify-between rounded-lg border border-sage-200 px-3 text-xs font-semibold text-forest-600">
                  <span className="flex items-center gap-2"><Tag size={15} /> View available offers</span><ChevronRight size={16} />
                </button>

                <div className="space-y-3 border-b border-sage-200 pb-5 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Items ({itemCount})</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax (10%)</span><span>{formatPrice(tax)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-semibold text-forest-600">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
                </div>
                <div className="flex justify-between py-5 text-base font-bold text-forest-900"><span>Total</span><span>{formatPrice(total)}</span></div>
                <Link href="/checkout" className="btn-primary flex w-full items-center justify-center">Check Out</Link>
                <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500"><ShieldCheck size={15} className="text-forest-600" /> Secure and protected checkout</div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
