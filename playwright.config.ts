import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8888',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
  },
  webServer: {
    command: 'npm run netlify-dev',
    url: 'http://localhost:8888',
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
});
