const { test, expect } = require('@playwright/test');

test('Browser Context Playwright Test', async ({ page }) => //when you don't have any context loading ,then directly you can use the page object to open the browser and go to the URL mentioned in the next line

{
    const email = "4141sourabhs@gmail.com"; //meaning for this line is to declare a constant variable named email and assign it the value "
    const productName = 'ZARA COAT 3'; //meaning for this line is to declare a constant variable named productName and assign it the value "ZARA COAT 3". It represents the name of a product that will be used later in the test for comparison or validation purposes.
    const products = page.locator(".card-body"); //meaning for this line is to locate all the elements with the class 'card-body' on the web page and assign them to the variable products. It allows you to interact with those elements later in the test.
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.    
    await page.locator('#userEmail').fill(email); //meaning for this line is to locate the input element with the id 'userEmail' and fill it with the value of the email variable. It simulates a user entering their email address into the input field on the web page.
    await page.locator('#userPassword').fill("Test@123");
    await page.locator("[value='Login']").click();


    await page.waitForLoadState('networkidle'); //meaning for this line is to wait for the page to reach a state where there are no ongoing network requests. It ensures that the page has finished loading and all necessary resources have been fetched before proceeding with the next steps in the test.

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count(); //meaning for this line is to retrieve the count of elements located by the locator products. It returns the number of matching elements found on the web page and assigns it to the variable count. This allows you to determine how many elements with the class 'card-body' are present on the page.
    console.log(count); //meaning for this line is to log the value of the variable count to the console. It allows you to see the number of elements with the class 'card-body' that were found on the web page, providing information about the quantity of matching elements.

    //imp loop
    for (let i = 0; i < count; i++) //meaning for this line is to start a loop that iterates from 0 to count-1. It allows you to perform actions on each element located by the locator products, based on their index.
    {
        if (await products.nth(i).locator("b").textContent() === productName) //meaning for this line is to check if the text content of the element located by products at index i, specifically the <b> element within it, matches the value of productName. It allows you to identify the specific product based on its name.
        {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click(); //meaning for this line is to locate the "Add To Cart" button within the element located by products at index i and perform a click action on it. It simulates a user clicking the button to add the product to the shopping cart.
            break; //meaning for this line is to exit the loop once the desired product has been found and added to the cart. It prevents further iterations and allows the test to proceed with the next steps after adding the product.     
        }
    }
    //Lecture 31

    await page.locator("[routerlink*='cart']").click(); //meaning for this line is to locate the element with a router link that contains the text 'cart' and perform a click action on it. It simulates a user clicking on the cart link to navigate to the shopping cart page.
    await expect(page.locator("text=My Cart")).toBeVisible(); //wait for the cart page to render and confirm we are on the cart view.
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //meaning for this line is to check if the element with the text 'ZARA COAT 3' inside an <h3> tag is visible on the page. It verifies that the product has been successfully added to the cart and is displayed correctly.
    expect(bool).toBeTruthy(); //meaning for this line is to assert that the value of bool is true. It verifies that the product 'Zara Coat 3' is indeed visible in the cart, indicating that it has been successfully added.

    //Lecture 32
    //await page.locator("button[type='button']").first().click(); //meaning for this line is to locate the first button element with the attribute type='button' and perform a click action on it. It simulates a user clicking the button, which may trigger a specific action or event on the page.
    await page.locator("text=Checkout").click(); //meaning for this line is to locate the element with the text 'Checkout' and perform a click action on it. It simulates a user clicking the checkout button to proceed with the checkout process.
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind"), { delay: 100 };//meaning for this line is to locate the input element with a placeholder that contains the text 'Select Country' and simulate pressing the keys "ind" sequentially with a delay of 100 milliseconds between each key press. It allows you to enter the country name in the input field for selecting the country during the checkout process.
    const dropdown = page.locator(".ta-results"); //meaning for this line is to locate the element with the class 'ta-results' and assign it to the variable dropdown. It represents the dropdown menu that appears when selecting a country during the checkout process.
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count(); //meaning for this line is to retrieve the count of button elements within the dropdown locator. It returns the number of options available in the dropdown menu and assigns it to the variable optionsCount. This allows you to determine how many country options are present in the dropdown.
    for (let i = 0; i < optionsCount; i++) //meaning for this line is to start a loop that iterates from 0 to optionsCount-1. It allows you to perform actions on each button element within the dropdown locator, based on their index.
    {
        const text = await dropdown.locator("button").nth(i).textContent(); //meaning for this line is to retrieve the text content of the button element located by the dropdown locator at index i. It allows you to access the text of each option in the dropdown menu for comparison or validation purposes.
        if (text === " India") //meaning for this line is to check if the text content of the button element matches the string " India". It allows you to identify the specific country option in the dropdown menu based on its text.
        {
            await dropdown.locator("button").nth(i).click(); //meaning for this line is to locate the button element within the dropdown locator at index i and perform a click action on it. It simulates a user selecting the country option " India" from the dropdown menu.
            break; //meaning for this line is to exit the loop once the desired country option has been found and clicked. It prevents further iterations and allows the test to proceed with the next steps after selecting the country.
        }
    }

    //Lecture 34

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //meaning for this line is to assert that the first input element with the type 'text' within the element with the class 'user__name' has the expected text value 
    await page.locator(".action__submit").click(); //meaning for this line is to locate the element with the class 'action__submit' and perform a click action on it. It simulates a user clicking the submit button to complete the checkout process.
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); //meaning for this line is to assert that the element with the class 'hero-primary' has the expected text value " Thankyou for the order. ". It verifies that the order confirmation message is displayed correctly on the page after completing the checkout process.
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();//meaning for this line is to retrieve the text content of the element with the class 'ng-star-inserted' within the element with the class 'em-spacer-1' and assign it to the variable orderId. It allows you to capture the order ID generated after completing the checkout process for further validation or reference.
    console.log(orderId); //meaning for this line is to log the value of the variable orderId to the console. It allows you to see the generated order ID after completing the checkout process, providing information about the specific order that was placed.

    //Lecture 36
    await page.locator("button[routerlink*='myorders']").click(); //meaning for this line is to locate the button element with a router link that contains the text 'myorders' and perform a click action on it. It simulates a user clicking on the "My Orders" button to navigate to the page displaying their order history.
    await page.locator("tbody").waitFor(); //meaning for this line is to wait for the <tbody> element to be present on the page. It ensures that the order history table has been loaded and is visible before proceeding with the next steps in the test.
    const rows = page.locator("tbody tr"); //meaning for this line is to locate all the <tr> elements within the <tbody> element and assign them to the variable rows. It represents the rows of the order history table on the "My Orders" page.

    for (let i = 0; i < await rows.count(); i++) //meaning for this line is to start a loop that iterates from 0 to the count of rows-1. It allows you to perform actions on each row of the order history table, based on their index.
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent(); //meaning for this line is to retrieve the text content of the <th> element within the row located by rows at index i and assign it to the variable rowOrderId. It allows you to access the order ID displayed in each row of the order history table for comparison or validation purposes.    
        if (orderId.includes(rowOrderId)) //meaning for this line is to check if the value of orderId includes the value of rowOrderId. It allows you to determine if the generated order ID from the checkout process matches any of the order IDs displayed in the order history table.
        {
            await rows.nth(i).locator("button").first().click(); //meaning for this line is to locate the first button element within the row located by rows at index i and perform a click action on it. It simulates a user clicking the button to view the details of the specific order in the order history table.
            break; //meaning for this line is to exit the loop once the desired order ID has been found and the corresponding button has been clicked. It prevents further iterations and allows the test to proceed with viewing the order details.
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();//meaning for this line is to retrieve the text content of the element with the class 'col-text' and assign it to the variable orderIdDetails. It allows you to capture the order ID displayed in the order details page for further validation or reference.
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); //meaning for this line is to assert that the value of orderId includes the value of orderIdDetails. It verifies that the generated order ID from the checkout process matches the order ID displayed in the order details page, ensuring consistency and correctness of the order information.

});
