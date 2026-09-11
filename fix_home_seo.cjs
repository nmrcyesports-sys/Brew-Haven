const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if (!code.includes('<SEO')) {
  code = code.replace(/return\s*\(\s*<>/, 'return (\n    <>\n      <SEO title="Café & Kitchen" description="Experience slow moments, specialty coffee, and handcrafted food at Brew Haven." />');
  fs.writeFileSync('src/pages/Home.tsx', code);
}
