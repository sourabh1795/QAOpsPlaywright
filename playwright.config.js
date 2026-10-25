// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({ //key value pair is used to define the configuration settings for Playwright tests. It allows you to customize various aspects of the test execution, such as test directory, timeouts, reporters, and browser settings.

  testDir: './tests',

  workers: process.env.CI ? 1 : undefined,

  timeout : 50 * 1000, //used to set time for the test to wait for a certain condition to be met before proceeding with the test. It helps in handling asynchronous operations and ensures that the expected state is achieved within the specified time frame.

  expect: {  //used to set time for the expect assertion to wait for a certain condition to be met before proceeding with the test. It helps in handling asynchronous operations and ensures that the expected state is achieved within the specified time frame.
    timeout: 6000,
  },

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {

    // Global timeout for each action (click, fill, goto, etc.)
    actionTimeout: 10 * 1000,        // 10 seconds

    // Global timeout for navigation actions (page.goto, page.reload, etc.)
    navigationTimeout: 30 * 1000,    // 30 seconds
    
    //browserName: 'firefox', //used to specify the browser to be used for running the tests. In this case, it is set to 'chromium', which means that the tests will be executed in the Chromium browser. Playwright supports multiple browsers, and you can choose the desired browser for your tests.
    browserName: 'chromium',
    //browserName: 'webkit',
    headless: process.env.CI ? true : false,
  
    screenshot:'on', //Screenshots will be automatically captured for every test step.
    
    trace: 'on' //if we add on option here then traces for all tests // if add 'retain-on-failure'' It tells Playwright to keep the trace file only when a test fails.



    //trace : 'on', //Playwright records a trace file for every test, which includes screenshots, DOM snapshots, network activity, console logs, etc.
  },


});

module.exports =config //used to export the configuration object so that it can be imported and used in other files. This allows for modularity and reusability of the configuration settings across different test files or projects.
