'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sage-100 shadow-soft">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/logo.png" 
              alt="Binlay Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-black text-forest-700 hidden sm:inline tracking-tight">Binlay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm uppercase tracking-[0.18em] text-gray-700 hover:text-forest-600 transition-colors font-semibold">
              Home
            </Link>
            <Link href="/shop" className="text-sm uppercase tracking-[0.18em] text-gray-700 hover:text-forest-600 transition-colors font-semibold">
              Shop
            </Link>
            <Link href="/shop" className="text-sm uppercase tracking-[0.18em] text-gray-700 hover:text-forest-600 transition-colors font-semibold">
              Categories
            </Link>
            <Link href="/about" className="text-sm uppercase tracking-[0.18em] text-gray-700 hover:text-forest-600 transition-colors font-semibold">
              About
            </Link>
            <Link href="/contact" className="text-sm uppercase tracking-[0.18em] text-gray-700 hover:text-forest-600 transition-colors font-semibold">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 hover:bg-sage-100 rounded-lg transition-colors group" aria-label="Search">
              <Search size={20} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </button>

            {/* Account */}
            <Link href="/" className="flex items-center justify-center w-10 h-10 hover:bg-sage-100 rounded-lg transition-colors group" aria-label="Account">
              <User size={20} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex items-center justify-center w-10 h-10 hover:bg-sage-100 rounded-lg transition-colors group relative" aria-label="Wishlist">
              <Heart size={20} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center justify-center w-10 h-10 hover:bg-sage-100 rounded-lg transition-colors group relative" aria-label="Shopping Cart">
              <ShoppingCart size={20} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-forest-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-sage-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-slide-up">
            <div className="space-y-3">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-sage-50 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block px-4 py-2 text-gray-700 hover:bg-sage-50 rounded-lg transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/shop"
                className="block px-4 py-2 text-gray-700 hover:bg-sage-50 rounded-lg transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-gray-700 hover:bg-sage-50 rounded-lg transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-gray-700 hover:bg-sage-50 rounded-lg transition-colors"
              >
                Contact
              </Link>
              {/* Mobile Search */}
              <div className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-sage-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
