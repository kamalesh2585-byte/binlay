'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product, ProductVariant } from '@/lib/products'
import { calculatePrice, formatPrice } from '@/lib/pricing'
import styles from './ProductCard.module.css'
import { CartManager } from '@/lib/cart'

interface ProductCardProps {
  product: Product
  index?: number
  onAddToCart?: (product: Product, variant: ProductVariant) => void
}

export default function ProductCard({ product, index = 0, onAddToCart }: ProductCardProps) {
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const defaultVariant = product.variants[0]
  const defaultPrice = defaultVariant ? calculatePrice(defaultVariant.measurement, defaultVariant.pricing) : 0

  const handleAddToCart = (e: React.MouseEvent, variant?: ProductVariant) => {
    e.preventDefault()
    const variantToAdd = variant || defaultVariant
    if (variantToAdd) {
      setIsAdded(true)
      CartManager.addItem(product, variantToAdd)
      onAddToCart?.(product, variantToAdd)
      router.push('/cart')
    }
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <article
      className={`${styles.cardBase} ${styles.cardHover} group flex h-full flex-col animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`} className="block h-full">
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Stock Badge */}
          {!defaultVariant?.inStock && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={styles.wishlistButton}
            aria-label="Add to wishlist"
          >
            <Heart
              size={20}
              className={isWishlisted ? styles.wishlistActive : styles.wishlistInactive}
            />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Category Tag */}
          <p className={styles.category}>
            {product.category.replace('-', ' ').toUpperCase()}
          </p>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className={styles.name}>
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className={styles.description}>
            {product.description}
          </p>

          {/* Rating */}
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                />
              ))}
            </div>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>

          {/* Price Display */}
          <div className={styles.priceSection}>
            <span className={styles.price}>
              {formatPrice(defaultPrice)}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`${styles.addToCartButton} ${
              isAdded ? styles.addedState : ''
            }`}
          >
            <ShoppingCart size={18} />
            <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
    </article>
  )
}
