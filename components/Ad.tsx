import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const ads = [
  {
    id: 1,
    headline: 'Shopify',
    subheadline: 'Start your business today',
    description: 'Create your online store in minutes',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
    alt: 'Shopify - Start your business',
    url: 'https://www.shopify.com',
    bgColor: '#000000',
    accentColor: '#96bf48',
    textColor: '#ffffff',
    secondaryText: '#e0e0e0'
  },
  {
    id: 2,
    headline: 'Spotify Premium',
    subheadline: 'Music for everyone',
    description: 'Millions of songs. No ads. Free for 3 months.',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&h=400&fit=crop',
    alt: 'Spotify Premium',
    url: 'https://www.spotify.com',
    bgColor: '#000000',
    accentColor: '#1db954',
    textColor: '#ffffff',
    secondaryText: '#e0e0e0'
  },
  {
    id: 3,
    headline: 'Airbnb',
    subheadline: 'Book unique stays',
    description: 'Discover amazing places to stay around the world',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=400&fit=crop',
    alt: 'Airbnb',
    url: 'https://www.airbnb.com',
    bgColor: '#000000',
    accentColor: '#ff5a5f',
    textColor: '#ffffff',
    secondaryText: '#e0e0e0'
  }
];

export default function AdBanner() {
  const [currentAd, setCurrentAd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleAdClick = () => {
    window.open(ads[currentAd].url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-gray-100 py-2">
      {/* Ad Label */}
      <div className="max-w-6xl mx-auto px-4 mb-1">
        <p className="text-xs text-gray-500 font-medium">ADVERTISEMENT</p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-gray-200 h-48"
            onClick={handleAdClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={ads[currentAd].image}
                alt={ads[currentAd].alt}
                fill
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            {/* Content Container */}
            <div className="relative h-full w-full">
                
              {/* Text Content - Split Layout */}
              <div className="h-full flex items-center justify-between px-8 py-4">
                
                {/* Left Side - Badge and Headline */}
                <div className="flex-1 max-w-md">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-left-${currentAd}`}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 30, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Badge */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-1 px-2 py-1 mb-3 text-xs font-semibold rounded-full border"
                        style={{ 
                          borderColor: ads[currentAd].accentColor,
                          color: ads[currentAd].accentColor,
                          backgroundColor: `${ads[currentAd].accentColor}10`
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        FEATURED
                      </motion.div>

                      <h2 
                        className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
                        style={{ color: ads[currentAd].textColor }}
                      >
                        {ads[currentAd].headline}
                      </h2>
                      
                      <p 
                        className="text-base md:text-lg font-medium"
                        style={{ color: ads[currentAd].accentColor }}
                      >
                        {ads[currentAd].subheadline}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side - Description and CTA */}
                <div className="flex-1 max-w-md text-right">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-right-${currentAd}`}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p 
                        className="text-sm md:text-base mb-4 leading-relaxed"
                        style={{ color: ads[currentAd].secondaryText }}
                      >
                        {ads[currentAd].description}
                      </p>

                      {/* CTA Button */}
                      <div className="flex justify-end mb-3">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm shadow-lg transition-all duration-300"
                          style={{ 
                            backgroundColor: ads[currentAd].accentColor,
                            color: '#ffffff'
                          }}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Progress Indicators */}
                      <div className="flex gap-2 justify-end">
                        {ads.map((_, index) => (
                          <motion.div
                            key={index}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{ 
                              width: currentAd === index ? '24px' : '8px',
                              backgroundColor: currentAd === index 
                                ? ads[currentAd].accentColor 
                                : '#d1d5db'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}