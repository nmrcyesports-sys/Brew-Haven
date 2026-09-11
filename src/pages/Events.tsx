import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Events() {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E5CB] mb-6">Events</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Join us for special nights, coffee workshops, and live music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D6A45D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_15px_rgba(203,170,137,0.1)]">
                <Calendar className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <h3 className="font-serif text-3xl text-[#F4E5CB] mb-3">Latte Art Workshop</h3>
              <p className="text-white/50 mb-6 text-sm leading-relaxed font-light">Learn the secrets of perfect milk texturing and pouring from our head barista.</p>
              <div className="text-xs font-semibold tracking-widest text-[#D6A45D] uppercase mb-8">Next Saturday • 10:00 AM</div>
              <button className="w-full py-3.5 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors">
                Register
              </button>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D6A45D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_15px_rgba(203,170,137,0.1)]">
                <Calendar className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <h3 className="font-serif text-3xl text-[#F4E5CB] mb-3">Jazz Night</h3>
              <p className="text-white/50 mb-6 text-sm leading-relaxed font-light">Enjoy smooth jazz, espresso martinis, and a relaxed atmosphere.</p>
              <div className="text-xs font-semibold tracking-widest text-[#D6A45D] uppercase mb-8">Every Friday • 7:00 PM</div>
              <Link to="/reservation" className="block w-full text-center py-3.5 bg-transparent border border-white/20 text-white rounded-full text-sm font-semibold tracking-wide hover:border-[#D6A45D] transition-colors">
                Book a Table
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
