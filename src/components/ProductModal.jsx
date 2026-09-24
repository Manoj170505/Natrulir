import React, { useState } from 'react';
import { X, Star, ShieldCheck, Clock, Sprout, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#F7F5EE] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col md:flex-row overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-[#EFEAD8] p-6 flex flex-col items-center justify-center relative">
          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-[#1E3A27] text-[#A3D977] shadow">
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl shadow-md max-h-80"
          />
          {product.weight && (
            <span className="mt-3 text-xs font-medium text-stone-600 bg-white/70 px-3 py-1 rounded-full">
              Package Size: {product.weight}
            </span>
          )}
        </div>

        {/* Right: Info & Purchase */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C7754] uppercase tracking-wider">
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{product.harvestTime || 'Living Tray'}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A27] mt-1 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating || 4.9}</span>
              <span className="text-xs text-stone-500">({product.reviewsCount || 85} verified reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-3">
              <span className="font-serif text-3xl font-bold text-[#1E3A27]">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Taste profile & Nutrition tags */}
            {product.tasteProfile && (
              <div className="mt-4 p-3 rounded-xl bg-[#EFEAD8] border border-stone-200">
                <span className="text-[11px] font-bold text-stone-700 block uppercase tracking-wider mb-1">
                  Taste Profile:
                </span>
                <p className="text-xs text-[#1E3A27] font-medium">{product.tasteProfile}</p>
              </div>
            )}

            {product.nutrition && product.nutrition.length > 0 && (
              <div className="mt-3">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  Nutritional Highlights:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.nutrition.map((nut, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E1EDE3] text-[#1E3A27] font-medium">
                      ✓ {nut}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center bg-[#EFEAD8] rounded-full p-1 border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100 transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-stone-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-stone-700 hover:bg-stone-100 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-xs text-stone-500">
                Total: <strong className="text-sm font-bold text-[#1E3A27]">${(product.price * quantity).toFixed(2)}</strong>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                added
                  ? 'bg-[#488858] text-white'
                  : 'bg-[#1E3A27] hover:bg-[#2B5737] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added To Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#A3D977]" /> Add {quantity} To Cart • ${(product.price * quantity).toFixed(2)}
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
