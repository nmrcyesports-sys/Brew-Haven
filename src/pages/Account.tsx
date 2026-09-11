import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Star, Clock, LayoutDashboard, ShoppingBag, Calendar, Heart, MapPin, Ticket, Bell, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../components/ImageWithFallback';
import { useState } from 'react';

export function Account() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');

  if (!user) {
    navigate('/login');
    return null;
  }

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Reservations', icon: Calendar },
    { name: 'Wishlist', icon: Heart },
    { name: 'Addresses', icon: MapPin },
    { name: 'Loyalty Points', icon: Star },
    { name: 'Coupons', icon: Ticket },
    { name: 'Notifications', icon: Bell },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12">
      <div className="flex-grow flex w-full max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#160B07] border border-white/10 shadow-2xl">
        
        {/* Sidebar */}
        <div className="w-64 shrink-0 bg-black/40 border-r border-white/5 flex flex-col">
          <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D6A45D] flex items-center justify-center text-[#160B07] font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="text-[#F4E5CB] font-serif tracking-wide">{user.name}</div>
                <div className="text-white/40 text-xs">{user.email}</div>
              </div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-1">
            {sidebarLinks.map(link => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  activeTab === link.name 
                    ? "bg-[#D6A45D]/10 text-[#D6A45D]" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={() => {
                setUser(null);
                navigate('/');
              }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-8 sm:p-12 overflow-y-auto custom-scrollbar bg-[#160B07]/50">
          <div className="mb-10">
            <h2 className="font-serif text-4xl text-[#F4E5CB] mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="text-white/50 text-sm">Here's your account summary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/60 mb-4">
                <span className="text-sm">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-[#D6A45D]" />
              </div>
              <div className="text-4xl font-serif text-[#F4E5CB]">12</div>
            </div>
            
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/60 mb-4">
                <span className="text-sm">Reservations</span>
                <Calendar className="w-4 h-4 text-[#D6A45D]" />
              </div>
              <div className="text-4xl font-serif text-[#F4E5CB]">4</div>
            </div>
            
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/60 mb-4">
                <span className="text-sm">Loyalty Points</span>
                <Star className="w-4 h-4 text-[#D6A45D]" />
              </div>
              <div className="text-4xl font-serif text-[#F4E5CB]">{user.points}</div>
            </div>
            
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white/60 mb-4">
                <span className="text-sm">Member Tier</span>
                <Heart className="w-4 h-4 text-[#D6A45D]" />
              </div>
              <div className="text-4xl font-serif text-[#F4E5CB]">Brew</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-2xl text-[#F4E5CB]">Recent Orders</h3>
            <button className="text-xs text-white/50 hover:text-[#D6A45D] transition-colors border-b border-transparent hover:border-[#D6A45D]">View All Orders →</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 1, name: 'Cappuccino', date: 'April 12, 2025', status: 'Delivered', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80' },
              { id: 2, name: 'Cold Coffee', date: 'April 05, 2025', status: 'Delivered', img: 'https://images.unsplash.com/photo-1461023058943-0708e5ea7426?auto=format&fit=crop&q=80' },
              { id: 3, name: 'Chocolate Cake', date: 'April 02, 2025', status: 'Completed', img: 'https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&q=80' },
            ].map(order => (
              <div key={order.id} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5">
                    <img src={order.img} alt={order.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-white font-serif">{order.name}</div>
                    <div className="text-xs text-white/40">₹180 • {order.date}</div>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase",
                  order.status === 'Delivered' ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                )}>
                  {order.status}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
