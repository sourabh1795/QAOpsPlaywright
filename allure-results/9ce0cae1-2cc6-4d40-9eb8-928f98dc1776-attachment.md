# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppFromLec30PO.spec.ts >> Client App login for ZARA COAT 3
- Location: tests\ClientAppFromLec30PO.spec.ts:7:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
  - generic:
    - generic:
      - alert "No Product in Your Cart" [ref=e33]
      - generic "Login Successfully" [ref=e35]
```

# Test source

```ts
  1  | //const {test, expect} = require('@playwright/test');
  2  | import{test, expect,Locator,Page} from '@playwright/test';
  3  | 
  4  | export class CartPage
  5  | {
  6  |     cartProducts:Locator;
  7  |     productsText:Locator;
  8  |     cart:Locator
  9  |     orders:Locator;
  10 |     checkout:Locator;
  11 |     page:Page;
  12 | 
  13 | constructor(page:Page)
  14 | {
  15 |     this.page = page;
  16 |     this.cartProducts = page.locator("text=My Cart");
  17 |     this.productsText = page.locator(".card-body b");
  18 |     this.cart =  page.locator("[routerlink*='cart']");
  19 |     this.orders = page.locator("button[routerlink*='myorders']");
  20 |     this.checkout = page.locator("text=Checkout");
  21 | 
  22 | }
  23 | 
  24 | async VerifyProductIsDisplayed(productName:string)
  25 | {
  26 |    
  27 |     await expect(this.cartProducts).toBeVisible();
  28 |     const bool =await this.getProductLocator(productName).isVisible();
> 29 |     expect(bool).toBeTruthy();
     |                  ^ Error: expect(received).toBeTruthy()
  30 | 
  31 | }
  32 | 
  33 | async Checkout()
  34 | {
  35 |     await this.checkout.click();
  36 | }
  37 | 
  38 |  getProductLocator(productName:string)
  39 | {
  40 |     const sanitizedProductName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  41 |     return this.page.locator("h3:has-text('" + sanitizedProductName + "')");
  42 | }
  43 | 
  44 | }
  45 | 
```