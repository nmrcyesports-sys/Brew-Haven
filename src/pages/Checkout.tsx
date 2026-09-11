import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Utensils, ShoppingBag, Bike } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../components/ImageWithFallback';

export function Checkout() {
  const { cart, getCartTotal, clearCart } = useStore();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderType, setOrderType] = useState('takeaway');
  const navigate = useNavigate();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    clearCart();
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const deliveryFee = orderType === 'delivery' ? 50 : 0;
  const total = subtotal + tax + deliveryFee;

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#160B07]">
        <h2 className="font-serif text-4xl text-[#F4E5CB] mb-4">Your cart is empty</h2>
        <p className="text-white/50 mb-8 max-w-md text-sm">
          Add some items to your cart before proceeding to checkout.
        </p>
        <button onClick={() => navigate('/menu')} className="px-8 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors">
          Explore Menu
        </button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#160B07]">
        <CheckCircle2 className="w-20 h-20 text-[#D6A45D] mb-6" />
        <h2 className="font-serif text-4xl text-[#F4E5CB] mb-4">Order Received</h2>
        <p className="text-white/50 mb-8 max-w-md text-sm">
          Your {orderType} order is being prepared. We'll notify you when it's ready.
        </p>
        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 mb-8">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Order ID</div>
          <div className="font-mono text-2xl tracking-widest text-[#F4E5CB]">AUR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
        </div>
        <button onClick={() => navigate('/')} className="px-8 py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12">
      <div className="flex-grow flex flex-col max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h1 className="font-serif text-5xl text-[#F4E5CB] mb-2">Checkout</h1>
          <p className="text-white/50 text-sm">Complete your order.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                <h3 className="font-serif text-2xl text-[#F4E5CB] mb-6">Order Type</h3>
                <div className="flex gap-4">
                  {[
                    { id: 'dine-in', label: 'Dine-in', icon: Utensils },
                    { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
                    { id: 'delivery', label: 'Delivery', icon: Bike },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setOrderType(type.id)}
                      className={cn(
                        "flex-1 py-4 rounded-2xl text-xs font-semibold tracking-wider uppercase flex flex-col items-center justify-center gap-3 transition-colors border",
                        orderType === type.id
                          ? "bg-[#D6A45D] text-[#160B07] border-[#D6A45D]"
                          : "bg-transparent text-white/50 border-white/20 hover:border-white/40 hover:text-white"
                      )}
                    >
                      <type.icon className="w-5 h-5" />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl space-y-6">
                <h3 className="font-serif text-2xl text-[#F4E5CB] mb-6">Your Details</h3>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Phone Number</label>
                  <input required type="tel" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="+1 234 567 890" />
                </div>
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2">Delivery Address</label>
                    <textarea required rows={3} className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="123 Coffee Street..." />
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl space-y-6">
                 <h3 className="font-serif text-2xl text-[#F4E5CB] mb-6">Payment</h3>
                 <div className="text-white/40 text-xs italic mb-4">Mock payment mode active.</div>
                 <div>
                  <label className="block text-xs font-medium text-white/70 mb-2">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20 font-mono" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-white/70 mb-2">Expiry</label>
                    <input required type="text" placeholder="MM/YY" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20 font-mono" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-white/70 mb-2">CVC</label>
                    <input required type="text" placeholder="123" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20 font-mono" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 shadow-xl sticky top-24">
              <h3 className="font-serif text-2xl text-[#F4E5CB] mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between items-start text-sm">
                    <div className="flex gap-3">
                      <span className="text-[#D6A45D] font-medium">{item.quantity}x</span>
                      <span className="text-white/80">{item.product.name}</span>
                    </div>
                    <span className="text-white font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm text-white/50">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-white/50">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between items-center text-sm text-white/50">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(0)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center mb-8">
                <span className="uppercase tracking-widest text-xs font-semibold text-white/70">Total</span>
                <span className="font-serif text-3xl text-[#F4E5CB]">
                  ₹{total.toFixed(0)}
                </span>
              </div>

              <button 
                type="submit"
                form="checkout-form"
                className="w-full py-4 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-[#F4E5CB] transition-colors"
              >
                Place Order <span className="font-light tracking-tighter">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
