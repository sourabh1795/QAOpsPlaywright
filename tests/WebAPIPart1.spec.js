const {test,expect,request} =require('@playwright/test'); //used request to make API calls in playwright 

const loginPayload={userEmail:"4141sourabhs@gmail.com",userPassword:"Test@123"};//loginPayload is used to store the login credentials for the API call 
let token; //token is used to store the token received from the API call 

const orderPayload={orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}; //orderPayload is used to store the order details for the API call 
//key in without quotes and value in quotes because key is a string and value is a string, if we put quotes around key then it will be treated as a string and not as a key, so we need to put quotes around value only 

let orderID;//orderID is used to store the order id received from the API call 

test.beforeAll(async ()=> { //meaning for beforeall means before all the tests in this file are executed, this will be executed once 

    //Login API call to get the token
    const apiContext=await request.newContext(); //meaning of newContext is to create a new browser context for API calls, this will be used to make API calls in playwright
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data:loginPayload } )//200 ,201
    expect(loginResponse.ok()).toBeTruthy(); //meaning of ok is to check if the response is successful or not, if the response is successful then it will return true otherwise false
    const loginResponseJson=await loginResponse.json(); //meaning of json is to parse the response body as JSON, this will be used to get the token from the response body  
    token =loginResponseJson.token; //meaning of token is to store the token received from the API call, this will be used to authenticate the user in the next API calls
    console.log(token);//meaning of console.log is to print the token in the console, this will be used to debug the code

    //Order API call to create an order
    const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", { 
        data:orderPayload, 
        headers:{ 
            'Authorization':token, 
            'Content-Type':'application/json' 
        }, 
    }) 
    expect(orderResponse.ok()).toBeTruthy(); //meaning of ok is to check if the order creation response is successful or not
    const orderResponseJson= await orderResponse.json();//meaning of json is to parse the response body as JSON, this will be used to get the order id from the response body 
    console.log(orderResponseJson); //meaning of console.log is to print the order response in the console, this will be used to debug the code 
    orderID=orderResponseJson.orders[0]; //meaning of orderID is to store the order id received from the API call, this will be used to verify the order in the history page 
    console.log(orderID); //meaning of console.log is to print the order id in the console, this will be used to debug the code 
}); 

test.beforeEach(async ()=> { //meaning for beforeeach means before each test in this file is executed, this will be executed once 
}); 

//Create order is successful and verify if order created is showing in history page.
test('Place the order @API',async({page})=> { //lecture 56 and 57 and 59
    await page.addInitScript(value=>{ //meaning of addInitScript is to add a script to the page before it is loaded, this will be used to set the token in the local storage before the page is loaded 
        window.localStorage.setItem('token',value); //meaning of localStorage is to store the token in the local storage, this will be used to authenticate the user in the next API calls 
    }, token); //meaning of token is to pass the token received from the API call to the addInitScript function, this will be used to set the token in the local storage before the page is loaded 

    await page.goto("https://rahulshettyacademy.com/client");//meaning of goto is to navigate to the specified URL, this will be used to open the application in the browser 
    await page.locator("button[routerlink*='myorders']").click(); 
    await page.locator("tbody").waitFor(); 

    const rows=page.locator("tbody tr"); 
    for(let i=0;i<await rows.count();i++) { 
        const rowOrderId=await rows.nth(i).locator("th").textContent(); 
        if(orderID.includes(rowOrderId)) { //✅ corrected to use orderID from API 
            await rows.nth(i).locator("button").first().click(); 
            break; 
        } 
    } 

    const orderIdDetails=await page.locator(".col-text").textContent(); 
    expect(orderID.includes(orderIdDetails)).toBeTruthy(); //await page.pause(); 
}); 

//lecture 56 57 and 59  
//Verify if order created is showing in history page. 
//precondition - create order 
//Note in 58 lecture we did not write the code for creating order, we will write the code for creating order in 59 lecture. In 59 lecture we will create a custom command to create order and we will use that command in this test case to create order before verifying it in history page.