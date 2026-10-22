# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: NetworkTest3.spec.js >> Browser Context Playwright Test
- Location: tests\NetworkTest3.spec.js:4:1

# Error details

```
TimeoutError: locator.textContent: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[style*=\'block\']')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]: rahulshetty
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]: Learning@830$3mK2
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [active] [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { request } = require('node:http');
  3  | 
  4  | test('Browser Context Playwright Test', async ({ browser }) => {
  5  | 
  6  |   const Context = await browser.newContext();
  7  |   const page = await Context.newPage();
  8  |   //page.route("**/*.{jpg,png,jpeg}",route=>route.abort());
  9  | 
  10 |   //page.route("**/*.css",route=>route.abort());
  11 |   const userName = page.locator('#username');
  12 |   const signIn = page.locator('#signInBtn');
  13 |   const cardTitles = page.locator('.card-body a');
  14 | 
  15 |   page.on('request',request=> console.log(request.url()));
  16 |   page.on('response',response=>console.log(response.url(),response.status()));
  17 | 
  18 |   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  19 |   console.log(await page.title());
  20 | 
  21 |   await userName.fill('rahulshetty');
  22 |   await page.locator("[type='password']").fill('Learning@830$3mK2');
  23 |   await signIn.click();
  24 | 
> 25 |   console.log(await page.locator("[style*='block']").textContent());
     |                                                      ^ TimeoutError: locator.textContent: Timeout 10000ms exceeded.
  26 |   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  27 | 
  28 |   await userName.fill("");
  29 |   await userName.fill("rahulshettyacademy");
  30 |   await signIn.click();
  31 | 
  32 |   console.log(await cardTitles.first().textContent());
  33 |   console.log(await cardTitles.nth(1).textContent());
  34 | 
  35 |   const allTitles = await cardTitles.allTextContents();
  36 |   console.log(allTitles);
  37 | });
  38 | 
```