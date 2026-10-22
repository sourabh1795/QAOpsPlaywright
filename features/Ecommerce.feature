Feature: Ecommerce validations

@Regression
Scenario: Placing the Order
  Given a login to Ecommerce application with "4141sourabhs@gmail.com" and "Test@123"
  When Add "ZARA COAT 3" to Cart
  Then Verify "ZARA COAT 3" is displayed in the Cart 
  When Enter valid details and Place the Order
  Then Verify order is present in the OrderHistory

  # Given a login to Ecommerce application with "rahulshetty@gmail.com" and "Iamking@000"


@Validation
Scenario Outline: Placing the Order
  Given a login to Ecommerce2 application with "<username>" and "<password>"
 Then Verify Error message is displayed

Examples:
    | username                |  password | 
    | 4141sourabhs@gmail.com  |  Test@123 | 
    | hello@123.com           |  Test@13  |
