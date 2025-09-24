import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:9999/');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();