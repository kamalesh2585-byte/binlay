import { Metadata } from 'next'
import { Leaf, Users, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Nariyal Co.',
  description: 'Learn about Nariyal Co. and our commitment to premium, natural coconut products.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">About Nariyal Co.</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Bringing you the finest coconut products from nature&apos;s bounty, with a commitment to quality, sustainability, and natural living.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1599599810694-b5ac4dd1766f?w=600&h=600&fit=crop"
                alt="Our Story"
                className="rounded-2xl shadow-soft-lg"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Nariyal Co. was founded with a simple mission: to bring the pure goodness of coconuts to homes around the world. We believe in the power of nature and the quality of natural products.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Starting from small family farms in tropical regions, we&apos;ve grown into a trusted brand that thousands of customers rely on for their daily coconut needs. Every product is carefully selected, tested, and packaged to ensure maximum freshness and quality.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, Nariyal Co. stands as a beacon of quality and sustainability in the natural products industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-forest-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-4">100% Natural</h3>
              <p className="text-gray-600 leading-relaxed">
                All our products are 100% natural with no additives, preservatives, or artificial ingredients.
              </p>
            </div>

            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-sage-700" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-4">Sustainable</h3>
              <p className="text-gray-600 leading-relaxed">
                We source our coconuts from sustainable farms and support fair trade practices.
              </p>
            </div>

            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-forest-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in giving back to the communities that grow our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-soft">
                  <img
                    src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop`}
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-forest-900 mb-1">Team Member {i}</h3>
                <p className="text-gray-600 text-sm">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
