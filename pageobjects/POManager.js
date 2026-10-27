const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { LoginPagePractise } = require('./LoginPagePractise');
const { ShopPage } = require('./ShopPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
        this.loginPagePractise = new LoginPagePractise(page);
        this.shopPage = new ShopPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getLoginPagePractise() {
        return this.loginPagePractise;
    }

    getShopPage() {
        return this.shopPage;
    }

}
module.exports = { POManager };