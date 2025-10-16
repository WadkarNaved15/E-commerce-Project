import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  {
    id: 1,
    headline: 'GoDaddy Airo',
    subheadline: 'The colleague you\'ve always wanted.',
    image: '/uploads/ad-1.jpg',
    alt: 'GoDaddy Airo - AI Colleague',
    url: 'https://www.godaddy.com',
    backgroundColor: '#f8f4f0',
    textColor: '#1a2332',
    accentColor: '#d4af37'
  },
  {
    id: 2,
    headline: 'Exclusive Collection',
    subheadline: 'Limited Edition Jewelry',
    image: '/uploads/ad-2.jpg',
    alt: 'Special Jewelry Offer',
    url: 'https://example.com/offer',
    backgroundColor: '#fefdfb',
    textColor: '#1a2332',
    accentColor: '#c9a961'
  },
  {
    id: 3,
    headline: 'Partner Excellence',
    subheadline: 'Trusted Worldwide',
    image: '/uploads/ad-3.jpg',
    alt: 'Partner Brand',
    url: 'https://example.com/partner',
    backgroundColor: '#f5f5f7',
    textColor: '#1a2332',
    accentColor: '#d4af37'
  }
];

export default function AdBanner() {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const handleAdClick = () => {
    window.open(ads[currentAd].url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full cursor-pointer"
          style={{ backgroundColor: ads[currentAd].backgroundColor }}
          onClick={handleAdClick}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center justify-between gap-8">
              {/* Text Content - Left & Center */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${currentAd}`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 
                      className="text-lg md:text-xl font-semibold"
                      style={{ color: ads[currentAd].textColor }}
                    >
                      {ads[currentAd].headline}
                      <span 
                        className="block text-sm md:text-base font-normal mt-0.5 opacity-80"
                        style={{ color: ads[currentAd].accentColor }}
                      >
                        {ads[currentAd].subheadline}
                      </span>
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image - Right Side */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentAd}`}
                  initial={{ x: 30, opacity: 0, scale: 0.95 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -30, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-12 w-32 md:h-14 md:w-40 rounded-lg overflow-hidden shadow-sm flex-shrink-0"
                >
                  <img
                    src={ads[currentAd].image}
                    alt={ads[currentAd].alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}