'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const cartCount = getCartCount();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-luxury-navy">
                Heeriya
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative group ${
                    isActive(link.href)
                      ? 'text-luxury-navy'
                      : 'text-gray-600 hover:text-luxury-navy'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-luxury-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-luxury-navy transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href={isAuthenticated ? '/account' : '/login'}
                className="text-gray-600 hover:text-luxury-navy transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-luxury-navy transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-luxury-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 hover:text-luxury-navy transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-20 left-0 bottom-0 w-64 bg-white shadow-xl z-40 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-luxury-gold'
                      : 'text-gray-600 hover:text-luxury-navy'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="h-20" />
    </>
  );
}
