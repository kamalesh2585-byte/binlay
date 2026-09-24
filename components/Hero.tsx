'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden py-16 sm:py-20 md:py-24"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(24,36,31,0.82), rgba(35,74,59,0.6)), url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in max-w-3xl space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
                Pure - Natural - Trusted
              </div>
              <div>
                <h1 className="text-white drop-shadow-lg">Pure Coconut</h1>
                <h1 className="text-white/75 drop-shadow-lg">Goodness, Naturally Delivered.</h1>
              </div>
              <p className="max-w-xl rounded-lg border border-white/10 bg-black/20 p-4 text-base leading-relaxed text-white/90 drop-shadow-md sm:text-lg">
                Premium coconut products by Binlay - Pure. Natural. Trusted. Experience the goodness of 100% cold-pressed virgin coconut oil and premium dessiccated coconut powder from D.A.M Binlay.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/shop" className="btn-primary inline-flex shadow-lg shadow-forest-900/20">
                Shop Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link href="/shop" className="btn-outline inline-flex bg-white/10 text-white border-white/70 hover:bg-white/15">
                Explore Products
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-white/30 pt-4 sm:gap-6">
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">Free Shipping</p>
                <p className="text-lg font-semibold text-white">On orders over Rs.50</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">100% Natural</p>
                <p className="text-lg font-semibold text-white">No additives</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm text-white/80">Fresh Guarantee</p>
                <p className="text-lg font-semibold text-white">30-day returns</p>
              </div>
            </div>
          </div>

          <div className="relative hidden animate-slide-up md:block" style={{ animationDelay: '0.2s' }}>
            <div className="relative mx-auto max-w-md rounded-lg border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="rounded-lg bg-gradient-to-br from-forest-100 via-emerald-50 to-sage-100 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-forest-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Featured
                  </span>
                  <span className="text-sm font-semibold text-forest-700">4.9 Rating</span>
                </div>
                <div className="rounded-lg bg-white p-5 shadow-soft">
                  <div className="mb-4 h-52 rounded-lg bg-[radial-gradient(circle_at_top,_rgba(133,183,145,0.35),_rgba(255,255,255,0.8)_45%,_transparent_100%)]" />
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.2em] text-sage-600">Virgin Coconut Oil</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold text-forest-900">Rs.499</h3>
                      <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        Best Seller
                      </span>
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
