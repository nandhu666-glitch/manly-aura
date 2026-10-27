import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Award, Flame, Star, CheckCircle, Truck } from 'lucide-react';
import { getProducts } from '@/lib/storage';
import { CATEGORIES_DATA } from '@/data/initial-products';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) => p.featured);
  const bestsellers = allProducts.slice(0, 4);

  return (
    <div className="bg-black text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-neutral-900">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
            alt="MANLY AURA Luxury Lifestyle"
            className="w-full h-full object-cover object-center brightness-35 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-md mb-6 text-xs font-mono tracking-widest text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SPECIAL OFFER: BUY 3 GET 1 FREE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight text-white mb-6">
            COMMAND <br className="hidden sm:inline" />
            THE ROOM
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-10 tracking-wide">
            Potent artisanal extraits, surgical-grade EDC accessories, precision grooming tools, and heavyweight architectural apparel. Engineered for men who leave nothing to chance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/category/fragrance"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-neutral-200 transition flex items-center justify-center gap-2 group"
            >
              <span>Explore The Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/category/accessories"
              className="w-full sm:w-auto px-8 py-4 bg-black/60 backdrop-blur-md border border-neutral-700 text-white font-medium text-xs uppercase tracking-[0.25em] hover:border-white transition"
            >
              View Essentials
            </Link>
          </div>

          {/* Micro Trust Stats */}
          <div className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">25%</p>
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">Oil Concentration</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">316L</p>
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">Surgical Steel</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">280 GSM</p>
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">Heavyweight Cotton</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-mono text-white">Pan-India</p>
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">Fast Track Delivery</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROMOTIONAL SHOWCASE BANNER: BUY 3 GET 1 FREE */}
      <section className="bg-neutral-950 border-b border-neutral-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="space-y-3 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase">
              <Sparkles size={16} />
              <span>Signature Store Promotion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
              BUY 3, GET THE 4TH ITEM <span className="underline decoration-emerald-500 underline-offset-4">FREE</span>
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Mix and match across any category! Pair a luxury perfume with a chronograph watch, a precision beard trimmer, and a heavyweight tee. The lowest-priced item is automatically deducted at ₹0.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/category/fragrance"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2"
            >
              <span>Build Your Bundle</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-9xl font-black select-none font-mono">
            FREE
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE CATEGORIES SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Engineered Collections
          </p>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-widest text-white">
            Curated Categories
          </h2>
          <div className="w-12 h-0.5 bg-white mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative h-96 bg-neutral-900 border border-neutral-800 hover:border-neutral-500 overflow-hidden transition-all duration-500 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Overlay Content */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  {cat.itemCount}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">
                  {cat.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white group-hover:text-emerald-400 transition-colors">
                  <span>Explore Catalog</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">
                Handcrafted Standards
              </p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">
                Featured Signatures
              </h2>
            </div>
            <Link
              href="/category/fragrance"
              className="mt-4 md:mt-0 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition flex items-center gap-1.5"
            >
              <span>View All Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. BRAND PHILOSOPHY & CRAFTSMANSHIP */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
              The Manly Aura Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white leading-tight">
              NEVER OVERSTATED. <br />
              ALWAYS REMEMBERED.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              We rejected fleeting fast-fashion trends and watered-down perfumes. Every formulation in our fragrance cellar is matured to 25% concentration to withstand Indian heat and humidity.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Our chronographs are carved from surgical 316L steel, our grooming tools utilize high-torque rotary motors, and our streetwear is custom-knitted at 280 GSM to drape with uncompromising authority.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 font-mono text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero Compromise Raw Materials</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Direct-To-Consumer Honest Pricing</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>IFRA & Dermatologist Certified</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>7-Day Replacement Guarantee</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-neutral-900 border border-neutral-800 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80"
              alt="Artisanal perfume flacon"
              className="w-full h-full object-cover filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-neutral-800">
              <p className="text-xs font-mono text-white tracking-widest uppercase">
                AURA NOIR EAU DE PARFUM
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                A masterwork of smoked oud, Italian bergamot and dry vetiver.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-2">
              Customer Experiences
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">
              Words From The Brotherhood
            </h2>
            <div className="w-12 h-0.5 bg-white mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-black border border-neutral-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-white mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-white" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4">
                  &ldquo;Aura Noir has easily outlasted designer perfumes costing 4 times as much. Wore it to an evening client dinner in Mumbai, and I was still getting compliments 8 hours later.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-900 text-xs font-mono">
                <p className="text-white font-semibold">Arjun Mehta</p>
                <p className="text-neutral-500 text-[10px]">Verified Buyer, Mumbai</p>
              </div>
            </div>

            <div className="bg-black border border-neutral-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-white mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-white" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4">
                  &ldquo;The Monolith Chronograph watch feels heavy and solid on the wrist. Real sapphire glass and matte black PVD that doesn&apos;t scratch. Also used the Buy 3 Get 1 Free deal for my birthday!&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-900 text-xs font-mono">
                <p className="text-white font-semibold">Vikramaditya Rao</p>
                <p className="text-neutral-500 text-[10px]">Verified Buyer, Bengaluru</p>
              </div>
            </div>

            <div className="bg-black border border-neutral-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-white mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-white" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4">
                  &ldquo;The 280 GSM heavyweight tee is legit. The collar is dense and doesn&apos;t roll over or bacon after the washing machine. Fast delivery to Delhi in 3 days.&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-900 text-xs font-mono">
                <p className="text-white font-semibold">Karan Singhania</p>
                <p className="text-neutral-500 text-[10px]">Verified Buyer, New Delhi</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INSTAGRAM & SOCIAL BRAND BAR */}
      <section className="py-14 bg-black border-t border-neutral-900 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
            Join The Community
          </p>
          <h3 className="text-2xl font-black uppercase tracking-wider text-white">
            Follow Us On Instagram
          </h3>
          <p className="text-xs text-neutral-400">
            Behind the scenes, scent layering tips, EDC releases, and private drops.
          </p>
          <div className="pt-2">
            <a
              href="https://www.instagram.com/manlyaura.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-700 hover:border-white text-white text-xs font-mono tracking-widest uppercase transition"
            >
              <span>@manlyaura.in</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

