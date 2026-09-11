const fs = require('fs');
let code = fs.readFileSync('src/components/MainLayout.tsx', 'utf8');

code = code.replace(/<button className="iconbtn" aria-label="Search">⌕<\/button>/g, '');

fs.writeFileSync('src/components/MainLayout.tsx', code);
