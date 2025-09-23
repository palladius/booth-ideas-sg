import { test, expect } from '@playwright/test';

test('homepage has title and search bar', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BikeTrip Andermatt & Switzerland/);

  // Expects the search input to be visible
  await expect(page.locator('input[type="text"]')).toBeVisible();
});
