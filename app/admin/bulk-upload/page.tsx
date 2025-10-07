'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Copy, Check, Download, FileSpreadsheet, Loader2, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import * as XLSX from 'xlsx';

export default function BulkProductUpload() {
  const [activeTab, setActiveTab] = useState<'images' | 'bulk'>('images');
  
  // Image Upload State
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Bulk Upload State
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{success: number, failed: number, errors: string[]}>({
    success: 0,
    failed: 0,
    errors: []
  });
  const [error, setError] = useState('');

  // Image Upload Functions
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

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

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setUploadedUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (images.length === 0) {
      setError('Please select images to upload');
      return;
    }

    setUploading(true);
    setError('');

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
      setUploadedUrls(data.urls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

const copyAllUrls = () => {
  const allUrls = uploadedUrls.join('|');
  navigator.clipboard.writeText(allUrls);
  setCopiedIndex(-1);
  setTimeout(() => setCopiedIndex(null), 2000);
};


  // Bulk Upload Functions
  const downloadTemplate = () => {
    const template = [
  {
  name: 'Elegant Gold Earrings',
  price: 199.99,
  category: 'Earings', // Must match enum
  description: 'Beautiful handcrafted gold earrings with intricate design',
  features: '14K Gold|Handcrafted|Hypoallergenic',
  images: '/uploads/products/image1.jpg|/uploads/products/image2.jpg',
  sizes: 'One Size',
  rating: 4.5,
  popularity: 120
},
  {
    name: 'Diamond Ring',
    price: 499.99,
    category: 'Rings',
    description: 'Stunning diamond ring with premium quality',
    features: 'Diamond|Gold|Adjustable size',
    images: '/uploads/products/image3.jpg|/uploads/products/image4.jpg',
    sizes: '6|7|8',
    rating: 4.8,
    popularity: 200
  },
  {
    name: 'Pearl Necklace',
    price: 299.99,
    category: 'Necklace',
    description: 'Elegant pearl necklace for formal occasions',
    features: 'Pearls|Handcrafted|Luxury finish',
    images: '/uploads/products/image5.jpg|/uploads/products/image6.jpg',
    sizes: 'One Size',
    rating: 4.7,
    popularity: 150
  }
];


    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'product_template.xlsx');
  };

  const handleExcelSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setExcelFile(file);
      setResults({ success: 0, failed: 0, errors: [] });
    }
  };

  const processExcelFile = async () => {
    if (!excelFile) {
      setError('Please select an Excel file');
      return;
    }

    setProcessing(true);
    setError('');
    setResults({ success: 0, failed: 0, errors: [] });

    try {
      const data = await excelFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      let successCount = 0;
      let failedCount = 0;
      const errors: string[] = [];

      for (let i = 0; i < jsonData.length; i++) {
        const row: any = jsonData[i];
        
        try {
          // Parse the row data
          const productData = {
            name: row.name?.toString().trim(),
            price: parseFloat(row.price),
            Category: row.category?.toString().trim(),
            description: row.description?.toString().trim() || '',
            features: row.features ? row.features.toString().split('|').map((f: string) => f.trim()).filter((f: string) => f) : [],
            images: row.images ? row.images.toString().split('|').map((img: string) => img.trim()).filter((img: string) => img) : [],
            sizes: row.sizes ? row.sizes.toString().split('|').map((s: string) => s.trim()).filter((s: string) => s) : [],
            rating: parseFloat(row.rating) || 0,
            popularity: parseInt(row.popularity) || 0,
          };

          // Validate required fields
          if (!productData.name || !productData.price || !productData.Category) {
            throw new Error('Missing required fields: name, price, or category');
          }

          if (productData.images.length === 0) {
            throw new Error('At least one image is required');
          }

          if (productData.sizes.length === 0) {
            throw new Error('At least one size is required');
          }

          // Create product
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create product');
          }

          successCount++;
        } catch (err) {
          failedCount++;
          errors.push(`Row ${i + 2}: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }

      setResults({ success: successCount, failed: failedCount, errors });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process Excel file');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-gray py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'images'
                    ? 'bg-luxury-navy text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ImagePlus className="inline-block mr-2" size={20} />
                Upload Images
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'bulk'
                    ? 'bg-luxury-navy text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileSpreadsheet className="inline-block mr-2" size={20} />
                Bulk Upload
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Image Upload Tab */}
            {activeTab === 'images' && (
              <div>
                <h2 className="text-3xl font-serif font-bold text-luxury-navy mb-2">
                  Upload Product Images
                </h2>
                <p className="text-gray-600 mb-8">
                  Upload images and get URLs to use in your Excel file
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-luxury-gold transition-colors mb-6">
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
                    <Upload className="text-gray-400 mb-3" size={56} />
                    <span className="text-gray-700 font-semibold text-lg mb-2">
                      Click to upload product images
                    </span>
                    <span className="text-gray-500 text-sm">
                      PNG, JPG, WEBP up to 5MB each
                    </span>
                  </label>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-luxury-navy mb-4">
                      Selected Images ({images.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                {images.length > 0 && uploadedUrls.length === 0 && (
                  <motion.button
                    onClick={uploadImages}
                    disabled={uploading}
                    whileHover={{ scale: uploading ? 1 : 1.02 }}
                    whileTap={{ scale: uploading ? 1 : 0.98 }}
                    className="w-full bg-luxury-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Uploading Images...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2" size={20} />
                        Upload All Images
                      </>
                    )}
                  </motion.button>
                )}

                {/* Uploaded URLs */}
                {uploadedUrls.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-green-800">
                        ✓ Images Uploaded Successfully
                      </h3>
                      <button
                        onClick={copyAllUrls}
                        className="flex items-center text-green-700 hover:text-green-900 font-semibold"
                      >
                        {copiedIndex === -1 ? (
                          <>
                            <Check size={18} className="mr-1" />
                            Copied All!
                          </>
                        ) : (
                          <>
                            <Copy size={18} className="mr-1" />
                            Copy All URLs
                          </>
                        )}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {uploadedUrls.map((url, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded border border-green-300"
                        >
                          <code className="text-sm text-gray-700 flex-1 mr-4 break-all">
                            {url}
                          </code>
                          {/* <button
                            onClick={() => copyToClipboard(url, index)}
                            className="flex-shrink-0 text-green-700 hover:text-green-900"
                          >
                             {copiedIndex === index ? (
                              <Check size={18} />
                            ) : (
                              <Copy size={18} />
                            )} 
                          </button> */}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-green-700 mt-4">
                      {"Use these URLs in your Excel file's 'images' column — already copied in '|' format!"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bulk Upload Tab */}
            {activeTab === 'bulk' && (
              <div>
                <h2 className="text-3xl font-serif font-bold text-luxury-navy mb-2">
                  Bulk Product Upload
                </h2>
                <p className="text-gray-600 mb-8">
                  Upload an Excel file to create multiple products at once
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                {/* Download Template */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    📋 Excel File Format
                  </h3>
                  <div className="text-sm text-blue-800 mb-4 space-y-1">
                    <p><strong>Required columns:</strong> name, price, category, images, sizes</p>
                    <p><strong>Optional columns:</strong> description, features, rating, popularity</p>
                    <p><strong>Categories:</strong> Dresses, Accessories, Shoes, Tops, Bottoms</p>
                   <p><strong>Note:</strong> Use &quot;|&quot; to separate multiple values (images, sizes, features)</p>
                  </div>
                  <button
                    onClick={downloadTemplate}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Download className="mr-2" size={18} />
                    Download Excel Template
                  </button>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-luxury-gold transition-colors mb-6">
                  <input
                    type="file"
                    id="excel-upload"
                    accept=".xlsx,.xls"
                    onChange={handleExcelSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="excel-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FileSpreadsheet className="text-gray-400 mb-3" size={56} />
                    <span className="text-gray-700 font-semibold text-lg mb-2">
                      {excelFile ? excelFile.name : 'Click to upload Excel file'}
                    </span>
                    <span className="text-gray-500 text-sm">
                      .xlsx or .xls format
                    </span>
                  </label>
                </div>

                {/* Process Button */}
                {excelFile && (
                  <motion.button
                    onClick={processExcelFile}
                    disabled={processing}
                    whileHover={{ scale: processing ? 1 : 1.02 }}
                    whileTap={{ scale: processing ? 1 : 0.98 }}
                    className="w-full bg-luxury-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-6"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Processing Products...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2" size={20} />
                        Create Products from Excel
                      </>
                    )}
                  </motion.button>
                )}

                {/* Results */}
                {(results.success > 0 || results.failed > 0) && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-3xl font-bold text-green-700 mb-1">
                          {results.success}
                        </div>
                        <div className="text-sm text-green-600 font-semibold">
                          Products Created
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="text-3xl font-bold text-red-700 mb-1">
                          {results.failed}
                        </div>
                        <div className="text-sm text-red-600 font-semibold">
                          Failed
                        </div>
                      </div>
                    </div>

                    {results.errors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2">Errors:</h4>
                        <div className="space-y-1 max-h-60 overflow-y-auto">
                          {results.errors.map((error, index) => (
                            <div key={index} className="text-sm text-red-700">
                              {error}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}