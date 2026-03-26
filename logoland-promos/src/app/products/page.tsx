"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Search, X, Menu, Star, ShoppingCart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { products, searchProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { useCart } from "@/lib/cart";
import type { Product } from "@/data/products";

type SortOption = "featured" | "price-low" | "price-high" | "name" | "newest" | "rating";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const { addItem } = useCart();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = getAllCategories();
  const itemsPerPage = 12;

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let results = products;

    // Search filter
    if (searchQuery.trim()) {
      results = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Price filter
    results = results.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        results.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured ? 1 : -1;
          return parseInt(b.id) - parseInt(a.id);
        });
        break;
    }

    return results;
  }, [searchQuery, selectedCategories, minPrice, maxPrice, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, product.minQuantity);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(100);
    setSortBy("featured");
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
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
            <span className="text-brand-400">Products</span>
          </div>
        </div>
      </div>

      {/* Page Title and Search */}
      <div className="border-b border-dark-800 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-6">Our Products</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-600" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-dark-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-600 hover:text-dark-400"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                {(selectedCategories.length > 0 || minPrice > 0 || maxPrice < 100) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6 pb-6 border-b border-dark-700">
                <h3 className="font-semibold text-sm mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => handleCategoryToggle(category.name)}
                        className="w-4 h-4 rounded border-dark-600 bg-dark-800 checked:bg-brand-500 checked:border-brand-500 cursor-pointer"
                      />
                      <span className="text-sm text-dark-300 group-hover:text-white transition-colors">
                        {category.name}
                      </span>
                      <span className="text-xs text-dark-600 ml-auto">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b border-dark-700">
                <h3 className="font-semibold text-sm mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-dark-400 block mb-2">
                      Min Price: ${minPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-dark-400 block mb-2">
                      Max Price: ${maxPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-sm mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg w-full justify-center hover:bg-brand-600 transition-colors"
            >
              <Menu size={20} />
              Filters & Sort
            </button>

            {/* Mobile Filters Sheet */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-40 bg-black/50 lg:hidden">
                <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-dark-900 p-6 overflow-y-auto">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="absolute top-4 right-4"
                  >
                    <X size={24} />
                  </button>

                  <h2 className="text-lg font-semibold mb-6">Filters</h2>

                  {/* Categories */}
                  <div className="mb-6 pb-6 border-b border-dark-700">
                    <h3 className="font-semibold text-sm mb-4">Categories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => {
                              handleCategoryToggle(category.name);
                              setShowMobileFilters(false);
                            }}
                            className="w-4 h-4 rounded border-dark-600 bg-dark-800"
                          />
                          <span className="text-sm">
                            {category.name} ({category.productCount})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Price Range */}
                  <div className="mb-6 pb-6 border-b border-dark-700">
                    <h3 className="font-semibold text-sm mb-4">Price Range</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-dark-400 block mb-2">
                          Min: ${minPrice}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-dark-400 block mb-2">
                          Max: ${maxPrice}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Sort */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-sm mb-4">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as SortOption);
                        setShowMobileFilters(false);
                      }}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Best Rating</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full px-4 py-3 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-400">
                Showing <span className="text-white font-semibold">{startIdx + 1}</span>-
                <span className="text-white font-semibold">
                  {Math.min(endIdx, filteredProducts.length)}
                </span>{" "}
                of <span className="text-white font-semibold">{filteredProducts.length}</span> products
              </p>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="glass-card overflow-hidden hover-glow group h-full flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 h-48 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={cn(
                            "w-32 h-32 rounded-lg flex items-center justify-center text-center text-sm font-semibold text-white",
                            product.category === "Apparel" && "bg-gradient-to-br from-brand-500 to-brand-700",
                            product.category === "Drinkware" && "bg-gradient-to-br from-accent-500 to-accent-700",
                            product.category === "Tech" && "bg-gradient-to-br from-brand-600 to-accent-400",
                            product.category === "Bags" && "bg-gradient-to-br from-dark-700 to-brand-600",
                            product.category === "Writing" && "bg-gradient-to-br from-accent-600 to-brand-500",
                            product.category === "Office" && "bg-gradient-to-br from-dark-600 to-dark-800",
                            product.category === "Outdoor" && "bg-gradient-to-br from-brand-400 to-dark-700",
                            product.category === "Wellness" && "bg-gradient-to-br from-brand-500 to-accent-500",
                          )}>
                            {product.name}
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {product.featured && (
                          <div className="absolute top-3 right-3 bg-accent-500 text-dark-950 px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        )}

                        {/* Best Seller Badge */}
                        {product.bestSeller && (
                          <div className="absolute top-3 left-3 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Best Seller
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-3">
                          <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-brand-400 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold px-2 py-1 bg-dark-800 rounded text-dark-300">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          {renderStars(product.rating)}
                          <span className="text-xs text-dark-500">
                            ({product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mb-4 mt-auto">
                          <p className="text-2xl font-bold text-brand-400 mb-1">
                            {formatPrice(product.price)}
                          </p>
                          <p className="text-xs text-dark-500">
                            Min. {product.minQuantity} units
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dark-700 rounded-lg text-white hover:bg-dark-800 transition-colors text-sm"
                          >
                            <Eye size={16} />
                            <span className="hidden sm:inline">Quick View</span>
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-semibold text-sm"
                          >
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-dark-700 rounded-lg hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={cn(
                            "w-10 h-10 rounded-lg font-semibold transition-colors",
                            currentPage === i + 1
                              ? "bg-brand-500 text-white"
                              : "border border-dark-700 text-dark-400 hover:bg-dark-800"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-dark-700 rounded-lg hover:bg-dark-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-400 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
