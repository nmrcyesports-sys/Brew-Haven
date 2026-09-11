const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

// Remove the first .hero-content:after in the media query
code = code.replace(/  \.hero-content:after \{\s*content: "";\s*position: absolute;\s*inset: 150px 0 100px;\s*background: linear-gradient\(90deg, #120906 0%, rgba\(18,9,6,\.72\) 48%, transparent\);\s*z-index: -1;\s*\}/, '');

// Remove the second .hero-content:after in the media query
code = code.replace(/  \.hero-content:after \{\s*inset: 0;\s*background: linear-gradient\(90deg, #120906 0%, rgba\(18,9,6,\.9\) 35%, transparent 80%\);\s*\}/, '');

// Update padding-bottom for mobile
code = code.replace(/padding-bottom: 80px;/, 'padding-bottom: 120px;');

fs.writeFileSync('src/index.css', code);
