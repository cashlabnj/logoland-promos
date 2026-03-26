# Logoland Promos

A modern, dark-themed Next.js promotional products website with custom branded merchandise and design studio capabilities.

## Project Structure

```
src/
├── app/
│   └── layout.tsx              # Root layout with metadata, fonts, and providers
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with navigation and cart
│   │   └── Footer.tsx          # Footer with links, contact, and newsletter
│   └── providers/
│       └── CartProvider.tsx     # Cart context and provider
└── styles/
    └── globals.css             # Global styles and custom utilities
```

## Features

### Header
- Sticky navigation with glass morphism effect on scroll
- Responsive design with mobile hamburger menu
- Expandable search bar
- Shopping cart icon with item count badge
- Navigation links: Home, Products, Design Studio, About, Contact
- Smooth animations and transitions

### Footer
- Company information and contact details
- 4-column footer grid (Products, Company, Support, Connect)
- Newsletter subscription form
- Social media links
- Copyright, privacy policy, and terms of service
- Address: 245 5th Avenue, Suite 1200, New York, NY 10016
- Phone: (212) 555-0187
- Email: hello@logolandpromos.com

### Root Layout
- SEO-optimized metadata
- Google Fonts integration (Inter, Plus Jakarta Sans)
- CartProvider for global cart state
- Proper HTML structure with lang attribute
- Dark theme with custom colors

## Color Scheme

### Primary Colors
- Brand Green: `#16a34a` (brand-500)
- Brand Light Green: `#4ade80` (brand-400)
- Brand Dark Green: `#15803d` (brand-600)

### Accent Colors
- Accent Amber: `#f59e0b` (accent-500)
- Accent Light Amber: `#fbbf24` (accent-400)

### Background Colors
- Dark 950: `#030712`
- Dark 900: `#020617`
- Dark 800: `#0f172a`
- Dark 700: `#1e293b`

## Custom Utilities

### Glass Morphism
```html
<div class="glass">Glass effect with backdrop blur</div>
<div class="glass-card">Card with glass effect and hover state</div>
```

### Gradient Text
```html
<h1 class="text-gradient">Gradient text from green to amber</h1>
```

### Glow Effect
```html
<button class="hover-glow">Button with glow on hover</button>
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Building

```bash
npm run build
npm start
```

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **lucide-react** - Icon library
- **Inter & Plus Jakarta Sans** - Google Fonts

## Environment Setup

Make sure to have:
- Node.js 18+ installed
- Public logo at `/public/logo.svg`

## Responsive Design

All components are fully responsive:
- Mobile: 320px and up
- Tablet: 640px and up
- Desktop: 1024px and up
- Large Desktop: 1280px and up

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)
