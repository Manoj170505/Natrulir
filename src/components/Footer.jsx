import React from 'react';
import { Leaf, Mail, ShieldCheck, Heart, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenTracker }) {
  return (
    <footer className="bg-[#1E3A27] text-white pt-16 pb-12 border-t border-[#2B5737]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#A3D977] text-[#1E3A27] flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Natrulir <span className="text-[#A3D977] italic font-normal text-xl">Greens</span>
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Cultivating peak living microgreens, indoor sprouting kits, and organic non-GMO heirloom seeds harvested fresh daily for pure vitality and culinary delight.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#A3D977] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Certified Organic
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-stone-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Zero Plastic Soil Trays
              </span>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3D977]">
              Living Shop
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={() => onSelectCategory('Live Microgreens')} className="hover:text-white transition">
                  Live Microgreen Trays
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Grow Kits')} className="hover:text-white transition">
                  Ceramic Grow Kits
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Organic Seeds')} className="hover:text-white transition">
                  Heirloom Seed Packs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Superfood Blends')} className="hover:text-white transition">
                  Freeze-Dried Powders
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Accessories')} className="hover:text-white transition">
                  Botanical Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & Tracking */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3D977]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button onClick={onOpenTracker} className="hover:text-[#A3D977] font-medium transition text-left">
                  Track Delivery Status
                </button>
              </li>
              <li><a href="#benefits" className="hover:text-white transition">Nutrition Science (40x)</a></li>
              <li><a href="#gallery" className="hover:text-white transition">Inspiration & Recipes</a></li>
              <li><span className="text-stone-400">Fresh Harvest Guarantee</span></li>
              <li>
                <a 
                  href="http://localhost:5174" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#A3D977] hover:underline pt-1"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" /> Staff / Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3D977]">
              Fresh Harvest Updates
            </h4>
            <p className="text-[11px] text-stone-300">
              Subscribe for weekly harvest schedules, living recipe guides, and 10% off your first live tray.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to harvest updates!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full px-3.5 py-2 text-xs bg-white/10 rounded-xl border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#A3D977]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#A3D977] hover:bg-[#8ec760] text-[#1E3A27] text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Join The Green Club</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Natrulir Organic Microgreens Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Harvest</span>
            <span>•</span>
            <span>Sustainably Grown Indoors</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
