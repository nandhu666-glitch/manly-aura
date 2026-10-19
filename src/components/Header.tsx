'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Search, Phone, ShieldCheck } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { useCart } from '@/context/cart-context';

export default function Header() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Fragrance', href: '/category/fragrance' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Gadgets', href: '/category/gadgets' },
    { name: 'Fashion', href: '/category/fashion' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800 tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">OFFER:</span>
            <span>BUY 3 GET 1 FREE ON ALL PRODUCTS | FREE SHIPPING OVER ₹999</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-neutral-400">
            <a
              href="https://www.instagram.com/manlyaura.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1"
            >
              <InstagramIcon size={12} />
              <span>@manlyaura.in</span>
            </a>
            <a
              href="tel:7356677512"
              className="hover:text-white transition flex items-center gap-1"
            >
              <Phone size={12} />
              <span>+91 7356677512</span>
            </a>
            <Link href="/track-order" className="hover:text-white transition">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-neutral-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-neutral-400 hover:text-white p-2"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex flex-col items-center sm:items-start">
                <span className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white uppercase group-hover:text-neutral-300 transition">
                  MANLY AURA
                </span>
                <span className="text-[9px] tracking-[0.4em] text-neutral-500 uppercase -mt-1 font-mono">
                  LUXURY MEN&apos;S ESSENTIALS
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((cat) => {
                const isActive = pathname === cat.href;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={`text-xs uppercase font-medium tracking-[0.2em] transition-colors py-2 relative ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                  </Link>
                );
              })}
              <Link
                href="/category/fragrance"
                className="text-xs uppercase font-semibold tracking-[0.2em] text-emerald-400 hover:text-emerald-300 transition"
              >
                Buy 3 Get 1 Free
              </Link>
            </nav>

            {/* Action Buttons: Search, Track, Cart */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-neutral-400 hover:text-white p-2 transition"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>

              <button
                onClick={openCart}
                className="relative bg-white text-black hover:bg-neutral-200 transition px-3.5 py-2 rounded-none flex items-center gap-2 font-medium text-xs tracking-wider"
                aria-label="Open Cart"
              >
                <ShoppingBag size={16} />
                <span className="hidden sm:inline uppercase">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-mono">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3">
            <div className="pt-2 pb-3 space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-neutral-900 rounded"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/category/fragrance"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-widest text-emerald-400 font-semibold"
              >
                🔥 Buy 3 Get 1 Free Offer
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm uppercase tracking-widest text-neutral-400 hover:text-white"
              >
                Track Your Order
              </Link>
            </div>
            <div className="border-t border-neutral-800 pt-4 flex flex-col gap-2 text-xs text-neutral-400 font-mono">
              <a href="tel:7356677512" className="flex items-center gap-2">
                <Phone size={14} />
                <span>Call/WhatsApp: +91 7356677512</span>
              </a>
              <a href="https://www.instagram.com/manlyaura.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <InstagramIcon size={14} />
                <span>Instagram: @manlyaura.in</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <form onSubmit={handleSearchSubmit}>
              <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono">
                Search MANLY AURA Catalog
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Noir, Watch, Trimmer, Heavyweight Tee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-black border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white text-sm"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3 font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
              <span>Popular:</span>
              <Link href="/category/fragrance" onClick={() => setSearchOpen(false)} className="underline hover:text-white">Fragrance</Link>
              <span>•</span>
              <Link href="/category/accessories" onClick={() => setSearchOpen(false)} className="underline hover:text-white">Watches</Link>
              <span>•</span>
              <Link href="/category/gadgets" onClick={() => setSearchOpen(false)} className="underline hover:text-white">Trimmers</Link>
              <span>•</span>
              <Link href="/category/fashion" onClick={() => setSearchOpen(false)} className="underline hover:text-white">280 GSM Tees</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
