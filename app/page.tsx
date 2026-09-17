import Hero from '@/components/Hero'
import CategorySection from '@/components/CategorySection'
import ProductGrid from '@/components/ProductGrid'
import OfferBanner from '@/components/OfferBanner'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      
      {/* Best-Selling Products */}
      <section className="py-16 md:py-24 bg-coconut-light">
        <div className="container-custom">
          {/* Section Header */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-forest-900 mb-4 leading-tight">
              Best-Selling Products
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Our most loved coconut products by thousands of customers
            </p>
          </div>

          {/* Product Grid */}
          <ProductGrid />
        </div>
      </section>

      <OfferBanner />
      <Testimonials />
      <Newsletter />
    </>
  )
}
