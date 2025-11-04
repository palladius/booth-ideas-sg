import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await expect(page).toHaveTitle(/Agents of Arrosticini/);
});
