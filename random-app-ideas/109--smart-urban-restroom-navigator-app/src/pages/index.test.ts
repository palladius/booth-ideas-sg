import { test, expect } from '@playwright/test';

test('homepage has title and displays restrooms', async ({ page }) => {
  await page.goto('http://localhost:4321');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Smart Urban Restroom Navigator/);

  // Expect the restrooms to be visible.
  await expect(page.getByText('Restroom A')).toBeVisible();
  await expect(page.getByText('Restroom B')).toBeVisible();
  await expect(page.getByText('Restroom C')).toBeVisible();
});
