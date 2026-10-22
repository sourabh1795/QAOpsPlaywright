const {test,expect} =require('@playwright/test'); 

test('@Website Client App Login ',async({page})=> //Runs only this test, opens browser context directly

{   
    //Lecture 46 Only
    //js file-login js, dashboardpage

    const email="4141sourabhs@gmail.com"; //Declares constant email with login value
    const productName='ZARA COAT 3'; //Declares productName constant for later validation
    const products=page.locator(".card-body"); //Locates all product cards on the page

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); //Navigates to login page

    await page.getByPlaceholder("email@example.com").fill(email); //Fills email field with given email
    await page.getByPlaceholder("enter your passsword").fill("Test@123"); //Fills password field
    await page.getByRole('button',{name :"Login"}).click (); //Clicks Login button

    await page.waitForLoadState('networkidle'); //Waits until no network requests are pending
    await page.locator(".card-body b").first().waitFor(); //Waits until first product title is visible

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
      .getByRole("button", {name: "Add to Cart"}).click(); //Finds product card with ZARA COAT 3 and clicks Add to Cart

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click(); //Clicks Cart button in navigation
    await page.locator("div li").first().waitFor(); //Waits until cart items are loaded
    await expect(page.getByText("ZARA COAT 3")).toBeVisible(); //Asserts product is visible in cart

    await page.getByRole("button",{name:"Checkout"}).click(); //Clicks Checkout button

    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100}); //Types 'ind' slowly into country field
    await page.getByRole("button",{name:"India"}).nth(1).click(); //Selects India from dropdown
    await page.getByText("PLACE ORDER").click(); //Clicks Place Order button

    await expect(page.locator('.hero-primary')).toHaveText(/Thankyou for the order\./i); //Verifies order confirmation message
});
