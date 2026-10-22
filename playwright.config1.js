// @ts-check
import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  //maximum time one test can run for
  //retries:1, //test would be run 1 time if it fails in first attempt
  //workers:1, //number of parallel workers to run the tests, 1 means tests will run in sequence
  timeout: 50 * 1000,
  expect: {
    timeout: 6000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure', // Record video for all tests in this project
        //permissions: ['geolocation'], // Grant geolocation permission to the browser context
        //ignoreHTTPSErrors: true, // Ignore HTTPS errors for all tests in this project
        //viewport: { width: 720, height: 720 }, // Set the viewport size for Chromium
        //...devices['iPhone 11'], // Use the Desktop Chrome device configuration  

      },
    },
    {
      name: 'firefox',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'firefox',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        //viewport: { width: 720, height: 720 }, // Set the viewport size for Firefox
      },
    },
    {
      name: 'edge',
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'chromium',   // Edge runs on Chromium
        channel: 'msedge',         // ✅ tells Playwright to use Microsoft Edge
        headless: true,
        screenshot: 'off',
        trace: 'on',
        //viewport: { width: 720, height: 720 }, // Set the viewport size for Edge

      },
    },
  ],
});

export default config;
