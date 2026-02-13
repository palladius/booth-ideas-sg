import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
  testDir: 'src',
});
