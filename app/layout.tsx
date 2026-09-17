import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Binlay | Premium Coconut Products - Pure, Natural, Trusted',
  description: 'Premium coconut products by D.A.M Binlay. Virgin Coconut Oil, Dessiccated Coconut Powder, and more. 100% pure, cold-pressed, and naturally processed.',
  keywords: 'coconut oil, virgin coconut oil, dessiccated coconut powder, coconut chips, natural coconut products, baby care oil, cooking oil',
  authors: [{ name: 'D.A.M Binlay' }],
  openGraph: {
    title: 'Binlay | Premium Coconut Products',
    description: 'Premium coconut products by D.A.M Binlay. Pure, Natural, Trusted. Goodness from coconuts for generations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
