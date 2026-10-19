import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, Truck, Package, MessageSquare, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { getOrderById } from '@/lib/storage';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold font-mono uppercase tracking-wider mb-2">Order Not Found</h1>
        <p className="text-xs text-neutral-400 mb-6">Could not locate order ID: {orderId}</p>
        <Link href="/" className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold">
          Return to Store
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello MANLY AURA team, I have placed Order #${order.id} on www.manlyaura.com for ₹${order.total}. Could you please confirm dispatch details?`
  );
  const whatsappUrl = `https://wa.me/917356677512?text=${whatsappMessage}`;

  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Celebration Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10">
            <CheckCircle size={32} />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 block">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-white">
            Thank You, {order.customer.fullName.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto">
            Your MANLY AURA package is being prepared with extreme care at our fulfillment center.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase text-neutral-500 block mb-1">Order Number</span>
            <span className="text-white font-bold">{order.id}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-neutral-500 block mb-1">Date</span>
            <span className="text-white">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-neutral-500 block mb-1">Payment Method</span>
            <span className="text-white uppercase">
              {order.paymentMethod === 'razorpay' ? 'Online (Paid)' : 'Cash on Delivery'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-neutral-500 block mb-1">Estimated Delivery</span>
            <span className="text-emerald-400 font-semibold">3-4 Business Days</span>
          </div>
        </div>

        {/* Order Details & Receipt */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-8 mb-8">
          
          {/* Shipping Address */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-3 border-b border-neutral-900 pb-2 flex items-center gap-2">
              <Truck size={14} className="text-white" />
              <span>Delivery Details</span>
            </h3>
            <div className="text-xs font-mono text-neutral-300 space-y-1">
              <p className="font-bold text-white">{order.customer.fullName}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.landmark && <p>Landmark: {order.customer.landmark}</p>}
              <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-neutral-400">Phone: +91 {order.customer.phone} | Email: {order.customer.email}</p>
              {order.customer.notes && (
                <p className="text-[11px] text-neutral-500 italic mt-2">Delivery Note: &ldquo;{order.customer.notes}&rdquo;</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-900 pb-2 flex items-center gap-2">
              <Package size={14} className="text-white" />
              <span>Purchased Items</span>
            </h3>
            <div className="space-y-4 divide-y divide-neutral-900">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-14 h-16 object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{item.productName}</h4>
                      <p className="text-[10px] font-mono text-neutral-400">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-neutral-900 pt-4 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Buy 3 Get 1 Free Savings</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Shipping Fee</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div className="border-t border-neutral-800 pt-3 flex justify-between text-base font-bold text-white">
              <span>Total Paid / Due</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
          >
            <MessageSquare size={16} />
            <span>Receive Dispatch Updates on WhatsApp (+91 7356677512)</span>
          </a>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/track-order"
              className="flex-1 py-3.5 bg-neutral-900 border border-neutral-800 hover:border-white text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
            >
              <span>Track Order Live</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/"
              className="flex-1 py-3.5 bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
