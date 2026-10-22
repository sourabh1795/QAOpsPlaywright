class APIUtils { //Defines a reusable class for authentication and order API operations.


constructor(apiContext, loginPayload) //Receives the API request context and login data.
{
this.apiContext = apiContext; //Stores the request context used to send API calls.
this.loginPayload = loginPayload; //Stores the credentials used by the login request.
} //Ends the constructor.

  async getToken() //Defines an asynchronous method that retrieves an authentication token.
  {
    
  const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", //Sends the login request and waits for the server response.
     { //Starts the request options object.
        data: this.loginPayload //Sends the stored credentials as the request body.
    }); //Ends the login request.
  const loginResponseJson = await loginResponse.json(); //Converts the login response body from JSON text to an object.
  const token = loginResponseJson.token; //Extracts the authentication token from the response.
  console.log(token); //Prints the token to help debug the authentication flow.
  return token; //Returns the token to the caller.

  } //Ends the getToken method.

  async createOrder(orderPayload) //Defines an asynchronous method that creates an order.
  {
    let response = {}; //Creates an object that will contain the token and order ID.
    response.token = await this.getToken(); //Logs in and stores the returned token.

      const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", { //Sends the order creation request and waits for its response.
        data: orderPayload, //Sends the order details as the request body.
        headers: { //Starts the request headers object.
          'Authorization': response.token, //Authenticates the request with the login token.
          'Content-Type': 'application/json' //Specifies that the request body is JSON.
        } //Ends the request headers object.
      }); //Ends the order creation request.
      const orderResponseJson = await orderResponse.json(); //Converts the order response body into an object.
      console.log(orderResponseJson); //Prints the order response for debugging.
      const orderID = orderResponseJson.orders[0]; //Extracts the first created order ID.
      response.orderID = orderID; //Adds the order ID to the returned response object.
      return response; //Returns the token and order ID to the test.


  } //Ends the createOrder method.
} //Ends the APIUtils class.
module.exports = APIUtils; //Exports the class so test files can import and use it.
