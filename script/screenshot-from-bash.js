// This script is called by `bin/create-screenshot.sh`.
// It takes a URL and a filename as command-line arguments.
// It launches a Playwright browser, navigates to the URL, takes a screenshot,
// and saves it to the specified filename.
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const screenshotPath = process.argv[3] || 'screenshot.png';

  if (!url) {
    console.error('Please provide a URL as the first argument.');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: screenshotPath });
  await browser.close();
})();