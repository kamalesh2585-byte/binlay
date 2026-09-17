import { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, categories } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { ArrowLeft } from 'lucide-react'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category)
  return {
    title: `${cat?.name || 'Category'} | Nariyal Co.`,
    description: cat?.description || 'Browse our coconut products',
  }
}

export function generateStaticParams() {
  return categories.map(cat => ({
    category: cat.slug,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category)
  const products = getProductsByCategory(params.category)

  if (!category) {
    return (
      <div className="min-h-screen bg-coconut-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-forest-900 mb-4">Category Not Found</h1>
          <Link href="/shop" className="btn-primary inline-flex">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-8 md:py-12">
        <div className="container-custom">
          <Link href="/shop" className="flex items-center gap-2 text-forest-600 hover:text-forest-700 mb-4 w-fit">
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">
            {category.name}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found in this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
