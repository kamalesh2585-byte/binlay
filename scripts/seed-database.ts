import fs from 'node:fs'
import path from 'node:path'
import { Pool, PoolClient } from 'pg'
import { categories } from '../lib/categories'
import { products } from '../lib/products'

function loadDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL

  const candidates = [
    path.join(process.cwd(), '.env.local'),
    path.join(process.cwd(), '.agents', 'skills', '.env.local'),
  ]

  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue

    const line = fs
      .readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .find(value => value.trim().startsWith('DATABASE_URL='))

    if (line) {
      return line.slice(line.indexOf('=') + 1).trim().replace(/^['"]|['"]$/g, '')
    }
  }

  throw new Error('DATABASE_URL is missing. Add it to .env.local before seeding.')
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function seedCatalog(client: PoolClient) {
  for (const category of categories) {
    await client.query(
      `INSERT INTO categories (id, name, slug, description, image, icon)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         slug = EXCLUDED.slug,
         description = EXCLUDED.description,
         image = EXCLUDED.image,
         icon = EXCLUDED.icon,
         updated_at = NOW()`,
      [category.id, category.name, category.slug, category.description, category.image, category.icon ?? null],
    )
  }

  const categoriesBySlug = new Map(categories.map(category => [category.slug, category.id]))

  for (const product of products) {
    const categoryId = categoriesBySlug.get(product.category)
    if (!categoryId) throw new Error(`Unknown category ${product.category} for product ${product.id}`)

    await client.query(
      `INSERT INTO products
         (id, category_id, name, slug, description, long_description, image, benefits, rating, review_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10)
       ON CONFLICT (id) DO UPDATE SET
         category_id = EXCLUDED.category_id,
         name = EXCLUDED.name,
         slug = EXCLUDED.slug,
         description = EXCLUDED.description,
         long_description = EXCLUDED.long_description,
         image = EXCLUDED.image,
         benefits = EXCLUDED.benefits,
         rating = EXCLUDED.rating,
         review_count = EXCLUDED.review_count,
         updated_at = NOW()`,
      [
        product.id,
        categoryId,
        product.name,
        `${slugify(product.name)}-${product.id}`,
        product.description,
        product.longDescription ?? null,
        product.image,
        JSON.stringify(product.benefits ?? []),
        product.rating,
        product.reviews,
      ],
    )

    for (const variant of product.variants) {
      const amount = variant.pricing.type === 'fixed' ? variant.pricing.amount : 0
      await client.query(
        `INSERT INTO product_variants
           (id, product_id, label, measurement_value, measurement_unit, pricing_type, price, stock_quantity, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE SET
           product_id = EXCLUDED.product_id,
           label = EXCLUDED.label,
           measurement_value = EXCLUDED.measurement_value,
           measurement_unit = EXCLUDED.measurement_unit,
           pricing_type = EXCLUDED.pricing_type,
           price = EXCLUDED.price,
           stock_quantity = EXCLUDED.stock_quantity,
           is_active = EXCLUDED.is_active,
           updated_at = NOW()`,
        [
          variant.id,
          product.id,
          variant.label,
          variant.measurement.value,
          variant.measurement.unit,
          variant.pricing.type,
          amount,
          variant.inStock ? 100 : 0,
          variant.inStock,
        ],
      )
    }
  }
}

async function main() {
  const pool = new Pool({
    connectionString: loadDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
    max: 1,
  })
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    await client.query(fs.readFileSync(path.join(process.cwd(), 'database', 'schema.sql'), 'utf8'))
    await seedCatalog(client)
    await client.query('COMMIT')

    const result = await client.query(`
      SELECT
        (SELECT COUNT(*)::int FROM categories) AS categories,
        (SELECT COUNT(*)::int FROM products) AS products,
        (SELECT COUNT(*)::int FROM product_variants) AS variants
    `)
    console.log('Database seeded:', result.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch(error => {
  console.error('Database seed failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
