'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes[0]);
    toast.success(`${product.name} added to cart!`);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#001F3F'],
    });
  };

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < Math.floor(product.rating)
                ? 'fill-luxury-gold text-luxury-gold'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div
          className="relative overflow-hidden rounded-lg bg-luxury-gray mb-4 aspect-[3/4]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black bg-opacity-20 flex items-end justify-center pb-6"
          >
            <motion.button
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              onClick={handleQuickAdd}
              className="bg-white text-luxury-navy px-6 py-3 rounded-lg font-medium hover:bg-luxury-gold hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <ShoppingCart size={18} />
              <span>Quick Add</span>
            </motion.button>
          </motion.div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 group-hover:text-luxury-navy transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-luxury-navy">
              ${product.price.toLocaleString()}
            </p>
            {renderStars()}
          </div>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
      </Link>
    </motion.div>
  );
}
