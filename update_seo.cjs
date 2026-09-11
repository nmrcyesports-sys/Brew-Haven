const fs = require('fs');

// 1. Update metadata.json
const metadataPath = 'metadata.json';
let metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
metadata.name = "Brew Haven Café & Kitchen";
metadata.description = "Specialty coffee, handcrafted food, and a space designed to make you stay a little longer. Experience slow moments and memorable cups.";
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const metaTags = `    <title>Brew Haven | Café & Kitchen</title>
    <meta name="description" content="Specialty coffee, handcrafted food, and a space designed to make you stay a little longer." />
    <meta name="keywords" content="coffee, cafe, brew haven, specialty coffee, handcrafted food, premium cafe, kitchen, espresso, breakfast, pastry" />
    <meta name="author" content="Brew Haven Café & Kitchen" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#160B07" />
    <link rel="canonical" href="https://brewhaven.example" />
    
    <!-- OpenGraph -->
    <meta property="og:title" content="Brew Haven | Café & Kitchen" />
    <meta property="og:description" content="Specialty coffee, handcrafted food, and a space designed to make you stay a little longer." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://brewhaven.example" />
    <meta property="og:site_name" content="Brew Haven" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80" />
    <meta property="og:image:alt" content="Brew Haven Coffee" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Brew Haven | Café & Kitchen" />
    <meta name="twitter:description" content="Specialty coffee, handcrafted food, and a space designed to make you stay a little longer." />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80" />`;

// Replace everything between <meta name="viewport"...> and <link rel="preconnect" ...>
html = html.replace(
  /<title>.*?<meta name="twitter:card" content="summary_large_image" \/>/s,
  metaTags
);

fs.writeFileSync('index.html', html);
