const { chromium } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

BeforeStep(async function(){

});

AfterStep(async function({result}){
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path :'screenshot1.png'});
    }

});

After(function () {
console.log("I am last to execute");
});