import {test, expect} from '@playwright/test';

test('Playwright Special Locators - Get by Label', async ({page}) => {

    //Lecture 38
    await page.goto("https://rahulshettyacademy.com/angularpractice/");// Navigate to the specified URL
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //getbylabel means it will get the element by label and click on it
    await page.getByLabel("Employed").check(); //meaning for this line is it will get the element by label and click on it
    await page.getByLabel("Gender").selectOption("Female"); //meaning for this line is it will get the element by label and select the option "Female" from the dropdown
    //npx playwright test --ui means it will open the playwright test in UI mode and you can see the test execution in UI mode
    //On edit box getByLabel it does not work because it is not a label element so we have to use getByPlaceholder to get the element by placeholder and fill the value in it

    //locator(css) we have choosen mostly 

    //Lecture 39
    await page.getByPlaceholder("Password").fill("abc123"); //getbyplaceholder means it will get the element by placeholder and fill the value "abc123" in it
    //getByPlaceholder only works if tag has placeholder attribute otherwise it will not work
    await page.getByRole("button", {name: "Submit"}).click(); //getbyrole means it will get the element by role and click on it
    //getbyrole get all the buttons and then click on the button which has name "Submit"

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //getbytext means it will get the element by text and check if it is visible or not
    
    //Lecture 41
    // it depends on playwright config .json only 6 seconds defaul i have mentioned in that file timeout for expect assertions but for this below assertion {timeout :10_000} for step level only
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout :10_000}); // Locate the success message by its text and verify that it becomes visible within 10 seconds
    
    await page.getByRole("link", {name: "Shop"}).click(); //This finds a link element with the accessible name “Shop” and clicks it. It’s how you navigate to the Shop section of the site.
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();//meaning for this This first locates all app-card elements, filters them to the one containing the text “Nokia Edge”, then finds the button inside that card and clicks it. It’s a precise way to interact with a specific product card.
    
    //await page.pause(); //pause the execution of the test


});

//lecture 42 //copy all code from above
test('Playwright Test level time out', async ({page}) => {

    test.setTimeout(60000);// meaning Test-level timeout (whole test must finish within 60s).
    const slowExpect= expect.configure({timeout: 9000 }); //// custom expect with 9s timeout for only this tetscase

    page.setDefaultTimeout(9000);// // Sets 9s default timeout for all actions/assertions on this page.
    
    await page.goto("https://rahulshettyacademy.com/angularpractice/");// Navigate to the specified URL
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //getbylabel means it will get the element by label and click on it
    await page.getByLabel("Employed").check(); //meaning for this line is it will get the element by label and click on it
    await page.getByLabel("Gender").selectOption("Female"); //meaning for this line is it will get the element by label and select the option "Female" from the dropdown
    //npx playwright test --ui means it will open the playwright test in UI mode and you can see the test execution in UI mode
    //On edit box getByLabel it does not work because it is not a label element so we have to use getByPlaceholder to get the element by placeholder and fill the value in it

    //locator(css) we have choosen mostly 

    await page.getByPlaceholder("Password").fill("abc123"); //getbyplaceholder means it will get the element by placeholder and fill the value "abc123" in it
    //getByPlaceholder only works if tag has placeholder attribute otherwise it will not work
    await page.getByRole("button", {name: "Submit"}).click(); //getbyrole means it will get the element by role and click on it
    //getbyrole get all the buttons and then click on the button which has name "Submit"

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //getbytext means it will get the element by text and check if it is visible or not
    
    // it depends on playwright config .json only 6 seconds defaul i have mentioned in that file timeout for expect assertions but for this below assertion {timeout :10_000} for step level only
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); //
    
    //respect first Global->test->Steps
    await page.getByRole("link", {name: "Shop"}).click({timeout:15000}); //This finds a link element with the accessible name “Shop” and clicks it. It’s how you navigate to the Shop section of the site./ Clicks the "Shop" link, waiting up to 15s for it to be ready.
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name"); // assert first element with class .my-4 has text "Shop"
    
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();//meaning for this This first locates all app-card elements, filters them to the one containing the text “Nokia Edge”, then finds the button inside that card and clicks it. It’s a precise way to interact with a specific product card.
    
    //await page.pause(); //pause the execution of the test


});