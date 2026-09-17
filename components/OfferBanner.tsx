import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function OfferBanner() {
  return (
    <section className="py-16 md:py-24 bg-forest-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-700 rounded-full opacity-20 blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sage-600 rounded-full opacity-10 blur-3xl -z-0"></div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in space-y-6">
            <div>
              <p className="text-sage-300 text-sm uppercase tracking-widest font-semibold mb-2">
                Limited Time Offer
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Get 20% Off Your First Order
              </h2>
            </div>

            <p className="text-lg text-sage-100 leading-relaxed">
              Experience the purity and quality of Nariyal Co. products with an exclusive discount on your first purchase.
            </p>

            {/* Code Box */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 w-fit">
              <p className="text-sm text-sage-200 mb-2">Use code:</p>
              <p className="text-2xl font-bold text-white font-mono">FRESH20</p>
            </div>

            {/* CTA */}
            <Link
              href="/shop"
              className="btn-primary inline-flex bg-white text-forest-700 hover:bg-sage-100 hover:shadow-soft-lg w-fit"
            >
              Shop Now
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-soft-lg">
              <img
                src="https://images.unsplash.com/photo-1599599810694-b5ac4dd1766f?w=600&h=600&fit=crop"
                alt="Offer Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
