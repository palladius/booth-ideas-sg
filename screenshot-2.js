const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321');
  await page.screenshot({ path: 'random-app-ideas/colorful-dark-green-calendar-app/screenshot.png', width: 800, height: 600 });
  await browser.close();
})();
