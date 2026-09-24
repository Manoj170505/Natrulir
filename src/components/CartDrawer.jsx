import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 35.0;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 4.99;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GREEN10') {
      setDiscountPercent(10);
      setPromoMessage('🎉 10% Organic discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'HARVEST20') {
      setDiscountPercent(20);
      setPromoMessage('🎉 20% Super Harvest discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try GREEN10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5EE] shadow-2xl flex flex-col justify-between border-l border-stone-300">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#EFEAD8]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1E3A27]" />
              <h2 className="font-serif text-xl font-bold text-[#1E3A27]">Your Organic Basket</h2>
              <span className="text-xs bg-[#1E3A27] text-white px-2 py-0.5 rounded-full font-semibold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-stone-500 hover:text-black hover:bg-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#E1EDE3] px-6 py-2.5 text-xs text-[#1E3A27] border-b border-emerald-200">
            {isFreeShipping && subtotal > 0 ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Living Delivery
              </span>
            ) : (
              <div>
                <span>Add <strong>${(shippingThreshold - subtotal).toFixed(2)}</strong> more for <strong>FREE Delivery</strong></span>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-[#366D44] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-3" />
                <p className="font-serif text-lg font-bold text-[#1E3A27]">Your basket is empty</p>
                <p className="text-xs mt-1">Explore our living microgreen trays and start your healthy routine today.</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 rounded-full bg-[#1E3A27] text-white text-xs font-semibold hover:bg-[#2B5737] transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-white/70 border border-stone-200 shadow-xs hover:bg-white transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover bg-stone-100"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[#1E3A27] line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-500 transition ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-stone-500">{item.category}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-[#EFEAD8] rounded-full px-2 py-0.5 border border-stone-300">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-700 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-700 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-xs text-[#1E3A27]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#EFEAD8] border-t border-stone-300 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Coupon code (GREEN10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white text-[#1E3A27] rounded-full border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#1E3A27] text-white text-xs font-semibold hover:bg-[#2B5737] transition"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className="text-[11px] font-medium text-emerald-800">{promoMessage}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-300/60 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Fresh Harvest Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700 font-semibold">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E3A27] border-t border-stone-300/80 pt-2">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-[#1E3A27]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout({ subtotal, discount, shippingFee, total });
                }}
                className="w-full py-3.5 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#A3D977]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Freshness & Safe Delivery Guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
