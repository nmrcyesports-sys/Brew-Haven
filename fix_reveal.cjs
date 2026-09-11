const fs = require('fs');
let code = fs.readFileSync('src/components/ScrollReveal.tsx', 'utf8');

code = code.replace(/transition=\{\{ duration: 1\.2, ease: \[0\.16, 1, 0\.3, 1\], delay \}\}/, 
  'transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay }}');
  
fs.writeFileSync('src/components/ScrollReveal.tsx', code);
