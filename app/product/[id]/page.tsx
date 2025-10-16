'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, Check, Clock, Zap, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Product } from '@/lib/products';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const productId = parseInt(params.id as string);

  // Use state to manage the product data
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Sale timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate sale price (40% off)
  const discountPercentage = 40;
  const originalPrice = product ? product.price : 0;
  const salePrice = product ? Math.round(product.price * 0.6) : 0;
  const savings = originalPrice - salePrice;

  // Countdown timer effect
  useEffect(() => {
    // Set initial time to 2 hours 30 minutes (can be adjusted)
    const endTime = new Date().getTime() + (2.5 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch product data
  useEffect(() => {
    async function fetchData() {
      if (!productId) return;

      setLoading(true);
      try {
        // Fetch the single product
        const productRes = await fetch(`/api/products/${productId}`);

        if (productRes.status === 404) {
          setError(true);
          setLoading(false);
          return;
        }

        if (!productRes.ok) {
          throw new Error('Failed to fetch product');
        }

        const productData: Product = await productRes.json();
        setProduct(productData);

        // Initialize selected size
        if (productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }

        // Fetch related products (same category, limit 4)
        if (productData.category) {
          const relatedRes = await fetch(
            `/api/products?category=${productData.category}&limit=5`
          );
          
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            // Filter out current product and limit to 4
            const filtered = relatedData.products
              .filter((p: Product) => p.id !== productId)
              .slice(0, 4);
            setRelatedProducts(filtered);
          }
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-luxury-gold border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-luxury-gold">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => router.push('/shop')}
            className="text-luxury-gold hover:underline"
          >
            Return to shop
          </button>
        </div>
      </div>
    );
  }

  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      handleAddToCart();
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addToCart(product, quantity, selectedSize);
    toast.success(`${product.name} added to cart!`);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#001F3F', '#FFFFFF'],
    });
  };

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < Math.floor(product.rating)
                ? 'fill-luxury-gold text-luxury-gold'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{product.rating}/5</span>
        <span className="text-gray-500">(1,247 reviews)</span>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Flash Sale Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg p-4 mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-300 animate-pulse" size={24} />
              <div>
                <h3 className="font-bold text-lg">FLASH SALE - {discountPercentage}% OFF!</h3>
                <p className="text-sm text-red-100">Hurry! Limited time offer ending soon</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white/20 rounded-lg px-6 py-3 backdrop-blur-sm">
              <Clock className="text-yellow-300" size={20} />
              <div className="flex items-center space-x-2 font-mono font-bold text-xl">
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-xs font-normal">Hours</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-xs font-normal">Mins</span>
                </div>
                <span>:</span>
                <div className="flex flex-col items-center">
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-xs font-normal">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image Gallery */}
          <div className="relative">
            {/* Sale Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
              >
                {discountPercentage}% OFF
              </motion.div>
            </div>

            <div className="mb-4">
              <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? 'ring-2 ring-luxury-gold'
                      : 'ring-1 ring-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Trending Badge */}
            <div className="flex items-center space-x-2 mb-3">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold"
              >
                <TrendingUp size={16} />
                <span>TRENDING NOW</span>
              </motion.div>
              <span className="text-red-600 font-semibold text-sm animate-pulse">
                🔥 Almost Sold Out!
              </span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-luxury-navy mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              {renderStars()}
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">{product.category}</span>
            </div>

            {/* Price Section with Urgency */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-baseline space-x-3 mb-2">
                <span className="text-5xl font-bold text-red-600">
                  ₹{salePrice.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-green-600 font-semibold text-lg">
                  You Save: ₹{savings.toLocaleString()} ({discountPercentage}% OFF)
                </p>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  SALE ENDS SOON!
                </span>
              </div>
            </div>

            {/* Urgency Messages */}
            <div className="space-y-2 mb-6">
              <motion.div
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center space-x-2 text-red-600 font-semibold"
              >
                <Clock size={18} />
                <span>⚡ HURRY! Sale ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              </motion.div>
              <p className="text-orange-600 font-medium">
                🔥 {Math.floor(Math.random() * 20) + 35} people are viewing this right now
              </p>
              <p className="text-green-600 font-medium">
                ✅ {Math.floor(Math.random() * 10) + 18} sold in the last 24 hours
              </p>
            </div>

            {/* Ratings + Reviews + Social Proof */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-700 italic">
                "Best Necklace ever!" – <span className="font-semibold text-luxury-navy">Anita K.</span> ★★★★★
              </p>
              <p className="text-sm text-blue-600 font-medium mt-2">
                ⭐ Join 1,247 happy customers who love this product
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-6 mb-8">
              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check
                        className="text-luxury-gold mt-1 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-all ${
                        selectedSize === size
                          ? 'border-luxury-gold bg-luxury-gold text-white'
                          : 'border-gray-300 hover:border-luxury-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-luxury-gold transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-luxury-gold transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Warning */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 font-semibold text-center">
                ⚠️ Only {Math.floor(Math.random() * 5) + 3} left in stock - Order now!
              </p>
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-luxury-gold to-yellow-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all mb-4 relative overflow-hidden group"
            >
              <span className="relative z-10">🛒 Add to Cart - Save ₹{savings.toLocaleString()}!</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                animate={{ x: [-100, 100] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </motion.button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isAuthenticated) {
                  router.push('/login');
                } else {
                  handleAddToCart();
                  router.push('/cart');
                }
              }}
              className="w-full border-2 border-red-600 bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 hover:border-red-700 transition-all animate-pulse"
            >
              ⚡ BUY NOW - Limited Time Offer!
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🚚</span>
                <span className="font-semibold">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">↩️</span>
                <span className="font-semibold">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">🔒</span>
                <span className="font-semibold">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif font-bold text-luxury-navy mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}