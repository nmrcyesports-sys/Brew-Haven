const fs = require('fs');
let code = fs.readFileSync('src/components/MainLayout.tsx', 'utf8');

code = code.replace(/const location = useLocation\(\);\s*useEffect\(\(\) => \{\s*if \(isMobileMenuOpen\) \{\s*document\.body\.style\.overflow = 'hidden';\s*\} else \{\s*document\.body\.style\.overflow = '';\s*\}\s*return \(\) => \{ document\.body\.style\.overflow = ''; \};\s*\}, \[isMobileMenuOpen\]\);/, 'const location = useLocation();');

code = code.replace(/const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);\s*const isHome = location\.pathname === '\/';/, 
`const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);`);

fs.writeFileSync('src/components/MainLayout.tsx', code);
