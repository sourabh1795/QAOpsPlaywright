const base = require('@playwright/test');
const ApiUtils=require("./ApiUtils.js");
const {request} = require('@playwright/test');

const loginPayload = { userEmail: "4141sourabhs@gmail.com", userPassword: "Test@123" }; //Stores the credentials sent to the login API.
const orderPayload={orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}; //orderPayload is used to store the order details for the API call 


exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({browser}, use) => {

            const context = await browser.newContext(); // create a new browser context
            const page = await context.newPage(); // open a new page in that context

            await page.goto('https://rahulshettyacademy.com/client'); // navigate to client app login page
            await page.locator('#userEmail').fill("4141sourabhs@gmail.com"); // fill email field
            await page.locator('#userPassword').fill("Test@123"); // fill password field
            await page.locator("[value='Login']").click(); // click login button
            await page.waitForLoadState('networkidle'); // wait until page fully loads
            await use(page);

            //teardown method
            await context.close();

        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext(); //Creates an isolated context for API requests.
            const apiUtils = new ApiUtils(apiContext, loginPayload); //Creates the API helper with the request context and credentials.
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);

            
            //teardown method
            await apiContext.dispose();
        },
        testDataForOrder:{
            productName : 'ADIDAS ORIGINAL'
        }


    });