const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321');
  await page.screenshot({ path: 'random-app-ideas/130--six-nations-live-beer-counter/screenshot.png' });
  await browser.close();
})();
