import React, { useState } from 'react';
import { ShoppingBag, Search, Leaf, Truck, Heart, LayoutDashboard, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  onOpenTracker,
  activeCategory,
  setActiveCategory,
  onCategorySelect
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EE]/90 backdrop-blur-md border-b border-[#E5E0D0] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#1E3A27] text-[#E8F0EA] text-xs py-1.5 px-4 text-center flex justify-center items-center gap-3">
        <span className="inline-flex items-center gap-1 font-medium">
          <Leaf className="w-3.5 h-3.5 text-[#A3D977]" />
          Harvested Daily & Delivered Live To Your Doorstep
        </span>
        <span className="hidden md:inline text-white/40">•</span>
        <span className="hidden md:inline text-emerald-200">
          Use code <span className="font-bold tracking-wider text-[#A3D977] bg-white/10 px-1.5 py-0.5 rounded">GREEN10</span> for 10% OFF
        </span>
        <a 
          href="http://localhost:5174" 
          target="_blank" 
          rel="noreferrer"
          className="ml-auto text-xs bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 transition"
        >
          <LayoutDashboard className="w-3 h-3" /> Admin Portal
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-[#1E3A27] text-[#A3D977] flex items-center justify-center shadow-md group-hover:scale-105 transition">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1E3A27] leading-none">
                  Natrulir <span className="text-[#6BA57A] italic font-normal text-xl">Greens</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7754] mt-0.5">
                  Living Microgreens
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#2B332C]">
              <button 
                onClick={() => { setActiveCategory('All'); onCategorySelect && onCategorySelect('All'); }}
                className={`hover:text-[#1E3A27] transition-colors py-1 ${activeCategory === 'All' ? 'text-[#1E3A27] font-semibold border-b-2 border-[#1E3A27]' : ''}`}
              >
                Shop All
              </button>
              <button 
                onClick={() => { setActiveCategory('Live Microgreens'); onCategorySelect && onCategorySelect('Live Microgreens'); }}
                className={`hover:text-[#1E3A27] transition-colors py-1 ${activeCategory === 'Live Microgreens' ? 'text-[#1E3A27] font-semibold border-b-2 border-[#1E3A27]' : ''}`}
              >
                Live Trays
              </button>
              <button 
                onClick={() => { setActiveCategory('Grow Kits'); onCategorySelect && onCategorySelect('Grow Kits'); }}
                className={`hover:text-[#1E3A27] transition-colors py-1 ${activeCategory === 'Grow Kits' ? 'text-[#1E3A27] font-semibold border-b-2 border-[#1E3A27]' : ''}`}
              >
                Grow Kits
              </button>
              <button 
                onClick={() => { setActiveCategory('Organic Seeds'); onCategorySelect && onCategorySelect('Organic Seeds'); }}
                className={`hover:text-[#1E3A27] transition-colors py-1 ${activeCategory === 'Organic Seeds' ? 'text-[#1E3A27] font-semibold border-b-2 border-[#1E3A27]' : ''}`}
              >
                Seeds & Sprouting
              </button>
              <a 
                href="#benefits" 
                className="hover:text-[#1E3A27] transition-colors py-1"
              >
                Nutrition Benefits
              </a>
              <a 
                href="#gallery" 
                className="hover:text-[#1E3A27] transition-colors py-1"
              >
                Gallery
              </a>
            </nav>
          </div>

          {/* Search Bar matching the design (Pill shape) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search fresh broccoli, kits, seeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#EFEAD8]/80 text-[#1E3A27] placeholder-stone-400 rounded-full border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#366D44] focus:bg-white transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Actions: Track Order & Cart */}
          <div className="flex items-center gap-3">
            {/* Track Order Button */}
            <button
              onClick={onOpenTracker}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#2B332C] bg-[#EFEAD8] hover:bg-[#E4DDCA] rounded-full border border-stone-300/60 transition"
              title="Track your order status"
            >
              <Truck className="w-3.5 h-3.5 text-[#366D44]" />
              <span>Track Order</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#1E3A27] hover:bg-[#284E34] text-white px-4 py-2 rounded-full shadow-sm hover:shadow transition group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#A3D977] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#C86446] text-white text-[11px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-black rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search microgreens, kits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-[#EFEAD8] text-[#1E3A27] rounded-full border border-stone-200"
            />
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-2 bg-[#F7F5EE]">
            <button 
              onClick={() => { setActiveCategory('All'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-[#EFEAD8] rounded-lg"
            >
              Shop All
            </button>
            <button 
              onClick={() => { setActiveCategory('Live Microgreens'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-[#EFEAD8] rounded-lg"
            >
              Live Microgreen Trays
            </button>
            <button 
              onClick={() => { setActiveCategory('Grow Kits'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-[#EFEAD8] rounded-lg"
            >
              Indoor Grow Kits
            </button>
            <button 
              onClick={() => { setActiveCategory('Organic Seeds'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-stone-800 hover:bg-[#EFEAD8] rounded-lg"
            >
              Heirloom Seeds
            </button>
            <button 
              onClick={() => { onOpenTracker(); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-[#EFEAD8] rounded-lg"
            >
              Track Order Status
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
