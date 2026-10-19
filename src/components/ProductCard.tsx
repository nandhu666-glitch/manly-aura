'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col h-full">
      {/* Product Image & Badges */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] bg-neutral-900 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-black/90 text-white border border-neutral-700 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-white text-black text-[10px] font-bold font-mono px-2 py-0.5">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Promo Tag */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <span className="bg-black/85 backdrop-blur-xs text-emerald-400 border border-emerald-900/60 text-[10px] font-mono tracking-wider px-2 py-1 block text-center">
            BUY 3 GET 1 FREE ELIGIBLE
          </span>
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <Star size={11} className="fill-white text-white" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-neutral-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white tracking-wide leading-snug group-hover:text-neutral-300 transition line-clamp-2">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-neutral-900/80 mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold font-mono text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs font-mono text-neutral-500 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 font-mono block">
              Inclusive of all taxes
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`p-2.5 transition flex items-center justify-center ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
            title={product.stock <= 0 ? 'Out of Stock' : 'Quick Add to Bag'}
            aria-label="Quick Add to Bag"
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>

      </div>
    </div>
  );
}
