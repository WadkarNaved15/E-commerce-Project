'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Truck, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Award size={40} />,
      title: 'Exquisite Craftsmanship',
      description:
        'Every jewel is handcrafted by master artisans to perfection, using only the finest gemstones and precious metals.',
    },
  {
  icon: <Truck size={40} />,
  title: 'Pan-India Delivery',
  description:
    'We deliver across India with secure, reliable, and express shipping—bringing timeless elegance to your doorstep.',
},
    {
      icon: <Shield size={40} />,
      title: 'Authenticity & Trust',
      description:
        'Each piece comes with a certificate of authenticity, ensuring genuine artistry and ethical sourcing.',
    },
    {
      icon: <Heart size={40} />,
      title: 'Dedicated Support',
      description:
        'Our jewelry experts are always here to help you find the perfect piece for every special moment.',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/uploads/About-Hero.jpg"
          alt="About Heeriya"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              The Essence of Heeriya
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto text-gray-200">
              Where heritage artistry meets modern sophistication
            </p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold text-luxury-navy mb-6">
              A Legacy of Elegance
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Heeriya was born from a passion to create jewelry that transcends
              trends—where timeless design meets heartfelt craftsmanship.
              Every creation is a testament to elegance, precision, and
              artistry.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our jewels are meticulously designed and ethically sourced,
              capturing the essence of every woman’s inner radiance. Each
              gemstone is handpicked for brilliance, ensuring your jewelry
              becomes a cherished heirloom for generations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From daily elegance to milestone celebrations, Heeriya reflects
              sophistication and grace in every facet. Because true luxury is
              felt—deeply and beautifully.
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
              src="/uploads/About-1.jpg"
              alt="Heeriya craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* VALUES SECTION */}
        <div className="mb-0">
          <h2 className="text-4xl font-serif font-bold text-luxury-navy text-center mb-16">
            Our Promise
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

        {/* NEWSLETTER SECTION */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-luxury-navy text-white rounded-2xl p-12 text-center shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join the Heeriya Circle
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Receive exclusive previews, style inspiration, and early access to
            limited-edition collections crafted with love and legacy.
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
        </motion.div> */}
      </section>
    </div>
  );
}
