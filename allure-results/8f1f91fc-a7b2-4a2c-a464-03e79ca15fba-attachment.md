# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppFromLec30PO.spec.js >> Client App login for ZARA COAT 3
- Location: tests\ClientAppFromLec30PO.spec.js:13:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
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
        - button " Cart 1" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "1"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [aria-hidden] [ref=e25]: 
          - text: Sign Out
  - generic [ref=e26]:
    - generic [ref=e27]:
      - heading "My Cart" [level=1] [ref=e28]
      - button "Continue Shopping❯" [ref=e29] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e31]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | class CartPage
  3  | {
  4  | constructor(page)
  5  | {
  6  |     this.page = page;
  7  |     this.cartProducts = page.locator("text=My Cart");
  8  |     this.productsText = page.locator(".card-body b");
  9  |     this.cart =  page.locator("[routerlink*='cart']");
  10 |     this.orders = page.locator("button[routerlink*='myorders']");
  11 |     this.checkout = page.locator("text=Checkout");
  12 | 
  13 | }
  14 | 
  15 | async VerifyProductIsDisplayed(productName)
  16 | {
  17 |    
  18 |     await expect(this.cartProducts).toBeVisible();
> 19 |     const bool =await this.getProductLocator(productName).isVisible();
     |                  ^ Error: expect(received).toBeTruthy()
  20 |     expect(bool).toBeTruthy();
  21 | 
  22 | }
  23 | 
  24 | async Checkout()
  25 | {
  26 |     await this.checkout.click();
  27 | }
  28 | 
  29 |  getProductLocator(productName)
  30 | {
  31 |     const sanitizedProductName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  32 |     return this.page.locator("h3:has-text('" + sanitizedProductName + "')");
  33 | }
  34 | 
  35 | }
  36 | module.exports = {CartPage};
```