'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react'
import { getProductById, products, ProductVariant } from '@/lib/products'
import { calculatePrice, formatPrice, formatMeasurement } from '@/lib/pricing'
import { useParams, useRouter } from 'next/navigation'
import { CartManager } from '@/lib/cart'

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  )

  if (!product) {
    return (
      <div className="min-h-screen bg-coconut-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-forest-900">Product Not Found</h1>
          <Link href="/shop" className="btn-primary inline-flex">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  const currentPrice = selectedVariant
    ? calculatePrice(selectedVariant.measurement, selectedVariant.pricing)
    : 0

  const handleAddToCart = () => {
    if (!selectedVariant) return
    CartManager.addItem(product, selectedVariant, quantity)
    setIsAdded(true)
    router.push('/cart')
  }

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1))
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Breadcrumb */}
      <div className="border-b border-sage-200 bg-white">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-forest-600">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-forest-600">Shop</Link>
            <span>/</span>
            <span className="text-forest-600 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-10 md:py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-10 items-start">
            {/* Image */}
            <div className="animate-fade-in">
              <div className="relative h-72 overflow-hidden rounded-lg bg-sage-50 shadow-soft sm:h-80 md:h-[390px] lg:h-[430px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-6"
                  decoding="async"
                />
              </div>
            </div>

            {/* Info */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {/* Category */}
              <p className="text-sm font-semibold text-sage-600 uppercase tracking-widest mb-2">
                {product.category.replace('-', ' ')}
              </p>

              {/* Title */}
              <h1 className="mb-4 text-forest-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-sage-200">
                <span className="text-3xl font-bold text-forest-700">
                  {formatPrice(currentPrice)}
                </span>
                {selectedVariant && (
                  <span className="text-sm text-sage-600 font-medium">
                    {formatMeasurement(selectedVariant.measurement)}
                  </span>
                )}
              </div>

              {/* Long Description */}
              {product.longDescription && (
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {product.longDescription}
                </p>
              )}

              {/* Variant Selector */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-forest-900">Select Size/Quantity:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((variant) => {
                    const variantPrice = calculatePrice(variant.measurement, variant.pricing)
                    const isSelected = selectedVariant?.id === variant.id
                    
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`rounded-lg border-2 p-2.5 text-center transition-colors ${
                          isSelected
                            ? 'border-forest-600 bg-forest-50'
                            : 'border-sage-200 bg-white hover:border-sage-400'
                        } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!variant.inStock}
                      >
                        <div className="font-semibold text-sm text-forest-900">{variant.label}</div>
                        <div className="text-xs text-forest-700 font-bold">{formatPrice(variantPrice)}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 mb-8">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                  <div className="flex w-fit items-center rounded-lg border-2 border-sage-200">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 hover:bg-sage-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 hover:bg-sage-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex min-h-[44px] flex-grow items-center justify-center gap-2 rounded-lg px-5 py-3 font-bold transition-colors ${
                      isAdded
                        ? 'bg-forest-600 text-white'
                        : 'bg-forest-600 text-white hover:bg-forest-700'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    {isAdded ? 'Added to Cart!' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="min-h-[44px] rounded-lg border-2 border-sage-200 px-5 py-3 font-bold transition-colors hover:border-forest-600 hover:bg-sage-50"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={20}
                      className={`${
                        isWishlisted
                          ? 'fill-forest-600 text-forest-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 rounded-lg bg-sage-50 p-4">
                <h3 className="font-bold text-forest-900">Benefits & Features</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {product.benefits && product.benefits.length > 0 ? (
                    product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-forest-600 font-bold">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-forest-600 font-bold">✓</span>
                        <span>100% Natural and Organic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-forest-600 font-bold">✓</span>
                        <span>Sustainably Sourced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-forest-600 font-bold">✓</span>
                        <span>Fresh Delivery Guaranteed</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-t border-sage-100">
          <div className="container-custom">
            <h2 className="mb-10 text-forest-900 md:mb-12">Related Products</h2>
            <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.map((relatedProduct, index) => {
                const defaultVariant = relatedProduct.variants[0]
                const defaultPrice = defaultVariant
                  ? calculatePrice(defaultVariant.measurement, defaultVariant.pricing)
                  : 0

                return (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="card-base card-hover cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="product-image-container">
                        <img src={relatedProduct.image} alt={relatedProduct.name} loading="lazy" decoding="async" />
                      </div>
                      <div className="p-3 space-y-1.5">
                        <h3 className="text-base font-bold text-forest-900 group-hover:text-forest-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-lg font-bold text-forest-700">
                          {formatPrice(defaultPrice)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
