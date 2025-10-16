'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type {Product} from "@/lib/products"
import FeaturedCollection from "@/components/FeaturedCollection";
import Ad from "@/components/Ad"



const heroSlides = [
  {
    image: '/uploads/Product-2.jpg',
    title: 'Elegance Crafted in Every Detail',
    subtitle: 'Discover heirloom jewelry designed to shine for generations.',
  },
  {
    image: '/uploads/Product-3.jpg',
    title: 'Adorn Your Story with Brilliance',
    subtitle: 'Each gemstone tells a tale of grace, love, and timeless beauty.',
  },
  {
    image: '/uploads/Product-1.jpg',
    title: 'The Art of Fine Adornment',
    subtitle: 'Handcrafted luxury that celebrates you—inside and out.',
  },
];


const testimonials = [
  {
    text: 'Heeriya’s craftsmanship is unmatched. Every piece feels personal and refined.',
    author: 'Aaradhya Kapoor',
    role: 'Luxury Stylist',
  },
  {
    text: 'The jewelry radiates elegance and confidence—perfect for any special occasion.',
    author: 'Mira Joshi',
    role: 'Fashion Editor',
  },
  {
    text: 'I felt truly special wearing Heeriya. The design, sparkle, and finish are exquisite.',
    author: 'Leena Mehta',
    role: 'Entrepreneur',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [products, setProducts] = useState<Product[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(false);

  // Optimized data fetching with caching
  useEffect(() => {
    // Auto-slide transitions
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);

    const timer2 = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(timer2);
    };
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };


  return (
    <div className="animate-fade-in">
      {/* <Ad /> */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center justify-center text-center text-white z-10">
          <div className="max-w-4xl px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-base md:text-lg mb-6 text-gray-200 max-w-2xl mx-auto">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-luxury-gold text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-flex items-center space-x-2 animate-pulse-slow"
                  >
                    <span>Discover Collection</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-3 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-luxury-gold w-8' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    <FeaturedCollection />


      <section className="bg-luxury-gray py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-luxury-navy text-center mb-16">
            What Our Clients Say
          </h2>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-12 rounded-lg shadow-lg text-center"
              >
                <Quote className="text-luxury-gold mx-auto mb-6" size={48} />
                <p className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                  {testimonials[currentTestimonial].text}
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-semibold text-luxury-navy">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-luxury-gold w-8'
                      : 'bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif font-bold text-luxury-navy text-center mb-12">
          Follow Us on Instagram
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            '/uploads/Instagram-1.png',
            '/uploads/Instagram-2.png',
            '/uploads/Instagram-3.png',
            '/uploads/Instagram-4.png',
          ].map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
               className="relative h-80 md:h-96 overflow-hidden rounded-xl cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.25)] transition-shadow"

              >
              <Image
                src={img}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
