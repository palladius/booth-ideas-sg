import { test, expect } from '@playwright/test';

test('take screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/D&D Character Sheet Generator/);
  await page.screenshot({ path: 'screenshot.png' });
});
