const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

// push stats down further
code = code.replace(/\.stats \{\s*position: absolute;\s*left: 5%;\s*right: 5%;\s*bottom: -40px;/, 
  '.stats {\n  position: absolute;\n  left: 5%;\n  right: 5%;\n  bottom: -60px;');
  
// fix nav mobile toggle overlapping issues
code = code.replace(/\.iconbtn \{/, '.iconbtn {\n  position: relative;\n  z-index: 1002;');

fs.writeFileSync('src/index.css', code);
