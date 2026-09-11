const fs = require('fs');

// 1. Remove HelmetProvider from App.tsx
let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(/import \{ HelmetProvider \} from 'react-helmet-async';\n/, '');
appCode = appCode.replace(/<HelmetProvider>\s*/, '');
appCode = appCode.replace(/\s*<\/HelmetProvider>/, '');
fs.writeFileSync('src/App.tsx', appCode);

// 2. Remove Helmet from SEO.tsx and use React Fragments
let seoCode = fs.readFileSync('src/components/SEO.tsx', 'utf8');
seoCode = seoCode.replace(/import \{ Helmet \} from 'react-helmet-async';/, '');
seoCode = seoCode.replace(/<Helmet>/, '<>');
seoCode = seoCode.replace(/<\/Helmet>/, '</>');
fs.writeFileSync('src/components/SEO.tsx', seoCode);

