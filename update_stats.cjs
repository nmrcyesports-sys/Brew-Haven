const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/\.stats \{\s*position: absolute;\s*left: 5%;\s*right: 5%;\s*bottom: 22px;/, 
  '.stats {\n  position: absolute;\n  left: 5%;\n  right: 5%;\n  bottom: -40px;\n  z-index: 10;');

fs.writeFileSync('src/index.css', code);
