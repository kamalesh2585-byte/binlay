'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="relative py-20 md:py-32 overflow-hidden min-h-screen md:min-h-auto flex items-center"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(24,36,31,0.82), rgba(35,74,59,0.6)), url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-sage-200 rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-forest-200 rounded-full opacity-10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
                Pure • Natural • Trusted
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[0.95] drop-shadow-lg">
                  Pure Coconut
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white/70 leading-[0.95] drop-shadow-lg">
                  Goodness, Naturally Delivered.
                </h1>
              </div>
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-2xl border border-white/10 max-w-xl">
                Premium coconut products by Binlay - Pure. Natural. Trusted. Experience the goodness of 100% cold-pressed virgin coconut oil and premium dessiccated coconut powder from D.A.M Binlay.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="btn-primary inline-flex shadow-lg shadow-forest-900/20"
              >
                Shop Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                href="/shop"
                className="btn-outline inline-flex bg-white/10 text-white border-white/70 hover:bg-white/15"
              >
                Explore Products
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/30">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">Free Shipping</p>
                <p className="text-lg font-semibold text-white">On orders over ₹50</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">100% Natural</p>
                <p className="text-lg font-semibold text-white">No additives</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">Fresh Guarantee</p>
                <p className="text-lg font-semibold text-white">30-day returns</p>
              </div>
            </div>
          </div>

          {/* Right Image / Floating card */}
          <div className="relative animate-slide-up hidden md:block" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-forest-100 via-emerald-50 to-sage-100 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-forest-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                  <span className="text-sm font-semibold text-forest-700">4.9 Rating</span>
                </div>
                <div className="rounded-[1.5rem] bg-white p-5 shadow-soft">
                  <div className="mb-4 h-52 rounded-[1.25rem] bg-[radial-gradient(circle_at_top,_rgba(133,183,145,0.35),_rgba(255,255,255,0.8)_45%,_transparent_100%)]" />
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.2em] text-sage-600">Virgin Coconut Oil</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-forest-900">₹499</h3>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">Best Seller</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
