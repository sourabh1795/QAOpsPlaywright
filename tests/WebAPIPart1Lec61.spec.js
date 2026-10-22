const { test, expect, request } = require('@playwright/test'); //Imports Playwright test functions and the API request fixture.
const ApiUtils = require('../utils/ApiUtils'); //Imports the helper class that performs login and order API calls.
const loginPayload = { userEmail: "4141sourabhs@gmail.com", userPassword: "Test@123" }; //Stores the credentials sent to the login API.
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }; //Stores the order data sent to the create-order API.

let token; //Declares a token variable for possible authentication data.
let orderID; //Declares an order ID variable for possible order data.
let response; //Stores the token and order ID returned by the API helper.

test.beforeAll(async () => { //Runs the setup once before the test starts.
  const apiContext = await request.newContext(); //Creates an isolated context for API requests.
  const apiUtils = new ApiUtils(apiContext, loginPayload); //Creates the API helper with the request context and credentials.
  response = await apiUtils.createOrder(orderPayload); //Logs in, creates the order, and waits for the returned data.
}); //Ends the beforeAll setup hook.


test('Place the order @API', async ({ page }) => { //Defines the test that verifies the created order in the UI.


  await page.addInitScript(value => { //Registers a script that runs before the application loads.
    window.localStorage.setItem('token', value); //Stores the API token so the browser is authenticated.
  }, response.token); //Passes the token returned by the API helper into the setup script.

  await page.goto("https://rahulshettyacademy.com/client"); //Opens the e-commerce client application.
  await page.locator("button[routerlink*='myorders']").click(); //Opens the user's order history page.
  await page.locator("tbody").waitFor(); //Waits until the order table is available.

  const rows = page.locator("tbody tr"); //Locates every order row in the order history table.
  for (let i = 0; i < await rows.count(); i++) { //Checks each order row until the created order is found.
    const rowOrderId = await rows.nth(i).locator("th").textContent(); //Reads the order ID from the current row.

    if (response.orderID.includes(rowOrderId)) { //Checks whether the current row contains the created order ID.
      await rows.nth(i).locator("button").first().click(); //Opens the details for the matching order.
      break; //Stops searching after the matching order is opened.
    } //Ends the matching-order condition.
  } //Ends the loop through the order rows.

  const orderIdDetails = await page.locator(".col-text").textContent(); //Reads the order ID displayed on the details page.
  expect(response.orderID.includes(orderIdDetails)).toBeTruthy(); //Verifies that the displayed order ID matches the API order ID.
}); //Ends the order verification test.