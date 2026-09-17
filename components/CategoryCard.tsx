import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Category } from '@/lib/categories'

interface CategoryCardProps {
  category: Category
  index?: number
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div
        className="card-base card-hover cursor-pointer group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-sage-50">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-bold text-forest-900 group-hover:text-forest-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {category.description}
          </p>
          <div className="flex items-center text-forest-600 font-medium pt-2 group-hover:gap-2 transition-all">
            <span>Shop Now</span>
            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  )
}
