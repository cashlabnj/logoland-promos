'use client';

import { useState } from 'react';
import { Upload, Download, Plus, Trash2, Edit2, AlertTriangle, X } from 'lucide-react';
import { products } from '@/data/products';

export default function AdminDashboard() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    minQuantity: '',
    category: '',
    colors: [] as string[],
    sizes: [] as string[],
    customization: [] as string[],
    featured: false,
    bestSeller: false,
  });
  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [productList, setProductList] = useState(products);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // CSV Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setCsvFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    const template = `id,name,description,price,category,colors,sizes,minQuantity
1,Product Name,Product description,9.99,Apparel,Black|White|Navy,S|M|L|XL,50`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-template.csv';
    a.click();
  };

  // Product Form Handlers
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setNewProduct((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'name') {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addColor = () => {
    if (colorInput.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()],
      }));
      setColorInput('');
    }
  };

  const removeColor = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const addSize = () => {
    if (sizeInput.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeInput.trim()],
      }));
      setSizeInput('');
    }
  };

  const removeSize = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const addCustomization = () => {
    if (customInput.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        customization: [...prev.customization, customInput.trim()],
      }));
      setCustomInput('');
    }
  };

  const removeCustomization = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      customization: prev.customization.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill in required fields');
      return;
    }

    const product = {
      id: Math.max(...productList.map((p) => parseInt(p.id)), 0) + 1 + '',
      ...newProduct,
      price: parseFloat(newProduct.price),
      minQuantity: parseInt(newProduct.minQuantity) || 0,
      imageUrl: '/images/products/placeholder.svg',
      rating: 4.5,
      reviewCount: 0,
      tags: [],
    };

    setProductList((prev) => [...prev, product as any]);
    setNewProduct({
      name: '',
      slug: '',
      description: '',
      price: '',
      minQuantity: '',
      category: '',
      colors: [],
      sizes: [],
      customization: [],
      featured: false,
      bestSeller: false,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="bg-dark-950 min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-dark-400">Bulk Product Upload & Management</p>
        </div>

        {/* Warning Banner */}
        <div className="glass-card p-4 mb-8 border-l-4 border-accent-400 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-accent-400 flex-shrink-0" />
          <div>
            <p className="font-semibold">Admin Only</p>
            <p className="text-sm text-dark-300">This page is for administrators only. Unauthorized access is prohibited.</p>
          </div>
        </div>

        {/* CSV Upload Section */}
        <div className="glass-card p-8 mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">CSV Upload</h2>
            <p className="text-dark-300">Bulk import products from a CSV file</p>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive ? 'border-brand-400 bg-brand-400/5' : 'border-dark-700 hover:border-dark-600'
            }`}
          >
            <Upload className="w-12 h-12 text-brand-400 mx-auto mb-4" />
            <p className="font-semibold mb-2">Drag and drop your CSV file here</p>
            <p className="text-sm text-dark-300 mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-6 py-2 bg-brand-500 text-dark-950 rounded-lg font-semibold cursor-pointer hover:bg-brand-400 transition-colors inline-block">
                Browse Files
              </span>
            </label>
            {csvFile && <p className="mt-4 text-green-400">✓ {csvFile.name} selected</p>}
          </div>

          <div className="mt-6">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center gap-2 px-6 py-2 border border-brand-400/50 text-brand-400 rounded-lg hover:bg-brand-400/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>

          {/* CSV Format Table */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">CSV Format</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left py-2 px-4 font-semibold">id</th>
                    <th className="text-left py-2 px-4 font-semibold">name</th>
                    <th className="text-left py-2 px-4 font-semibold">description</th>
                    <th className="text-left py-2 px-4 font-semibold">price</th>
                    <th className="text-left py-2 px-4 font-semibold">category</th>
                    <th className="text-left py-2 px-4 font-semibold">colors</th>
                    <th className="text-left py-2 px-4 font-semibold">sizes</th>
                    <th className="text-left py-2 px-4 font-semibold">minQuantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dark-700/50 bg-dark-900/30">
                    <td className="py-2 px-4 text-dark-300">1</td>
                    <td className="py-2 px-4 text-dark-300">Product Name</td>
                    <td className="py-2 px-4 text-dark-300">Description...</td>
                    <td className="py-2 px-4 text-dark-300">9.99</td>
                    <td className="py-2 px-4 text-dark-300">Apparel</td>
                    <td className="py-2 px-4 text-dark-300">Black|White|Navy</td>
                    <td className="py-2 px-4 text-dark-300">S|M|L|XL</td>
                    <td className="py-2 px-4 text-dark-300">50</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Manual Product Entry */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Manual Product Entry</h2>

          <form onSubmit={handleAddProduct} className="space-y-6">
            {/* Name and Slug */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleProductChange}
                  placeholder="e.g., Classic Cotton T-Shirt"
                  className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Slug (auto-generated)</label>
                <input
                  type="text"
                  name="slug"
                  value={newProduct.slug}
                  readOnly
                  className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-dark-400 placeholder-dark-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleProductChange}
                placeholder="Product description..."
                rows={3}
                className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 resize-none"
              />
            </div>

            {/* Price and Min Quantity */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleProductChange}
                  placeholder="9.99"
                  step="0.01"
                  className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Min Quantity</label>
                <input
                  type="number"
                  name="minQuantity"
                  value={newProduct.minQuantity}
                  onChange={handleProductChange}
                  placeholder="50"
                  className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">Category *</label>
              <select
                name="category"
                value={newProduct.category}
                onChange={handleProductChange}
                className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              >
                <option value="">Select a category</option>
                <option value="Apparel">Apparel</option>
                <option value="Drinkware">Drinkware</option>
                <option value="Office">Office Supplies</option>
                <option value="Tech">Tech Accessories</option>
                <option value="Bags">Bags & Cases</option>
              </select>
            </div>

            {/* Colors Tag Input */}
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">Colors</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addColor();
                    }
                  }}
                  placeholder="Add a color and press Enter"
                  className="flex-1 bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2.5 bg-brand-500 text-dark-950 rounded-lg font-semibold hover:bg-brand-400 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProduct.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2 bg-brand-500/20 border border-brand-400/50 rounded-full px-3 py-1">
                    <span className="text-sm">{color}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(i)}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes Tag Input */}
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">Sizes</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSize();
                    }
                  }}
                  placeholder="Add a size and press Enter"
                  className="flex-1 bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
                <button
                  type="button"
                  onClick={addSize}
                  className="px-4 py-2.5 bg-brand-500 text-dark-950 rounded-lg font-semibold hover:bg-brand-400 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProduct.sizes.map((size, i) => (
                  <div key={i} className="flex items-center gap-2 bg-brand-500/20 border border-brand-400/50 rounded-full px-3 py-1">
                    <span className="text-sm">{size}</span>
                    <button
                      type="button"
                      onClick={() => removeSize(i)}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Customization Options */}
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">Customization Options</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomization();
                    }
                  }}
                  placeholder="e.g., Screen Printing, Embroidery"
                  className="flex-1 bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
                <button
                  type="button"
                  onClick={addCustomization}
                  className="px-4 py-2.5 bg-brand-500 text-dark-950 rounded-lg font-semibold hover:bg-brand-400 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newProduct.customization.map((custom, i) => (
                  <div key={i} className="flex items-center gap-2 bg-brand-500/20 border border-brand-400/50 rounded-full px-3 py-1">
                    <span className="text-sm">{custom}</span>
                    <button
                      type="button"
                      onClick={() => removeCustomization(i)}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProduct.featured}
                  onChange={handleProductChange}
                  className="w-4 h-4 rounded bg-dark-900/50 border border-dark-700 accent-brand-500"
                />
                <span className="text-sm font-medium">Featured Product</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={newProduct.bestSeller}
                  onChange={handleProductChange}
                  className="w-4 h-4 rounded bg-dark-900/50 border border-dark-700 accent-brand-500"
                />
                <span className="text-sm font-medium">Best Seller</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-400 to-brand-500 text-dark-950 rounded-lg font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </form>
        </div>

        {/* Product Listing */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Products ({productList.length})</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Min Qty</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id} className="border-b border-dark-700/50 hover:bg-dark-900/30 transition-colors">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4 text-dark-300">{product.category}</td>
                    <td className="py-3 px-4 text-brand-400 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-dark-300">{product.minQuantity}</td>
                    <td className="py-3 px-4">
                      {product.featured && <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-1 rounded-full mr-1">Featured</span>}
                      {product.bestSeller && <span className="text-xs bg-accent-500/20 text-accent-400 px-2 py-1 rounded-full">Best Seller</span>}
                    </td>
                    <td className="py-3 px-4 text-right flex justify-end gap-2">
                      <button className="p-2 text-dark-400 hover:text-brand-400 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 text-dark-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-sm w-full p-6">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="text-dark-300 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2 border border-dark-700 rounded-lg hover:bg-dark-800/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(deleteId)}
                  className="flex-1 px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
