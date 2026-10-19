import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
        
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Back to Storefront</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-3">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-neutral-500 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-6 bg-neutral-950 border border-neutral-900 p-6 sm:p-8">
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">1. Information We Collect</h2>
            <p>
              When you purchase from MANLY AURA (www.manlyaura.com), we collect essential order processing information: your name, shipping address, 10-digit mobile number, and email address. We do NOT store complete credit card or UPI PIN numbers; all financial transactions are encrypted and processed by Razorpay.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">2. Use of Your Data</h2>
            <p>
              Your data is utilized strictly to fulfill your orders, provide dispatch tracking SMS/WhatsApp notifications, and maintain order history. We never sell, rent, or trade your personal data to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">3. Security Standards</h2>
            <p>
              We implement industry-standard 256-bit SSL encryption across www.manlyaura.com. Payment gateways adhere strictly to PCI-DSS Level 1 compliance standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase font-mono text-white">4. Contact Data Officer</h2>
            <p>
              For data access, correction, or deletion requests, contact our privacy team at <strong>support@manlyaura.com</strong> or phone <strong>+91 7356677512</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
