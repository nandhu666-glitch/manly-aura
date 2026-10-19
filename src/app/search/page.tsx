import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/storage';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '' } = await searchParams;
  const allProducts = await getProducts();

  const query = q.toLowerCase().trim();
  const matched = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.details.some((d) => d.toLowerCase().includes(query))
      )
    : [];

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white mt-2">
            Search Results for &ldquo;{q}&rdquo;
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Found {matched.length} {matched.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {matched.length === 0 ? (
          <div className="bg-neutral-950 border border-neutral-800 p-12 text-center text-xs font-mono text-neutral-400 space-y-4">
            <p>No products matched your search term.</p>
            <div className="flex justify-center gap-3">
              <Link href="/category/fragrance" className="underline hover:text-white">Fragrance</Link>
              <span>•</span>
              <Link href="/category/accessories" className="underline hover:text-white">Accessories</Link>
              <span>•</span>
              <Link href="/category/gadgets" className="underline hover:text-white">Gadgets</Link>
              <span>•</span>
              <Link href="/category/fashion" className="underline hover:text-white">Fashion</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matched.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
