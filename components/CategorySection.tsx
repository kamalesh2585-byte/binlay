import { categories } from '@/lib/categories'
import CategoryCard from './CategoryCard'

export default function CategorySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black text-forest-900 mb-4 leading-tight">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 font-medium">
            Browse our premium selection of coconut products
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
