import{test, expect,Locator,Page} from '@playwright/test';


export class DashboardPage {

    products: Locator;
    productsText: Locator
    cart: Locator;
    orders: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName: string) 
    {
        const normalizedProductName = productName.trim().toLowerCase();

        await expect(this.productsText.first()).toBeVisible();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);
        let productFound = false;

        for (let i = 0; i < count; i++) {
            const actualProductName = (await this.products.nth(i).locator("b").textContent() || "").trim().toLowerCase();
            if (actualProductName === normalizedProductName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                productFound = true;
                break;
            }
        }

        if (!productFound) {
            throw new Error(`Product "${productName}" was not found on the dashboard.`);
        }

    }

    async navigateToCart() 
    {
        await this.cart.click();
    }

    async navigateToOrders() 
    {
        await this.orders.click();
    }

}
