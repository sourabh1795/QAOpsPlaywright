# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppLec20.spec.js >> Browser Context Playwright Test
- Location: tests\ClientAppLec20.spec.js:3:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.card-body b').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]: anshika@gmail.com
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]: Iamking@000
          - button "Login" [active] [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e59]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e70]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | const {test,expect} =require('@playwright/test'); 
  2  | 
  3  | test('Browser Context Playwright Test',async({page})=> //when you don't have any context loading ,then directly you can use the page object to open the browser and go to the URL mentioned in the next line
  4  | 
  5  | {
  6  |       await page.goto('https://rahulshettyacademy.com/client/#/auth/login');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.    
  7  |       await page.locator('#userEmail').fill("anshika@gmail.com");
  8  |       await page.locator('#userPassword').fill("Iamking@000");
  9  |       await page.locator("[value='Login']").click();
  10 | 
  11 |       
  12 |       //await page.waitForLoadState('networkidle'); //meaning for this line is to wait for the page to reach a state where there are no ongoing network requests. It ensures that the page has finished loading and all necessary resources have been fetched before proceeding with the next steps in the test.
  13 |       //waitForLoadState is not a recommended approach because it may not always guarantee that the page is fully loaded, especially in cases where there are dynamic elements or asynchronous requests. It is better to use explicit waits for specific elements or conditions to ensure that the desired state is achieved before proceeding with the test.
  14 |       //also their is limitation for timeout, if the page is taking more time to load then it will throw error. So we can use waitForSelector method to wait for a specific element to be present in the DOM before proceeding with the next steps in the test. It ensures that the element is available and ready for interaction.
  15 |       
> 16 |       await page.locator(".card-body b").first().waitFor(); //meaning for this line is to locate the first element with the class 'card-body' and the tag 'b' on the web page and wait for it to be present in the DOM. It ensures that the element is available before proceeding with the next steps in the test.   
     |                                                  ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  17 |       //waitFor method only work when their locator return single element, if locator return multiple element then it will throw error. In that case we can use first() method to get the first element from the locator and then use waitFor() method on that element.
  18 | 
  19 | 
  20 |       const titles= await page.locator(".card-body b").allTextContents(); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'b' on the web page and retrieve their text contents. It allows you to extract the visible text from all matching elements and store them in an array.     
  21 |       console.log(titles); //meaning for this line is to log the array of text contents retrieved from the located elements with the class 'card-body' and the tag 'b'. It allows you to see the extracted text values in the console for verification or further analysis.
  22 | 
  23 | 
  24 | 
  25 | 
  26 | 
  27 |       
  28 | });
  29 | 
```