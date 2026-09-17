# Nariyal Co. - Setup & Development Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git (optional)

### Installation Steps

1. **Navigate to project:**
   ```bash
   cd nariyal-co
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Routes

### Public Pages
- `/` - Homepage with hero, categories, products, testimonials
- `/shop` - Full product shop with filtering and sorting
- `/product/[id]` - Individual product details page
- `/category/[category]` - Category-specific product listing
- `/cart` - Shopping cart page
- `/checkout` - Checkout form and order summary
- `/wishlist` - Saved products wishlist
- `/about` - About us page
- `/contact` - Contact form page

### Admin Pages
- `/admin` - Admin dashboard with analytics and management

## File Structure

```
components/
├── Header.tsx              # Sticky navigation header
├── Hero.tsx                # Landing hero section
├── CategoryCard.tsx         # Reusable category card
├── CategorySection.tsx      # Category grid section
├── ProductCard.tsx          # Reusable product card
├── ProductGrid.tsx          # Product grid with filter/sort
├── ProductFilter.tsx        # Filter and sort controls
├── OfferBanner.tsx          # Promotional banner
├── Testimonials.tsx         # Customer testimonials
├── Newsletter.tsx           # Newsletter signup
└── Footer.tsx               # Site footer

lib/
├── products.ts              # Product data and functions
├── categories.ts            # Category data
└── cart.ts                  # Cart state management

app/
├── page.tsx                 # Home page
├── layout.tsx               # Root layout wrapper
├── globals.css              # Global styles
├── shop/page.tsx            # Shop page
├── product/[id]/page.tsx    # Product page
├── category/[category]/page.tsx  # Category page
├── cart/page.tsx            # Cart page
├── checkout/page.tsx        # Checkout page
├── wishlist/page.tsx        # Wishlist page
├── about/page.tsx           # About page
├── contact/page.tsx         # Contact page
└── admin/page.tsx           # Admin dashboard
```

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.3
- **Icons:** Lucide React 0.294
- **UI:** React 18.2

## Development Tips

### Adding New Products
Edit `/lib/products.ts` to add new products to the mock data:

```typescript
{
  id: '9',
  name: 'New Product',
  description: 'Product description',
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviews: 150,
  image: 'image-url',
  category: 'coconut-oil',
  badge: 'NEW',
  inStock: true,
}
```

### Adding New Categories
Edit `/lib/categories.ts`:

```typescript
{
  id: 'cat-5',
  name: 'New Category',
  slug: 'new-category',
  description: 'Category description',
  image: 'image-url',
}
```

### Customizing Colors
Edit `tailwind.config.ts` to modify the color palette:

```typescript
colors: {
  forest: { /* forest green shades */ },
  sage: { /* sage green shades */ },
  coconut: { /* beige shades */ },
}
```

### Adding New Components
1. Create component file in `/components`
2. Use TypeScript for type safety
3. Export as default
4. Import in pages as needed

Example:
```typescript
// components/NewComponent.tsx
export default function NewComponent() {
  return <div>Content</div>
}

// In a page:
import NewComponent from '@/components/NewComponent'
```

## Styling Guidelines

### Utility Classes
- Use Tailwind CSS for styling
- Custom utilities available in `globals.css`:
  - `.btn-primary` - Primary button style
  - `.btn-secondary` - Secondary button
  - `.btn-outline` - Outline button
  - `.card-base` - Base card style
  - `.card-hover` - Card with hover effect
  - `.container-custom` - Max-width container

### Colors Used
- **Primary:** `forest-600` (#2d7860)
- **Secondary:** `sage-600` (#6fa17f)
- **Light backgrounds:** `sage-50`, `coconut-light`
- **Dark backgrounds:** `forest-900`, `forest-800`

### Animations
- `animate-fade-in` - Fade in animation
- `animate-slide-up` - Slide up animation
- `animate-float` - Floating animation
- `.stagger` - Staggered animation for children

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Deploy with one click

Visit [vercel.com](https://vercel.com) for more info.

## API Integration Notes

This is currently a frontend-only project with mock data. To integrate a real backend:

1. Replace mock data in `/lib/products.ts` with API calls
2. Use `fetch` or `axios` for API requests
3. Implement proper error handling
4. Add loading states
5. Consider using React Query or SWR for data fetching

Example:
```typescript
// Before (mock data):
export const products = [...]

// After (API):
export async function getProducts() {
  const res = await fetch('/api/products')
  return res.json()
}
```

## Environment Variables

Create `.env.local` for local development (git-ignored):

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=your-database-url
```

## Common Issues & Solutions

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### TypeScript Errors
```bash
npx tsc --noEmit
```

### Module Not Found
```bash
npm install
```

### Build Takes Too Long
- Check for unnecessary imports
- Use dynamic imports for heavy components
- Clear `.next` folder: `rm -r .next`

## Performance Tips

1. Use dynamic imports for heavy components
2. Optimize images with Next.js Image component
3. Implement code splitting
4. Monitor bundle size: `npm run build -- --analyze`
5. Use React DevTools Profiler

## Security Considerations

When connecting to a backend:
- Never expose API keys in frontend code
- Use environment variables for sensitive data
- Implement proper authentication
- Validate all user inputs
- Use HTTPS in production
- Implement CORS properly

## Testing

To add testing:

```bash
npm install --save-dev jest @testing-library/react
```

Create test files with `.test.tsx` extension.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React Icons](https://lucide.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support & Troubleshooting

For issues:
1. Check the README.md for general info
2. Review the error message carefully
3. Check Next.js and Tailwind documentation
4. Clear cache: `rm -r .next node_modules`
5. Reinstall: `npm install`

## Next Steps

1. ✅ Project created and running
2. 📋 Customize products in `/lib/products.ts`
3. 🎨 Adjust colors in `tailwind.config.ts`
4. 🔌 Connect to backend API
5. 🚀 Deploy to production

---

Happy coding! 🥥
