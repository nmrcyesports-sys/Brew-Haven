import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CartDrawer } from './CartDrawer';
import { User } from 'lucide-react';

import { useEffect } from 'react';
export function MainLayout({ children }: { children: ReactNode }) {

  const location = useLocation();
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const setIsCartOpen = useStore((state) => state.setIsCartOpen);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <div className="page">
      <main className="shell">
        <nav className="nav">
          <Link className="brand" to="/" aria-label="Brew Haven home">
            
            <span><strong>Brew Haven</strong><small>CAFÉ & KITCHEN</small></span>
          </Link>
          <div className={`navlinks ${isMobileMenuOpen ? 'open' : ''}`} >
            <Link className={location.pathname === '/' ? 'active' : ''} to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link className={location.pathname.startsWith('/menu') ? 'active' : ''} to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
            <Link className={location.pathname === '/about' ? 'active' : ''} to="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link className={location.pathname === '/gallery' ? 'active' : ''} to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
            <Link className={location.pathname === '/events' ? 'active' : ''} to="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
          <div className="actions">
            
            <Link to={user ? "/account" : "/login"} className="iconbtn" aria-label="Account">
              <User className="w-5 h-5 text-[#cbb9a3]" />
            </Link>
            <button className="iconbtn" onClick={() => setIsCartOpen(true)} aria-label="Cart">
              🛒
              {cartItemCount > 0 && <span className="cartcount">{cartItemCount}</span>}
            </button>
            <button className="cta" onClick={() => navigate('/reservation')}>Book a Table</button>
            
            <button className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>
        </nav>

        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setIsMobileMenuOpen(false); }}>
          <div className="mobile-menu-inner">
            <div className="mobile-menu-header">
              <span className="mobile-title">BREW HAVEN</span>
              <button className="menuClose" onClick={() => setIsMobileMenuOpen(false)}>×</button>
            </div>

            <nav className="mobile-nav">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>

            <button className="mobile-book-btn" onClick={() => { setIsMobileMenuOpen(false); navigate('/reservation'); }}>
              Book a Table <span>→</span>
            </button>
          </div>
        </div>


        {isHome ? (
          children
        ) : (
          <div className="page-content-wrapper z-10 px-8" style={{ paddingTop: '130px' }}>
            {children}
          </div>
        )}

        {/* Footer */}
        <footer className="template-footer" id="contact">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>Brew Haven</h2>
              <p>A premium café & kitchen made for slow moments and memorable cups.</p>
            </div>
            <div className="footer-col">
              <h4>EXPLORE</h4>
              <Link to="/menu">Menu</Link>
              <Link to="/about">Our Story</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/events">Events</Link>
            </div>
            <div className="footer-col">
              <h4>VISIT</h4>
              <a href="tel:+919999999999">+91 99999 99999</a>
              <a href="mailto:hello@brewhaven.example">hello@brewhaven.example</a>
              <Link to="/contact">10:00 AM — 11:00 PM</Link>
            </div>
            <div className="footer-col">
              <h4>BOOKING</h4>
              <Link to="/reservation">Book a Table</Link>
              <a href="#">Order Online</a>
              <a href="#">WhatsApp</a>
            </div>
          </div>
          <div className="copyright">© 2026 Brew Haven Café & Kitchen · Crafted with intention.</div>
        </footer>
      </main>
      
      <CartDrawer />
    </div>
  );
}
