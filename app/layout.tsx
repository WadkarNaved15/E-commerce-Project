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
  openGraph: {
    title: 'Heeriya – Timeless Luxury Jewelry',
    description:
      'Experience timeless elegance with Heeriya’s curated collection of necklaces, earrings, and bangles.',
    type: 'website',
    url: 'https://heeriya.vercel.app',
    siteName: 'Heeriya',
    images: [
      {
        url: 'https://heeriya.vercel.app/og-image.jpg', // optional: add your own image in /public
        width: 1200,
        height: 630,
        alt: 'Heeriya – Luxury Jewelry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heeriya – Luxury Jewelry',
    description:
      'Explore Heeriya’s exquisite handcrafted jewelry collection made for elegance and timeless beauty.',
    images: ['https://heeriya.vercel.app/og-image.jpg'], // same image works for Twitter
    creator: '@HeeriyaOfficial', // optional if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
