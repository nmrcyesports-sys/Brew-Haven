const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(4001, async () => {
  try {
    const browser = await puppeteer.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('LOG:', msg.text()));
    page.on('pageerror', error => console.log('ERROR:', error.message));
    
    await page.goto('http://localhost:4001', { waitUntil: 'networkidle0' });
    
    const root = await page.evaluate(() => document.getElementById('root').innerHTML);
    if (!root) {
      console.log('CRITICAL: root is empty');
    } else {
      console.log('SUCCESS: root has content, length:', root.length);
    }
    
    await browser.close();
  } catch (err) {
    console.error(err);
  }
  server.close();
});
