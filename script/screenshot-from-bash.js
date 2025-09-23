// This script is called by `bin/create-screenshot.sh`.
// It takes a URL and a filename as command-line arguments.
// It launches a Playwright browser, navigates to the URL, takes a screenshot,
// and saves it to the specified filename.
const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');

(async () => {
  const url = process.argv[2] || 'http://localhost:4321';
  const path = process.argv[3] || 'screenshot.png';

  if (!url || !path) {
    console.error('Usage: node screenshot.js <url> <path>');
    process.exit(1);
  }

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // Add a small delay to be sure
    await page.waitForSelector('h1');
    await new Promise(resolve => setTimeout(resolve, 10000));

    const screenshotBuffer = await page.locator('body').screenshot();

    const stats = await sharp(screenshotBuffer).stats();
    const { entropy } = stats;

    // If the entropy is very low, the image is likely a single color (empty)
    if (entropy < 1) {
        console.error('Screenshot appears to be empty. Deleting and exiting.');
        process.exit(1);
    }

    fs.writeFileSync(path, screenshotBuffer);
    console.log(`Screenshot saved to ${path}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();