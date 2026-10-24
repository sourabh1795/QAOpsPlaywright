import{test, expect,Locator,Page} from '@playwright/test';


export class LoginPage {

    userName: Locator;
    password: Locator;
    signInButton: Locator
    page: Page;

    constructor(page: Page) {
        
        this.page = page;
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator("[value='Login']");

    }
    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page.locator(".card-body").first()).toBeVisible();

    }
}
