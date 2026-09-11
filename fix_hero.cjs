const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/@media\(max-width: 1150px\) \{\s*\.hero \{\s*min-height: 750px;\s*\}\s*\.hero-content \{\s*padding-bottom: 120px;\s*\}\s*\.hero-content:after \{\s*inset: 150px 0 0 0;\s*background: linear-gradient\(180deg, #120906 0%, rgba\(18,9,6,\.8\) 40%, transparent 100%\);\s*\}\s*\}/g, `@media(max-width: 1150px) {
  .hero {
    min-height: 750px;
  }
  .hero-content {
    padding-bottom: 80px;
  }
  .hero-content:after {
    inset: 0;
    background: linear-gradient(90deg, #120906 0%, rgba(18,9,6,.9) 35%, transparent 80%);
  }
}`);

fs.writeFileSync('src/index.css', code);
