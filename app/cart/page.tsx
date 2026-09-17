'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
    // In a real app, this would fetch from context or localStorage
  }, [])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + tax + shipping

  if (isLoading) {
    return <div className="min-h-screen bg-coconut-light flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-forest-900 flex items-center gap-2">
            <ShoppingCart size={32} />
            Shopping Cart
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart size={64} className="mx-auto text-sage-300 mb-4" />
              <h2 className="text-2xl font-bold text-forest-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to get started!</p>
              <Link href="/shop" className="btn-primary inline-flex">
                <ArrowLeft size={18} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-6 flex gap-6 items-start card-base"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-grow">
                      <h3 className="font-bold text-forest-900 mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-forest-700">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-2 border-sage-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-sage-100"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-sage-100"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg p-6 card-base h-fit sticky top-20">
                <h2 className="text-xl font-bold text-forest-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-sage-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-forest-900 mb-6">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {subtotal < 50 && (
                  <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg mb-4">
                    Free shipping on orders over ₹50. Add ₹{(50 - subtotal).toFixed(2)} more!
                  </p>
                )}

                <Link
                  href="/checkout"
                  className="btn-primary w-full block text-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="btn-secondary w-full block text-center mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
