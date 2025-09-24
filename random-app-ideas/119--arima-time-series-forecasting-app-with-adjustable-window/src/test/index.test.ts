import { test, expect } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ARIMA Time Series Forecasting' })).toBeVisible();
});
