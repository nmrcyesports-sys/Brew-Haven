import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../data/products';
import { ImageWithFallback, cn } from '../components/ImageWithFallback';
import { Heart, Minus, Plus, Maximize2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function ProductDetail() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  const addToCart = useStore(state => state.addToCart);
  
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Small');
  const [activeTab, setActiveTab] = useState('Ingredients');

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 max-w-7xl mx-auto w-full">
        
        {/* Left: Product Image */}
        <div className="flex-1">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-black/40 border border-white/5 aspect-square sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors text-white">
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-6 left-6 flex gap-3">
              {product.isVegetarian && (
                <span className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm border border-green-500 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  Vegetarian
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col pt-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="font-serif text-4xl sm:text-5xl text-[#F4E5CB] tracking-tight">{product.name}</h1>
          </div>
          
          <div className="text-2xl text-white mb-4">₹{product.price}</div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#D6A45D]">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={cn("w-4 h-4", i <= 4 ? "fill-[#D6A45D]" : "fill-transparent")} />
              ))}
            </div>
            <span className="text-white/50 text-sm">4.8 (234 reviews)</span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          <div className="mb-8">
            <div className="text-sm text-white/80 font-medium mb-3">Size</div>
            <div className="flex gap-3">
              {['Small', 'Medium', 'Large'].map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all",
                    size === s 
                      ? "bg-[#D6A45D] text-[#160B07] border-[#D6A45D]" 
                      : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="text-sm text-white/80 font-medium mb-3">Customization</div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-[#D6A45D] transition-colors">
                  <div className="w-3 h-3 rounded-sm bg-transparent group-active:bg-[#D6A45D]"></div>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">Extra Shot (+₹20)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-[#D6A45D] transition-colors">
                  <div className="w-3 h-3 rounded-sm bg-[#D6A45D]"></div>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">Oat Milk (+₹30)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-[#D6A45D] transition-colors">
                  <div className="w-3 h-3 rounded-sm bg-transparent group-active:bg-[#D6A45D]"></div>
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">Sugar Free (+₹0)</span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <div className="flex items-center bg-black/40 border border-white/10 rounded-full h-12 px-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-white font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => addToCart({ product, quantity, price: product.price })}
              className="flex-1 h-12 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#F4E5CB] transition-colors min-w-[200px]"
            >
              Add to Cart
            </button>

            <button className="h-12 px-6 bg-transparent border border-white/20 text-white/80 rounded-full text-xs font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4" /> Add to Wishlist
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex gap-8 border-b border-white/10 mb-6">
              {['Ingredients', 'Nutrition', 'Allergen Info', 'Reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm tracking-wide transition-colors relative font-medium",
                    activeTab === tab ? "text-[#D6A45D]" : "text-white/50 hover:text-white"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="product-tab"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D6A45D]"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="text-sm text-white/60 leading-relaxed min-h-[100px]">
              {activeTab === 'Ingredients' && "Freshly ground Arabica beans, purified water, locally sourced organic milk (or selected alternative)."}
              {activeTab === 'Nutrition' && "Calories: 120kcal\nFat: 5g\nCarbs: 12g\nProtein: 8g"}
              {activeTab === 'Allergen Info' && "Contains: Milk (if dairy selected). Processed in a facility that also handles nuts and soy."}
              {activeTab === 'Reviews' && "⭐⭐⭐⭐⭐ - 'The best I've ever had!'\n⭐⭐⭐⭐ - 'Really good, but a bit pricey.'"}
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto w-full mt-24 mb-10">
        <h3 className="font-serif text-2xl text-[#F4E5CB] mb-8">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(0, 4).map((p, i) => (
            <Link to={`/product/${p.id}`} key={i} className="group bg-[#160B07] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col h-full shadow-xl shadow-black/50">
              <div className="h-40 overflow-hidden bg-black/40">
                <ImageWithFallback src={p.image} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-serif text-white group-hover:text-[#D6A45D] transition-colors truncate">{p.name}</h4>
                <div className="text-sm text-white/50 mt-1 mb-3">₹{p.price}</div>
                <div className="mt-auto flex items-center text-xs text-white/40 group-hover:text-[#D6A45D] transition-colors">
                  View <span className="ml-1 tracking-tighter">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
