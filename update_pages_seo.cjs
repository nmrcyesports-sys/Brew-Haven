const fs = require('fs');

function addSEO(filePath, title, description) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  if (!code.includes('import { SEO }')) {
    code = `import { SEO } from '../components/SEO';\n${code}`;
  }
  
  // Replace the first return ( <...
  code = code.replace(/(return\s*\(\s*<[a-zA-Z\.]+[^>]*>)/, (match) => {
    return `${match}\n      <SEO title="${title}" description="${description}" />\n`;
  });
  
  fs.writeFileSync(filePath, code);
}

addSEO('src/pages/Home.tsx', 'Café & Kitchen', 'Experience slow moments, specialty coffee, and handcrafted food at Brew Haven.');
addSEO('src/pages/About.tsx', 'Our Story', 'Learn about the origins of Brew Haven, our philosophy, and our dedication to the art of coffee.');
addSEO('src/pages/Menu.tsx', 'Menu', 'Explore our curated selection of espresso, pour-overs, artisan teas, and locally-sourced pastries.');
addSEO('src/pages/Gallery.tsx', 'Gallery', 'Take a visual journey through Brew Haven. See our beautifully designed interior and handcrafted treats.');
addSEO('src/pages/Contact.tsx', 'Contact Us', 'Get in touch with Brew Haven. Find our location, opening hours, and contact details.');
addSEO('src/pages/Reservation.tsx', 'Book a Table', 'Reserve your spot at Brew Haven. Whether for a quiet morning or an evening event, we have a table for you.');
addSEO('src/pages/Events.tsx', 'Events', 'Join our upcoming cupping sessions, live acoustic nights, and workshops at Brew Haven.');

