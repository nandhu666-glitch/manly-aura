import Link from 'next/link';
import { Phone, Mail, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-900 pt-16 pb-12">
      {/* Trust Proposition Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 text-white shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-wider font-semibold font-mono">Free Shipping</h4>
              <p className="text-[12px] text-neutral-500 mt-1">On all orders above ₹999 across all Indian pin codes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 text-white shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-wider font-semibold font-mono">100% Authentic</h4>
              <p className="text-[12px] text-neutral-500 mt-1">Directly formulated, certified, and engineered in-house.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 text-white shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-wider font-semibold font-mono">Hassle-Free Returns</h4>
              <p className="text-[12px] text-neutral-500 mt-1">7-day replacement for any transit damage or defect.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 justify-center sm:justify-start">
            <div className="p-2.5 bg-neutral-950 border border-neutral-800 text-white shrink-0">
              <Lock size={20} />
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-wider font-semibold font-mono">Secure Payment</h4>
              <p className="text-[12px] text-neutral-500 mt-1">Razorpay 256-bit SSL encrypted. UPI, Cards & COD.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xl font-black tracking-[0.25em] text-white uppercase">
              MANLY AURA
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Engineered for the discerning modern Indian gentleman. We curate high-potency fragrances, surgical-grade accessories, smart EDC gadgets, and heavyweight minimalist apparel.
            </p>
            <div className="pt-2 text-xs space-y-1.5 font-mono text-neutral-400">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-white" />
                <a href="tel:6282307512" className="hover:text-white transition">+91 6282307512</a>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon size={14} className="text-white" />
                <a href="https://www.instagram.com/manlyaura.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  instagram.com/manlyaura.in
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-white" />
                <span>support@manlyaura.com</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white text-xs uppercase tracking-widest font-semibold font-mono mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/fragrance" className="hover:text-white transition">Fragrance</Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-white transition">Accessories</Link>
              </li>
              <li>
                <Link href="/category/gadgets" className="hover:text-white transition">Gadgets</Link>
              </li>
              <li>
                <Link href="/category/fashion" className="hover:text-white transition">Fashion</Link>
              </li>
              <li>
                <Link href="/category/fragrance" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                  Buy 3 Get 1 Free Deal
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="text-white text-xs uppercase tracking-widest font-semibold font-mono mb-4">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/track-order" className="hover:text-white transition">Track Your Order</Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition">Shipping Policy</Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition">Return & Exchange</Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Brand & Admin */}
          <div>
            <h5 className="text-white text-xs uppercase tracking-widest font-semibold font-mono mb-4">
              Store & Admin
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-neutral-500">Official Domain:</span>
                <span className="block text-white font-mono text-[11px]">www.manlyaura.com</span>
              </li>
              <li className="pt-2">
                <Link href="/admin" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition rounded text-[11px] font-mono">
                  <Lock size={12} />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
        <p>© {new Date().getFullYear()} MANLY AURA (www.manlyaura.com). All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Razorpay Verified</span>
          <span>•</span>
          <span>Made in India</span>
        </div>
      </div>
    </footer>
  );
}

