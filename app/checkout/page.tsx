'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const STEPS = ['Shipping', 'Payment', 'Review'];

function CheckoutPageContent() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingData, setShippingData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!shippingData.name || !shippingData.address || !shippingData.city || !shippingData.zip) {
        toast.error('Please fill in all shipping fields');
        return;
      }
    }

    if (currentStep === 1) {
      if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
        toast.error('Please fill in all payment fields');
        return;
      }
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlaceOrder = async () => {
  setIsProcessing(true);

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id, // from context
        shippingData,
        paymentData,
        items,
        subtotal,
        tax,
        shipping,
        total,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Order failed");
    }

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#001F3F", "#FFFFFF"],
    });

    clearCart();
    toast.success("Order placed successfully!");
    router.push("/");
  } catch (err) {
    console.error(err);
    toast.error("Failed to place order. Try again.");
  } finally {
    setIsProcessing(false);
  }
};


  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/shop')}
            className="text-luxury-gold hover:underline"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-luxury-navy mb-8">Checkout</h1>

      <div className="flex items-center justify-center mb-12">
        {STEPS.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  index <= currentStep
                    ? 'bg-luxury-gold text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentStep ? <Check size={20} /> : index + 1}
              </div>
              <span className="mt-2 text-sm font-medium">{step}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-24 h-1 mx-4 transition-colors ${
                  index < currentStep ? 'bg-luxury-gold' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-serif font-bold text-luxury-navy mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={shippingData.name}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={shippingData.address}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={shippingData.city}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, city: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={shippingData.zip}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, zip: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <select
                    value={shippingData.country}
                    onChange={(e) =>
                      setShippingData({ ...shippingData, country: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  >
                    <option>India</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-serif font-bold text-luxury-navy mb-6">
                Payment Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cardNumber: e.target.value })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                    <CreditCard
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentData.expiry}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, expiry: e.target.value })
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cvv: e.target.value })
                      }
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-serif font-bold text-luxury-navy mb-6">
                Review Order
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{shippingData.name}</p>
                  <p className="text-gray-700">{shippingData.address}</p>
                  <p className="text-gray-700">
                    {shippingData.city}, {shippingData.zip}
                  </p>
                  <p className="text-gray-700">{shippingData.country}</p>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-luxury-gold hover:underline text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-gray-700">
                    Card ending in {paymentData.cardNumber.slice(-4)}
                  </p>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-luxury-gold hover:underline text-sm mt-2"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border-2 border-luxury-navy text-luxury-navy rounded-lg font-semibold hover:bg-luxury-navy hover:text-white transition-all"
              >
                Back
              </button>
            )}
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="ml-auto px-6 py-3 bg-luxury-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="ml-auto px-8 py-3 bg-luxury-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="inline-block animate-spin">⏳</span>
                ) : (
                  'Place Order'
                )}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-luxury-gray rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-luxury-navy mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-bold text-luxury-navy">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutPageContent />
    </ProtectedRoute>
  );
}
