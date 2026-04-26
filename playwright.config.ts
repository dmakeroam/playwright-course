import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,      // 30 seconds per test
  retries: 1,          // retry once on failure
  reporter: [['html'], ['allure-playwright']],
  use: {
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
  projects: [
    {
      name: 'DummyJSON API',
      testMatch: 'tests/dummyjson/**/*.spec.ts',
      use: { baseURL: 'https://dummyjson.com' },
    },
    {
      name: 'Pet Store API',
      testMatch: 'tests/petstore/**/*.spec.ts',
      use: { baseURL: 'https://petstore.swagger.io' },
    },
  ],
});
