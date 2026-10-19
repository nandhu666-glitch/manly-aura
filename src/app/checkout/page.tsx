'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Truck, CreditCard, Banknote, ArrowLeft, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { OrderCustomer, PaymentMethod } from '@/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold font-mono uppercase tracking-wider mb-2">No Items In Bag</h1>
        <p className="text-xs text-neutral-400 mb-6">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/" className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!customer.fullName.trim()) return 'Please enter your full name.';
    if (!customer.phone.trim() || !/^[6-9]\d{9}$/.test(customer.phone.trim().replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!customer.email.trim() || !/^\S+@\S+\.\S+$/.test(customer.email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (!customer.addressLine1.trim()) return 'Please enter your delivery street address.';
    if (!customer.city.trim()) return 'Please enter your city.';
    if (!customer.pincode.trim() || !/^\d{6}$/.test(customer.pincode.trim())) {
      return 'Please enter a valid 6-digit Indian PIN code.';
    }
    return null;
  };

  // Helper to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'cod') {
        // Cash on Delivery direct order
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer,
            items: items.map(it => ({ productId: it.product.id, quantity: it.quantity })),
            paymentMethod: 'cod'
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to place order');

        clearCart();
        router.push(`/order-success/${data.order.id}`);
        return;
      }

      // Razorpay Payment Flow
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 1. Create order on server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create payment order');

      // Check if running in Mock/Test Fallback Mode
      if (orderData.isTestFallback) {
        // Simulate immediate successful payment for development and demo testing
        const confirmTestPayment = window.confirm(
          `MANLY AURA TEST CHECKOUT:\n\nRazorpay Test Gateway Mode initialized.\nOrder Amount: ₹${total}\n\nClick OK to simulate successful payment, or Cancel to abort.`
        );

        if (!confirmTestPayment) {
          setLoading(false);
          return;
        }

        const verifyRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer,
            items: items.map(it => ({ productId: it.product.id, quantity: it.quantity })),
            paymentMethod: 'razorpay',
            razorpayOrderId: orderData.id,
            razorpayPaymentId: `pay_test_${Date.now()}`
          })
        });

        const verifiedOrder = await verifyRes.json();
        clearCart();
        router.push(`/order-success/${verifiedOrder.order.id}`);
        return;
      }

      // Real Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MANLY AURA',
        description: 'Luxury Men Essentials Order',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=200&q=80',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify signature on server
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
              throw new Error('Payment verification failed');
            }

            // Create verified order
            const finalOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customer,
                items: items.map(it => ({ productId: it.product.id, quantity: it.quantity })),
                paymentMethod: 'razorpay',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id
              })
            });

            const finalOrderData = await finalOrderRes.json();
            clearCart();
            router.push(`/order-success/${finalOrderData.order.id}`);
          } catch (err: any) {
            setError(err.message || 'Payment processing error');
            setLoading(false);
          }
        },
        prefill: {
          name: customer.fullName,
          email: customer.email,
          contact: customer.phone
        },
        theme: {
          color: '#000000'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', function (response: any) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            <span>Back to Bag</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-2">
            Secure Checkout
          </h1>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form: Customer & Address Information (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <h2 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                  1. Contact Information
                </h2>
                <span className="text-[10px] font-mono text-neutral-500">Pan-India Delivery</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customer.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Mobile Number (10 Digits) *
                  </label>
                  <div className="flex">
                    <span className="bg-neutral-900 border border-r-0 border-neutral-800 px-3 py-2.5 text-xs text-neutral-400 font-mono flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={customer.phone}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Email Address (For Order Tracking Receipt) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="rahul.sharma@example.com"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                />
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <h2 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                  2. Shipping Address
                </h2>
                <Truck size={14} className="text-neutral-500" />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Flat / House No. / Street Address *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  placeholder="Apartment 4B, Signature Towers, MG Road"
                  value={customer.addressLine1}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Near Metro Station"
                    value={customer.landmark}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Mumbai / Bengaluru / Delhi"
                    value={customer.city}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    State *
                  </label>
                  <select
                    name="state"
                    value={customer.state}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  >
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    PIN Code (6 Digits) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    placeholder="400001"
                    value={customer.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Courier / Gate Delivery Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. Leave package with building security desk"
                  value={customer.notes}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 px-3.5 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
                />
              </div>
            </div>

            {/* 3. Payment Method Selection */}
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
              <div className="border-b border-neutral-900 pb-3">
                <h2 className="text-xs uppercase font-mono tracking-widest text-white font-bold">
                  3. Select Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition ${
                    paymentMethod === 'razorpay'
                      ? 'border-white bg-neutral-900/60'
                      : 'border-neutral-800 bg-black hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="mt-1 text-white focus:ring-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase font-mono text-white flex items-center gap-2">
                        <CreditCard size={15} />
                        Online Payment via Razorpay
                      </span>
                      <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-mono px-2 py-0.5">
                        INSTANT CONFIRMATION
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking & Wallets.
                    </p>
                  </div>
                </label>

                {/* COD Option */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-white bg-neutral-900/60'
                      : 'border-neutral-800 bg-black hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-white focus:ring-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase font-mono text-white flex items-center gap-2">
                        <Banknote size={15} />
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Pay cash or UPI to the delivery courier agent upon receiving your order.
                    </p>
                  </div>
                </label>
              </div>

              {/* Security Banner */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                <Lock size={12} className="text-white" />
                <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
              </div>
            </div>

            {/* Place Order Button for Mobile */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-white text-black hover:bg-neutral-200 transition font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Processing Order...' : `Pay ₹${total.toLocaleString('en-IN')}`}
              </button>
            </div>

          </form>

          {/* Right Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 sticky top-28 space-y-6">
              
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-neutral-800 pb-3">
                Order Summary ({items.length} items)
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-neutral-900">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-16 object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-400 mt-0.5">
                        Qty: {quantity} × ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-white">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-neutral-900 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} />
                      Buy 3 Get 1 Free Promo
                    </span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping Fee</span>
                  <span>
                    {shipping === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-neutral-800 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Total Payable</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Desktop Place Order Button */}
              <div className="hidden lg:block pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-white text-black hover:bg-neutral-200 transition font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    'Processing Order...'
                  ) : paymentMethod === 'razorpay' ? (
                    `Pay & Confirm ₹${total.toLocaleString('en-IN')}`
                  ) : (
                    `Confirm COD Order (₹${total.toLocaleString('en-IN')})`
                  )}
                </button>
              </div>

              <div className="space-y-2 pt-2 text-[10px] font-mono text-neutral-500 border-t border-neutral-900">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-white" />
                  <span>Verified Razorpay Merchant & Fast Dispatch</span>
                </p>
                <p>Support Hotline: +91 7356677512</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
