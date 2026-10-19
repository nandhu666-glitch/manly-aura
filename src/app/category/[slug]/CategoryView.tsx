'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface CategoryViewProps {
  initialProducts: Product[];
  categoryName: string;
}

export default function CategoryView({ initialProducts, categoryName }: CategoryViewProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (inStockOnly && p.stock <= 0) return false;
        if (search.trim()) {
          const query = search.toLowerCase();
          return (
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, search, sortBy, inStockOnly]);

  return (
    <div className="space-y-8">
      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-neutral-950 border border-neutral-900 p-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder={`Search ${categoryName}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black border border-neutral-800 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Stock Toggle */}
          <label className="flex items-center gap-2 text-xs font-mono text-neutral-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded bg-black border-neutral-800 text-white focus:ring-0"
            />
            <span>In Stock Only</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-black border border-neutral-800 text-xs font-mono text-neutral-300 py-2 px-3 focus:outline-none focus:border-white"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Results */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-neutral-900 bg-neutral-950 p-8">
          <p className="text-sm font-mono text-neutral-400 uppercase tracking-wider mb-2">
            No products found
          </p>
          <p className="text-xs text-neutral-500">
            Try adjusting your search query or removing the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
