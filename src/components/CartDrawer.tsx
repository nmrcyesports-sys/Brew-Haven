import { X, Minus, Plus, ShoppingBag, Utensils, ShoppingBag as BagIcon, Bike } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback, cn } from './ImageWithFallback';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal } = useStore();
  const [orderType, setOrderType] = useState('Dine-in');

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#160B07] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="font-serif text-3xl text-[#F4E5CB] mb-1">Your Cart</h2>
                <p className="text-white/40 text-xs">{cart.length} items</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/40">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 relative">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <ImageWithFallback src={item.product.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-[#F4E5CB] font-serif mb-1">{item.product.name}</h4>
                        <p className="text-white/50 text-xs">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 bg-transparent rounded-full px-2 py-1 border border-white/20">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-white/50 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-white/50 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/40">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-grow relative">
                    <input 
                      type="text" 
                      placeholder="Have a coupon?"
                      className="w-full bg-transparent border border-white/20 rounded-full pl-4 pr-20 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6A45D]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#D6A45D] font-medium hover:text-[#F4E5CB] transition-colors">Apply</button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-[#F4E5CB] font-serif pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-lg">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  {[
                    { id: 'Dine-in', icon: Utensils },
                    { id: 'Takeaway', icon: BagIcon },
                    { id: 'Delivery', icon: Bike },
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setOrderType(type.id)}
                      className={cn(
                        "flex-1 py-2.5 rounded-full text-[10px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border",
                        orderType === type.id
                          ? "bg-[#D6A45D] text-[#160B07] border-[#D6A45D]"
                          : "bg-transparent text-white/50 border-white/20 hover:border-white/40"
                      )}
                    >
                      <type.icon className="w-3 h-3" />
                      {type.id}
                    </button>
                  ))}
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#F4E5CB] transition-colors mb-4"
                >
                  Proceed to Checkout <span className="font-light tracking-tighter">→</span>
                </Link>
                
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-[10px] text-white/40 hover:text-white transition-colors underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
