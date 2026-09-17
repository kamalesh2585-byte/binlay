import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest-900 text-white">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Binlay Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold">Binlay</span>
            </div>
            <p className="text-sage-200 text-sm leading-relaxed">
              Premium coconut products by D.A.M Binlay. Pure. Natural. Trusted. Goodness from coconuts for generations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sage-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sage-200 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sage-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sage-200 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sage-200 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sage-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sage-200 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-sage-300" />
                <a href="mailto:dambinlay@gmail.com" className="text-sage-200 hover:text-white transition-colors">
                  dambinlay@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-sage-300" />
                <a href="tel:+918807408650" className="text-sage-200 hover:text-white transition-colors">
                  +91 8807408650
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-sage-300 flex-shrink-0 mt-1" />
                <span className="text-sage-200">
                  61/G MS Complex, Soorappallam, Vadaseri Main Road,<br />
                  Pattukkottai – 614 602, Tamil Nadu, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-forest-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sage-300 text-sm">
            &copy; {currentYear} Nariyal Co. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center hover:bg-sage-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center hover:bg-sage-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center hover:bg-sage-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center hover:bg-sage-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
