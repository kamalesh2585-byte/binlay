'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    setOrderPlaced(true)
  }

  const subtotal = 99.99
  const tax = 10.00
  const shipping = 10.00
  const total = subtotal + tax + shipping

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-coconut-light flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center max-w-md shadow-soft-lg animate-fade-in">
          <div className="w-20 h-20 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-forest-900 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Check your email for order confirmation and tracking details.
          </p>
          <div className="space-y-2 mb-8 text-left bg-sage-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-bold text-forest-700">NC-2024-012345</p>
          </div>
          <Link href="/" className="btn-primary inline-flex w-full justify-center">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coconut-light">
      {/* Header */}
      <section className="bg-white border-b border-sage-100 py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-forest-900">Checkout</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Address */}
                <div className="bg-white rounded-lg p-6 card-base">
                  <h2 className="text-xl font-bold text-forest-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="col-span-1"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="col-span-1"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="col-span-2"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="col-span-2"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="col-span-2"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="col-span-1"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="col-span-1"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      className="col-span-1"
                    />
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="col-span-1"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg p-6 card-base">
                  <h2 className="text-xl font-bold text-forest-900 mb-6 flex items-center gap-2">
                    <CreditCard size={24} />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on Card"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      required
                      value={formData.cardNumber}
                      onChange={handleChange}
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        required
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        maxLength={5}
                      />
                      <input
                        type="text"
                        name="cardCVV"
                        placeholder="CVV"
                        required
                        value={formData.cardCVV}
                        onChange={handleChange}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="bg-forest-50 border-2 border-forest-200 rounded-lg p-4 flex items-center gap-3">
                  <Lock size={20} className="text-forest-600 flex-shrink-0" />
                  <p className="text-sm text-forest-700">
                    Your payment information is encrypted and secure
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Place Order • ₹${total.toFixed(2)}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 card-base h-fit sticky top-20">
              <h2 className="text-xl font-bold text-forest-900 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-sage-200">
                <div className="flex items-center justify-between pb-4 border-b border-sage-100">
                  <img
                    src="https://images.unsplash.com/photo-1599599810694-b5ac4dd1766f?w=80&h=80&fit=crop"
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-grow ml-3">
                    <p className="font-medium text-forest-900 text-sm">Virgin Coconut Oil</p>
                    <p className="text-xs text-gray-600">Qty: 2</p>
                  </div>
                  <p className="font-bold text-forest-700">₹49.98</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-sage-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-forest-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
