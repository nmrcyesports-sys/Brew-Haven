const fs = require('fs');
let code = fs.readFileSync('src/components/MainLayout.tsx', 'utf8');

// replace the old mobile menu button and state logic
code = code.replace(/<button\s*className="iconbtn mobile-menu relative z-\[1001\]"\s*onClick=\{\(\) => setIsMobileMenuOpen\(!isMobileMenuOpen\)\}\s*aria-label="Open menu"\s*>\s*\{isMobileMenuOpen \? '✕' : '☰'\}\s*<\/button>/g, `
            <button className={\`menu-toggle \${isMobileMenuOpen ? 'active' : ''}\`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
`);

// add the new mobile menu at the end of nav
code = code.replace(/<\/nav>/, `</nav>

        <div className={\`mobile-menu-overlay \${isMobileMenuOpen ? 'open' : ''}\`} onClick={(e) => { if (e.target === e.currentTarget) setIsMobileMenuOpen(false); }}>
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
`);

// also fix the body overflow issue in useEffect
code = code.replace(/export function MainLayout\(\{ children \}: \{ children: ReactNode \}\) \{/, 
`import { useEffect } from 'react';\nexport function MainLayout({ children }: { children: ReactNode }) {\n`);

code = code.replace(/const location = useLocation\(\);/, 
`const location = useLocation();
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);`);

fs.writeFileSync('src/components/MainLayout.tsx', code);
