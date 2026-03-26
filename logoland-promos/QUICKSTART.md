# Quick Start Guide - Logoland Promos

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to http://localhost:3000

## File Locations

### Main Components
- **Header:** `/src/components/layout/Header.tsx`
- **Footer:** `/src/components/layout/Footer.tsx`
- **Cart Provider:** `/src/components/providers/CartProvider.tsx`

### Configuration
- **Tailwind:** `/tailwind.config.ts`
- **TypeScript:** `/tsconfig.json`
- **Next.js:** `/next.config.js`

### Styles
- **Global CSS:** `/src/styles/globals.css`

## Using the Cart System

Access the cart context in any component:

```tsx
'use client';

import { useCart } from '@/components/providers/CartProvider';

export default function MyComponent() {
  const { itemCount, items, addItem, removeItem } = useCart();
  
  // Your component code
}
```

## Custom Tailwind Classes

### Glass Effect
```html
<div class="glass">Frosted glass background</div>
<div class="glass-card">Card with glass effect</div>
```

### Gradient Text
```html
<h1 class="text-gradient">Green to gold gradient</h1>
```

### Glow Effect
```html
<button class="hover-glow">Glowing button on hover</button>
```

## Color Usage

### Brand Colors
```tailwind
bg-brand-400   /* Light green #4ade80 */
bg-brand-500   /* Primary green #16a34a */
bg-brand-600   /* Dark green #15803d */
text-brand-500
```

### Accent Colors
```tailwind
bg-accent-400  /* Light amber #fbbf24 */
bg-accent-500  /* Primary amber #f59e0b */
text-accent-400
```

### Dark Colors
```tailwind
bg-dark-700    /* #1e293b */
bg-dark-800    /* #0f172a */
bg-dark-900    /* #020617 */
bg-dark-950    /* #030712 - darkest */
```

## Logo Setup

Add your logo file to `/public/logo.svg`. The Header and Footer will automatically display it.

## Adding New Pages

Create new routes in `/src/app`:

```bash
# Create a new page
mkdir -p src/app/products
touch src/app/products/page.tsx
```

Example page structure:
```tsx
export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Your content */}
    </div>
  );
}
```

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

## Responsive Breakpoints

- `sm:` 640px and up
- `md:` 768px and up
- `lg:` 1024px and up
- `xl:` 1280px and up

Example:
```html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Font Usage

Inter (primary):
```tailwind
font-inter  /* Applied by default */
```

Plus Jakarta Sans (secondary):
```tailwind
font-plus-jakarta
```

## Building & Deployment

### Build for production:
```bash
npm run build
npm start
```

### Deploy to Vercel:
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-deploys on push

The site will be production-ready with optimized images and CSS.

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Clear cache and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [lucide-react Icons](https://lucide.dev)
