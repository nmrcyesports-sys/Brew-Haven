const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ BrowserRouter, Routes, Route \} from 'react-router-dom';/, 
  "import { BrowserRouter, Routes, Route } from 'react-router-dom';\nimport { HelmetProvider } from 'react-helmet-async';");

code = code.replace(/return \(\s*<BrowserRouter>/, 
  "return (\n    <HelmetProvider>\n      <BrowserRouter>");
  
code = code.replace(/<\/BrowserRouter>\s*\);/, 
  "</BrowserRouter>\n    </HelmetProvider>\n  );");

fs.writeFileSync('src/App.tsx', code);
