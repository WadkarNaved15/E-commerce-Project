'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-luxury-navy text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-4">Elegance Couture</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Timeless elegance meets contemporary design. Discover our curated collection
              of luxury fashion pieces crafted for the discerning individual.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center hover:bg-opacity-90 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center hover:bg-opacity-90 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center hover:bg-opacity-90 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-300 hover:text-luxury-gold transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to receive exclusive offers and updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-luxury-gold px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Elegance Couture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
