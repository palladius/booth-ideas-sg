// This script is called by `bin/create-screenshot.sh`.
// It takes an app path, screenshot width, and height as command-line arguments.
// It launches a Playwright browser, navigates to localhost:3000, takes a screenshot,
// and saves it to the specified app path.
const { chromium } = require('playwright');

(async () => {
  const screenshotWidth = parseInt(process.argv[2]) || 1024;
  const screenshotHeight = parseInt(process.argv[3]) || 768;

  const screenshotPath = `screenshot.png`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: screenshotPath, width: screenshotWidth, height: screenshotHeight });
  await browser.close();
})();
