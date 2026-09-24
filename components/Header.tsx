'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react'
import { CartManager } from '@/lib/cart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => setCartCount(CartManager.getItemCount())
    updateCartCount()
    window.addEventListener('binlay-cart-updated', updateCartCount)
    window.addEventListener('storage', updateCartCount)

    return () => {
      window.removeEventListener('binlay-cart-updated', updateCartCount)
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-sage-100 bg-white/95 shadow-soft backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-12 items-center justify-between sm:h-14">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1.5">
            <img 
              src="/logo.png" 
              alt="Binlay Logo" 
              className="h-7 w-7 object-contain sm:h-8 sm:w-8"
            />
            <span className="hidden text-base font-semibold tracking-normal text-forest-700 sm:inline">Binlay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-5">
            <Link href="/" className="text-sm font-semibold text-gray-700 transition-colors hover:text-forest-600">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-semibold text-gray-700 transition-colors hover:text-forest-600">
              Shop
            </Link>
            <Link href="/shop" className="text-sm font-semibold text-gray-700 transition-colors hover:text-forest-600">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-semibold text-gray-700 transition-colors hover:text-forest-600">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-700 transition-colors hover:text-forest-600">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {/* Search - Hidden on mobile */}
            <button className="group hidden h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-sage-200 hover:bg-sage-100 sm:flex" aria-label="Search">
              <Search size={17} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </button>

            {/* Account */}
            <Link href="/" className="group flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-sage-200 hover:bg-sage-100" aria-label="Account">
              <User size={17} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-sage-200 hover:bg-sage-100" aria-label="Wishlist">
              <Heart size={17} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition-colors hover:border-sage-200 hover:bg-sage-100" aria-label="Shopping Cart">
              <ShoppingCart size={17} className="text-gray-700 group-hover:text-forest-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest-600 text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-sage-100 md:hidden"
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
          <nav className="animate-slide-up pb-3 md:hidden">
            <div className="space-y-1 border-t border-sage-100 pt-3">
              <Link
                href="/"
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-sage-50"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-sage-50"
              >
                Shop
              </Link>
              <Link
                href="/shop"
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-sage-50"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-sage-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-sage-50"
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
