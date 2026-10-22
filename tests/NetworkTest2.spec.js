const { test, expect } = require('@playwright/test');

test("Security test request intercept", async ({ page }) => {

    //login and reach order page
    await page.goto("https://rahulshettyacademy.com/client"); // Navigate to the client app
    await page.locator("#userEmail").fill("4141sourabhs@gmail.com"); // Fill in user email
    await page.locator("#userPassword").fill("Test@123"); // Fill in user password
    await page.locator("[value='Login']").click(); // Click the Login button
    await page.waitForLoadState('networkidle'); // Wait until page load settles (can hang if background requests continue)
    await page.locator(".card-body b").first().waitFor(); // Wait for first product card to appear (dashboard ready)
    await page.locator("button[routerlink*='myorders']").click(); // Click on "My Orders" button

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=87887" })); // Intercept order details API and redirect to fixed ID
    await page.locator("button:has-text('View')").first().click(); // Click the first "View" button to trigger intercepted request
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order"); // Assert unauthorized message is displayed
});
