import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/D&D Character Sheet Generator/);
  const rollButton = page.locator('button:has-text("Roll for Ability Scores")');
  await expect(rollButton).toBeVisible();
});
