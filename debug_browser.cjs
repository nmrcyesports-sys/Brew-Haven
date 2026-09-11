const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
    
    console.log("Navigating to app...");
    await page.goto('https://ais-dev-wpihygq37os6gt43dum65s-733949790122.asia-southeast1.run.app', { 
      waitUntil: 'networkidle2' 
    });
    
    console.log("Done.");
    await browser.close();
  } catch (err) {
    console.error("Script Error:", err);
  }
})();
