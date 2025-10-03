import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Elegance Couture - Luxury Fashion',
  description: 'Discover timeless elegance with our curated collection of luxury fashion pieces. Premium dresses, accessories, and shoes crafted for the discerning individual.',
  keywords: 'luxury fashion, designer clothing, elegant dresses, high-end accessories, premium shoes',
  authors: [{ name: 'Elegance Couture' }],
  openGraph: {
    title: 'Elegance Couture - Luxury Fashion',
    description: 'Timeless elegance meets contemporary design',
    type: 'website',
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
