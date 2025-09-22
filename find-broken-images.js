
const { chromium } = require('playwright');
const http = require('http');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const brokenImages = [];
  page.on('response', async (response) => {
    if (response.request().resourceType() === 'image') {
      if (!response.ok()) {
        brokenImages.push(response.url());
      }
    }
  });

  await page.goto('http://localhost:8001', { waitUntil: 'networkidle' });

  console.log('Broken images:', brokenImages);

  await browser.close();
})();
