import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
        
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Back to Storefront</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-3">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 bg-neutral-950 border border-neutral-900 p-6 sm:p-8">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">1. Shipping Coverage Across India</h2>
            <p>
              MANLY AURA ships to over 27,000+ PIN codes across all 28 states and 8 union territories in India via verified courier partners including BlueDart Express, Delhivery, and Shiprocket.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">2. Shipping Charges & Free Delivery Threshold</h2>
            <p>
              • <strong>Orders Above ₹999:</strong> Completely FREE Express Delivery across India.<br />
              • <strong>Orders Below ₹999:</strong> A standard flat shipping charge of ₹79 is applied at checkout to cover express courier logistics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">3. Dispatch & Transit Timelines</h2>
            <p>
              • <strong>Dispatch:</strong> All verified orders are packed and dispatched within 24 to 48 business hours.<br />
              • <strong>Transit Time:</strong> Metro cities (Mumbai, Bengaluru, Delhi NCR, Hyderabad, Chennai, Kolkata): 2–3 business days.<br />
              • <strong>Rest of India:</strong> 3–5 business days.<br />
              • <strong>Northeast & Remote Areas:</strong> 5–7 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">4. Cash on Delivery (COD)</h2>
            <p>
              Cash on Delivery is available for all eligible pin codes across India. Please ensure the exact cash amount or UPI payment app is ready when the courier partner arrives.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">5. Tracking Inquiries</h2>
            <p>
              You can track your order at any time using our live <Link href="/track-order" className="text-white underline">Track Order</Link> page, or reach out to our concierge team at <strong>+91 6282307512</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}

