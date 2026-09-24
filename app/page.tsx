import Hero from '@/components/Hero'
import OfferBanner from '@/components/OfferBanner'
import ProductGrid from '@/components/ProductGrid'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <OfferBanner />
      <section className="bg-coconut-light py-10 md:py-16">
        <div className="container-custom">
          <div className="mb-2 text-center">
            <h2 className="text-forest-900">Our 14 Products</h2>
            <p className="mt-3 text-gray-600">
              Explore our complete collection of premium coconut products.
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>
      <Testimonials />
      <Newsletter />
    </>
  )
}
