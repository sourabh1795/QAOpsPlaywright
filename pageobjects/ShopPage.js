const { expect } = require('@playwright/test');

class ShopPage {
    constructor(page) {
        this.page = page;
    }

    async verifyProductIsDisplayed(productName) {
        await expect(
            this.page.getByRole('heading', { name: productName, exact: true }),
        ).toBeVisible();
    }
}

module.exports = { ShopPage };
