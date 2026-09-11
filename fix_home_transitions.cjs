const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/duration-700/g, 'duration-1000 ease-out');
code = code.replace(/duration-500/g, 'duration-700 ease-out');
code = code.replace(/duration-300/g, 'duration-500 ease-out');

fs.writeFileSync('src/pages/Home.tsx', code);
