Feature: Ecommerce validations

@Validation
Scenario Outline: Placing the Order
  Given a login to Ecommerce2 application with "<username>" and "<password>"
 Then Verify Error message is displayed

Examples:
    | username                |  password | 
    | 4141sourabhs@gmail.com  |  Test@123 | 
    | hello@123.com           |  Test@13  |
