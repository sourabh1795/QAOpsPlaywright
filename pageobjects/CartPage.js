const {test, expect} = require('@playwright/test');
class CartPage
{
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("text=My Cart");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
   
    await expect(this.cartProducts).toBeVisible();
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    const sanitizedProductName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.page.locator("h3:has-text('" + sanitizedProductName + "')");
}

}
module.exports = {CartPage};