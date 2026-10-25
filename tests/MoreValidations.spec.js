const { test, expect } = require('@playwright/test')

//test.describe.configure({ mode: 'parallel' })//meaning it will run the tests in parallel mode //lecture 101
//test.describe.configure({ mode: 'serial' })//meaning it will run the tests in serial mode if first test fails then all subsequent tests will be skipped//lecture 101
test('Popup Validations', async ({ page }) => {

    //lecture 52
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com/');
    // await page.goBack(); //meaning it will go back to the previous page which is AutomationPractice page
    // await page.goForward(); //meaning it will go forward to the next page which is google.com

    await expect(page.locator("#displayed-text")).toBeVisible();//meaning it will check if the element is visible or not
    await page.locator("#hide-textbox").click();//meaning it will click on the hide button
    await expect(page.locator("#displayed-text")).toBeHidden();//meaning it will check if the element is hidden or not

    //lecture 53

    await page.on('dialog', dialog => dialog.accept());//meaning it will accept the alert popup;
    // await page.on('dialog', dialog=>dialog.dismiss());//meaning it will dismiss the alert popup;

    await page.locator("#confirmbtn").click();//meaning it will click on the confirm button which will trigger the alert popup but alert popup will be accepted because of the above line of code
    await page.locator("#mousehover").hover();//meaning it will hover over the mouse on the mousehover button

    //lecture 54
    const framesPage = page.frameLocator("#courses-iframe");//meaning it will locate the iframe with the id of courses-iframe
    //imp thing is that when we are working on iframe you need to open the iframe first and then you can perform any action on the elements inside the iframe // ihave first got to https://legacy.rahulshettyacademy.com/ this iframe and then i can perform any action on the elements inside the iframe
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();//meaning it will click on the link with the text of "lifetime access" which is visible in the iframe 
    const textCheck = await framesPage.locator(".text h2").textContent();//meaning it will get the text content of the element with the class of text and the tag of h2 in the iframe
    console.log(textCheck.split(" ")[1]);//meaning it will split the text content by space and get the second word which is the price of the course


})

//lecture 77
test("Screenshot & Visual Comparision", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialscreenshot.png'});//locator level screenshot
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});//page level screenshot
    await expect(page.locator("#displayed-text")).toBeHidden();

});

//lecture 78
//Screenshot day1->store-> screenshot day2->compare

test("Visual Testing",async({page})=>
{
    test.skip(
        process.env.CI === 'true' || process.env.PLAYWRIGHT_UPDATE_SNAPSHOTS !== '1',
        'Visual snapshot baseline is not committed for this repo; set PLAYWRIGHT_UPDATE_SNAPSHOTS=1 to create the baseline.'
    );
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})
