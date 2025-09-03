const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'ideas-app/screenshot.png', width: 800, height: 600 });
  await browser.close();
})();
