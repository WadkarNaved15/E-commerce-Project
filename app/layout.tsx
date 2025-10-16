import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Heeriya – Luxury Jewelry',
  description:
    'Discover Heeriya’s exclusive collection of luxury jewelry. Premium necklaces, earrings, and bangles crafted for elegance and timeless style.',
  keywords: [
    'luxury jewelry',
    'designer necklaces',
    'elegant earrings',
    'premium bangles',
    'high-end accessories',
    'Heeriya jewelry',
  ],
  authors: [{ name: 'Heeriya' }],
  metadataBase: new URL('https://heeriya.vercel.app'),
  alternates: {
    canonical: 'https://heeriya.vercel.app',
  },

  icons: {
    icon: '/uploads/Logo.jpg',        // Browser tab
    shortcut: '/uploads/Logo.jpg',    // Shortcut icon
    apple: '/uploads/Logo.jpg',       // iOS / Apple Touch
    other: [
      { rel: 'mask-icon', url: '/uploads/Logo.jpg' },
      { rel: 'android-chrome', url: '/uploads/Logo.jpg' },
    ],
  },

  openGraph: {
    title: 'Heeriya – Timeless Luxury Jewelry',
    description:
      'Experience timeless elegance with Heeriya’s curated collection of necklaces, earrings, and bangles.',
    type: 'website',
    url: 'https://heeriya.vercel.app',
    siteName: 'Heeriya',
    images: [
      {
        url: 'https://heeriya.vercel.app/uploads/Logo.jpg', // ✅ Use logo for OG as well
        width: 800,
        height: 800,
        alt: 'Heeriya – Luxury Jewelry',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Heeriya – Luxury Jewelry',
    description:
      'Explore Heeriya’s exquisite handcrafted jewelry collection made for elegance and timeless beauty.',
    images: ['https://heeriya.vercel.app/uploads/Logo.jpg'], // ✅ Same logo for Twitter card
    creator: '@HeeriyaOfficial',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // ✅ SEO structured data (for Google to show logo in search results)
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Heeriya – Luxury Jewelry',
      url: 'https://heeriya.vercel.app',
      logo: 'https://heeriya.vercel.app/uploads/Logo.jpg',
      sameAs: [
        'https://www.instagram.com/heeriyabyanj',
        'https://www.facebook.com/heeriyaofficial',
        'https://x.com/HeeriyaOfficial',
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
