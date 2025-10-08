import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Heeriya - Luxury Jewelry',
  description: 'Discover Heeriya’s exclusive collection of luxury jewelry. Premium necklaces, earrings, and bangles crafted for elegance and timeless style.',
  keywords: 'luxury jewelry, designer necklaces, elegant earrings, premium bangles, high-end accessories, Heeriya jewelry',
  authors: [{ name: 'Heeriya' }],
  openGraph: {
    title: 'Heeriya - Timeless Luxury Jewelry',
    description: 'Experience timeless elegance with Heeriya’s curated collection of necklaces, earrings, and bangles.',
    type: 'website',
    url: 'https://heeriya.vercel.app', // replace with your website URL
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
            <Toaster position="top-right" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
