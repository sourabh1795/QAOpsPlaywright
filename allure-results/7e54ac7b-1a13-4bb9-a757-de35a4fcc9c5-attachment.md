# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasicstest_From17.spec.js >> Browser Context Playwright Test
- Location: tests\UIBasicstest_From17.spec.js:3:1

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://rahulshettyacademy.com/loginpagePractise/", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
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
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | const {test,expect} =require('@playwright/test'); //module
  2  | 
  3  | test('Browser Context Playwright Test',async({browser})=>  //test annocation is coming from playwright test module pacqkage
  4  | {
  5  | 
  6  |       //chrome - plugins/cookies //meaning for this line is to open the browser and go to the URL mentioned in the next line
  7  |            
  8  | 
  9  |            const Context = await browser.newContext(); //this line is used to create a new browser context, which is an isolated environment for running tests. It allows you to have multiple independent sessions in the same browser instance.
  10 |            const page= await Context.newPage(); //this line is used to create a new page within the browser context. A page represents a single tab or window in the browser where you can interact with web content.
> 11 |            await page.goto('https://rahulshettyacademy.com/loginpagePractise/');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.
     |                       ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  12 |            console.log(await page.title());
  13 | 
  14 |            // Define locators AFTER page is initialized
  15 |             const userName=page.locator('#username'); //meaning for this line is to locate the element with the id 'username' on the web page and assign it to the variable userName. It allows you to interact with that element later in the test.
  16 |             const signIn=page.locator('#signInBtn'); //meaning for this line is to locate the element with the id 'signInBtn' on the web page and assign it to the variable signIn. It allows you to interact with that element later in the test.
  17 |             const cardTitles=page.locator('.card-body a'); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'a' on the web page and assign them to the variable cardTitles. It allows you to interact with those elements later in the test.
  18 |            //css 2 method to sendkeys type and fill we are using fill because type is deprecated method
  19 | 
  20 |            await userName.fill('rahulshetty'); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with the specified value 'rahulshettyacademy'. It simulates typing into the input field.
  21 |            await page.locator("[type='password']").fill('Learning@830$3mK2');
  22 |            await signIn.click();
  23 | 
  24 |            console.log(await page.locator("[style*='block']").textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element.
  25 |            //[style*='block'] Use this partial match selector to locate elements based on a specific style attribute value. In this case, it selects elements whose style attribute contains the substring 'block'. This can be useful when you want to target elements with specific styling characteristics.
  26 |            await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //meaning for this line is to assert that the located element with a style attribute containing 'block' should contain the text 'Incorrect'. It verifies that the expected text is present in the element, indicating that the login attempt was unsuccessful.
  27 |            //await expect(page.locator("[style*='block']")).toContainText('Incorrectfr');
  28 | 
  29 |            await userName.fill(""); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with an empty string. It effectively clears the input field, removing any previously entered value. This can be useful when you want to reset the input field before entering a new value or performing further actions in the test.
  30 |            await userName.fill("rahulshettyacademy"); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with the specified value 'rahulshettyacademy'. It simulates typing into the input field.
  31 |            await signIn.click(); //meaning for this line is to locate the element with the id 'signInBtn' on the web page and perform a click action on it. It simulates a user clicking the sign-in button, triggering the login process.npx playwright test tests/UIBasicstest.spec.js
  32 | 
  33 |           console.log(await cardTitles.first().textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element
  34 |           console.log(await cardTitles.nth(1).textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element
  35 |           //lecture 18
  36 |           const allTitles= await cardTitles.allTextContents(); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'a' on the web page and retrieve their text contents. It allows you to extract the visible text from all matching elements and store them in an array.
  37 |           console.log(allTitles); //meaning for this line is to log the array of text contents retrieved from the located elements with the class 'card-body' and the tag 'a'. It allows you to see the extracted text values in the console for verification or further analysis.
  38 |           //if we used allTextContents() method directly without accessing the locator it would throw [] zero array because the locator is not yet initialized and does not have any elements to retrieve text from. The allTextContents() method needs to be called on a locator that has been properly initialized and has matching elements in order to return the text contents of those elements.
  39 |           
  40 |         });
  41 | 
  42 | test('Page Playwright Test',async({page})=>  //test annocation is coming from playwright test module pacqkage
  43 | //test.only - to run single test
  44 | {
  45 |            await page.goto('https://google.com');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.
  46 |            //get Title - Assertion
  47 |            console.log(await page.title());
  48 |            await expect(page).toHaveTitle("Google");
  49 | 
  50 | });
  51 | 
  52 | //An anonymous function has no name is called as arrow function. Arrow functions are a more concise syntax for writing function expressions in JavaScript. They are often used for callbacks and functional programming patterns.
  53 | //“An anonymous function is a function without a name, often used as a callback or inline function. In JavaScript, arrow functions are anonymous by default.”s
```