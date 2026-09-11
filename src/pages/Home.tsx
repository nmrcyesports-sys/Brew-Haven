import { SEO } from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { MOCK_PRODUCTS } from '../data/products';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export function Home() {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);

  return (
    <>
      <SEO title="Café & Kitchen" description="Experience slow moments, specialty coffee, and handcrafted food at Brew Haven." />
      <header className="hero" id="home">
        <div className="hero-content">
          <ScrollReveal delay={0.1}>
            <div className="eyebrow">— CRAFTED FOR SLOW MOMENTS</div>
            <h1>Coffee worth<br/><em>staying for.</em></h1>
            <p className="lead">Specialty coffee, handcrafted food, and a space designed to make you stay a little longer.</p>
            <div className="hero-buttons">
              <button className="cta" onClick={() => navigate('/menu')}>Explore Menu →</button>
              <button className="cta ghost" onClick={() => navigate('/reservation')}>Book a Table →</button>
            </div>
          </ScrollReveal>
        </div>
        <div className="stats">
          <div className="stat"><span className="ico">◌</span><span><strong>SPECIALTY COFFEE</strong><span>Best beans. Richer flavour.</span></span></div>
          <div className="stat"><span className="ico">⌁</span><span><strong>FRESHLY PREPARED</strong><span>Every order fresh & hot.</span></span></div>
          <div className="stat"><span className="ico">☆</span><span><strong>PREMIUM INGREDIENTS</strong><span>Quality you can taste.</span></span></div>
          <div className="stat"><span className="ico">⌂</span><span><strong>COZY ATMOSPHERE</strong><span>Good food. Great vibes.</span></span></div>
        </div>
      </header>

      <section className="template-section" id="menu">
        <ScrollReveal>
          <div className="section-head">
            <div><div className="kicker">THE MENU</div><h2>Made to be savoured.</h2></div>
            <p>From bold espresso to slow-crafted favourites, every item is prepared with care.</p>
          </div>
        </ScrollReveal>
        <div className="custom-grid">
          {MOCK_PRODUCTS.slice(0, 3).map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.1}>
              <article className="template-card flex flex-col h-full">
                <div className="w-[150px] h-[150px] mx-auto mb-6 rounded-full overflow-hidden shadow-2xl relative border-4 border-[#25120b]">
                  <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>
                <h3 className="text-center">{product.name}</h3>
                <p className="flex-grow text-center">{product.description}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="price">₹{product.price}</span>
                  <button 
                    className="cta" 
                    style={{padding: '10px 15px'}}
                    onClick={() => addToCart({ product, quantity: 1, price: product.price })}
                  >
                    Add
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="template-section story" id="story">
        <ScrollReveal>
          <div className="story-wrap">
            <div className="story-visual" aria-label="Cinematic coffee scene"></div>
            <div>
              <div className="kicker">OUR STORY</div>
              <h2>A little slower.<br/>A lot better.</h2>
              <p>Brew Haven is built around the simple idea that great coffee deserves time. We pair carefully selected beans with handcrafted food, warm interiors and thoughtful hospitality.</p>
              <p>Come for the coffee. Stay for the atmosphere.</p>
              <button className="cta mt-4" onClick={() => navigate('/about')}>Discover Brew Haven →</button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="template-section" id="gallery">
        <ScrollReveal>
          <div className="section-head">
            <div><div className="kicker">THE EXPERIENCE</div><h2>More than a coffee.</h2></div>
            <p>Warm light, rich aromas and a table that feels like it was waiting for you.</p>
          </div>
        </ScrollReveal>
        <div className="custom-grid">
          
          <ScrollReveal delay={0.1}>
            <article className="template-card group hover:border-[#D6A45D]/40 hover:bg-[#160B07] transition-all duration-700 ease-out cursor-pointer flex flex-col h-full" onClick={() => navigate('/gallery')}>
              <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative border border-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 ease-out z-10"></div>
                <ImageWithFallback src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80" alt="Slow mornings" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
              <h3 className="group-hover:text-[#D6A45D] transition-colors duration-500 ease-out">Slow mornings</h3>
              <p className="flex-grow">Fresh coffee and quiet conversations to start your day right.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#D6A45D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                <span className="font-medium tracking-wide">Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <article className="template-card group hover:border-[#D6A45D]/40 hover:bg-[#160B07] transition-all duration-700 ease-out cursor-pointer flex flex-col h-full" onClick={() => navigate('/events')}>
              <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative border border-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 ease-out z-10"></div>
                <ImageWithFallback src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80" alt="Late evenings" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
              <h3 className="group-hover:text-[#D6A45D] transition-colors duration-500 ease-out">Late evenings</h3>
              <p className="flex-grow">Good food, soft lights and better company as the sun sets.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#D6A45D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                <span className="font-medium tracking-wide">Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <article className="template-card group hover:border-[#D6A45D]/40 hover:bg-[#160B07] transition-all duration-700 ease-out cursor-pointer flex flex-col h-full" onClick={() => navigate('/reservation')}>
              <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative border border-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 ease-out z-10"></div>
                <ImageWithFallback src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80" alt="Private moments" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
              <h3 className="group-hover:text-[#D6A45D] transition-colors duration-500 ease-out">Private moments</h3>
              <p className="flex-grow">Reserve a secluded table for intimate birthdays and celebrations.</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-[#D6A45D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                <span className="font-medium tracking-wide">Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          </ScrollReveal>

        </div>
      </section>

      <section className="template-section reserve" id="events">
        <ScrollReveal>
          <div className="kicker">RESERVATIONS & EVENTS</div><h2>Your table is waiting.</h2>
          <p>Reserve your favourite spot for coffee dates, family dinners, birthdays or a relaxed evening with friends.</p>
          <button className="cta mt-6" onClick={() => navigate('/reservation')}>Reserve a Table →</button>
        </ScrollReveal>
      </section>
    </>
  );
}
