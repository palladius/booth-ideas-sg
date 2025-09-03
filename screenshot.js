const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'cuckoo-clock-app/screenshot-800x600.png', clip: { x: 0, y: 0, width: 800, height: 600 } });
  await browser.close();
})();
