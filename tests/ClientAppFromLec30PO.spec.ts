import{test, expect,Locator,Page} from '@playwright/test';
import{customtest} from '../utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';
const dataset = JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")));

for (const data of dataset) {
  test(`Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    await expect(page.locator(".user__name input[type='text']").first()).toHaveValue(data.username);

    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    if (orderId === null) {
      throw new Error('Order ID was not returned');
    }
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const historyOrderId = await ordersHistoryPage.getOrderId();
    if (historyOrderId === null) {
      throw new Error('Order ID was not found in order history');
    }
    expect(orderId.includes(historyOrderId)).toBeTruthy();
  });
}

customtest(`Client App login`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});
