'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import { products as fallbackProducts, Product } from '@/lib/products'
import { calculatePrice } from '@/lib/pricing'

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Product[]>(fallbackProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(fallbackProducts)
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    let isMounted = true

    fetch('/api/products')
      .then(response => {
        if (!response.ok) throw new Error('Database catalog request failed')
        return response.json() as Promise<Product[]>
      })
      .then(databaseProducts => {
        if (isMounted && databaseProducts.length > 0) {
          setAllProducts(databaseProducts)
          setFilteredProducts(databaseProducts)
        }
      })
      .catch(() => {
        // Keep the bundled catalog visible when the database is unavailable.
      })

    return () => {
      isMounted = false
    }
  }, [])

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
      setFilteredProducts(allProducts)
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === category))
    }
    setSortBy('featured')
  }

  return (
    <div className="space-y-8 py-8 md:py-12">
      {/* Filter & Sort */}
      <ProductFilter onSort={handleSort} onFilter={handleFilter} sortBy={sortBy} />

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
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
