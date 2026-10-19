import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProducts } from '@/lib/storage';
import { CATEGORIES_DATA } from '@/data/initial-products';
import { CategorySlug } from '@/types';
import CategoryView from './CategoryView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORIES_DATA.find((c) => c.slug === slug);

  if (!categoryInfo) {
    notFound();
  }

  const allProducts = await getProducts();
  const categoryProducts = allProducts.filter((p) => p.category === (slug as CategorySlug));

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      
      {/* Category Header */}
      <div className="relative py-20 bg-neutral-950 border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src={categoryInfo.image}
            alt={categoryInfo.name}
            className="w-full h-full object-cover filter blur-xs"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">{categoryInfo.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
            {categoryInfo.name}
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-neutral-400 font-light">
            {categoryInfo.tagline}
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-emerald-400">
              🔥 Eligible for Buy 3 Get 1 Free Deal
            </span>
          </div>
        </div>
      </div>

      {/* Category Interactive View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <CategoryView initialProducts={categoryProducts} categoryName={categoryInfo.name} />
      </div>

    </div>
  );
}
