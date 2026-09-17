'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
    // In a real app, this would fetch from context or localStorage
  }, [])

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const moveToCart = (id: string) => {
    removeItem(id)
  }

  if (isLoading) {
    return <div className="min-h-screen bg-coconut-light flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-forest-900 flex items-center gap-2">
            <Heart size={32} />
            My Wishlist
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="mx-auto text-sage-300 mb-4" />
              <h2 className="text-2xl font-bold text-forest-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">Save your favorite products to view them later!</p>
              <Link href="/shop" className="btn-primary inline-flex">
                <ArrowLeft size={18} className="mr-2" />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden card-base card-hover">
                  <div className="relative h-48 overflow-hidden bg-sage-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:bg-red-50"
                    >
                      <Heart size={20} className="fill-forest-600 text-forest-600" />
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-forest-900">{item.name}</h3>
                    <p className="text-2xl font-bold text-forest-700">₹{item.price.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveToCart(item.id)}
                        className="flex-grow btn-primary flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
