'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, ChevronDown } from 'lucide-react'
import { Product, ProductVariant } from '@/lib/products'
import { calculatePrice, formatPrice, formatMeasurement } from '@/lib/pricing'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  index?: number
  onAddToCart?: (product: Product, variant: ProductVariant) => void
}

export default function ProductCard({ product, index = 0, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(product.variants[0] || null)

  const defaultVariant = product.variants[0]
  const defaultPrice = defaultVariant ? calculatePrice(defaultVariant.measurement, defaultVariant.pricing) : 0

  const handleAddToCart = (e: React.MouseEvent, variant?: ProductVariant) => {
    e.preventDefault()
    const variantToAdd = variant || selectedVariant || defaultVariant
    if (variantToAdd) {
      setIsAdded(true)
      onAddToCart?.(product, variantToAdd)
      setTimeout(() => setIsAdded(false), 1500)
    }
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant)
    setIsExpanded(false)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className={`${styles.cardBase} ${styles.cardHover} cursor-pointer group h-full flex flex-col animate-fade-in`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />

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
          <h3 className={styles.name}>
            {product.name}
          </h3>

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
              {formatPrice(
                selectedVariant
                  ? calculatePrice(selectedVariant.measurement, selectedVariant.pricing)
                  : defaultPrice,
              )}
            </span>
            {selectedVariant && (
              <span className={styles.measurement}>
                / {formatMeasurement(selectedVariant.measurement)}
              </span>
            )}
          </div>

          {/* Variant Selector */}
          <div className={styles.variantSection}>
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsExpanded(!isExpanded)
              }}
              className={styles.variantButton}
            >
              <span className={styles.variantLabel}>
                {selectedVariant?.label || defaultVariant?.label || 'Select Size'}
              </span>
              <ChevronDown
                size={18}
                className={isExpanded ? styles.chevronOpen : styles.chevronClosed}
              />
            </button>

            {/* Expanded Variant Options */}
            {isExpanded && (
              <div className={styles.variantGrid}>
                {product.variants.map((variant) => {
                  const variantPrice = calculatePrice(variant.measurement, variant.pricing)
                  const isSelected = selectedVariant?.id === variant.id
                  
                  return (
                    <button
                      key={variant.id}
                      onClick={(e) => {
                        e.preventDefault()
                        handleVariantSelect(variant)
                      }}
                      className={`${styles.variantOption} ${
                        isSelected ? styles.variantOptionSelected : ''
                      } ${!variant.inStock ? styles.variantOptionDisabled : ''}`}
                      disabled={!variant.inStock}
                    >
                      <div className={styles.variantLabel}>{variant.label}</div>
                      <div className={styles.variantPrice}>{formatPrice(variantPrice)}</div>
                      {!variant.inStock && (
                        <div className={styles.outOfStockLabel}>Out of Stock</div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
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
      </div>
    </Link>
  )
}
