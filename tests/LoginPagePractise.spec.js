const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test('Login to practice page and verify iPhone X is available', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPagePractise();

    await loginPage.goTo();
    await loginPage.validLogin('rahulshettyacademy', 'Learning@830$3mK2');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await poManager.getShopPage().verifyProductIsDisplayed('iphone X');
});
