const {test,expect} =require('@playwright/test'); //module

test('Browser Context Playwright Test',async({browser})=>  //test annocation is coming from playwright test module pacqkage
{
      //chrome - plugins/cookies //meaning for this line is to open the browser and go to the URL mentioned in the next line
           const Context = await browser.newContext(); //this line is used to create a new browser context, which is an isolated environment for running tests. It allows you to have multiple independent sessions in the same browser instance.
           const page= await Context.newPage(); //this line is used to create a new page within the browser context. A page represents a single tab or window in the browser where you can interact with web content.
           await page.goto('https://rahulshettyacademy.com/loginpagePractise/');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.
           console.log(await page.title());

           //css 2 method to sendkeys type and fill we are using fill because type is deprecated method

           await page.locator('#username').fill('rahulshetty'); //meaning for this line is to locate the element with the id 'username' on the web page and fill it with the specified value 'rahulshettyacademy'. It simulates typing into the input field.
           await page.locator("[type='password']").fill('Learning@830$3mK2');
           await page.locator('#signInBtn').click();

           console.log(await page.locator("[style*='block']").textContent()); //meaning for this line is to locate the element with a style attribute that contains the value 'block' on the web page and retrieve its text content. It allows you to extract the visible text from that element.
           //[style*='block'] Use this partial match selector to locate elements based on a specific style attribute value. In this case, it selects elements whose style attribute contains the substring 'block'. This can be useful when you want to target elements with specific styling characteristics.
           await expect(page.locator("[style*='block']")).toContainText('Incorrect'); //meaning for this line is to assert that the located element with a style attribute containing 'block' should contain the text 'Incorrect'. It verifies that the expected text is present in the element, indicating that the login attempt was unsuccessful.
           //await expect(page.locator("[style*='block']")).toContainText('Incorrectfr');
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
//“An anonymous function is a function without a name, often used as a callback or inline function. In JavaScript, arrow functions are anonymous by default.”