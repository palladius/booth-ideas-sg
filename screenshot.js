const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const path = process.argv[3];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //await page.goto('http://localhost:4321');
  //await page.screenshot({ path: 'random-app-ideas/colorful-dark-green-calendar-app/screenshot.png' }); 
  await page.screenshot({ path: path, width: 800, height: 600 });
  await browser.close();
})();