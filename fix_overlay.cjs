const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/\.mobile-menu-overlay \{[\s\S]*?transition: \.35s ease;\s*\}/, 
  '.mobile-menu-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n  background: rgba(8,3,2,.72);\n  backdrop-filter: blur(18px);\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition: .35s ease;\n}');

code = code.replace(/\.mobile-menu-overlay\.open \{[\s\S]*?visibility: visible;\s*\}/, 
  '.mobile-menu-overlay.open {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n}');

fs.writeFileSync('src/index.css', code);
