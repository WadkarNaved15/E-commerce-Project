'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/products';
import { sortProducts } from '@/lib/products';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const categorySizes: Record<string, string[]> = {
  Rings: ['6', '7', '8', '9', '10', '11', '12'],
  Earings: ['One Size'],
  Necklace: ['One Size'],
};


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) throw new Error('Failed to fetch products');

        const allProducts: Product[] = await response.json();
        setProducts(allProducts);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const availableSizes = useMemo(() => {
  if (selectedCategory === 'All') {
    // combine all sizes
    return [...new Set(Object.values(categorySizes).flat())];
  }
  return categorySizes[selectedCategory] || [];
}, [selectedCategory]);


  // ✅ Filter using fetched products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory)
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      return true;
    });

    return sortProducts(filtered, sortBy);
  }, [products, selectedCategory, priceRange, selectedSizes, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, displayCount);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 2000]);
    setSelectedSizes([]);
  };

  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-luxury-gold hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Category</h4>
        <div className="space-y-2">
          {['All', 'Earings', 'Rings', 'Necklace'].map((category) => (
  <button
    key={category}
    onClick={() => {
      setSelectedCategory(category);
      setSelectedSizes([]); // reset selected sizes when changing category
    }}
    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
      selectedCategory === category
        ? 'bg-luxury-navy text-white'
        : 'hover:bg-luxury-gray'
    }`}
  >
    {category}
  </button>
))}

        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={2000}
          step={50}
          className="mb-2"
        />
      </div>

      {availableSizes.length > 1 && (
  <div>
    <h4 className="font-medium mb-4">Size</h4>
    <div className="grid grid-cols-3 gap-2">
      {availableSizes.map((size) => (
        <label key={size} className="flex items-center space-x-2 cursor-pointer">
          <Checkbox
            checked={selectedSizes.includes(size)}
            onCheckedChange={() => handleSizeToggle(size)}
          />
          <span className="text-sm">{size}</span>
        </label>
      ))}
    </div>
  </div>
)}
    </div>
  );

  if (loading)
    return <div className="text-center py-12 text-gray-600">Loading products...</div>;

  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-navy mb-4">
          Shop Collection
        </h1>
        <p className="text-gray-600">
          Discover {filteredAndSortedProducts.length} pieces of timeless elegance
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-luxury-gold transition-colors"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>

        <div className="flex items-center space-x-4 ml-auto">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterSection />
          </div>
        </aside>

        {showFilters && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute top-0 left-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </button>
              </div>
              <FilterSection />
            </div>
          </motion.div>
        )}

        <div className="lg:col-span-3">
          {displayedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-luxury-gold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    delay={index * 0.05}
                  />
                ))}
              </div>

              {displayCount < filteredAndSortedProducts.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 12)}
                    className="bg-luxury-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
