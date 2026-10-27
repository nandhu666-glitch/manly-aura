'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import InstagramIcon from '@/components/icons/InstagramIcon';

export default function ContactPage() {
  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Return to Storefront</span>
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mt-3">
            Contact MANLY AURA
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1">
            Our concierge team is available to assist you with order inquiries, product recommendations, or corporate gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-neutral-950 border border-neutral-800 p-8 space-y-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-900 pb-3">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Direct Hotline</span>
                  <a href="tel:6282307512" className="text-white font-bold hover:underline">
                    +91 6282307512
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">WhatsApp Support</span>
                  <a
                    href="https://wa.me/916282307512"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    Chat on WhatsApp (+91 6282307512)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <InstagramIcon size={16} className="text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Official Instagram</span>
                  <a
                    href="https://www.instagram.com/manlyaura.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    @manlyaura.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Email Inquiries</span>
                  <span className="text-neutral-300">support@manlyaura.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Concierge Hours</span>
                  <span className="text-neutral-300">Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-8 space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-900 pb-3">
              Drop Us a Message
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! Our support team will reach out shortly.'); }} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul"
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Phone / Email</label>
                <input
                  type="text"
                  required
                  placeholder="9876543210 or email"
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Message / Order ID</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today?"
                  className="w-full bg-black border border-neutral-800 px-3 py-2 text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-neutral-200 transition"
              >
                Send Message &rarr;
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

