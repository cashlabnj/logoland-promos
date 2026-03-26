'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Plus, Minus, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const items = state.items;
  const isEmpty = items.length === 0;

  const handlePromoCode = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      // In a real app, this would validate the promo code
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your Cart
          </h1>
          {!isEmpty && (
            <p className="text-gray-400">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {isEmpty ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-sm">
              Looks like you haven't added any items yet. Start shopping to find
              the perfect branded products for your business.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium hover:from-brand-600 hover:to-brand-700 transition-all duration-200"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          // Cart Contents
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${item.customText}`}
                    className="glass-card p-4 sm:p-6 hover-glow"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-dark-800/50 rounded-lg flex items-center justify-center border border-dark-700/50">
                          <Image
                            src={item.product.imageUrl || '/product-placeholder.svg'}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {item.product.category}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-gray-400 hover:text-accent-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Selected Options */}
                        <div className="space-y-2 mb-4">
                          {item.selectedColor && (
                            <div className="text-sm text-gray-400">
                              <span className="text-gray-300 font-medium">Color:</span>{' '}
                              {item.selectedColor}
                            </div>
                          )}
                          {item.selectedSize && (
                            <div className="text-sm text-gray-400">
                              <span className="text-gray-300 font-medium">Size:</span>{' '}
                              {item.selectedSize}
                            </div>
                          )}
                          {item.customText && (
                            <div className="text-sm text-gray-400">
                              <span className="text-gray-300 font-medium">
                                Custom Text:
                              </span>{' '}
                              "{item.customText}"
                            </div>
                          )}
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex justify-between items-end">
                          <div className="text-right">
                            <p className="text-sm text-gray-400 mb-1">Unit Price</p>
                            <p className="text-lg font-semibold text-accent-400">
                              {formatPrice(item.product.price)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right ml-4">
                            <p className="text-sm text-gray-400 mb-1">Total</p>
                            <p className="text-xl font-bold text-brand-400">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mt-8 glass-card p-4 sm:p-6">
                <label className="block text-sm font-medium text-white mb-3">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    placeholder="Enter promo code"
                    className="flex-grow px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                  />
                  <button
                    onClick={handlePromoCode}
                    disabled={!promoCode.trim()}
                    className="px-6 py-2 rounded-lg bg-brand-500/20 text-brand-400 font-medium hover:bg-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-brand-400 mt-2">
                    ✓ Promo code applied
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24 space-y-4">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>

                <div className="space-y-3 border-t border-dark-700/50 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      {formatPrice(state.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {state.shipping === 0 ? (
                        <span className="text-brand-400">Free</span>
                      ) : (
                        formatPrice(state.shipping)
                      )}
                    </span>
                  </div>

                  {state.subtotal < 500 && state.shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Free shipping on orders over {formatPrice(500)}
                    </p>
                  )}

                  <div className="flex justify-between text-gray-300">
                    <span>Tax (8.875%)</span>
                    <span className="font-medium">{formatPrice(state.tax)}</span>
                  </div>
                </div>

                <div className="border-t border-dark-700/50 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-accent-400">
                      {formatPrice(state.total)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <Link
                  href="/products"
                  className="w-full px-6 py-2 rounded-lg border border-brand-500/30 text-brand-400 font-medium hover:bg-brand-500/10 transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
