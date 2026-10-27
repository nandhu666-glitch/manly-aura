import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
        
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Back to Storefront</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-3">
            Returns, Replacements & Refunds
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 bg-neutral-950 border border-neutral-900 p-6 sm:p-8">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">1. 7-Day Replacement Guarantee</h2>
            <p>
              At MANLY AURA, we stand unreservedly behind our products. If you receive an item that is damaged during transit, defective, or incorrect, you are eligible for an immediate zero-hassle replacement within 7 calendar days of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">2. Category-Specific Guidelines</h2>
            <p>
              • <strong>Fragrances:</strong> For hygienic reasons and IFRA safety standards, opened and used fragrance bottles cannot be returned once the seal is broken, unless damaged in transit.<br />
              • <strong>Accessories & Watches:</strong> Must include original casing, link tool, warranty documentation, and intact protective films.<br />
              • <strong>Gadgets & Trimmers:</strong> Covered by our 6-month limited hardware warranty against motor or manufacturing defects.<br />
              • <strong>Fashion & Apparel:</strong> Unwashed, unworn with original tags intact. Size exchanges are supported.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">3. How to Request an Exchange</h2>
            <p>
              To initiate a replacement, simply contact our concierge team via WhatsApp or call at <strong>+91 6282307512</strong> or email <strong>support@manlyaura.com</strong> with your Order ID and a clear photograph/video of the issue.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">4. Refund Processing</h2>
            <p>
              Approved refunds for prepaid orders will be processed back to the original payment method (Bank account, UPI, Card) via Razorpay within 5–7 business days.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}

