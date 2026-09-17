'use client'

import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-sage-50 to-forest-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {/* Icon */}
          <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-forest-600" size={32} />
          </div>

          {/* Content */}
          <h2 className="text-4xl md:text-5xl font-black text-forest-900 mb-4 leading-tight">
            Join the Coconut Revolution
          </h2>
          <p className="text-gray-600 text-lg font-medium mb-8">
            Get fresh updates, exclusive offers and natural living tips delivered to your inbox.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 border-2 border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="btn-primary inline-flex w-full sm:w-auto whitespace-nowrap"
            >
              {submitted ? '✓ Subscribed!' : 'Subscribe'}
              {!submitted && <ArrowRight size={20} className="ml-2" />}
            </button>
          </form>

          {/* Message */}
          {submitted && (
            <p className="text-sm text-forest-600 mt-4 animate-slide-up">
              Thank you! Check your email for exclusive offers.
            </p>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
