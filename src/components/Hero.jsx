import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse, Sprout } from 'lucide-react';

export default function Hero({ onShopClick, onSelectCategory }) {
  const exploreCards = [
    {
      title: "Live Trays",
      subtitle: "Peak Living Nutrition",
      category: "Live Microgreens",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Indoor Kits",
      subtitle: "Ceramic Self-Watering",
      category: "Grow Kits",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Super Seeds",
      subtitle: "98% Germination Purity",
      category: "Organic Seeds",
      image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Super Powders",
      subtitle: "Freeze-Dried Essence",
      category: "Superfood Blends",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Hero Card (Large Banner matching screenshot) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl min-h-[460px] md:min-h-[520px] flex flex-col justify-between p-8 sm:p-12 text-white group">
          
          {/* Background Image with rich organic microgreen photography */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80')` 
            }}
          />
          
          {/* Subtle Deep Emerald & Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2214]/90 via-[#132c1c]/75 to-black/40" />

          {/* Top Brand Micro Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-[#A3D977] border border-white/20">
              <Sprout className="w-3.5 h-3.5" /> 100% Certified Organic & Non-GMO
            </span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl my-auto py-6">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-white tracking-tight">
              Living <span className="italic font-light text-[#A3D977]">Microgreens</span> for a greener, vital life
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-200 font-normal leading-relaxed max-w-md">
              Bioactive living greens, heirloom sprouting seeds, and ceramic self-watering kits harvested daily at peak vitality.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#EFEAD8] hover:bg-white text-[#1E3A27] font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop now</span>
                <ArrowRight className="w-4 h-4 text-[#1E3A27]" />
              </button>

              <a
                href="#benefits"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-black/30 hover:bg-black/40 text-stone-200 backdrop-blur-sm text-sm font-medium border border-white/20 transition"
              >
                <HeartPulse className="w-4 h-4 text-[#A3D977]" />
                <span>Explore 40x Nutrients</span>
              </a>
            </div>
          </div>

          {/* Glassmorphic Stat Pill in bottom right (matching screenshot design) */}
          <div className="relative z-10 self-end">
            <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/20 text-white max-w-[210px] shadow-2xl">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span>Natural. Organic.</span>
                <ShieldCheck className="w-4 h-4 text-[#A3D977]" />
              </div>
              <p className="text-[11px] text-stone-300/80 leading-tight">
                Sustainable. Zero Chemical.
              </p>
              <div className="mt-2 text-3xl font-serif font-bold text-[#A3D977] flex items-baseline gap-1">
                40x
                <span className="text-xs font-sans font-normal text-stone-300">Nutrients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Explorer Column (Matching the 4 mini cards on the right of design) */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {exploreCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(card.category)}
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group h-36 sm:h-44 lg:h-[120px] transition transform hover:-translate-y-1"
            >
              {/* Card Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Card Overlay Text */}
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A3D977]">
                  Explore
                </span>
                <h3 className="font-serif text-base sm:text-lg font-semibold leading-tight text-white group-hover:text-[#A3D977] transition">
                  {card.title}
                </h3>
                <span className="text-[11px] text-stone-300 line-clamp-1">
                  {card.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
