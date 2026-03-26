# Component Style Guide - Logoland Promos

## Design System Overview

This guide documents the visual design patterns and component conventions used throughout the Logoland Promos website.

## Color System

### Color Usage Rules

#### Primary Brand (Emerald Green)
Use for:
- Primary buttons and CTAs
- Focus states and active elements
- Navigation highlights
- Brand text and logos

```tailwind
bg-brand-500 hover:bg-brand-600
text-brand-500
border-brand-500
```

#### Accent (Amber/Gold)
Use for:
- Secondary emphasis
- Decorative accents
- Gradient highlights
- Premium/special indicators

```tailwind
bg-accent-500 hover:bg-accent-600
text-accent-500
border-accent-500
```

#### Dark Theme
- `dark-950` (#030712): Main background, full page
- `dark-900` (#020617): Secondary background, large sections
- `dark-800` (#0f172a): Card backgrounds, containers
- `dark-700` (#1e293b): Elevated elements, input backgrounds

### Text Colors
- **Primary text:** `text-white`
- **Secondary text:** `text-gray-400`
- **Disabled text:** `text-gray-600`
- **Brand text:** `text-brand-500`

## Typography

### Heading Hierarchy

```html
<h1 class="text-5xl font-bold">Page Title (54px)</h1>
<h2 class="text-4xl font-bold">Section Title (48px)</h2>
<h3 class="text-2xl font-semibold">Subsection (28px)</h3>
<h4 class="text-lg font-semibold">Card Title (18px)</h4>
<p class="text-base leading-relaxed">Body text (16px)</p>
<small class="text-sm text-gray-400">Small text (14px)</small>
```

### Font Families

- **Primary:** `Inter` (body text, common use)
- **Secondary:** `Plus Jakarta Sans` (headings, accents)

Usage:
```tailwind
font-inter      /* Default, applied globally */
font-plus-jakarta   /* Headings and special cases */
```

## Component Patterns

### Buttons

#### Primary Button
```html
<button class="px-6 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors duration-200">
  Primary Button
</button>
```

#### Secondary Button
```html
<button class="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors duration-200 border border-white/20">
  Secondary Button
</button>
```

#### Icon Button
```html
<button class="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200">
  <SearchIcon class="w-5 h-5" />
</button>
```

### Cards

#### Glass Card
```html
<div class="glass-card rounded-2xl">
  <h3 class="text-xl font-semibold text-white mb-2">Card Title</h3>
  <p class="text-gray-400">Card content goes here</p>
</div>
```

#### Dark Card
```html
<div class="bg-dark-800 rounded-xl p-6 border border-white/10">
  <h3 class="text-lg font-semibold text-white">Title</h3>
  <p class="text-gray-400">Content</p>
</div>
```

### Forms

#### Input Field
```html
<input
  type="email"
  placeholder="Enter email"
  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors duration-200"
/>
```

#### Form Group
```html
<div class="space-y-2">
  <label class="text-sm font-medium text-white">Field Label</label>
  <input type="text" class="form-input" />
  <p class="text-xs text-gray-500">Helper text</p>
</div>
```

### Navigation

#### Navigation Link
```html
<a href="/path" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200">
  Link
</a>
```

#### Active Link
```html
<a href="/current" class="px-3 py-2 rounded-lg text-sm font-medium text-white bg-white/10 border border-brand-500/50">
  Active Link
</a>
```

## Glass Morphism Effects

### Implementation
```tailwind
.glass {
  @apply bg-white/10 backdrop-blur-2xl border border-white/20;
}

.glass-card {
  @apply glass rounded-2xl p-6 hover:bg-white/15 transition-all duration-300;
}
```

### Usage
```html
<div class="glass p-6 rounded-xl">
  <h3 class="text-white font-semibold">Glass Effect</h3>
</div>
```

## Animations & Transitions

### Transition Durations
- **Quick actions:** `duration-150`
- **Standard:** `duration-200`
- **Smooth:** `duration-300`
- **Slow:** `duration-350`

### Common Transitions
```tailwind
transition-colors duration-200      /* Color changes */
transition-all duration-300         /* All properties */
transition-opacity duration-200     /* Fade effects */
transition-transform duration-300   /* Movement */
```

### Animations
```tailwind
animate-in fade-in duration-200     /* Fade in effect */
animate-in slide-in-from-top duration-200  /* Slide down */
animate-pulse-glow                  /* Pulsing glow */
```

## Spacing System

Use Tailwind's default spacing scale:
- `p-2, p-3, p-4, p-6, p-8` — Padding
- `m-2, m-4, m-6, m-8` — Margin
- `gap-4, gap-6, gap-8` — Gap between items
- `space-y-2, space-y-4, space-y-6` — Vertical spacing

### Container Padding
```tailwind
px-4 sm:px-6 lg:px-8   /* Responsive horizontal padding */
py-12 sm:py-16 lg:py-20  /* Responsive vertical padding */
```

## Borders & Dividers

### Border Colors
```tailwind
border-white/10         /* Subtle dividers */
border-white/20         /* Medium emphasis */
border-brand-500        /* Accent borders */
border-gray-700         /* Dark borders */
```

### Border Styles
```html
<!-- Subtle top border -->
<div class="border-t border-white/10"></div>

<!-- Full border with glass -->
<div class="border border-white/20 glass rounded-lg"></div>

<!-- Gradient border effect (using shadow) -->
<div class="border-l-2 border-brand-500"></div>
```

## Hover States

### Standard Hover Pattern
```tailwind
hover:text-white        /* Text color change */
hover:bg-white/5        /* Background lightening */
hover:border-brand-500  /* Border highlight */
transition-colors duration-200  /* Smooth transition */
```

### With Glow Effect
```html
<button class="hover-glow px-6 py-3 bg-brand-500 text-white rounded-lg">
  Glowing Button
</button>
```

## Responsive Design Patterns

### Mobile-First Approach
```tailwind
<!-- Start with mobile styling -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Hidden on mobile, visible on desktop -->
<div class="hidden lg:block">
  Desktop only content
</div>

<!-- Full width on mobile, contained on desktop -->
<div class="w-full max-w-7xl mx-auto">
  Container content
</div>
```

### Grid Layouts
```html
<!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Items -->
</div>
```

### Flex Layouts
```html
<!-- Stack vertically on mobile, horizontally on desktop -->
<div class="flex flex-col lg:flex-row items-center gap-6">
  <!-- Items -->
</div>
```

## Accessibility Patterns

### Focus States
```tailwind
focus:outline-none
focus:ring-2
focus:ring-brand-500
ring-offset-2
ring-offset-dark-950
```

### Semantic HTML
```html
<nav>Navigation links</nav>
<article>Main content</article>
<footer>Footer content</footer>
<button>Interactive element</button>
```

### ARIA Labels
```html
<button aria-label="Close menu">
  <XIcon />
</button>
```

## Component Composition

### Max Width Container
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Section Pattern
```html
<section class="py-12 sm:py-16 lg:py-20 bg-dark-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-4xl font-bold mb-12">Section Title</h2>
    <!-- Content -->
  </div>
</section>
```

## Icon Usage

All icons from lucide-react:

```tsx
import { Icon } from 'lucide-react';

<Icon className="w-5 h-5" />  // Standard size
<Icon className="w-6 h-6" />  // Large
<Icon className="w-4 h-4" />  // Small
```

### Icon Sizes
- Small (inline): `w-4 h-4`
- Standard: `w-5 h-5`
- Large (buttons): `w-6 h-6`
- Extra large (hero): `w-12 h-12`

## Best Practices

1. **Consistency:** Use the same component patterns throughout
2. **Spacing:** Never hardcode padding/margins; use the spacing system
3. **Colors:** Always use the defined color palette
4. **Transitions:** Add smooth transitions to interactive elements
5. **Accessibility:** Use semantic HTML and ARIA labels
6. **Responsive:** Test on mobile, tablet, and desktop
7. **Typography:** Follow the heading hierarchy
8. **Performance:** Use CSS classes instead of inline styles

## Dark Mode Implementation

All components are designed for dark mode by default:
- Dark backgrounds: Use from dark-* palette
- Text: White or gray-* shades
- Borders: White/10 or white/20 for subtle dividers
- Accents: Use brand and accent colors

## Customization Guide

### Adding New Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  custom: {
    400: '#...',
    500: '#...',
  }
}
```

### Adding New Fonts
Edit `src/app/layout.tsx`:
```tsx
const newFont = NewFont({
  subsets: ['latin'],
  variable: '--font-new',
});
```

### Adding New Utilities
Edit `src/styles/globals.css`:
```css
@layer components {
  .new-utility {
    @apply /* classes */;
  }
}
```

This style guide ensures consistency and maintainability across all components.
