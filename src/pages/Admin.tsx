import { useState } from 'react';
import { Package, Users, LayoutDashboard, ShoppingBag, Settings, MoreVertical, Search, ArrowUpRight, ArrowDownRight, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../components/ImageWithFallback';

const STATS = [
  { label: 'Total Revenue', value: '₹45,231.89', change: '+20.1%', isPositive: true },
  { label: 'Orders', value: '+573', change: '+201 since last week', isPositive: true },
  { label: 'Active Customers', value: '+2350', change: '+180 since last month', isPositive: true },
  { label: 'Avg Order Value', value: '₹345', change: '-4% since last month', isPositive: false },
];

const RECENT_ORDERS = [
  { id: '#3210', customer: 'Alice Smith', type: 'Dine-in', status: 'completed', total: '₹450', time: '10 mins ago' },
  { id: '#3209', customer: 'Bob Jones', type: 'Takeaway', status: 'preparing', total: '₹890', time: '15 mins ago' },
  { id: '#3208', customer: 'Charlie Brown', type: 'Delivery', status: 'pending', total: '₹1200', time: '22 mins ago' },
  { id: '#3207', customer: 'Diana Prince', type: 'Dine-in', status: 'completed', total: '₹320', time: '1 hour ago' },
];

export function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 p-6 flex flex-col">
        <div className="hidden lg:flex items-center gap-3 mb-12">
          <Coffee className="w-8 h-8 text-[#D6A45D]" />
          <span className="font-serif text-xl tracking-widest text-[#F4E5CB]">ADMIN</span>
        </div>

        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'orders', icon: ShoppingBag, label: 'Orders' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                activeTab === item.id 
                  ? "bg-[#D6A45D] text-[#160B07]" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto w-full">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h1 className="font-serif text-4xl text-[#F4E5CB] mb-2">Dashboard</h1>
              <p className="text-white/50 text-sm">Welcome back, Admin.</p>
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D6A45D] w-full sm:w-64 transition-colors"
              />
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/40 border border-white/5 rounded-[2rem] p-6 shadow-2xl"
              >
                <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2">{stat.label}</h3>
                <div className="text-3xl font-serif text-[#F4E5CB] mb-2">{stat.value}</div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.isPositive ? "text-green-400" : "text-red-400"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#F4E5CB]">Recent Orders</h2>
                <button className="text-xs text-[#D6A45D] font-medium hover:text-[#F4E5CB] transition-colors uppercase tracking-widest">
                  View All
                </button>
              </div>
              
              <div className="bg-black/40 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-white/40 uppercase tracking-widest text-[10px]">
                      <th className="p-6 font-medium">Order</th>
                      <th className="p-6 font-medium">Customer</th>
                      <th className="p-6 font-medium">Type</th>
                      <th className="p-6 font-medium">Status</th>
                      <th className="p-6 font-medium text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {RECENT_ORDERS.map((order, idx) => (
                      <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="p-6 font-mono text-white/70">{order.id}</td>
                        <td className="p-6 text-[#F4E5CB]">{order.customer}</td>
                        <td className="p-6 text-white/50">{order.type}</td>
                        <td className="p-6">
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full",
                            order.status === 'completed' ? "bg-green-500/10 text-green-400" :
                            order.status === 'preparing' ? "bg-orange-500/10 text-orange-400" :
                            "bg-[#D6A45D]/10 text-[#D6A45D]"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-6 text-right font-medium text-[#F4E5CB]">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions / Activity */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#F4E5CB]">Activity</h2>
              
              <div className="bg-black/40 border border-white/5 rounded-[2rem] p-6 shadow-2xl space-y-6">
                {[
                  { title: 'New reservation', desc: 'Table 4 reserved for 2', time: '5m ago' },
                  { title: 'Inventory alert', desc: 'Ethiopian Yirgacheffe low', time: '1h ago' },
                  { title: 'New review', desc: '5 stars from Alice S.', time: '2h ago' },
                  { title: 'System update', desc: 'Menu synced successfully', time: '3h ago' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#D6A45D] mt-2 shrink-0"></div>
                    <div>
                      <h4 className="text-[#F4E5CB] text-sm font-medium mb-1">{act.title}</h4>
                      <p className="text-white/40 text-xs">{act.desc}</p>
                      <span className="text-white/20 text-[10px] uppercase tracking-widest mt-1 block">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
