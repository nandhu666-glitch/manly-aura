'use client';

import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Order } from '@/types';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setOrder(null);

    try {
      const isPhone = /^\d{10}$/.test(query.trim());
      const param = isPhone ? `phone=${encodeURIComponent(query.trim())}` : `id=${encodeURIComponent(query.trim())}`;
      const res = await fetch(`/api/orders?${param}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'No matching order found');
      }

      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error('No orders found for this mobile number');
        }
        setOrder(data[0]); // most recent
      } else {
        setOrder(data);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to locate order');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'pending', label: 'Order Received' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'shipped', label: 'Dispatched' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentStep = order ? getStepIndex(order.orderStatus) : 0;

  return (
    <div className="bg-black text-white min-h-screen py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
            Real-Time Logistics
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            Track Your Shipment
          </h1>
          <p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
            Enter your MANLY AURA Order ID (e.g. MA-20261019-...) or your 10-digit registered mobile number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="bg-neutral-950 border border-neutral-800 p-2 sm:p-3 flex gap-2 mb-10 shadow-2xl">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Enter Order ID or 10-Digit Mobile Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black border border-neutral-800 pl-9 pr-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 sm:px-8 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-center gap-2 mb-8">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Result Card */}
        {order && (
          <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-5">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-500">Order Reference</span>
                <h2 className="text-base font-bold font-mono text-white">{order.id}</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-neutral-500">Current Status</span>
                <div className="inline-block px-3 py-1 bg-neutral-900 border border-neutral-700 text-emerald-400 text-xs font-mono uppercase font-bold mt-1">
                  {order.orderStatus}
                </div>
              </div>
            </div>

            {/* Tracking Progress Steps */}
            <div>
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 w-full z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 transition-all duration-500 z-0"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((st, idx) => {
                  const isDone = idx <= currentStep;
                  return (
                    <div key={st.key} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border ${
                          isDone
                            ? 'bg-black border-emerald-500 text-emerald-400'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                        }`}
                      >
                        {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider mt-2 ${isDone ? 'text-white' : 'text-neutral-500'}`}>
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Number Callout */}
            {order.trackingNumber && (
              <div className="p-4 bg-black border border-neutral-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase">Courier Waybill / AWB:</span>
                  <span className="text-white font-bold">{order.trackingNumber}</span>
                </div>
                <span className="text-emerald-400">Delhivery / BlueDart Express</span>
              </div>
            )}

            {/* Destination */}
            <div className="pt-4 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-300">
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block mb-1">Shipping To</span>
                <p className="font-bold text-white">{order.customer.fullName}</p>
                <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block mb-1">Package Contents</span>
                <p>{order.items.length} items (Total: ₹{order.total.toLocaleString('en-IN')})</p>
                <p className="text-neutral-400 uppercase">Payment: {order.paymentMethod === 'razorpay' ? 'Online Paid' : 'Cash on Delivery'}</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
