import { SEO } from '../components/SEO';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <SEO title="Contact Us" description="Get in touch with Brew Haven. Find our location, opening hours, and contact details." />

      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E5CB] mb-6">Contact Us</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            We'd love to hear from you. Reach out for events, reservations, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-[#D6A45D]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(203,170,137,0.15)]">
                <MapPin className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <div>
                <h3 className="text-[#F4E5CB] font-semibold uppercase tracking-widest mb-2 text-sm">Location</h3>
                <p className="text-white/50 text-sm leading-relaxed">123 Coffee Lane<br/>Seattle, WA 98101</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-[#D6A45D]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(203,170,137,0.15)]">
                <Phone className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <div>
                <h3 className="text-[#F4E5CB] font-semibold uppercase tracking-widest mb-2 text-sm">Phone</h3>
                <p className="text-white/50 text-sm leading-relaxed">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-[#D6A45D]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(203,170,137,0.15)]">
                <Mail className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <div>
                <h3 className="text-[#F4E5CB] font-semibold uppercase tracking-widest mb-2 text-sm">Email</h3>
                <p className="text-white/50 text-sm leading-relaxed">hello@auracafe.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-[#D6A45D]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(203,170,137,0.15)]">
                <Clock className="w-5 h-5 text-[#D6A45D]" />
              </div>
              <div>
                <h3 className="text-[#F4E5CB] font-semibold uppercase tracking-widest mb-2 text-sm">Hours</h3>
                <p className="text-white/50 text-sm leading-relaxed">Mon - Fri: 7am - 8pm<br/>Sat - Sun: 8am - 9pm</p>
              </div>
            </div>

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <form className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl space-y-6">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">Name</label>
                <input required type="text" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">Email</label>
                <input required type="email" className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">Message</label>
                <textarea required rows={5} className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D6A45D] transition-colors placeholder:text-white/20" placeholder="How can we help you?" />
              </div>
              <button 
                type="button"
                onClick={() => alert('Message Sent')}
                className="w-full py-4 bg-[#D6A45D] text-[#160B07] rounded-full text-sm font-semibold tracking-wide hover:bg-[#F4E5CB] transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
