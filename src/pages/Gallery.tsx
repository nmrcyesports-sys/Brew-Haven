import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback, cn } from '../components/ImageWithFallback';

const GALLERY_IMAGES = [
  { id: 1, category: 'Space', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80' },
  { id: 2, category: 'Coffee', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80' },
  { id: 3, category: 'Food', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80' },
  { id: 4, category: 'Space', url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80' },
  { id: 5, category: 'Coffee', url: 'https://images.unsplash.com/photo-1582216664987-195c898393e8?auto=format&fit=crop&q=80' },
  { id: 6, category: 'Food', url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80' },
];

const CATEGORIES = ['All', 'Space', 'Coffee', 'Food'];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = GALLERY_IMAGES.filter(img => 
    activeCategory === 'All' || img.category === activeCategory
  );

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E5CB] mb-6">Gallery</h1>
          <p className="text-white/50 text-sm font-light">Glimpses of the Aura experience.</p>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-8 py-2.5 rounded-full font-semibold tracking-wide text-xs transition-all border",
                activeCategory === category 
                  ? "bg-[#D6A45D] text-[#160B07] border-[#D6A45D]" 
                  : "bg-transparent text-white/50 border-white/20 hover:border-white/40 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map(img => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-[2rem] overflow-hidden bg-black/40 border border-white/5 shadow-2xl relative group"
              >
                <ImageWithFallback 
                  src={img.url} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160B07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-[#D6A45D] text-xs font-semibold tracking-widest uppercase">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
