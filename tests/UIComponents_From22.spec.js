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
           await expect(page.locator('.alert-danger')).toContainText('Incorrect'); //use the explicit alert element for the failed-login message instead of a brittle style-based selector.
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
//From22 tc above is not required
test('UI Controls',async({page})=>  
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName=page.locator('#username'); 
    const signIn=page.locator('#signInBtn');
    const documentLink=page.locator("[href*='documents-request']");//meaning for this line is to locate the element with an href attribute that contains the substring 'documents-request' on the web page and assign it to the variable documentLink. It allows you to interact with that element later in the test.
    const dropdown=page.locator("select.form-control"); //meaning for this line is to locate the element with the tag 'select' and the class 'form-control' on the web page and assign it to the variable dropdown. It allows you to interact with that element later in the test.
    await dropdown.selectOption('consult'); //meaning for this line is to select the option with the value 'consult' from the dropdown element located in the previous line. It simulates selecting an option from a dropdown menu.
    //await page.pause(); //meaning for this line is to pause the execution of the test at this point, allowing you to inspect the state of the page and interact with it manually. It is useful for debugging and analyzing the behavior of the test.

    await page.locator('.radiotextsty').last().click(); //meaning for this line is to locate the last element with the class 'radiotextsty' on the web page and perform a click action on it. It simulates a user clicking the last radio button in a group of radio buttons.       
    await page.locator('#okayBtn').click(); //meaning for this line is to locate the element with the id 'okayBtn' on the web page and perform a click action on it. It simulates a user clicking the "Okay" button, which may trigger a confirmation or proceed with an action.

    //lecture 23
    //assertions
    console.log(await page.locator('.radiotextsty').last().isChecked()); //meaning for this line is to check if the last element with the class 'radiotextsty' on the web page is currently selected or checked. It returns a boolean value indicating whether the radio button is checked or not.
    await expect(page.locator('.radiotextsty').last()).toBeChecked(); //meaning for this line is to assert that the last element with the class 'radiotextsty' on the web page should be checked or selected. It verifies that the expected state of the radio button is true, indicating that it is indeed checked.

    await page.locator('#myModal').waitFor({ state: 'hidden' });
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked(); //meaning for this line is to assert that the element with the id 'terms' on the web page should be checked or selected. It verifies that the expected state of the checkbox is true, indicating that it is indeed checked.
    await page.locator('#terms').uncheck(); //meaning for this line is to locate the element with the id 'terms' on the web page and perform an uncheck action on it. It simulates a user unchecking the checkbox, indicating that they no longer agree to the terms and conditions or accept certain conditions.
    expect(await page.locator('#terms').isChecked()).toBeFalsy();//meaning for this line is to assert that the element with the id 'terms' on the web page should not be checked or selected. It verifies that the expected state of the checkbox is false, indicating that it is indeed unchecked.
    //opposite to toBeFalsy() is toBeTruthy() - meaning for this line is to assert that the element with the id 'terms' on the web page should be checked or selected. It verifies that the expected state of the checkbox is true, indicating that it is indeed checked.

    //lecture 24

    await expect(documentLink).toHaveAttribute('class','blinkingText'); //meaning for this line is to assert that the located element with the href attribute containing 'documents-request' should have the class attribute with the value 'blinkingText'. It verifies that the expected class is present on the element, indicating that it has the desired styling or behavior.


});

 //lecture 26

test('Child Windows Handle',async({browser})=>
{
    const context = await browser.newContext(); //this line is used to create a new browser context, which is an isolated environment for running tests. It allows you to have multiple independent sessions in the same browser instance.
    const page = await context.newPage();//this line is used to create a new page within the browser context. A page represents a single tab or window in the browser where you can interact with web content.
    const userName=page.locator('#username'); 

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink=page.locator("[href*='documents-request']");//meaning for this line is to locate the element with an href attribute that contains the substring 'documents-request' on the web page and assign it to the variable documentLink. It allows you to interact with that element later in the test.
    
    const [newPage] = await Promise.all([ //meaning for this line is to create a new page by waiting for the promise to resolve. It allows you to handle multiple asynchronous operations simultaneously and retrieve the newly opened page.
        context.waitForEvent('page'), //listen for any new page  pending,rejected and fulfilled//meaning for this line is to wait for a popup event to occur on the current page. It allows you to handle the opening of a new window or tab triggered by user interaction or JavaScript code.
        documentLink.click(), //meaning for this line is to perform a click action on the located element with the href attribute containing 'documents-request'. It simulates a user clicking the link, which may trigger the opening of a new window or tab.
    ]);
    //new page will opened in new tab and we are storing that new page in newPage variable
    
    const text=await newPage.locator('.red').textContent(); //meaning for this line is to locate the element with the class 'red' on the newly opened page and retrieve its text content. It allows you to extract the visible text from that element in the new page.
    const arrayText=text.split("@"); //meaning for this line is to split the retrieved text content into an array using the "@" character as the delimiter. It allows you to separate the text into different parts based on the specified delimiter.
    const domain=arrayText[1].split(" ")[0]; //meaning for this line is to access the second element of the array (index 1) and split it again using a space character as the delimiter. It allows you to extract the domain part of the email address from the text content.
    console.log(domain);

    //moving back to parent page
    await page.locator('#username').fill(domain); //meaning for this line is to locate the element with the id 'username' on the parent page and fill it with the extracted domain value. It simulates typing the domain into the input field on the parent page.
    console.log(await page.locator('#username').inputValue()); //meaning for this line is to locate the element with the id 'username' on the parent page and retrieve its text content. It allows you to extract the visible text from that element and log it to the console for verification or further analysis.

});
