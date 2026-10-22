const { test, expect, request } = require('@playwright/test'); // Import Playwright test functions and fixtures.
const ApiUtils = require('../utils/ApiUtils'); // Import custom utility class for login and order API calls.

const loginPayload = { userEmail: "4141sourabhs@gmail.com", userPassword: "Test@123" }; // Credentials used for login API.
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }; // Order data sent to create-order API.
const fakePayloadOrders = { data: [], message: "No Orders" }; // Fake response payload to simulate no orders.

let token; // Variable reserved for authentication token (not used directly here).
let orderID; // Variable reserved for order ID (not used directly here).
let response; // Stores the API response returned by ApiUtils.

test.beforeAll(async () => { // Setup hook that runs once before all tests.
  const apiContext = await request.newContext(); // Create isolated API request context.
  const apiUtils = new ApiUtils(apiContext, loginPayload); // Initialize API helper with context and credentials.
  response = await apiUtils.createOrder(orderPayload); // Perform login + order creation, store response.
});

test('Place the order', async ({ page }) => { // Define UI test case.
  await page.addInitScript(value => { // Inject script before app loads.
    window.localStorage.setItem('token', value); // Save token in browser localStorage for authentication.
  }, response.token); // Pass token from API response.

  await page.goto("https://rahulshettyacademy.com/client"); // Navigate to client application.

  // This scenario simulates a case where the application has no orders.
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", // Intercept API call for orders.
    async route => {
      const response = await page.request.fetch(route.request()); // Fetch original response from server.
      let body = JSON.stringify(fakePayloadOrders); // Replace body with fake "No Orders" payload.
      route.fulfill({ response, body }); // Fulfill intercepted request with modified response.
      // Intercepting API response -> Playwright fake response -> Browser renders fake data on UI.
    });

  await page.locator("button[routerlink*='myorders']").click(); // Click "My Orders" button to view orders.

  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); 
  // Wait until the intercepted API response is processed.
  // Note: the `*` here is a wildcard — it matches any characters (like dynamic customer IDs) at the end of the URL.

  console.log(await page.locator(".mt-4").textContent()); // Log the UI message (should show "No Orders").
  // await page.pause(); // Debugging pause (remove in production tests).
});
