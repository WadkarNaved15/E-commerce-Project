'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';

const categories = ['Earings', 'Rings', 'Necklace'];

const ringSizes = ['6','7','8','9','10','11','12'];
const oneSize = ['One Size'];


export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    Category: '',
    description: '',
    features: [''],
    sizes: [] as string[],
    rating: '',
    popularity: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string) => {
    const newArray = [...formData.features];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, features: newArray }));
  };

  const addArrayField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeArrayField = (index: number) => {
    const newArray = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newArray }));
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types and size
    const validFiles: File[] = [];
    let hasError = false;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        hasError = true;
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Some files exceed 5MB and were skipped');
        hasError = true;
        return;
      }
      validFiles.push(file);
    });

    if (hasError) {
      setTimeout(() => setError(''), 3000);
    }

    // Create preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    
    setImages(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) {
      throw new Error('No images to upload');
    }

    setUploading(true);

    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload images');
      }

      const data = await response.json();
      return data.urls;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validate images
      if (images.length === 0) {
        throw new Error('Please add at least one product image');
      }

      // Validate sizes
      if (formData.sizes.length === 0) {
        throw new Error('Please select at least one size');
      }

      // Upload images first
      const imageUrls = await uploadImages();

      // Create product with uploaded image URLs
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        Category: formData.Category,
        description: formData.description,
        features: formData.features.filter(f => f.trim() !== ''),
        images: imageUrls,
        sizes: formData.sizes,
        rating: parseFloat(formData.rating),
        popularity: parseInt(formData.popularity),
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        Category: '',
        description: '',
        features: [''],
        sizes: [],
        rating: '',
        popularity: '',
      });
      
      // Clean up image previews
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-gray py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-serif font-bold text-luxury-navy mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600 mb-8">Create a new product listing for your collection</p>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center"
            >
              <Check className="mr-2" size={20} />
              Product created successfully!
            </motion.div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-luxury-navy mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  placeholder="Silk Evening Dress"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-luxury-navy mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  placeholder="299.99"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-luxury-navy mb-2">
                Category *
              </label>
              <select
                name="Category"
                value={formData.Category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-luxury-navy mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent resize-none"
                placeholder="Describe the product in detail..."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-luxury-navy mb-2">
                Features
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                    placeholder="Premium silk fabric"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(index)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addArrayField}
                className="text-luxury-gold hover:text-opacity-80 font-semibold flex items-center mt-2"
              >
                <Plus size={18} className="mr-1" />
                Add Feature
              </button>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-luxury-navy mb-2">
                Product Images * {uploading && <span className="text-luxury-gold">(Uploading...)</span>}
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-luxury-gold transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="text-gray-400 mb-2" size={48} />
                  <span className="text-gray-600 font-semibold">
                    Click to upload images
                  </span>
                  <span className="text-gray-400 text-sm mt-1">
                    PNG, JPG, WEBP up to 5MB each
                  </span>
                </label>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-luxury-gold text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-luxury-navy mb-3">
                Available Sizes *
              </label>
              <div className="flex flex-wrap gap-2">
                {(formData.Category === 'Rings' ? ringSizes : oneSize).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      formData.sizes.includes(size)
                        ? 'bg-luxury-navy text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating and Popularity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-luxury-navy mb-2">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  required
                  step="0.1"
                  min="0"
                  max="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-luxury-navy mb-2">
                  Popularity Score *
                </label>
                <input
                  type="number"
                  name="popularity"
                  value={formData.popularity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                type="submit"
                disabled={loading || uploading}
                whileHover={{ scale: (loading || uploading) ? 1 : 1.02 }}
                whileTap={{ scale: (loading || uploading) ? 1 : 0.98 }}
                className="w-full bg-luxury-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading || uploading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    {uploading ? 'Uploading Images...' : 'Creating Product...'}
                  </>
                ) : (
                  'Create Product'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}