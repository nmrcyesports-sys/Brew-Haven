const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/linear-gradient\(90deg, rgba\(12,6,4,\.92\) 0%, rgba\(12,6,4,\.72\) 42%, rgba\(12,6,4,\.08\) 100%\)/, 
  'linear-gradient(90deg, rgba(12,6,4,.92) 0%, rgba(12,6,4,.72) 35%, rgba(12,6,4,.0) 80%)');

fs.writeFileSync('src/index.css', code);
