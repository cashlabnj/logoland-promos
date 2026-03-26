'use client';

import { useState, useRef } from 'react';
import {
  Upload,
  Type,
  Palette,
  Sliders,
  ShoppingCart,
  MessageSquare,
  Save,
  Zap,
  RefreshCw,
  CheckCircle,
  Users,
  Star,
} from 'lucide-react';
import { products } from '@/data/products';

interface CustomizationState {
  selectedProductId: string;
  logoColor: string;
  customText: string;
  textFont: string;
  textColor: string;
  productColor: string;
  logoPosition: string;
  logoSize: string;
  quantity: number;
}

const fontOptions = ['Arial', 'Georgia', 'Verdana', 'Comic Sans MS', 'Courier New'];
const productColors = ['Black', 'White', 'Navy', 'Red', 'Gray', 'Green'];
const positions = ['Front', 'Back', 'Left Chest', 'Right Chest', 'Sleeve'];
const sizes = ['Small', 'Medium', 'Large'];

const quantityBreaks = [
  { min: 1, max: 24, priceMultiplier: 1 },
  { min: 25, max: 49, priceMultiplier: 0.85 },
  { min: 50, max: 99, priceMultiplier: 0.75 },
  { min: 100, max: 249, priceMultiplier: 0.65 },
  { min: 250, max: 499, priceMultiplier: 0.55 },
  { min: 500, max: Infinity, priceMultiplier: 0.45 },
];

