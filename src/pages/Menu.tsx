import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, ShoppingBag, Leaf, Star, Heart } from 'lucide-react';
import { ImageWithFallback, cn } from '../components/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Coffee', 'Cold Coffee', 'Tea', 'Mocktails', 'Shakes', 'Breakfast', 'Snacks', 'Main Course', 'Desserts'];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const addToCart = useStore((state) => state.addToCart);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full px-4 sm:px-8 py-10 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 max-w-7xl mx-auto">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F4E5CB] mb-2 tracking-tight">Our Menu</h1>
          <p className="text-white/60 font-light text-sm sm:text-base">Good food. Great coffee. Better together.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search menu items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#160B07]/50 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/30"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/60 whitespace-nowrap">
            Sort by: <span className="text-[#D6A45D] cursor-pointer">Popular ▾</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto custom-scrollbar pb-4 mb-10 gap-2 sm:gap-4 max-w-7xl mx-auto">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "whitespace-nowrap px-5 py-2 rounded-full font-medium tracking-wide text-[11px] sm:text-xs transition-all border",
              activeCategory === category 
                ? "bg-[#D6A45D] text-[#160B07] border-[#D6A45D]" 
                : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#160B07] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col shadow-xl shadow-black/50"
            >
              <Link to={`/product/${product.id}`} className="block h-48 overflow-hidden relative bg-black/40">
                <ImageWithFallback 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-[#D6A45D] hover:text-[#160B07] transition-colors text-white">
                  <Heart className="w-4 h-4" />
                </button>
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <Link to={`/product/${product.id}`} className="hover:text-[#D6A45D] transition-colors truncate">
                    <h3 className="font-serif text-lg text-[#F4E5CB] truncate">{product.name}</h3>
                  </Link>
                  {product.isVegetarian && (
                    <div className="w-4 h-4 rounded-sm border border-green-600 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                  )}
                </div>
                <div className="font-sans text-sm text-white/50 mb-4">₹{product.price}</div>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => addToCart({ product, quantity: 1, price: product.price })}
                    className="w-full py-2.5 bg-transparent border border-white/20 text-white/80 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#D6A45D] hover:text-[#160B07] hover:border-[#D6A45D] transition-colors"
                  >
                    <span>Add to Cart</span>
                    <span className="font-light tracking-tighter">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/40">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
