import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'

export const metadata: Metadata = {
  title: 'Shop | Nariyal Co.',
  description: 'Browse our complete selection of premium coconut products.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-8 md:py-12">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">
            Our Shop
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover our complete range of premium coconut products, carefully selected and sourced for quality and freshness.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filter would go here on larger screens */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                {/* Filter section integrated in ProductFilter component */}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
