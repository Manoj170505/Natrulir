import React, { useState, useEffect } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { getOrderDetails } from '../api';

export default function OrderTrackerModal({ isOpen, onClose, initialOrderNumber }) {
  const [orderQuery, setOrderQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialOrderNumber) {
      setOrderQuery(initialOrderNumber);
      handleSearch(initialOrderNumber);
    }
  }, [initialOrderNumber, isOpen]);

  if (!isOpen) return null;

  const handleSearch = async (queryToSearch) => {
    const q = queryToSearch || orderQuery;
    if (!q || !q.trim()) return;

    try {
      setLoading(true);
      setError('');
      const res = await getOrderDetails(q.trim());
      setLoading(false);
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError('Order not found. Please check your order ID (e.g. MG-2026-8491)');
        setOrder(null);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Could not find order. Please verify the ID.');
      setOrder(null);
    }
  };

  const getStatusStep = (status) => {
    if (status === 'Denied') return -1;
    if (status === 'Delivered') return 4;
    if (status === 'Order Picked') return 3;
    if (status === 'Processing') return 2;
    return 1; // Pending
  };

  const currentStep = order ? getStatusStep(order.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#F7F5EE] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#EFEAD8] border-b border-stone-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#1E3A27]" />
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1E3A27]">Live Order Tracker</h2>
              <p className="text-xs text-stone-600">Track your organic live harvest & delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. MG-2026-8491)"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#366D44]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-[#1E3A27] text-white text-xs sm:text-sm font-semibold hover:bg-[#2B5737] transition shadow flex items-center gap-1.5"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {error && (
            <div className="p-3.5 bg-amber-50 text-amber-900 rounded-xl text-xs border border-amber-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* If Order Loaded */}
          {order && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Order Meta Bar */}
              <div className="bg-[#EFEAD8] rounded-2xl p-4 border border-stone-300 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7754]">Order Number</span>
                  <h3 className="font-serif text-lg font-bold text-[#1E3A27]">{order.orderNumber}</h3>
                  <span className="text-xs text-stone-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">Current Status</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-0.5 shadow-xs ${
                    order.status === 'Order Picked'
                      ? 'bg-blue-800 text-blue-100'
                      : order.status === 'Denied'
                      ? 'bg-rose-800 text-rose-100'
                      : order.status === 'Delivered'
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-[#1E3A27] text-[#A3D977]'
                  }`}>
                    {order.status === 'Order Picked' ? '📦 Order Picked & Dispatched' : order.status}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              {order.status === 'Denied' ? (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center text-rose-800 text-xs">
                  <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-1" />
                  <strong>Order Denied / Cancelled</strong>
                  <p className="text-[11px] text-rose-600 mt-0.5">Please contact customer support if you have any questions.</p>
                </div>
              ) : (
                <div className="bg-white/80 rounded-2xl p-5 border border-stone-200">
                  <div className="grid grid-cols-4 gap-2 text-center relative">
                    
                    {/* Step 1: Received */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition ${
                        currentStep >= 1 ? 'bg-[#1E3A27] text-[#A3D977]' : 'bg-stone-200 text-stone-400'
                      }`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-800">Received</span>
                      <span className="text-[9px] text-stone-500">Order Placed</span>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition ${
                        currentStep >= 2 ? 'bg-[#1E3A27] text-[#A3D977]' : 'bg-stone-200 text-stone-400'
                      }`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-800">Harvesting</span>
                      <span className="text-[9px] text-stone-500">Packing Fresh</span>
                    </div>

                    {/* Step 3: Order Picked */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition ${
                        currentStep >= 3 ? 'bg-blue-700 text-white' : 'bg-stone-200 text-stone-400'
                      }`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-800">Order Picked</span>
                      <span className="text-[9px] text-stone-500">In Transit</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition ${
                        currentStep >= 4 ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-400'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-stone-800">Delivered</span>
                      <span className="text-[9px] text-stone-500">Enjoy Fresh!</span>
                    </div>

                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7754]">
                  Ordered Items ({order.items?.length || 0})
                </h4>
                <div className="space-y-2">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-stone-200">
                      <div className="flex items-center gap-3">
                        {item.productImage && (
                          <img src={item.productImage} alt={item.productName} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                          <h5 className="text-xs font-bold text-[#1E3A27]">{item.productName}</h5>
                          <span className="text-[10px] text-stone-500">Qty: {item.quantity} × ${item.price?.toFixed(2)}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#1E3A27]">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Customer details */}
              <div className="bg-[#EFEAD8] rounded-2xl p-4 border border-stone-300 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1E3A27]">{order.customerName}</strong>
                    <p className="text-stone-600">{order.shippingAddress}, {order.city} {order.postalCode}</p>
                    <p className="text-stone-500 text-[11px]">{order.customerPhone} • {order.customerEmail}</p>
                  </div>
                </div>
                {order.notes && (
                  <p className="text-[11px] text-stone-600 italic bg-white/50 p-2 rounded-lg">
                    Notes: "{order.notes}"
                  </p>
                )}
              </div>

            </div>
          )}

          {!order && !error && (
            <div className="text-center py-10 text-stone-500 text-xs">
              <Truck className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p>Type your Order ID (for example: <code className="bg-stone-200 px-1.5 py-0.5 rounded text-[#1E3A27] font-semibold">MG-2026-8491</code>) to view live harvest and delivery status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
