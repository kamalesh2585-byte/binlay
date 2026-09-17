'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We&apos;d love to hear from you. Get in touch with us today!</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-forest-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-2">Email</h3>
              <a href="mailto:info@nariyal.co" className="text-forest-600 hover:text-forest-700">
                info@nariyal.co
              </a>
            </div>

            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-sage-700" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-2">Phone</h3>
              <a href="tel:+1234567890" className="text-forest-600 hover:text-forest-700">
                +1 (234) 567-890
              </a>
            </div>

            <div className="card-base p-8 text-center hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-forest-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-2">Address</h3>
              <p className="text-gray-600">
                123 Coconut Lane<br />
                Tropical City, TC 12345
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
              <h2 className="text-2xl font-bold text-forest-900 mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="bg-forest-50 border-2 border-forest-200 rounded-lg p-6 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="text-forest-700 font-semibold">Thank you for your message!</p>
                  <p className="text-gray-600 text-sm mt-2">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-forest-900 mb-8">Find Us on the Map</h2>
          <div className="bg-sage-100 rounded-2xl h-96 flex items-center justify-center">
            <p className="text-gray-600">Map integration would go here</p>
          </div>
        </div>
      </section>
    </div>
  )
}