export default function DesignStudio() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<CustomizationState>({
    selectedProductId: products.filter(p => p.featured)[0]?.id || '1',
    logoColor: '#FFD700',
    customText: 'Your Brand Here',
    textFont: 'Arial',
    textColor: '#FFFFFF',
    productColor: 'Black',
    logoPosition: 'Front',
    logoSize: 'Medium',
    quantity: 50,
  });

  const [uploadedLogo, setUploadedLogo] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const selectedProduct = products.find(p => p.id === state.selectedProductId);
  const topProducts = products.filter(p => p.featured).slice(0, 8);

  // Calculate pricing
  const getUnitPrice = (quantity: number, basePrice: number) => {
    const bracket = quantityBreaks.find(b => quantity >= b.min && quantity <= b.max);
    return basePrice * (bracket?.priceMultiplier || 1);
  };

  const unitPrice = selectedProduct ? getUnitPrice(state.quantity, selectedProduct.price) : 0;
  const setupFee = 50;
  const subtotal = unitPrice * state.quantity;
  const total = subtotal + setupFee;

  // Determine logo size classes
  const logoSizeClasses = {
    Small: 'w-16 h-16',
    Medium: 'w-24 h-24',
    Large: 'w-32 h-32',
  };

  // Product shape styling
  const productShapes = {
    '1': 'rounded-lg', // T-shirt - rectangle
    '2': 'rounded-lg', // Polo
    '3': 'rounded-full', // Mug
    '4': 'rounded-md', // Hat
    '5': 'rounded-lg', // Hoodie
  };

  const productShape = productShapes[state.selectedProductId as keyof typeof productShapes] || 'rounded-lg';

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(selectedProduct?.minQuantity || 1, parseInt(e.target.value) || 1);
    setState({ ...state, quantity });
  };

  const handleAddToCart = () => {
    setCartMessage('Added to cart!');
    setTimeout(() => setCartMessage(''), 3000);
  };

  const handleSaveDesign = () => {
    const designData = JSON.stringify(state);
    const blob = new Blob([designData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `design-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-dark-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Design Studio
          </h1>
          <p className="text-lg text-gray-300">
            Bring your brand to life with our easy-to-use customization tools
          </p>
        </div>

        {/* Product Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Step 1: Choose Your Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map(product => (
              <button
                key={product.id}
                onClick={() => setState({ ...state, selectedProductId: product.id })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  state.selectedProductId === product.id
                    ? 'border-brand-400 bg-dark-800'
                    : 'border-dark-700 bg-dark-800 hover:border-brand-400'
                }`}
              >
                <div className="text-left">
                  <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                    <span className="text-xs text-gray-400">{product.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Customization Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Preview Area */}
          <div className="bg-dark-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-96">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-8">Live Preview</h3>

              {/* Product Mockup */}
              <div className="flex justify-center mb-8">
                <div
                  className={`w-80 h-96 ${productShape} relative flex items-center justify-center`}
                  style={{
                    backgroundColor: productColors.includes(state.productColor)
                      ? state.productColor === 'Black'
                        ? '#1f2937'
                        : state.productColor === 'White'
                          ? '#f3f4f6'
                          : state.productColor === 'Navy'
                            ? '#001f3f'
                            : state.productColor === 'Red'
                              ? '#dc2626'
                              : state.productColor === 'Gray'
                                ? '#6b7280'
                                : '#059669'
                      : '#1f2937',
                  }}
                >
                  {/* Logo Placeholder */}
                  <div
                    className={`${logoSizeClasses[state.logoSize as keyof typeof logoSizeClasses]} rounded-md flex items-center justify-center`}
                    style={{ backgroundColor: state.logoColor, opacity: 0.9 }}
                  >
                    {uploadedLogo ? (
                      <span className="text-2xl font-bold text-dark-950">✓</span>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-dark-950 font-bold text-sm">
                        Logo
                      </div>
                    )}
                  </div>

                  {/* Custom Text Overlay */}
                  <div className="absolute bottom-8 left-4 right-4">
                    <p
                      className="text-center font-bold text-white break-words"
                      style={{
                        fontFamily: state.textFont,
                        color: state.textColor,
                        fontSize: '18px',
                      }}
                    >
                      {state.customText}
                    </p>
                  </div>

                  {/* Position Indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded text-xs text-white">
                    {state.logoPosition}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                {selectedProduct?.name} • Quantity: {state.quantity}
              </p>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="bg-dark-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-brand-400" />
                <h4 className="font-semibold text-white">Upload Your Logo</h4>
              </div>
              <div
                className="border-2 border-dashed border-brand-400 rounded-lg p-8 text-center cursor-pointer hover:bg-dark-700 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.pdf"
                  className="hidden"
                  onChange={() => setUploadedLogo(true)}
                />
                <Upload className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                <p className="text-gray-300 text-sm">
                  {uploadedLogo ? 'Logo uploaded!' : 'Drag and drop or click to upload'}
                </p>
                <p className="text-gray-500 text-xs mt-1">PNG, JPG, SVG, PDF</p>
              </div>
            </div>

            {/* Text Customization */}
            <div className="bg-dark-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-brand-400" />
                <h4 className="font-semibold text-white">Custom Text</h4>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={state.customText}
                  onChange={e => setState({ ...state, customText: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="Enter your text"
                  maxLength={50}
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={state.textFont}
                    onChange={e => setState({ ...state, textFont: e.target.value })}
                    className="px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-brand-400"
                  >
                    {fontOptions.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-10 rounded border border-dark-600 flex items-center gap-2 px-3">
                      <div
                        className="w-6 h-6 rounded cursor-pointer"
                        style={{ backgroundColor: state.textColor }}
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'color';
                          input.value = state.textColor;
                          input.onchange = (e) => {
                            setState({ ...state, textColor: (e.target as HTMLInputElement).value });
                          };
                          input.click();
                        }}
                      />
                      <span className="text-xs text-gray-400">{state.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Selector */}
            <div className="bg-dark-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-brand-400" />
                <h4 className="font-semibold text-white">Product Color</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {productColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setState({ ...state, productColor: color })}
                    className={`p-3 rounded border-2 transition-all ${
                      state.productColor === color
                        ? 'border-brand-400'
                        : 'border-dark-600'
                    }`}
                    title={color}
                  >
                    <div
                      className="w-full h-8 rounded"
                      style={{
                        backgroundColor:
                          color === 'Black'
                            ? '#1f2937'
                            : color === 'White'
                              ? '#f3f4f6'
                              : color === 'Navy'
                                ? '#001f3f'
                                : color === 'Red'
                                  ? '#dc2626'
                                  : color === 'Gray'
                                    ? '#6b7280'
                                    : '#059669',
                      }}
                    />
                    <p className="text-xs text-gray-400 mt-1 text-center">{color}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Position & Size */}
            <div className="bg-dark-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="w-5 h-5 text-brand-400" />
                <h4 className="font-semibold text-white">Position & Size</h4>
              </div>
              <div className="space-y-3">
                <select
                  value={state.logoPosition}
                  onChange={e => setState({ ...state, logoPosition: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded text-white text-sm focus:outline-none focus:border-brand-400"
                >
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Logo Size</label>
                  <div className="flex gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setState({ ...state, logoSize: size })}
                        className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                          state.logoSize === size
                            ? 'bg-brand-400 text-dark-950'
                            : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="bg-dark-800 rounded-lg p-6">
              <label className="block text-sm font-semibold text-white mb-3">Quantity</label>
              <input
                type="number"
                value={state.quantity}
                onChange={handleQuantityChange}
                min={selectedProduct?.minQuantity || 1}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-brand-400"
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum: {selectedProduct?.minQuantity || 1} units
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Calculator */}
        <div className="bg-dark-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Pricing Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-dark-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Per Unit Price</p>
              <p className="text-2xl font-bold text-brand-400">${unitPrice.toFixed(2)}</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Setup Fee</p>
              <p className="text-2xl font-bold text-accent-400">${setupFee.toFixed(2)}</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-2">Subtotal</p>
              <p className="text-2xl font-bold text-white">${subtotal.toFixed(2)}</p>
            </div>
            <div className="bg-brand-400 rounded-lg p-6">
              <p className="text-dark-950 text-sm mb-2 font-medium">Total Estimate</p>
              <p className="text-3xl font-bold text-dark-950">${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Quantity Breaks */}
          <div className="bg-dark-700 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4 text-sm">Volume Pricing</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              {quantityBreaks.slice(0, 5).map((bracket, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded text-center ${
                    state.quantity >= bracket.min && state.quantity <= bracket.max
                      ? 'bg-brand-400/20 border border-brand-400'
                      : 'bg-dark-600 border border-dark-500'
                  }`}
                >
                  <p className="text-gray-400">
                    {bracket.min === bracket.max ? bracket.min : `${bracket.min}+`}
                  </p>
                  <p className={`font-bold ${
                    state.quantity >= bracket.min && state.quantity <= bracket.max
                      ? 'text-brand-400'
                      : 'text-white'
                  }`}>
                    {Math.round((1 - bracket.priceMultiplier) * 100)}% off
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-brand-400 hover:bg-brand-500 text-dark-950 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="flex-1 bg-accent-400 hover:bg-accent-500 text-dark-950 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Request Quote
          </button>
          <button
            onClick={handleSaveDesign}
            className="flex-1 border-2 border-brand-400 text-brand-400 hover:bg-brand-400/10 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Design
          </button>
        </div>

        {/* Success Message */}
        {cartMessage && (
          <div className="fixed bottom-4 right-4 bg-brand-400 text-dark-950 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 animate-in">
            <CheckCircle className="w-5 h-5" />
            {cartMessage}
          </div>
        )}

        {/* Info Section */}
        <div className="bg-dark-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Use Our Design Studio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Free Artwork Setup</h3>
              <p className="text-sm text-gray-400">
                Professional design team prepares your artwork at no additional cost
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Unlimited Revisions</h3>
              <p className="text-sm text-gray-400">
                Get as many design revisions as you need until it's perfect
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Proof Before Production</h3>
              <p className="text-sm text-gray-400">
                Review and approve your design before we start manufacturing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Expert Design Help</h3>
              <p className="text-sm text-gray-400">
                Our design experts are ready to assist and provide recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
