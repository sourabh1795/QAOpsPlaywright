const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator("[value='Login']");

    }
    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.locator(".card-body").first()).toBeVisible();

    }
}

module.exports = { LoginPage };