import { Locator, Page, expect } from "@playwright/test";

let message1 : string = "Hellow";
message1 = "byte";
console.log(message1);

let age1: number = 20;
console.log(age1);

let isActive: boolean = false ;

let numberArrays: number[] = [1, 2, 3];

let data : any = "this could be anything";
data = 42;

function add(a: number, b: number): number 
{
    return a + b;
}

add(3, 4);// op is 7

let usr:{name: string, age: number, location: string} = {name: "Bob", age: 34, location: "Delhi"};
usr.location= "Hyderabad";

console.log(usr);


//copy this code from  CartPage.js file and paste it here
class CartPage
{
    page: Page;
    cartProducts:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;

constructor(page:any)
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