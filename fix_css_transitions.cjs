const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf8');

code = code.replace(/transition: \.25s transform, \.25s box-shadow;/g, 'transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);');
code = code.replace(/transition: \.3s transform, \.3s border-color;/g, 'transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1);');
code = code.replace(/transition: transform 0\.3s ease;/g, 'transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);');
code = code.replace(/transition: color 0\.2s;/g, 'transition: color 0.4s ease;');
code = code.replace(/transition: color 0\.3s ease;/g, 'transition: color 0.5s ease;');

fs.writeFileSync('src/index.css', code);
