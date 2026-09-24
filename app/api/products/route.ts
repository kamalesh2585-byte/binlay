import { NextResponse } from 'next/server'
import { getDatabaseProducts } from '@/lib/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await getDatabaseProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Unable to load products from the database:', error)
    return NextResponse.json({ error: 'Unable to load products' }, { status: 500 })
  }
}
