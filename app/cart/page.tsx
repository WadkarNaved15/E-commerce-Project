'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'ELEGANCE10') {
      setDiscount(subtotal * 0.1);
      toast.success('Promo code applied! 10% off');
      setPromoCode('');
    } else if (promoCode) {
      toast.error('Invalid promo code');
    }
  };

  const handleRemove = (productId: number, size: string, color: string) => {
    removeFromCart(productId, size);
    toast.success('Item removed from cart');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="mx-auto text-gray-300 mb-4" size={80} />
          <h1 className="text-3xl font-serif font-bold text-luxury-navy mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Discover our curated collection of luxury pieces
          </p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-luxury-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all inline-flex items-center space-x-2 animate-pulse-slow"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-luxury-navy mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-32 h-40 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-luxury-navy hover:text-luxury-gold transition-colors"
                      >
                        {item.product.name}
                      </Link>

                    </div>
                    <button
                      onClick={() =>
                        handleRemove(
                          item.product.id,
                          item.selectedSize
                        )
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Trash2 size={20} />
                      </motion.div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-luxury-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-luxury-gold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <p className="text-xl font-bold text-luxury-navy">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-luxury-gray rounded-lg p-6 sticky top-24"
          >
            <h2 className="text-2xl font-serif font-bold text-luxury-navy mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-bold text-luxury-navy">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Promo Code</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-luxury-navy text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Apply
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/checkout')}
              className="w-full bg-luxury-gold text-white py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </motion.button>

            <Link href="/shop">
              <button className="w-full mt-4 text-luxury-navy hover:text-luxury-gold transition-colors text-center">
                Continue Shopping
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
