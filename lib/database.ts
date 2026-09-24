import fs from 'node:fs'
import path from 'node:path'
import { Pool } from 'pg'
import { Product } from './products'

declare global {
  var binlayDatabasePool: Pool | undefined
}

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL

  if (process.env.NODE_ENV !== 'production') {
    const localPath = path.join(process.cwd(), '.agents', 'skills', '.env.local')
    if (fs.existsSync(localPath)) {
      const line = fs
        .readFileSync(localPath, 'utf8')
        .split(/\r?\n/)
        .find(value => value.trim().startsWith('DATABASE_URL='))

      if (line) return line.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '')
    }
  }

  throw new Error('DATABASE_URL is not configured')
}

function getPool(): Pool {
  if (!global.binlayDatabasePool) {
    global.binlayDatabasePool = new Pool({
      connectionString: loadDatabaseUrl(),
      ssl: { rejectUnauthorized: false },
      max: 5,
    })
  }

  return global.binlayDatabasePool
}

interface ProductRow {
  id: string
  name: string
  description: string
  long_description: string | null
  category: string
  image: string
  rating: string
  review_count: number
  benefits: string[]
  variants: Array<{
    id: string
    label: string
    measurementValue: string
    measurementUnit: string
    pricingType: 'fixed'
    price: string
    inStock: boolean
  }>
}

export async function getDatabaseProducts(): Promise<Product[]> {
  const result = await getPool().query<ProductRow>(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.long_description,
      c.slug AS category,
      p.image,
      p.rating,
      p.review_count,
      p.benefits,
      COALESCE(
        jsonb_agg(
          jsonb_build_object(
            'id', v.id,
            'label', v.label,
            'measurementValue', v.measurement_value,
            'measurementUnit', v.measurement_unit,
            'pricingType', v.pricing_type,
            'price', v.price,
            'inStock', v.is_active AND v.stock_quantity > 0
          ) ORDER BY v.id
        ) FILTER (WHERE v.id IS NOT NULL),
        '[]'::jsonb
      ) AS variants
    FROM products p
    JOIN categories c ON c.id = p.category_id
    LEFT JOIN product_variants v ON v.product_id = p.id AND v.is_active = TRUE
    WHERE p.is_active = TRUE
    GROUP BY p.id, c.slug
    ORDER BY p.id::integer
  `)

  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    longDescription: row.long_description ?? undefined,
    category: row.category,
    image: row.image,
    rating: Number(row.rating),
    reviews: row.review_count,
    benefits: row.benefits,
    variants: row.variants.map(variant => ({
      id: variant.id,
      label: variant.label,
      measurement: {
        value: Number(variant.measurementValue),
        unit: variant.measurementUnit as 'ml' | 'l' | 'g' | 'kg',
      },
      pricing: {
        type: 'fixed' as const,
        amount: Number(variant.price),
      },
      inStock: variant.inStock,
    })),
  }))
}
