'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import { products, Product } from '@/lib/products'
import { calculatePrice } from '@/lib/pricing'

export default function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [sortBy, setSortBy] = useState('featured')

  const handleSort = (value: string) => {
    setSortBy(value)
    let sorted = [...filteredProducts]

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = a.variants[0] ? calculatePrice(a.variants[0].measurement, a.variants[0].pricing) : 0
          const priceB = b.variants[0] ? calculatePrice(b.variants[0].measurement, b.variants[0].pricing) : 0
          return priceA - priceB
        })
        break
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = a.variants[0] ? calculatePrice(a.variants[0].measurement, a.variants[0].pricing) : 0
          const priceB = b.variants[0] ? calculatePrice(b.variants[0].measurement, b.variants[0].pricing) : 0
          return priceB - priceA
        })
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Assuming newer products have higher IDs
        sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      default:
        break
    }

    setFilteredProducts(sorted)
  }

  const handleFilter = (category: string) => {
    if (category === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === category))
    }
    setSortBy('featured')
  }

  return (
    <div className="py-8 md:py-12 space-y-8">
      {/* Filter & Sort */}
      <ProductFilter onSort={handleSort} onFilter={handleFilter} sortBy={sortBy} />

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAddToCart={(p) => {
              console.log('Added to cart:', p.name)
            }}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found</p>
        </div>
      )}
    </div>
  )
}
