import React from 'react';
import ProductCard from './ProductCard';
import { ArrowRight, SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Live Microgreens',
  'Grow Kits',
  'Organic Seeds',
  'Superfood Blends',
  'Accessories'
];

export default function ProductGrid({
  products,
  loading,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  onAddToCart,
  onQuickView,
  searchTerm
}) {
  return (
    <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header matching the screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7754] block mb-1">
            Eco Essentials Planet-Friendly
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A27] flex items-center gap-2">
            Bestselling <span className="italic font-normal text-[#488858]">✧ Products</span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#EFEAD8] px-3 py-1.5 rounded-full border border-stone-300 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#366D44]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#1E3A27] font-medium focus:outline-none cursor-pointer"
            >
              <option value="default">Featured / Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs font-semibold text-[#366D44] hover:text-[#1E3A27] flex items-center gap-1 transition"
          >
            More products <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#1E3A27] text-white shadow-md'
                : 'bg-[#EFEAD8] hover:bg-[#E4DDCA] text-[#2B332C]'
            }`}
          >
            {cat === 'All' ? '🌱 All Essentials' : cat}
          </button>
        ))}
      </div>

      {/* Active Search Alert */}
      {searchTerm && (
        <div className="mb-6 bg-[#E1EDE3] text-[#1E3A27] px-4 py-2 rounded-xl text-xs flex items-center justify-between">
          <span>Showing results matching: <strong className="font-semibold">"{searchTerm}"</strong></span>
          <button
            onClick={() => setActiveCategory('All')}
            className="text-emerald-800 underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-[#EFEAD8]/60 rounded-3xl p-5 animate-pulse h-96 flex flex-col justify-between">
              <div className="w-20 h-5 bg-stone-300/60 rounded-full" />
              <div className="w-full h-48 bg-stone-300/60 rounded-2xl my-4" />
              <div className="space-y-2">
                <div className="w-3/4 h-4 bg-stone-300/60 rounded" />
                <div className="w-1/2 h-3 bg-stone-300/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-[#EFEAD8]/50 rounded-3xl p-8 border border-stone-200">
          <Sparkles className="w-10 h-10 text-[#6BA57A] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#1E3A27]">No Microgreen products found</h3>
          <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
            Try adjusting your search or category filter to discover fresh organic superfoods.
          </p>
          <button
            onClick={() => { setActiveCategory('All'); }}
            className="mt-4 px-5 py-2 rounded-full bg-[#1E3A27] text-white text-xs font-semibold hover:bg-[#2B5737] transition"
          >
            View All Products
          </button>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}

    </section>
  );
}
