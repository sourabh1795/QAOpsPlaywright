const base = require('@playwright/test');

 exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "4141sourabhs@gmail.com",
        password: "Test@123",
        productName: "ZARA COAT 3"
    }
})