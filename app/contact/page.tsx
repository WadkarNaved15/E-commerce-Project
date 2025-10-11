'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: ['Heeriya Jewelry Boutique', 'Shop No. 12, Linking Road', 'Mumbai, Maharashtra, India 400050'],
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: ['+91 22 1234 5678', 'Mon-Sat 10am-8pm IST'],
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: ['support@heeriyajewelry.in', 'info@heeriyajewelry.in'],
    },
    {
      icon: <Clock size={24} />,
      title: 'Store Hours',
      details: ['Mon-Sat: 10am-8pm', 'Sunday: 11am-6pm'],
    },
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-luxury-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {"We'd love to hear from you. Our team is here to help with any questions."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold text-white rounded-full flex items-center justify-center">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-luxury-navy mb-2">
                {info.title}
              </h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-luxury-navy mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-luxury-navy mb-2">
                What is your return policy?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day return policy on all jewelry items. Items must be unworn, with
                original packaging and bill.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-luxury-navy mb-2">
                Do you offer customization?
              </h3>
              <p className="text-gray-600">
                Yes, we provide custom jewelry design services. Contact us via phone or email to schedule a consultation.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-luxury-navy mb-2">
                Do you ship across India?
              </h3>
              <p className="text-gray-600">
                Yes, we ship nationwide with insured delivery. Shipping costs vary depending on the location.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
