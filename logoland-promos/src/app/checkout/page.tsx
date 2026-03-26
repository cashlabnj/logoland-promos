'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice, cn } from '@/lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [shippingData, setShippingData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const isShippingComplete =
    shippingData.firstName &&
    shippingData.lastName &&
    shippingData.email &&
    shippingData.phone &&
    shippingData.address &&
    shippingData.city &&
    shippingData.state &&
    shippingData.zip;

  const isPaymentComplete =
    paymentData.cardNumber.length >= 13 &&
    paymentData.cardName &&
    paymentData.expiryMonth &&
    paymentData.expiryYear &&
    paymentData.cvv.length >= 3;

  const handleShippingChange = (
    field: keyof ShippingFormData,
    value: string
  ) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (
    field: keyof PaymentFormData,
    value: string
  ) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingSubmit = () => {
    if (isShippingComplete) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = () => {
    if (isPaymentComplete) {
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = () => {
    // Generate order number
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8).padStart(8, '0')}`;
    setOrderNumber(newOrderNumber);
    setShowSuccess(true);
    clearCart();
  };

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
  ];

  // Redirect to cart if empty
  if (state.items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-6">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-400 mb-4">
            Thank you for your purchase. Your order has been received.
          </p>

          <div className="glass-card p-6 mb-8">
            <p className="text-sm text-gray-400 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-accent-400 font-mono">
              {orderNumber}
            </p>
            <p className="text-xs text-gray-500 mt-3">
              A confirmation email has been sent to {shippingData.email}
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/products"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-200 block"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="w-full px-6 py-3 rounded-lg border border-brand-500/30 text-brand-400 font-medium hover:bg-brand-500/10 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Checkout</h1>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => {
                    if (
                      (step.id === 'payment' && isShippingComplete) ||
                      (step.id === 'review' && isPaymentComplete)
                    ) {
                      setCurrentStep(step.id);
                    }
                  }}
                  className={cn(
                    'w-10 h-10 rounded-full font-semibold flex items-center justify-center transition-all',
                    currentStep === step.id
                      ? 'bg-brand-500 text-white'
                      : index <
                        steps.findIndex((s) => s.id === currentStep)
                      ? 'bg-brand-500 text-white'
                      : 'bg-dark-800 text-gray-400'
                  )}
                >
                  {index <
                  steps.findIndex((s) => s.id === currentStep) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                <div className="flex-1 mx-2">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      currentStep === step.id
                        ? 'text-brand-400'
                        : 'text-gray-400'
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Step */}
            {currentStep === 'shipping' && (
              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingData.firstName}
                        onChange={(e) =>
                          handleShippingChange('firstName', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={shippingData.lastName}
                        onChange={(e) =>
                          handleShippingChange('lastName', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          handleShippingChange('email', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          handleShippingChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={shippingData.company}
                      onChange={(e) =>
                        handleShippingChange('company', e.target.value)
                      }
                      className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                      placeholder="Your Company Inc."
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingData.address}
                      onChange={(e) =>
                        handleShippingChange('address', e.target.value)
                      }
                      className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                      placeholder="123 Main Street"
                    />
                  </div>

                  {/* City, State, Zip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) =>
                          handleShippingChange('city', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingData.state}
                        onChange={(e) =>
                          handleShippingChange('state', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={shippingData.zip}
                        onChange={(e) =>
                          handleShippingChange('zip', e.target.value)
                        }
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleShippingSubmit}
                    disabled={!isShippingComplete}
                    className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Payment Information
                </h2>
                <p className="text-sm text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-6">
                  This is a demo checkout. No real payment will be processed.
                </p>

                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        handlePaymentChange(
                          'cardNumber',
                          value.slice(0, 16)
                        );
                      }}
                      placeholder="4532 1234 5678 9010"
                      className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors font-mono"
                    />
                  </div>

                  {/* Card Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      value={paymentData.cardName}
                      onChange={(e) =>
                        handlePaymentChange('cardName', e.target.value)
                      }
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors"
                    />
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Month *
                      </label>
                      <input
                        type="text"
                        value={paymentData.expiryMonth}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 2);
                          handlePaymentChange('expiryMonth', value);
                        }}
                        placeholder="MM"
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Year *
                      </label>
                      <input
                        type="text"
                        value={paymentData.expiryYear}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 2);
                          handlePaymentChange('expiryYear', value);
                        }}
                        placeholder="YY"
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={paymentData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.slice(0, 4);
                          handlePaymentChange('cvv', value);
                        }}
                        placeholder="123"
                        className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-400/50 transition-colors font-mono text-center"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="px-6 py-3 rounded-lg border border-dark-700/50 text-gray-300 font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={!isPaymentComplete}
                      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Continue to Review
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="glass-card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-6">
                  Review Your Order
                </h2>

                {/* Shipping Review */}
                <div className="mb-6 pb-6 border-b border-dark-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Shipping Address
                  </h3>
                  <p className="text-gray-300">
                    {shippingData.firstName} {shippingData.lastName}
                  </p>
                  {shippingData.company && (
                    <p className="text-gray-300">{shippingData.company}</p>
                  )}
                  <p className="text-gray-300">{shippingData.address}</p>
                  <p className="text-gray-300">
                    {shippingData.city}, {shippingData.state} {shippingData.zip}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">{shippingData.email}</p>
                  <p className="text-gray-400 text-sm">{shippingData.phone}</p>
                </div>

                {/* Payment Review */}
                <div className="mb-6 pb-6 border-b border-dark-700/50">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Payment Method
                  </h3>
                  <p className="text-gray-300 font-mono">
                    •••• •••• •••• {paymentData.cardNumber.slice(-4)}
                  </p>
                  <p className="text-gray-300">{paymentData.cardName}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Expires {paymentData.expiryMonth}/{paymentData.expiryYear}
                  </p>
                </div>

                {/* Items Review */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-2">
                    {state.items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${item.customText}`}
                        className="flex justify-between items-center p-3 bg-dark-800/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-white">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-accent-400">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="px-6 py-3 rounded-lg border border-dark-700/50 text-gray-300 font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-dark-700/50 max-h-64 overflow-y-auto">
                {state.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${item.customText}`}
                    className="flex justify-between items-start text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-300">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-accent-400">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>
                    {state.shipping === 0 ? (
                      <span className="text-brand-400">Free</span>
                    ) : (
                      formatPrice(state.shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>{formatPrice(state.tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-dark-700/50 mt-3">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-accent-400">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
