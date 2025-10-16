import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  {
    id: 1,
    headline: 'GoDaddy Airo',
    subheadline: 'The colleague you\'ve always wanted.',
    image: 'data:image/png;base64,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',
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
        image: 'data:image/png;base64,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',
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
       image: 'data:image/png;base64,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',
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
                  <Image
                    src={ads[currentAd].image}
                    alt={ads[currentAd].alt}
                    height={240}
                    width={80}
                    className="object-cover"
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