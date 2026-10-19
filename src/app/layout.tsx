import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppButton from '@/components/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MANLY AURA | Luxury Fragrances, Accessories, Gadgets & Fashion',
  description:
    'Official MANLY AURA store (www.manlyaura.com). Premium Indian lifestyle brand for men. High-concentration perfumes, surgical-grade EDC accessories, grooming gadgets, and heavyweight apparel. Buy 3 Get 1 Free offer.',
  metadataBase: new URL('https://www.manlyaura.com'),
  keywords: [
    'MANLY AURA',
    'Men perfume India',
    'Eau de parfum',
    'Men watches India',
    'Beard trimmer',
    'Heavyweight tee 280 GSM',
    'Buy 3 Get 1 Free clothing India',
    'Luxury men brand'
  ],
  openGraph: {
    title: 'MANLY AURA | Modern Masculine Essentials',
    description: 'Elevate your presence with luxury fragrances, EDC accessories, precision gadgets, and heavyweight streetwear.',
    url: 'https://www.manlyaura.com',
    siteName: 'MANLY AURA',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'MANLY AURA Brand'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-black text-neutral-100 antialiased flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
