'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categories } from '@/lib/categories'

interface ProductFilterProps {
  onSort: (value: string) => void
  onFilter: (category: string) => void
  sortBy: string
}

export default function ProductFilter({ onSort, onFilter, sortBy }: ProductFilterProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onFilter(category)
  }

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
  ]

  const sortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured'

  return (
    <div className="space-y-6">
      {/* Filter Heading */}
      <div>
        <h3 className="text-lg font-bold text-forest-900 mb-4">Filter Products</h3>

        {/* Category Filter */}
        <div className="space-y-3">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-forest-600 text-white'
                : 'bg-sage-50 text-gray-700 hover:bg-sage-100'
            }`}
          >
            All Products
          </button>

          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeCategory === category.slug
                  ? 'bg-forest-600 text-white'
                  : 'bg-sage-50 text-gray-700 hover:bg-sage-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-lg font-bold text-forest-900 mb-4">Sort by</h3>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full px-4 py-3 bg-white border-2 border-sage-200 rounded-lg text-left flex items-center justify-between hover:border-forest-600 transition-colors"
          >
            <span className="font-medium text-gray-700">{sortLabel}</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sage-200 rounded-lg shadow-soft-lg z-10 animate-slide-up">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSort(option.value)
                    setIsSortOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-sage-50 transition-colors ${
                    sortBy === option.value ? 'text-forest-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
