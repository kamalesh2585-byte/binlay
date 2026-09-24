import { categories } from '@/lib/categories'
import CategoryCard from './CategoryCard'

export default function CategorySection() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-10 animate-fade-in md:mb-12">
          <h2 className="mb-4 text-forest-900">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Browse our premium selection of coconut products
          </p>
        </div>

        {/* Category Grid */}
        <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
