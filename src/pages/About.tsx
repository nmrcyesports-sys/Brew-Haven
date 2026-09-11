import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function About() {
  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
      <SEO title="Our Story" description="Learn about the origins of Brew Haven, our philosophy, and our dedication to the art of coffee." />

      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl text-[#F4E5CB] mb-6">Our Story</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            More than just a café. Aura is a sanctuary for those who appreciate the art of slow living and exceptional coffee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black/40 border border-white/5 aspect-square sm:aspect-[4/5] shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover"
                alt="Roasting Coffee"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="font-serif text-4xl text-[#F4E5CB]">The Bean Journey</h2>
            <div className="w-12 h-[1px] bg-[#D6A45D]"></div>
            <p className="text-white/60 leading-relaxed font-light">
              We source our beans directly from sustainable farms in Ethiopia, Colombia, and Costa Rica. Every batch is roasted locally to ensure maximum freshness and flavor profile preservation.
            </p>
            <p className="text-white/60 leading-relaxed font-light">
              Our master roasters treat coffee like fine wine, understanding that temperature, humidity, and time all play crucial roles in developing the perfect cup.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 md:flex-row-reverse flex-col-reverse">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 order-2 md:order-1">
            <h2 className="font-serif text-4xl text-[#F4E5CB]">The Space</h2>
            <div className="w-12 h-[1px] bg-[#D6A45D]"></div>
            <p className="text-white/60 leading-relaxed font-light">
              Designed to evoke warmth and tranquility, our space features natural materials, ambient lighting, and acoustic treatment to create the perfect environment for deep work or intimate conversations.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black/40 border border-white/5 aspect-square sm:aspect-[4/5] shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover"
                alt="Cafe Interior"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
