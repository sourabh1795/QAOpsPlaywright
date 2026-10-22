const { test, expect } = require('@playwright/test');
const { customtest } = require("../utils/fixtures.js");

customtest("Fixtures demo", async ({ authenticatedPage, createOrder ,testDataForOrder}) => {
    //Login to application /Create order and verify if the order is created from history page

    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible();
    console.log(testDataForOrder.productName);
    // order id

});