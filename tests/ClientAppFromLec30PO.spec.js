const { test, expect } = require('@playwright/test');
const{customtest}=require('../utils/test-base'); // lect 93 changes

const { POManager } = require('../pageobjects/POManager');
//Json ->String ->JS Object
const dataset = JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json"))); // lect 92 changes
const { CartPage } = require('../pageobjects/CartPage'); // lect 91 changes
const { OrdersHistoryPage } = require('../pageobjects/OrdersHistoryPage'); // lect 91 changes
const { OrdersReviewPage } = require('../pageobjects/OrdersReviewPage'); // lect 91 changes

for(const data of dataset) //chapter 93 changes
{
test(`Client App login for ${data.productName}`, async ({ page }) => {
  const poManager = new POManager(page);
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  // Use CartPage class
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  // Use OrdersReviewPage class
  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username); // keep username check
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  // Navigate to Orders
  await dashboardPage.navigateToOrders();

  // Use OrdersHistoryPage class
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}
//lect 93 changes created new tetscase
//customtest(`@web Client App login`, async ({ page,testDataForOrder }) => //tagging the test with @web so that we can run only this test using npx playwright test --grep @web
customtest(`Client App login`, async ({ page,testDataForOrder }) => 

{
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  // Use CartPage class
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});

//test file trigger in parallel for multiple data sets
//Individual test in the file will run in sequece but the file will run in parallel with other files.
//फाईल्स → parallel चालतात //फाईलमधील टेस्ट्स → sequence मध्ये चालतात
