import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, Sparkles, CheckCircle } from 'lucide-react';

export default function GalleryAndReviews() {
  const galleryItems = [
    {
      title: "Fresh Broccoli Shoots on Sourdough",
      tag: "Culinary Inspiration",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Ceramic Self-Watering Tray System",
      tag: "Indoor Gardening",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Crisp Radish Rambo Micro-Salad",
      tag: "Raw Nutrition",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Freeze-Dried Super Green Elixir",
      tag: "Morning Ritual",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Eco Sprouting Glass Tower",
      tag: "Zero Waste",
      image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const reviews = [
    {
      name: "Jane Cooper",
      role: "Verified Chef",
      content: "Natrulir's live microgreens are amazing for gourmet plating, and the ceramic grow kits are so convenient for daily harvest!",
      rating: 5
    },
    {
      name: "Darlene Robertson",
      role: "Culinary Instructor",
      content: "Fantastic products and lightning fast delivery. My kitchen feels vibrant, alive, and so much healthier!",
      rating: 5
    },
    {
      name: "Jacob Jones",
      role: "Food & Wellness Blogger",
      content: "Love the Broccoli Brassica shoots! Incredible crunch, zero pesticide taste, and their customer service is top notch.",
      rating: 5
    },
    {
      name: "Esther Howard",
      role: "Nutrition Specialist",
      content: "The nutritional density of these live trays is unmatched. Adding sunflower shoots to my daily routine was life-changing.",
      rating: 5
    }
  ];

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      
      {/* Gallery Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C7754] block mb-1">
              Thoughtful, Planet-Prioritizing Ideas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3A27]">
              Inspiration ✦ <span className="italic font-normal text-[#366D44]">Gallery</span>
            </h2>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200 shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white text-xs">
                <span className="text-[10px] text-[#A3D977] uppercase font-bold">{item.tag}</span>
                <span className="font-medium text-white line-clamp-2">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews & 4.9/5 Rating Banner matching screenshot */}
      <div className="bg-[#EFEAD8] rounded-3xl p-6 sm:p-10 border border-[#E2DCB9]">
        
        {/* Rating Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-300/80 gap-4">
          <div className="flex items-center gap-4">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3A27]">
              4.9<span className="text-xl sm:text-2xl font-normal text-stone-500">/5</span>
            </div>
            <div>
              <div className="flex text-amber-600 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#1E3A27]">
                More than 28,000 5-Star Reviews for Our Award-Winning Living Products
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#366D44] bg-white/70 px-3 py-1.5 rounded-full self-start md:self-auto">
            <CheckCircle className="w-3.5 h-3.5" /> 100% Certified Organic Customers
          </span>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 flex flex-col justify-between hover:bg-white transition shadow-xs"
            >
              <div>
                <Quote className="w-6 h-6 text-[#A3D977] mb-2" />
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1E3A27]">{rev.name}</h4>
                  <span className="text-[10px] text-stone-500">{rev.role}</span>
                </div>
                <div className="flex text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Sustainable Commitment Footer Banner matching screenshot bottom */}
      <div className="text-center max-w-3xl mx-auto py-6">
        <p className="font-serif text-lg sm:text-xl text-[#2B332C] leading-relaxed">
          Discover our commitment to <span className="font-bold underline decoration-[#366D44] decoration-2">sustainable</span> materials, low-impact production, and <span className="italic font-bold text-[#1E3A27]">ethical organic sourcing</span> partnerships — all crafted to support a healthier planet and a <span className="text-[#366D44] font-bold">greener kitchen</span>.
        </p>
      </div>

    </section>
  );
}
