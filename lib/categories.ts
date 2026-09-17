export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon?: string
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Food & Beverages',
    slug: 'food-beverages',
    description: 'Coconut products for cooking, baking, and nutrition',
    icon: '🥥',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
  {
    id: 'cat-2',
    name: 'Virgin Coconut Oil',
    slug: 'virgin-coconut-oil',
    description: '100% Pure, Cold-Pressed, Multi-Purpose Oil',
    icon: '🫶',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
  {
    id: 'cat-3',
    name: 'Health Supplements',
    slug: 'health-supplements',
    description: 'Premium coconut supplements for wellness',
    icon: '💊',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
  {
    id: 'cat-4',
    name: 'Baby Care',
    slug: 'baby-care',
    description: 'Gentle, safe coconut products for infants',
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
  {
    id: 'cat-5',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Natural coconut oil for healthy, shiny hair',
    icon: '💇',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
  {
    id: 'cat-6',
    name: 'Skin Care',
    slug: 'skin-care',
    description: 'Premium coconut care for glowing skin',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1585518419759-49c4a68a6b0b?w=500&h=500&fit=crop',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id)
}