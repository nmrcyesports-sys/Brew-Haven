const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/padding: 250px 0 100px 9%;/, 'padding: 220px 0 100px 9%;');

fs.writeFileSync('src/index.css', code);
