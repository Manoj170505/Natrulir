import React from 'react';
import { ArrowRight, Sparkles, Heart, Zap, CheckCircle2, Award, Shield } from 'lucide-react';

export default function FeatureShowcase({ onShopCategory }) {
  return (
    <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 2-Column Split Highlight matching reference screenshot layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Card 1: Bestseller Spotlight */}
        <div className="bg-[#EFEAD8] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-[#E2DCB9] relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C7754] block mb-1">
              Cultivated with Care
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A27] leading-tight">
              Best <span className="italic font-normal text-[#366D44]">sellers</span>
            </h3>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed max-w-sm">
              Freshly harvested living trays resting on a natural linen surface — a perfect blend of high cellular nutrition and pure culinary joy for mindful health.
            </p>
            <button
              onClick={() => onShopCategory('Live Microgreens')}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white text-xs font-semibold shadow transition transform group-hover:translate-x-1"
            >
              <span>Explore Live Trays</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A3D977]" />
            </button>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg h-60 w-full relative">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Microgreens Tray"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Card 2: New Arrival Spotlight */}
        <div className="bg-[#EAE4D2] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-[#DFD7BE] relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#8C7754] block mb-1">
              Zero-Waste Living
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A27] leading-tight">
              New <span className="italic font-normal text-[#C86446]">Arrivals</span>
            </h3>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed max-w-sm">
              Our ceramic self-watering system showcases a vibrant spectrum of seasonal sprouts — a mindful celebration of fresh daily harvesting right on your kitchen counter.
            </p>
            <button
              onClick={() => onShopCategory('Grow Kits')}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C86446] hover:bg-[#AD5136] text-white text-xs font-semibold shadow transition transform group-hover:translate-x-1"
            >
              <span>Explore Grow Kits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg h-60 w-full relative">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
              alt="Ceramic Grow Kit"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

      </div>

      {/* 40x Nutrient Science Comparison Banner */}
      <div className="bg-[#1E3A27] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Background glow & organic elements */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#366D44]/30 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs uppercase tracking-widest font-bold text-[#A3D977]">
            Backed by Clinical Nutrition
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mt-1 text-white leading-tight">
            Why Microgreens? <span className="italic text-[#A3D977] font-light">Concentrated Vitality</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
            University studies have shown that microgreens contain up to <strong>40 times higher concentrations</strong> of vital enzymes, polyphenols, and essential minerals compared to mature vegetables.
          </p>
        </div>

        {/* Nutritional Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
            <div className="text-3xl font-serif font-bold text-[#A3D977]">50x</div>
            <div className="text-xs font-semibold text-stone-200 mt-1">Sulforaphane</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Broccoli brassica shoots</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
            <div className="text-3xl font-serif font-bold text-[#A3D977]">40x</div>
            <div className="text-xs font-semibold text-stone-200 mt-1">Vitamin C & E</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Radish & sunflower shoots</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
            <div className="text-3xl font-serif font-bold text-[#A3D977]">100%</div>
            <div className="text-xs font-semibold text-stone-200 mt-1">Bio-Available</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Living plant enzymes</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
            <div className="text-3xl font-serif font-bold text-[#A3D977]">0g</div>
            <div className="text-xs font-semibold text-stone-200 mt-1">Pesticides</div>
            <div className="text-[11px] text-stone-400 mt-0.5">Pure filtered spring water</div>
          </div>
        </div>

      </div>

    </section>
  );
}
