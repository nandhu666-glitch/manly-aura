'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    totalItems,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeItemsCount,
    itemsNeededForPromo
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6 text-neutral-500">
          <ShoppingBag size={32} />
        </div>
        <h1 className="text-2xl font-bold font-mono uppercase tracking-wider mb-2">Your Bag Is Empty</h1>
        <p className="text-xs text-neutral-400 max-w-sm mb-8">
          Explore our signature parfums, chronographs, grooming devices, and heavyweight apparel.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  const freeShippingProgress = Math.min(100, Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="bg-black text-white min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-1">
            Shopping Cart
          </p>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            Your Order Review ({totalItems} Items)
          </h1>
        </div>

        {/* Promotional Banner */}
        <div className="mb-8 p-4 bg-neutral-950 border border-neutral-800 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 text-emerald-400 border border-neutral-800">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase font-mono text-white">
                BUY 3 GET 1 FREE PROMOTION
              </p>
              {freeItemsCount > 0 ? (
                <p className="text-xs text-emerald-400 font-mono">
                  Applied! You get {freeItemsCount} item{freeItemsCount > 1 ? 's' : ''} completely FREE (-₹{discount.toLocaleString('en-IN')})
                </p>
              ) : (
                <p className="text-xs text-neutral-400 font-mono">
                  Add {itemsNeededForPromo} more item{itemsNeededForPromo > 1 ? 's' : ''} to get 1 item 100% FREE!
                </p>
              )}
            </div>
          </div>
          <Link
            href="/category/fragrance"
            className="text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white underline"
          >
            Add More Items &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="border border-neutral-900 bg-neutral-950 divide-y divide-neutral-900">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover bg-neutral-900 border border-neutral-800"
                    />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-semibold text-white">
                        <Link href={`/products/${product.id}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-xs font-mono text-neutral-400 mt-1">
                        ₹{product.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-800 bg-black">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-neutral-400 hover:text-white"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-mono font-medium text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="p-2 text-neutral-400 hover:text-white disabled:opacity-30"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total for item */}
                    <span className="text-sm font-mono font-bold text-white min-w-[5rem] text-right">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-neutral-500 hover:text-red-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-6 h-fit">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
              Order Summary
            </h2>

            {/* Shipping Progress */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span className="text-neutral-300">
                    Add ₹{amountNeededForFreeShipping} for <span className="text-emerald-400">FREE Shipping</span>
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={13} /> FREE Shipping Unlocked!
                  </span>
                )}
                <span className="text-neutral-400">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Buy 3 Get 1 Free Promo</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-neutral-800 pt-3 flex justify-between text-base font-bold text-white">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 bg-white text-black hover:bg-neutral-200 transition font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <p className="text-[11px] font-mono text-neutral-500 text-center">
              Razorpay 256-Bit SSL Encrypted & Cash on Delivery Available
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

