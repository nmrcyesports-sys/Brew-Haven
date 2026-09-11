import { useState } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '../components/ImageWithFallback';

type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed';

interface KitchenOrder {
  id: string;
  items: string[];
  status: OrderStatus;
  time: string;
}

const INITIAL_ORDERS: KitchenOrder[] = [
  { id: '#ORD-112', items: ['2x Cappuccino', '1x Sandwich'], status: 'new', time: '10:24 AM' },
  { id: '#ORD-111', items: ['1x Cold Coffee', '1x Cake'], status: 'preparing', time: '10:18 AM' },
  { id: '#ORD-110', items: ['2x Mocha', '1x Fries'], status: 'ready', time: '10:12 AM' },
  { id: '#ORD-109', items: ['1x Latte', '1x Burger'], status: 'preparing', time: '10:08 AM' },
  { id: '#ORD-108', items: ['2x Americano', '1x Brownie'], status: 'ready', time: '10:01 AM' },
];

export function Kitchen() {
  const [orders, setOrders] = useState<KitchenOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = filter === 'all' 
    ? orders.filter(o => o.status !== 'completed')
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'new': return 'bg-white/10 text-white';
      case 'preparing': return 'bg-[#D6A45D]/20 text-[#D6A45D] border-[#D6A45D]/30';
      case 'ready': return 'bg-green-900/30 text-green-400 border-green-900/50';
      case 'completed': return 'bg-white/5 text-white/30';
    }
  };

  const counts = {
    new: orders.filter(o => o.status === 'new').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl text-[#F4E5CB] mb-2">Kitchen Display</h1>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> Live Order Stream
            </p>
          </div>

          <div className="flex bg-black/40 border border-white/10 rounded-full p-1">
            {(['all', 'new', 'preparing', 'ready'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all",
                  filter === f ? "bg-[#D6A45D] text-[#160B07]" : "text-white/50 hover:text-white"
                )}
              >
                {f} {f !== 'all' && <span className="ml-1 opacity-70">({counts[f as keyof typeof counts]})</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-xs font-semibold tracking-widest text-white/40 uppercase bg-black/20">
            <div className="col-span-2">Order ID</div>
            <div className="col-span-6">Items</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-right">Time</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-white/40 text-sm">No orders in this view.</div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors">
                  <div className="col-span-2 font-mono text-sm text-[#F4E5CB]">{order.id}</div>
                  
                  <div className="col-span-6 flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button 
                      onClick={() => {
                        if (order.status === 'new') updateStatus(order.id, 'preparing');
                        else if (order.status === 'preparing') updateStatus(order.id, 'ready');
                        else if (order.status === 'ready') updateStatus(order.id, 'completed');
                      }}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105",
                        getStatusColor(order.status)
                      )}
                    >
                      {order.status}
                    </button>
                  </div>

                  <div className="col-span-2 text-right text-xs text-white/40">{order.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
