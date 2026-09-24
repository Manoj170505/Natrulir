import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Banknote, ShieldCheck, Sparkles, Truck, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createOrder } from '../api';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartSummary,
  onOrderSuccess,
  onOpenTrackerWithId
}) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    state: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.shippingAddress) {
      setError('Please fill in all required customer and delivery address fields.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        city: formData.city || 'Portland',
        state: formData.state || 'OR',
        postalCode: formData.postalCode || '97201',
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        subtotal: cartSummary.subtotal,
        discount: cartSummary.discount,
        shippingFee: cartSummary.shippingFee,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          category: item.category
        }))
      };

      const result = await createOrder(payload);
      setLoading(false);

      if (result.success) {
        setOrderPlaced(result.data);
        onOrderSuccess();

        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setError(result.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error communicating with backend server.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#F7F5EE] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#EFEAD8] border-b border-stone-300 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1E3A27]">
              {orderPlaced ? 'Order Confirmed!' : 'Express Organic Checkout'}
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              {orderPlaced ? 'Thank you for choosing live organic microgreens.' : 'Fresh living harvest prepared upon order placement.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto flex-1">
          {orderPlaced ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-[#E1EDE3] text-[#2B5737] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
                  Order Successfully Placed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1E3A27] mt-1">
                  Order #{orderPlaced.orderNumber}
                </h3>
                <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto leading-relaxed">
                  We've received your order and our indoor growers are preparing your fresh live harvest. You can track real-time delivery status anytime!
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-[#EFEAD8] rounded-2xl p-4 max-w-md mx-auto text-left text-xs border border-stone-300/80 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Customer:</span>
                  <span className="font-semibold text-[#1E3A27]">{orderPlaced.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Email:</span>
                  <span className="font-semibold text-[#1E3A27]">{orderPlaced.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Delivery To:</span>
                  <span className="font-semibold text-[#1E3A27] line-clamp-1">{orderPlaced.shippingAddress}, {orderPlaced.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Payment Method:</span>
                  <span className="font-semibold text-[#1E3A27]">{orderPlaced.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-300 font-bold text-sm text-[#1E3A27]">
                  <span>Total Paid/Due:</span>
                  <span className="font-serif text-base">${orderPlaced.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenTrackerWithId(orderPlaced.orderNumber);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow"
                >
                  <Truck className="w-4 h-4 text-[#A3D977]" />
                  <span>Track This Order</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#EFEAD8] hover:bg-[#E4DDCA] text-[#1E3A27] text-xs font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-100 text-red-800 text-xs rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7754] mb-3">
                  1. Customer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      placeholder="e.g. Maya Lin"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      required
                      placeholder="e.g. maya@example.com"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      required
                      placeholder="e.g. +1 (555) 345-6789"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7754] mb-3">
                  2. Fresh Delivery Address
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="shippingAddress"
                      required
                      placeholder="Street, Apartment or Suite"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#366D44]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="ZIP"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Delivery Notes (Optional)</label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Leave by front door, ring bell"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-stone-300"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7754] mb-3">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                    formData.paymentMethod === 'Cash on Delivery' ? 'bg-[#E1EDE3] border-[#366D44]' : 'bg-white border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleChange}
                      className="text-[#366D44] focus:ring-[#366D44]"
                    />
                    <Banknote className="w-5 h-5 text-emerald-800" />
                    <div>
                      <span className="text-xs font-bold text-[#1E3A27] block">Cash on Delivery</span>
                      <span className="text-[10px] text-stone-500">Pay when fresh live trays arrive</span>
                    </div>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                    formData.paymentMethod === 'Online Payment / UPI' ? 'bg-[#E1EDE3] border-[#366D44]' : 'bg-white border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online Payment / UPI"
                      checked={formData.paymentMethod === 'Online Payment / UPI'}
                      onChange={handleChange}
                      className="text-[#366D44] focus:ring-[#366D44]"
                    />
                    <CreditCard className="w-5 h-5 text-emerald-800" />
                    <div>
                      <span className="text-xs font-bold text-[#1E3A27] block">Card / UPI / Online</span>
                      <span className="text-[10px] text-stone-500">Instant secure checkout</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order total review */}
              <div className="p-4 bg-[#EFEAD8] rounded-2xl border border-stone-300 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>Items ({cartItems.length}):</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                {cartSummary.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount:</span>
                    <span>-${cartSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Harvest Shipping:</span>
                  <span>{cartSummary.shippingFee === 0 ? 'FREE' : `$${cartSummary.shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E3A27] pt-2 border-t border-stone-300">
                  <span>Total Due:</span>
                  <span className="font-serif text-base text-[#1E3A27]">${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#1E3A27] hover:bg-[#2B5737] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#A3D977]" />
                    <span>Harvesting & Placing Order...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#A3D977]" />
                    <span>Confirm Order • ${cartSummary.total.toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
