import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById, getProducts } from '@/lib/storage';
import ProductDetailView from './ProductDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-black text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </div>
    </div>
  );
}
