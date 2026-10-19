'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    freeItemsCount,
    itemsNeededForPromo
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round(((freeShippingThreshold - amountNeededForFreeShipping) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-white" />
              <h2 className="text-sm uppercase font-bold tracking-widest font-mono">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="text-neutral-400 hover:text-white p-1 transition"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Promotional & Free Shipping Banners */}
          <div className="p-4 bg-neutral-900/60 border-b border-neutral-800 space-y-3">
            
            {/* Free Shipping Progress */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span className="text-neutral-300">
                    Add <strong className="text-white">₹{amountNeededForFreeShipping}</strong> for <span className="text-emerald-400">FREE Shipping</span>
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={13} /> FREE Shipping Unlocked!
                  </span>
                )}
                <span className="text-neutral-400">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Buy 3 Get 1 Free Promo Callout */}
            <div className="bg-black/80 border border-neutral-800 p-3 rounded text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <Sparkles size={14} />
                <span>BUY 3 GET 1 FREE OFFER</span>
              </div>
              {freeItemsCount > 0 ? (
                <p className="text-neutral-300">
                  🎉 Offer Applied: <strong className="text-white">{freeItemsCount} Free Item{freeItemsCount > 1 ? 's' : ''}</strong> (You save ₹{discount}!)
                  {itemsNeededForPromo > 0 && (
                    <span className="block text-[11px] text-neutral-400 mt-1">
                      Add {itemsNeededForPromo} more item{itemsNeededForPromo > 1 ? 's' : ''} to get another item free!
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-neutral-400">
                  Add <strong className="text-white">{itemsNeededForPromo}</strong> more item{itemsNeededForPromo > 1 ? 's' : ''} to get <strong className="text-emerald-400">1 item 100% FREE</strong>!
                </p>
              )}
            </div>

          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-neutral-900">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-1">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Discover our engineered perfumes, EDC accessories, and heavyweight streetwear.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-neutral-200 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-neutral-900 border border-neutral-800 shrink-0 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeCart}
                          className="text-xs font-semibold text-white hover:text-neutral-300 line-clamp-1 pr-2"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-neutral-500 hover:text-red-400 transition p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono mt-0.5">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-800 bg-black">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="p-1.5 text-neutral-400 hover:text-white transition disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold text-white">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-black space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Buy 3 Get 1 Free Savings</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-400 uppercase">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 transition font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Checkout Now</span>
                <ArrowRight size={16} />
              </Link>

              <p className="text-center text-[10px] text-neutral-500 font-mono">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
