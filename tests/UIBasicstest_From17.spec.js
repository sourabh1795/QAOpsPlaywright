const {test,expect} =require('@playwright/test'); //module

test('Browser Context Playwright Test',async({browser})=>  //test annocation is coming from playwright test module pacqkage
{

      //chrome - plugins/cookies //meaning for this line is to open the browser and go to the URL mentioned in the next line
           

           const Context = await browser.newContext(); //this line is used to create a new browser context, which is an isolated environment for running tests. It allows you to have multiple independent sessions in the same browser instance.
           const page= await Context.newPage(); //this line is used to create a new page within the browser context. A page represents a single tab or window in the browser where you can interact with web content.
           await page.goto('https://rahulshettyacademy.com/loginpagePractise/');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.
           console.log(await page.title());

           // Define locators AFTER page is initialized
            const userName=page.locator('#username'); //meaning for this line is to locate the element with the id 'username' on the web page and assign it to the variable userName. It allows you to interact with that element later in the test.
            const signIn=page.locator('#signInBtn'); //meaning for this line is to locate the element with the id 'signInBtn' on the web page and assign it to the variable signIn. It allows you to interact with that element later in the test.
            const cardTitles=page.locator('.card-body a'); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'a' on the web page and assign them to the variable cardTitles. It allows you to interact with those elements later in the test.
           //css 2 method to sendkeys type and fill we are using fill because type is deprecated method

           await userName.fill('rahulshetty'); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with the specified value 'rahulshettyacademy'. It simulates typing into the input field.
           await page.locator("[type='password']").fill('Learning@830$3mK2');
           await signIn.click();

           console.log(await page.locator("[style*='block']").textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element.
           //[style*='block'] Use this partial match selector to locate elements based on a specific style attribute value. In this case, it selects elements whose style attribute contains the substring 'block'. This can be useful when you want to target elements with specific styling characteristics.
           await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //meaning for this line is to assert that the located element with a style attribute containing 'block' should contain the text 'Incorrect'. It verifies that the expected text is present in the element, indicating that the login attempt was unsuccessful.
           //await expect(page.locator("[style*='block']")).toContainText('Incorrectfr');

           await userName.fill(""); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with an empty string. It effectively clears the input field, removing any previously entered value. This can be useful when you want to reset the input field before entering a new value or performing further actions in the test.
           await userName.fill("rahulshettyacademy"); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with the specified value 'rahulshettyacademy'. It simulates typing into the input field.
           await signIn.click(); //meaning for this line is to locate the element with the id 'signInBtn' on the web page and perform a click action on it. It simulates a user clicking the sign-in button, triggering the login process.npx playwright test tests/UIBasicstest.spec.js

          console.log(await cardTitles.first().textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element
          console.log(await cardTitles.nth(1).textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element
          //lecture 18
          const allTitles= await cardTitles.allTextContents(); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'a' on the web page and retrieve their text contents. It allows you to extract the visible text from all matching elements and store them in an array.
          console.log(allTitles); //meaning for this line is to log the array of text contents retrieved from the located elements with the class 'card-body' and the tag 'a'. It allows you to see the extracted text values in the console for verification or further analysis.
          //if we used allTextContents() method directly without accessing the locator it would throw [] zero array because the locator is not yet initialized and does not have any elements to retrieve text from. The allTextContents() method needs to be called on a locator that has been properly initialized and has matching elements in order to return the text contents of those elements.
          
        });

test('Page Playwright Test',async({page})=>  //test annocation is coming from playwright test module pacqkage
//test.only - to run single test
{
           await page.goto('https://google.com');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.
           //get Title - Assertion
           console.log(await page.title());
           await expect(page).toHaveTitle("Google");

});

//An anonymous function has no name is called as arrow function. Arrow functions are a more concise syntax for writing function expressions in JavaScript. They are often used for callbacks and functional programming patterns.
//“An anonymous function is a function without a name, often used as a callback or inline function. In JavaScript, arrow functions are anonymous by default.”s