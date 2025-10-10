"use client";
import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const FeaturedCollection = memo(function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: "4", // fetch 4 products for homepage
          offset: "0",
        });

        const res = await fetch(`/api/products?${params.toString()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500">
        Loading featured products...
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="text-center py-24 text-red-500">
        Failed to load featured products.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-navy mb-4">
          Featured Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Handpicked pieces that embody timeless sophistication and modern elegance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} delay={index * 0.1} />
        ))}
      </div>

      <div className="text-center">
        <Link href="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-luxury-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center space-x-2"
          >
            <span>Shop the Collection</span>
          </motion.button>
        </Link>
      </div>
    </section>
  );
});

export default FeaturedCollection;
