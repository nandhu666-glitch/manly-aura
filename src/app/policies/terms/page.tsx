import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
        
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Back to Storefront</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-3">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 bg-neutral-950 border border-neutral-900 p-6 sm:p-8">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">1. Agreement to Terms</h2>
            <p>
              By accessing www.manlyaura.com and purchasing products, you agree to abide by these Terms of Service, applicable laws in India, and jurisdiction under Indian courts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">2. Buy 3 Get 1 Free Promotional Rules</h2>
            <p>
              • The promotion applies automatically across all categories when 4 or more qualifying items are added to the bag.<br />
              • For every set of 4 items, the lowest-priced qualifying item is discounted to ₹0.<br />
              • If an order with a promotional free item is cancelled or partially returned, the discount is proportionally recalculated.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">3. Pricing & Taxes</h2>
            <p>
              All prices displayed on www.manlyaura.com are in Indian Rupees (INR ₹) and are inclusive of Goods and Services Tax (GST) as per Indian law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">4. Intellectual Property</h2>
            <p>
              MANLY AURA, the logo, proprietary olfactive formulations, imagery, and web architecture are protected intellectual property. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
