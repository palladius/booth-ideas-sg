const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const outputPath = process.argv[3];

  if (!url || !outputPath) {
    console.error('Please provide a URL and an output path as arguments.');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: outputPath, width: 800, height: 600 });
  await browser.close();
})();