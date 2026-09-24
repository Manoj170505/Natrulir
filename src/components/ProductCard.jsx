import React, { useState } from 'react';
import { Plus, Check, Eye, Heart, Sparkles, Star } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-[#24452E] text-[#A3D977] border-[#366D44]';
      case 'Promotion':
        return 'bg-[#C86446] text-white border-[#C86446]';
      case 'Superfood':
        return 'bg-[#366D44] text-white border-[#488858]';
      case 'Customer favorite':
        return 'bg-[#8C7754] text-white border-[#A8946E]';
      case 'New':
        return 'bg-[#1E3A27] text-white border-white/20';
      default:
        return 'bg-white/80 text-[#1E3A27] border-stone-200';
    }
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-[#EFEAD8] hover:bg-[#EBE5D0] rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl cursor-pointer border border-[#E4DDCA]"
    >
      {/* Top Bar: Badge & Wishlist */}
      <div className="flex items-center justify-between z-10 mb-2">
        {product.badge ? (
          <span className={`text-[11px] font-medium tracking-wide px-3 py-1 rounded-full border shadow-sm ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </span>
        ) : <div />}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-stone-600 hover:text-red-500 transition shadow-sm"
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div className="relative w-full aspect-square my-3 rounded-2xl overflow-hidden bg-white/40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#1E3A27] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="mt-2 flex flex-col gap-2">
        
        {/* Swatch dots & Category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colors && product.colors.length > 0 ? (
              product.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                  style={{ backgroundColor: color }}
                />
              ))
            ) : (
              <>
                <span className="w-3 h-3 rounded-full bg-[#366D44] border border-black/10" />
                <span className="w-3 h-3 rounded-full bg-[#8FB339] border border-black/10" />
                <span className="w-3 h-3 rounded-full bg-[#D4A373] border border-black/10" />
              </>
            )}
          </div>
          <span className="text-[11px] font-medium text-[#8C7754]">
            {product.category}
          </span>
        </div>

        {/* Title and Tagline */}
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E3A27] leading-tight group-hover:text-[#366D44] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-1 mt-0.5 font-normal">
            {product.tagline || product.tasteProfile || "100% Certified Organic Fresh Harvest"}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 text-xs text-stone-500">
          <div className="flex items-center text-amber-600">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-stone-800">{product.rating || 4.9}</span>
          <span>({product.reviewsCount || 48})</span>
          {product.harvestTime && (
            <span className="ml-auto text-[10px] bg-white/60 text-[#2B5737] px-2 py-0.5 rounded-full font-medium">
              {product.harvestTime}
            </span>
          )}
        </div>

        {/* Price & Add to Cart Button */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-300/60 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg sm:text-xl font-bold text-[#1E3A27]">
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${parseFloat(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shadow transition-all duration-200 ${
              addedAnimation
                ? 'bg-[#488858] text-white scale-105'
                : 'bg-[#1E3A27] hover:bg-[#2B5737] text-white hover:scale-102'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#A3D977]" /> Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
