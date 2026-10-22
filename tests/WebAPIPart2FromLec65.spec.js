//Login UI -> .Json
//test browser-> .json, cart-, order, orderdetails, orderhistory

const { test, expect } = require('@playwright/test'); // import Playwright test and expect functions
let webContext; // declare variable to hold browser context with saved state

test.beforeAll(async({browser})=> // run before all tests
{
  const context=await browser.newContext(); // create a new browser context
  const page=await context.newPage(); // open a new page in that context

  await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app login page
  await page.locator('#userEmail').fill("4141sourabhs@gmail.com"); // fill email field
  await page.locator('#userPassword').fill("Test@123"); // fill password field
  await page.locator("[value='Login']").click(); // click login button
  await page.waitForLoadState('networkidle'); // wait until page fully loads
  await context.storageState({path: 'state.json'}); // save cookies & login session to state.json

  webContext= await browser.newContext({storageState:'state.json'}); // reuse saved login/session from state.json
})

test('Client App Login', async () => { // first test case
  const email = "4141sourabhs@gmail.com"; // declare email variable
  const productName = 'ZARA COAT 3'; // product name to search
  const page=await webContext.newPage(); // open new page with saved session
  await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app

  const products = page.locator(".card-body"); // locate product cards

  await page.locator(".card-body b").first().waitFor(); // wait until product titles are visible
  const titles = await page.locator(".card-body b").allTextContents(); // get all product titles
  console.log(titles); // log product titles

  const count = await products.count(); // count number of product cards
  console.log(count); // log product count

  for (let i = 0; i < count; i++) { // loop through products
    if (await products.nth(i).locator("b").textContent() === productName) { // check if product matches
      await products.nth(i).locator("text= Add To Cart").click(); // click Add To Cart for matching product
      break; // exit loop after adding product
    }
  }

  await page.locator("[routerlink*='cart']").click(); // click cart link
  await page.locator("div li").first().waitFor(); // wait for cart items to load
  const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); // check if product is visible in cart
  expect(bool).toBeTruthy(); // assert product is present

  await page.locator("text=Checkout").click(); // click checkout button
  await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 100 }); // type "ind" in country field
  const dropdown = page.locator(".ta-results"); // locate dropdown results
  await dropdown.waitFor(); // wait for dropdown to appear

  const optionsCount = await dropdown.locator("button").count(); // count dropdown options
  for (let i = 0; i < optionsCount; i++) { // loop through options
    const text = await dropdown.locator("button").nth(i).textContent(); // get option text
    if (text === " India") { // check if option is India
      await dropdown.locator("button").nth(i).click(); // select India
      break; // exit loop
    }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // assert user email matches
  await page.locator(".action__submit").click(); // click submit order
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assert order confirmation message
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // get order ID
  console.log(orderId); // log order ID

  await page.locator("button[routerlink*='myorders']").click(); // click My Orders
  await page.locator("tbody").waitFor(); // wait for order table
  const rows = page.locator("tbody tr"); // locate table rows

  for (let i = 0; i < await rows.count(); i++) { // loop through rows
    const rowOrderId = await rows.nth(i).locator("th").textContent(); // get order ID from row
    if (orderId.includes(rowOrderId)) { // check if matches saved order ID
      await rows.nth(i).locator("button").first().click(); // click view details button
      break; // exit loop
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent(); // get order ID from details page
  expect(orderId.includes(orderIdDetails)).toBeTruthy(); // assert IDs match
});

test('Test Case 2', async () => { // second test case
  const email = "4141sourabhs@gmail.com"; // declare email variable
  const productName = 'ZARA COAT 3'; // product name to search
  const page=await webContext.newPage(); // open new page with saved session
  await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app

  const products = page.locator(".card-body"); // locate product cards

  await page.locator(".card-body b").first().waitFor(); // wait until product titles are visible
  const titles = await page.locator(".card-body b").allTextContents(); // get all product titles
  console.log(titles); // log product titles
});
