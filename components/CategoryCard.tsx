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
        className="card-base card-hover group h-full cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-sage-50">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-5">
          <h3 className="text-xl font-semibold text-forest-900 transition-colors group-hover:text-forest-600">
            {category.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {category.description}
          </p>
          <div className="flex items-center pt-2 font-semibold text-forest-600 transition-all group-hover:gap-2">
            <span>Shop Now</span>
            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  )
}
