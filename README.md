# Nariyal Co. - Premium Coconut Products Ecommerce

A modern, premium ecommerce website for Nariyal Co., a natural coconut products brand built with Next.js, TypeScript, React, and Tailwind CSS.

## Features

### Core Pages
- **Home** (`/`) - Hero section, categories, best-selling products, testimonials, newsletter
- **Shop** (`/shop`) - Product catalog with filtering and sorting
- **Product Details** (`/product/[id]`) - Detailed product view with add to cart
- **Category** (`/category/[category]`) - Category-specific product listings
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Checkout form with order summary
- **Wishlist** (`/wishlist`) - Saved favorite products
- **About** (`/about`) - Brand story and values
- **Contact** (`/contact`) - Contact form and information
- **Admin** (`/admin`) - Admin dashboard with product, order, and customer management

### Design Features
- Premium green color palette (Forest Green, Sage Green)
- Clean, modern typography
- Rounded cards with soft shadows
- Smooth hover animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Sticky header with mobile menu
- Professional ecommerce appearance

### Component Architecture
- Reusable, composable components
- Clean component structure
- Type-safe with TypeScript
- No unnecessary dependencies

### Mock Data
- 8 sample products with ratings and reviews
- 4 product categories
- Mock cart, wishlist, and order data
- Admin dashboard with sample statistics

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Patterns**: React Hooks

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd nariyal-co
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
nariyal-co/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── page.tsx                 # Home page
│   ├── shop/                    # Shop page
│   ├── product/[id]/            # Product details page
│   ├── category/[category]/     # Category page
│   ├── cart/                    # Cart page
│   ├── checkout/                # Checkout page
│   ├── wishlist/                # Wishlist page
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   └── admin/                   # Admin dashboard
├── components/                   # React components
│   ├── Header.tsx               # Navigation header
│   ├── Hero.tsx                 # Hero section
│   ├── CategoryCard.tsx          # Category card component
│   ├── CategorySection.tsx       # Category grid section
│   ├── ProductCard.tsx           # Product card component
│   ├── ProductGrid.tsx           # Product grid with filtering
│   ├── ProductFilter.tsx         # Product filter & sort controls
│   ├── OfferBanner.tsx           # Promotional banner
│   ├── Testimonials.tsx          # Customer testimonials
│   ├── Newsletter.tsx            # Newsletter signup
│   └── Footer.tsx                # Footer section
├── lib/                          # Utility functions and data
│   ├── products.ts              # Product data and functions
│   ├── categories.ts            # Category data
│   └── cart.ts                  # Cart state management
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Key Features

### Product Management
- View all products with detailed information
- Filter products by category
- Sort by price, rating, and newest
- Add/remove from cart and wishlist
- Product ratings and review counts

### Shopping Experience
- Responsive product grid (1-4 columns based on screen size)
- Smooth animations and transitions
- Add to cart with visual feedback
- Wishlist functionality
- Search and filter capabilities

### Admin Dashboard
- Overview with key metrics
- Product management (view, add, edit, delete)
- Order management with status tracking
- Customer list and statistics
- Sales overview and charts (placeholders)

### Design System
- Consistent spacing and sizing
- Custom color palette with CSS variables
- Reusable button styles (primary, secondary, outline)
- Smooth animations (fade-in, slide-up, float)
- Soft shadows for depth

## Color Palette

- **Forest Green**: `#2d7860` (Primary)
- **Sage Green**: `#85b791` (Secondary)
- **Coconut Beige**: `#e8dcc8` (Accent)
- **White**: `#ffffff` (Background)
- **Dark Coconut**: `#2d1810` (Text)

## Responsive Breakpoints

- Mobile: < 640px (1-2 product columns)
- Tablet: 640px - 1024px (2-3 product columns)
- Desktop: 1024px+ (4 product columns)

## Future Enhancements

- Backend API integration for real products and orders
- User authentication and accounts
- Real payment processing
- Email notifications
- Inventory management
- Order tracking
- Advanced analytics
- Customer reviews and ratings
- Product recommendations
- Multi-language support

## Performance

- Optimized images with Next.js Image component
- Code splitting with dynamic imports
- Tailwind CSS purging for minimal bundle size
- SEO optimized with proper meta tags
- Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Nariyal Co. All rights reserved.

## Support

For issues, feature requests, or questions, please contact: info@nariyal.co

---

Built with ❤️ for Nariyal Co. - Premium Coconut Products
