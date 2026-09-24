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
      <section className="border-b border-sage-100 bg-white py-10 md:py-14">
        <div className="container-custom">
          <h1 className="mb-4 text-forest-900">
            Our Shop
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover our complete range of premium coconut products, carefully selected and sourced for quality and freshness.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-10 md:py-16">
        <div className="container-custom">
          <ProductGrid />
        </div>
      </section>
    </div>
  )
}
