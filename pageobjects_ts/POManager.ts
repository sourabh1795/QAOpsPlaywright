//const { LoginPage } = require('./LoginPage');
import {LoginPage} from './LoginPage';
//const { DashboardPage } = require('./DashBoardPage');
import { DashboardPage } from './DashboardPage';

//const { CartPage } = require('./CartPage');
import { CartPage } from './CartPage';
//const { OrdersReviewPage } = require('./OrdersReviewPage');
import { OrdersReviewPage } from './OrdersReviewPage';
//const { OrdersHistoryPage } = require('./OrdersHistoryPage');
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { Page } from 'playwright';

export class POManager {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage
    ordersReviewPage: OrdersReviewPage;
    ordersHistoryPage: OrdersHistoryPage;
    page: Page;


    constructor(page:Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
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

}
//module.exports = { POManager };