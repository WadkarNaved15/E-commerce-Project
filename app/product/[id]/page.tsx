'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, Minus, Check } from 'lucide-react';
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
import type { Product } from "@/lib/products"

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const productId = parseInt(params.id as string);

  // Use state to manage the product data
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  // const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // --- Data Fetching Effect ---
  useEffect(() => {
    async function fetchData() {
      if (!productId) return;

      setLoading(true);
      try {
        // 1. Fetch the single product and all products concurrently
        const [productRes, allProductsRes] = await Promise.all([
          fetch(`/api/products/${productId}`),
          fetch('/api/products'),
        ]);

        if (productRes.status === 404) {
          setError(true);
          setLoading(false);
          return;
        }

        if (!productRes.ok || !allProductsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productData: Product = await productRes.json();
        const allProductsData: Product[] = await allProductsRes.json();

        setProduct(productData);
        setAllProducts(allProductsData);

        // Initialize state based on fetched product data
        if (productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
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

  console.log("product", product)
  console.log("All products", allProducts)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          {/* Loader */}
          <div className="w-12 h-12 border-4 border-t-luxury-gold border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-luxury-gold hover:underline">Loading product...</p>
        </div>
      </div>
    );
  }


  if (!product) {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  // if (!selectedColor && product.colors.length > 0) {
  //   setSelectedColor(product.colors[0].name);
  // }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();       // Stop Link navigation
    e.stopPropagation();
    if (!isAuthenticated) {
      router.push("/login"); // redirect if not logged in
    } else {
      handleAddToCart(); // run normal function if logged in
    }
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select size and color');
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
        <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div>
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
                  className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index
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

          <div>
            <h1 className="text-4xl font-serif font-bold text-luxury-navy mb-4">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              {renderStars()}
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">{product.category}</span>
            </div>

            <p className="text-4xl font-bold text-luxury-navy mb-6">
              ₹{product.price.toLocaleString()}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="text-luxury-gold mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-all ${selectedSize === size
                          ? 'border-luxury-gold bg-luxury-gold text-white'
                          : 'border-gray-300 hover:border-luxury-gold'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* <div>
                <h3 className="font-semibold mb-3">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all ${
                        selectedColor === color.name
                          ? 'border-luxury-gold'
                          : 'border-gray-300 hover:border-luxury-gold'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div> */}

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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
              className="w-full bg-luxury-gold text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all mb-4"
            >
              Add to Cart
            </motion.button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!isAuthenticated) {
                  router.push('/login'); // redirect to login if not logged in
                } else {
                  handleAddToCart();     // add item to cart
                  router.push('/cart');  // then redirect to cart page
                }
              }}
              className="w-full border-2 border-luxury-navy text-luxury-navy py-4 rounded-lg font-semibold text-lg hover:bg-luxury-navy hover:text-white transition-all"
            >
              Buy Now
            </button>

          </div>
        </div>

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
