'use client';

import Link from 'next/link';
import {
  ShirtIcon,
  GlassWater,
  Cpu,
  Backpack,
  PenTool,
  Briefcase,
  Sun,
  Heart,
  ArrowRight,
  Star,
  Check,
  Users,
  Zap,
  Mail,
  ShoppingCart,
  Award,
  Sparkles,
} from 'lucide-react';
import { getCategoriesWithCounts } from '@/data/categories';
import { getFeaturedProducts } from '@/data/products';
import { formatPrice } from '@/lib/utils';

// Icon mapping for categories
const iconMap: Record<string, React.ReactNode> = {
  ShirtIcon: <ShirtIcon className="w-8 h-8" />,
  GlassWater: <GlassWater className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Backpack: <Backpack className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Briefcase: <Briefcase className="w-8 h-8" />,
  Sun: <Sun className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

export default function Home() {
  const categories = getCategoriesWithCounts();
  const featuredProducts = getFeaturedProducts();

  // Get product icon colors for visual variety
  const getProductIconColor = (index: number) => {
    const colors = [
      'bg-emerald-500/20 text-emerald-400',
      'bg-amber-500/20 text-amber-400',
      'bg-blue-500/20 text-blue-400',
      'bg-purple-500/20 text-purple-400',
      'bg-pink-500/20 text-pink-400',
      'bg-cyan-500/20 text-cyan-400',
      'bg-orange-500/20 text-orange-400',
      'bg-rose-500/20 text-rose-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(78, 173, 128, 0.05) 25%, rgba(78, 173, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(78, 173, 128, 0.05) 75%, rgba(78, 173, 128, 0.05) 76%, transparent 77%, transparent),
                              linear-gradient(90deg, transparent 24%, rgba(78, 173, 128, 0.05) 25%, rgba(78, 173, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(78, 173, 128, 0.05) 75%, rgba(78, 173, 128, 0.05) 76%, transparent 77%, transparent)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-400/10 border border-brand-400/30 text-brand-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Trusted by 500+ Brands
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-brand-500 bg-clip-text text-transparent">
              Your Brand.
            </span>
            <br />
            <span className="text-white">Everywhere.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Premium custom promotional products that make your logo unforgettable. From concept to delivery, we bring your brand to life with expert design support and competitive pricing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-300 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Browse Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/design-studio"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 border-2 border-accent-400 hover:bg-accent-400/10"
            >
              <span className="flex items-center gap-2">
                Design Studio
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Floating stats hint */}
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              No minimum on orders
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              Fast 48hr production
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-400" />
              Free design help
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="relative z-20 -mt-8 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <ShoppingCart className="w-6 h-6 text-brand-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">10,000+</div>
            <div className="text-sm text-slate-400">Products Available</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Users className="w-6 h-6 text-accent-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-sm text-slate-400">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">48hrs</div>
            <div className="text-sm text-slate-400">Rush Available</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">Free</div>
            <div className="text-sm text-slate-400">Design Help</div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED CATEGORIES ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Explore our curated selection of premium promotional products across every category
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:border-brand-400/50 transition-all duration-300 p-6 backdrop-blur-sm hover:backdrop-blur-md"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400/0 via-transparent to-brand-400/0 group-hover:from-brand-400/10 group-hover:via-transparent group-hover:to-brand-400/5 transition-all duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getProductIconColor(index)} transition-transform group-hover:scale-110 duration-300`}>
                    {iconMap[category.icon] || <ShirtIcon className="w-6 h-6" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {category.name}
                  </h3>

                  {/* Product count */}
                  <p className="text-sm text-slate-400 mb-4">
                    {category.productCount} products
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-brand-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span className="text-sm font-medium">Browse</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Featured Products
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Bestsellers and customer favorites across all categories
            </p>
          </div>

          {/* Scrollable products grid */}
          <div className="flex overflow-x-auto pb-6 gap-6 scroll-smooth">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:border-brand-400/50 transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
              >
                {/* Product image */}
                <div className="relative h-48 overflow-hidden bg-white">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.className = `relative h-48 flex items-center justify-center overflow-hidden bg-gradient-to-br ${index % 2 === 0 ? 'from-brand-500/30 to-brand-600/20' : 'from-accent-500/30 to-accent-600/20'}`;
                        target.parentElement.innerHTML = `<div class="w-16 h-16 text-white/30"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product info */}
                <div className="p-5">
                  {/* Product name */}
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-accent-400 text-accent-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      ({product.reviewCount})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-white mb-1">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-slate-400">
                      Min. {product.minQuantity} units
                    </p>
                  </div>

                  {/* Add to cart button */}
                  <button className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-brand-400 to-brand-500 text-white font-medium text-sm hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View all button */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-400/50 text-brand-400 hover:bg-brand-400/10 transition-colors duration-300 font-medium"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From selection to delivery in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400/20 to-brand-500/20 border border-brand-400/30 flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-bold text-brand-400">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Choose Your Products
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Browse our extensive catalog of 10,000+ premium promotional items. Filter by category, price, or features to find the perfect fit for your brand.
                </p>
              </div>

              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-brand-400/50 to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400/20 to-accent-500/20 border border-accent-400/30 flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-bold text-accent-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Upload Your Logo
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Use our intuitive design studio to upload your logo and customize placement, colors, and sizing. Our team provides free design support if needed.
                </p>
              </div>

              {/* Connector line (hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent-400/50 to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-bold text-emerald-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  We Deliver
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  We handle production and shipping. Rush orders available within 48 hours. Track your order in real-time from production to delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Additional features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-white/10">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-brand-400/10 text-brand-400">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">48-Hour Rush Production</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Need it fast? Our rush production service gets your order done in 48 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent-400/10 text-accent-400">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Free Design Consultation</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Our design experts review your mockups and provide professional feedback.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-emerald-400/10 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Bulk Discounts Available</h3>
                <p className="text-slate-400 text-sm mt-1">
                  The more you order, the more you save. Competitive pricing on all quantities.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-400/10 text-blue-400">
                  <Check className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Dedicated Account Manager</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Large orders get a personal account manager to ensure smooth delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Trusted by Leading Brands
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              See what our clients say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 hover:border-brand-400/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/0 via-transparent to-brand-400/0 hover:from-brand-400/10 hover:via-transparent hover:to-brand-400/5 transition-all duration-300"></div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-400 text-accent-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  "Logoland Promos made our entire promotional campaign seamless. The quality of the products is exceptional, and their design team went above and beyond to help us get everything perfect."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400/30 to-accent-400/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">JM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Jennifer Miller</p>
                    <p className="text-slate-400 text-xs">CEO, TechStart Solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 hover:border-brand-400/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/0 via-transparent to-brand-400/0 hover:from-brand-400/10 hover:via-transparent hover:to-brand-400/5 transition-all duration-300"></div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-400 text-accent-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  "We've ordered from Logoland for three years running. The consistency in quality and quick turnaround times make them our go-to partner for all promotional merchandise needs."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400/30 to-emerald-400/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">RJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Robert Johnson</p>
                    <p className="text-slate-400 text-xs">Marketing Director, Global Corp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 hover:border-brand-400/50 transition-all duration-300 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/0 via-transparent to-brand-400/0 hover:from-brand-400/10 hover:via-transparent hover:to-brand-400/5 transition-all duration-300"></div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent-400 text-accent-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  "The design studio is incredibly intuitive. We saved months of back-and-forth communication with vendors. Best investment we made for our brand awareness program."
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/30 to-blue-400/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">SL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Sarah Lopez</p>
                    <p className="text-slate-400 text-xs">Founder, Creative Agency Plus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Brand Your Business?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Get started with our design studio today. Free consultation included with every quote.
          </p>

          {/* Email signup form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
            }}
            className="flex flex-col sm:flex-row gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-2 hover:border-brand-400/30 transition-colors"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
