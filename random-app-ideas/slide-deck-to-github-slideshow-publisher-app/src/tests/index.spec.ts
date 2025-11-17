import { test, expect } from '@playwright/test';

test('homepage has the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/git-slider/);
});
