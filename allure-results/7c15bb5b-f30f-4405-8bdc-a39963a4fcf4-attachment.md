# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWayLec46.spec.js >> @Website Client App Login 
- Location: tests\ClientAppOtherWayLec46.spec.js:3:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test,expect} =require('@playwright/test'); 
  2  | 
  3  | test('@Website Client App Login ',async({page})=> //Runs only this test, opens browser context directly
  4  | 
  5  | {   
  6  |     //Lecture 46 Only
  7  |     //js file-login js, dashboardpage
  8  | 
  9  |     const email="4141sourabhs@gmail.com"; //Declares constant email with login value
  10 |     const productName='ZARA COAT 3'; //Declares productName constant for later validation
  11 |     const products=page.locator(".card-body"); //Locates all product cards on the page
  12 | 
  13 |     await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); //Navigates to login page
  14 | 
  15 |     await page.getByPlaceholder("email@example.com").fill(email); //Fills email field with given email
  16 |     await page.getByPlaceholder("enter your passsword").fill("Test@123"); //Fills password field
  17 |     await page.getByRole('button',{name :"Login"}).click (); //Clicks Login button
  18 | 
  19 |     await page.waitForLoadState('networkidle'); //Waits until no network requests are pending
  20 |     await page.locator(".card-body b").first().waitFor(); //Waits until first product title is visible
  21 | 
  22 |     await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
  23 |       .getByRole("button", {name: "Add to Cart"}).click(); //Finds product card with ZARA COAT 3 and clicks Add to Cart
  24 | 
  25 |     await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click(); //Clicks Cart button in navigation
> 26 |     await page.locator("div li").first().waitFor(); //Waits until cart items are loaded
     |                                          ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  27 |     await expect(page.getByText("ZARA COAT 3")).toBeVisible(); //Asserts product is visible in cart
  28 | 
  29 |     await page.getByRole("button",{name:"Checkout"}).click(); //Clicks Checkout button
  30 | 
  31 |     await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100}); //Types 'ind' slowly into country field
  32 |     await page.getByRole("button",{name:"India"}).nth(1).click(); //Selects India from dropdown
  33 |     await page.getByText("PLACE ORDER").click(); //Clicks Place Order button
  34 | 
  35 |     await expect(page.locator('.hero-primary')).toHaveText(/Thankyou for the order\./i); //Verifies order confirmation message
  36 | });
  37 | 
```