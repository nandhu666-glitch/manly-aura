'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '917356677512';
  const defaultMessage = encodeURIComponent(
    'Hello MANLY AURA team, I need assistance with an order/product on www.manlyaura.com'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-neutral-900 border border-neutral-700 hover:border-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
      aria-label="Chat with MANLY AURA on WhatsApp"
      title="Chat with MANLY AURA Support"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      <MessageSquare size={18} className="text-emerald-400 group-hover:text-emerald-300" />
      <span className="hidden sm:inline text-xs font-mono tracking-wider uppercase font-medium pr-1">
        WhatsApp Us
      </span>
    </a>
  );
}
