# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebAPIPart2FromLec65.spec.js >> Client App Login
- Location: tests\WebAPIPart2FromLec65.spec.js:22:1

# Error details

```
Error: page.waitForLoadState: Target page, context or browser has been closed
```

# Test source

```ts
  1  | //Login UI -> .Json
  2  | //test browser-> .json, cart-, order, orderdetails, orderhistory
  3  | 
  4  | const { test, expect } = require('@playwright/test'); // import Playwright test and expect functions
  5  | let webContext; // declare variable to hold browser context with saved state
  6  | 
  7  | test.beforeAll(async({browser})=> // run before all tests
  8  | {
  9  |   const context=await browser.newContext(); // create a new browser context
  10 |   const page=await context.newPage(); // open a new page in that context
  11 | 
  12 |   await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app login page
  13 |   await page.locator('#userEmail').fill("4141sourabhs@gmail.com"); // fill email field
  14 |   await page.locator('#userPassword').fill("Test@123"); // fill password field
  15 |   await page.locator("[value='Login']").click(); // click login button
> 16 |   await page.waitForLoadState('networkidle'); // wait until page fully loads
     |              ^ Error: page.waitForLoadState: Target page, context or browser has been closed
  17 |   await context.storageState({path: 'state.json'}); // save cookies & login session to state.json
  18 | 
  19 |   webContext= await browser.newContext({storageState:'state.json'}); // reuse saved login/session from state.json
  20 | })
  21 | 
  22 | test('Client App Login', async () => { // first test case
  23 |   const email = "4141sourabhs@gmail.com"; // declare email variable
  24 |   const productName = 'ZARA COAT 3'; // product name to search
  25 |   const page=await webContext.newPage(); // open new page with saved session
  26 |   await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app
  27 | 
  28 |   const products = page.locator(".card-body"); // locate product cards
  29 | 
  30 |   await page.locator(".card-body b").first().waitFor(); // wait until product titles are visible
  31 |   const titles = await page.locator(".card-body b").allTextContents(); // get all product titles
  32 |   console.log(titles); // log product titles
  33 | 
  34 |   const count = await products.count(); // count number of product cards
  35 |   console.log(count); // log product count
  36 | 
  37 |   for (let i = 0; i < count; i++) { // loop through products
  38 |     if (await products.nth(i).locator("b").textContent() === productName) { // check if product matches
  39 |       await products.nth(i).locator("text= Add To Cart").click(); // click Add To Cart for matching product
  40 |       break; // exit loop after adding product
  41 |     }
  42 |   }
  43 | 
  44 |   await page.locator("[routerlink*='cart']").click(); // click cart link
  45 |   await page.locator("div li").first().waitFor(); // wait for cart items to load
  46 |   const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible(); // check if product is visible in cart
  47 |   expect(bool).toBeTruthy(); // assert product is present
  48 | 
  49 |   await page.locator("text=Checkout").click(); // click checkout button
  50 |   await page.locator("[placeholder*='Select Country']").pressSequentially("ind", { delay: 100 }); // type "ind" in country field
  51 |   const dropdown = page.locator(".ta-results"); // locate dropdown results
  52 |   await dropdown.waitFor(); // wait for dropdown to appear
  53 | 
  54 |   const optionsCount = await dropdown.locator("button").count(); // count dropdown options
  55 |   for (let i = 0; i < optionsCount; i++) { // loop through options
  56 |     const text = await dropdown.locator("button").nth(i).textContent(); // get option text
  57 |     if (text === " India") { // check if option is India
  58 |       await dropdown.locator("button").nth(i).click(); // select India
  59 |       break; // exit loop
  60 |     }
  61 |   }
  62 | 
  63 |   expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // assert user email matches
  64 |   await page.locator(".action__submit").click(); // click submit order
  65 |   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // assert order confirmation message
  66 |   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // get order ID
  67 |   console.log(orderId); // log order ID
  68 | 
  69 |   await page.locator("button[routerlink*='myorders']").click(); // click My Orders
  70 |   await page.locator("tbody").waitFor(); // wait for order table
  71 |   const rows = page.locator("tbody tr"); // locate table rows
  72 | 
  73 |   for (let i = 0; i < await rows.count(); i++) { // loop through rows
  74 |     const rowOrderId = await rows.nth(i).locator("th").textContent(); // get order ID from row
  75 |     if (orderId.includes(rowOrderId)) { // check if matches saved order ID
  76 |       await rows.nth(i).locator("button").first().click(); // click view details button
  77 |       break; // exit loop
  78 |     }
  79 |   }
  80 | 
  81 |   const orderIdDetails = await page.locator(".col-text").textContent(); // get order ID from details page
  82 |   expect(orderId.includes(orderIdDetails)).toBeTruthy(); // assert IDs match
  83 | });
  84 | 
  85 | test('Test Case 2', async () => { // second test case
  86 |   const email = "4141sourabhs@gmail.com"; // declare email variable
  87 |   const productName = 'ZARA COAT 3'; // product name to search
  88 |   const page=await webContext.newPage(); // open new page with saved session
  89 |   await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app
  90 | 
  91 |   const products = page.locator(".card-body"); // locate product cards
  92 | 
  93 |   await page.locator(".card-body b").first().waitFor(); // wait until product titles are visible
  94 |   const titles = await page.locator(".card-body b").allTextContents(); // get all product titles
  95 |   console.log(titles); // log product titles
  96 | });
  97 | 
```