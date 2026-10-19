'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Plus, Minus, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/cart-context';
import ProductCard from '@/components/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus(`Available! Standard delivery to ${pincode} within 3-4 business days. Express COD available.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-8">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-white transition">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-300 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Product Images Gallery */}
        <div className="space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800 overflow-hidden">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-black/90 text-white border border-neutral-700 text-xs font-mono uppercase tracking-widest px-3 py-1">
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-white text-black text-xs font-bold font-mono px-3 py-1">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 bg-neutral-900 border shrink-0 overflow-hidden transition ${
                    selectedImageIndex === idx ? 'border-white ring-1 ring-white' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase & Details */}
        <div className="space-y-6">
          
          {/* Category & Title */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-white">
                <Star size={13} className="fill-white" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{product.reviewCount} Verified Buyer Reviews</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-500">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Price */}
          <div className="p-4 bg-neutral-950 border border-neutral-900">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="text-base font-mono text-neutral-500 line-through">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  Save ₹{(product.compareAtPrice! - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-1">
              Inclusive of all taxes. Free express shipping on orders over ₹999.
            </p>
          </div>

          {/* Special Offer Callout */}
          <div className="bg-neutral-900/60 border border-neutral-800 p-3.5 rounded flex items-center gap-3">
            <div className="p-2 bg-black border border-neutral-800 text-emerald-400">
              <Sparkles size={16} />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white uppercase font-mono">
                BUY 3 GET 1 FREE APPLIES TO THIS PRODUCT
              </p>
              <p className="text-neutral-400 text-[11px]">
                Add any 4 items to cart and get the lowest priced item completely free!
              </p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {product.stock > 10 ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                In Stock & Ready to Ship ({product.stock} units)
              </span>
            ) : product.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Only {product.stock} units left — order soon
              </span>
            ) : (
              <span className="text-red-400 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-800 bg-black">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-400 hover:text-white transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-5 text-sm font-mono font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="p-3 text-neutral-400 hover:text-white transition disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3.5 px-6 bg-neutral-900 border border-neutral-700 hover:border-white text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 disabled:opacity-30"
              >
                <ShoppingBag size={16} />
                <span>{addedAnimation ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-4 bg-white text-black hover:bg-neutral-200 transition font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-30"
            >
              <Zap size={16} className="fill-black" />
              <span>Buy It Now (Fast Checkout)</span>
            </button>
          </div>

          {/* Pincode Serviceability Checker */}
          <div className="pt-4 border-t border-neutral-900">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <MapPin size={13} className="text-white" />
              <span>Check Delivery To Your Pincode</span>
            </label>
            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit PIN code"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="bg-black border border-neutral-800 px-3.5 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-white w-48"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-white font-mono text-xs uppercase tracking-wider transition"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="mt-2 text-xs font-mono text-emerald-400">{pincodeStatus}</p>
            )}
          </div>

          {/* Description & Technical Specifications */}
          <div className="pt-6 border-t border-neutral-900 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
              Description & Profile
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                Specifications:
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-500">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.features && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                  Key Highlights:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assurance Icons */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-900 text-center font-mono text-[10px] text-neutral-400">
            <div className="p-3 bg-neutral-950 border border-neutral-900 space-y-1">
              <ShieldCheck size={18} className="mx-auto text-white" />
              <p className="uppercase">100% Authentic</p>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-900 space-y-1">
              <Truck size={18} className="mx-auto text-white" />
              <p className="uppercase">Fast India Delivery</p>
            </div>
            <div className="p-3 bg-neutral-950 border border-neutral-900 space-y-1">
              <RefreshCw size={18} className="mx-auto text-white" />
              <p className="uppercase">7-Day Transit Replacement</p>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-16 border-t border-neutral-900">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">
              Complete Your Set
            </p>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              Related Essentials
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
