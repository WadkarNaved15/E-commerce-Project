'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Truck, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Premium Quality',
      description: 'Every piece is carefully selected and crafted with the finest materials.',
    },
    {
      icon: <Truck size={40} />,
      title: 'Fast Shipping',
      description: 'Complimentary express shipping on all orders worldwide.',
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure Shopping',
      description: 'Your privacy and security are our top priorities.',
    },
    {
      icon: <Heart size={40} />,
      title: 'Customer Care',
      description: 'Dedicated support team ready to assist you 24/7.',
    },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="About Elegance Couture"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Where timeless elegance meets contemporary sophistication
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold text-luxury-navy mb-6">
              Founded on Excellence
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Elegance Couture was born from a passion for timeless fashion and an
              unwavering commitment to quality. Since our founding, we have been
              dedicated to curating collections that embody sophistication and grace.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each piece in our collection is carefully selected from the world's finest
              artisans and designers, ensuring that every item meets our exacting
              standards of craftsmanship and elegance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that true luxury is not just about what you wear, but how it
              makes you feel. Our mission is to empower individuals to express their
              unique style with confidence and grace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Our atelier"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-serif font-bold text-luxury-navy text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-luxury-gray rounded-full flex items-center justify-center text-luxury-gold">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-luxury-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-luxury-navy text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Be the first to discover new collections, exclusive offers, and styling tips
            from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-luxury-gold px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
