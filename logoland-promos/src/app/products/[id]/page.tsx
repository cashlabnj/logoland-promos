"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { ChevronRight, Star, Heart, Minus, Plus, MessageSquare, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/lib/cart";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = getProductById(id);
  const { addItem } = useCart();

  // State management
  const [quantity, setQuantity] = useState(product?.minQuantity || 1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [customText, setCustomText] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-brand-400 hover:text-brand-300">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const getColorValue = (colorName: string) => {
    const colorMap: Record<string, string> = {
      "Black": "#1f2937",
      "White": "#f3f4f6",
      "Navy": "#001f3f",
      "Red": "#dc2626",
      "Charcoal Gray": "#374151",
      "Golf Green": "#10b981",
      "Burgundy": "#800020",
      "Heather Gray": "#9ca3af",
      "Royal Blue": "#4338ca",
      "Silver": "#c0c0c0",
      "Rose Gold": "#b76e79",
      "Natural": "#d4a574",
      "Forest Green": "#15803d",
      "Matte Blue": "#0369a1",
      "Matte Green": "#059669",
      "Stainless Steel": "#bfdbfe",
      "Emerald Green": "#10b981",
      "Blue": "#3b82f6",
      "Gray": "#6b7280",
      "Brown": "#92400e",
      "Neon Mix": "#fbbf24",
      "Pastel Mix": "#fcd34d",
      "Natural Wood": "#d4a574",
      "Dark Walnut": "#5c4033",
      "Black Frame": "#1f2937",
      "Silver Frame": "#c0c0c0",
      "Blue Frame": "#3b82f6",
      "Red Plaid": "#dc2626",
      "Blue Plaid": "#3b82f6",
      "Green Plaid": "#10b981",
      "Clear": "#dbeafe",
      "Aloe": "#86efac",
      "Cherry": "#fca5a5",
      "Mint": "#a7f3d0",
      "Vanilla": "#fef08a",
      "Yellow": "#fbbf24",
      "Orange": "#fb923c",
      "Purple": "#d8b4fe",
      "Pink": "#fbcfe8",
      "Khaki": "#fef08a",
    };
    return colorMap[colorName] || "#6b7280";
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize, customText);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              i < Math.floor(rating)
                ? "fill-accent-400 text-accent-400"
                : "text-dark-700"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Breadcrumb */}
      <div className="border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-dark-400 hover:text-brand-400 transition-colors">
              Home
            </Link>
            <ChevronRight size={16} className="text-dark-600" />
            <Link href="/products" className="text-dark-400 hover:text-brand-400 transition-colors">
              Products
            </Link>
            <ChevronRight size={16} className="text-dark-600" />
            <span className="text-brand-400">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Product Image */}
          <div className="flex flex-col gap-4">
            <div className="glass-card overflow-hidden h-96 flex items-center justify-center bg-white">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.className = "glass-card overflow-hidden h-96 flex items-center justify-center";
                    target.parentElement.innerHTML = `<div class="w-64 h-64 rounded-lg flex items-center justify-center text-center text-xl font-bold text-white bg-gradient-to-br from-dark-700 to-dark-900 p-4">${product.name}</div>`;
                  }
                }}
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              <div className="glass-card h-20 overflow-hidden cursor-pointer border-2 border-brand-400">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {[2, 3, 4].map((i) => (
                <div key={i} className="glass-card h-20 flex items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
                  <span className="text-xs text-dark-600">View {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="flex flex-col gap-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 bg-dark-800 rounded-full text-xs font-semibold text-dark-300 mb-4">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-dark-400">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="py-6 border-t border-b border-dark-700">
              <div className="mb-2">
                <p className="text-sm text-dark-400 mb-2">Starting price at minimum order</p>
                <p className="text-5xl font-bold text-brand-400">
                  {formatPrice(product.price)}
                </p>
              </div>
              <p className="text-sm text-dark-400">
                Minimum order: <span className="font-semibold text-white">{product.minQuantity} units</span>
              </p>
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all",
                        selectedColor === color
                          ? "border-brand-400 bg-brand-400/10"
                          : "border-dark-700 hover:border-dark-600"
                      )}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-dark-600"
                        style={{ backgroundColor: getColorValue(color) }}
                      />
                      <span className="text-sm">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 font-semibold transition-all",
                        selectedSize === size
                          ? "border-brand-400 bg-brand-400 text-dark-950"
                          : "border-dark-700 text-white hover:border-dark-600"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Text Input */}
            <div>
              <h3 className="font-semibold mb-3">Custom Imprint Text (Optional)</h3>
              <input
                type="text"
                placeholder="Enter your custom text..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-dark-600"
                maxLength={50}
              />
              <p className="text-xs text-dark-500 mt-2">{customText.length}/50 characters</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(product.minQuantity, quantity - 1))}
                  className="p-2 border border-dark-700 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <Minus size={20} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || product.minQuantity;
                    setQuantity(Math.max(product.minQuantity, val));
                  }}
                  className="w-20 px-3 py-2 text-center bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-dark-700 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <Plus size={20} />
                </button>
                <span className="text-sm text-dark-400 ml-4">
                  {quantity === product.minQuantity ? "(minimum)" : `(+${quantity - product.minQuantity})`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-4 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "px-6 py-4 rounded-lg border-2 font-semibold transition-colors",
                  isWishlisted
                    ? "border-accent-400 bg-accent-400 text-dark-950"
                    : "border-dark-700 text-white hover:border-accent-400"
                )}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Request Quote Button */}
            <button className="w-full px-6 py-3 border-2 border-dark-700 text-white rounded-lg font-semibold hover:border-accent-400 hover:text-accent-400 transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={20} />
              Request Quote
            </button>

            {/* Product Highlights */}
            <div className="glass-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-dark-400 mb-1">Customization Options</p>
                  <p className="font-semibold text-sm">{product.customization.length}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400 mb-1">Available Colors</p>
                  <p className="font-semibold text-sm">{product.colors.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">About This Product</h2>
          <p className="text-dark-300 leading-relaxed">{product.description}</p>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex gap-4 mb-6 border-b border-dark-800 overflow-x-auto">
            {[
              { id: "details", label: "Details" },
              { id: "customization", label: "Customization Options" },
              { id: "shipping", label: "Shipping Info" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-brand-400 text-brand-400"
                    : "border-transparent text-dark-400 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card p-8">
            {activeTab === "details" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm text-dark-400 mb-1">Category</dt>
                    <dd className="font-semibold">{product.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-dark-400 mb-1">Rating</dt>
                    <dd className="font-semibold flex items-center gap-2">
                      {renderStars(product.rating)} {product.rating}/5
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-dark-400 mb-1">Minimum Order</dt>
                    <dd className="font-semibold">{product.minQuantity} units</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-dark-400 mb-1">Review Count</dt>
                    <dd className="font-semibold">{product.reviewCount} reviews</dd>
                  </div>
                </dl>

                {product.tags.length > 0 && (
                  <div className="mt-6">
                    <dt className="text-sm text-dark-400 mb-3">Tags</dt>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-dark-800 rounded-full text-xs text-dark-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "customization" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Available Customization Options</h3>
                <ul className="space-y-3">
                  {product.customization.map((option, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-400 mt-2 flex-shrink-0" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-dark-400 mt-6 pt-6 border-t border-dark-700">
                  For custom design requirements and artwork specifications, please <Link href="/contact" className="text-brand-400 hover:text-brand-300">contact our design team</Link>.
                </p>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start pb-3 border-b border-dark-700">
                    <span>Production Time</span>
                    <span className="font-semibold">5-7 business days</span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-dark-700">
                    <span>Shipping Method</span>
                    <span className="font-semibold">Ground, 2-Day, Overnight</span>
                  </div>
                  <div className="flex justify-between items-start pb-3 border-b border-dark-700">
                    <span>Free Shipping Threshold</span>
                    <span className="font-semibold">Orders over $500</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span>International Shipping</span>
                    <span className="font-semibold">Available - Contact for quote</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="glass-card overflow-hidden hover-glow group"
                >
                  <div className="bg-white h-40 overflow-hidden">
                    <img
                      src={related.imageUrl}
                      alt={related.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.className = "bg-gradient-to-br from-dark-800 to-dark-900 h-40 flex items-center justify-center";
                          target.parentElement.innerHTML = `<div class="w-28 h-28 rounded-lg flex items-center justify-center text-center text-xs font-semibold text-white bg-gradient-to-br from-dark-700 to-dark-900">${related.name}</div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-brand-400 transition-colors">
                      {related.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-brand-400">
                        {formatPrice(related.price)}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-accent-400 text-accent-400" />
                        <span className="text-xs text-dark-400">{related.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
