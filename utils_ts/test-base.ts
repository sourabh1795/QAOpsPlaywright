import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customtest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    username: "4141sourabhs@gmail.com",
    password: "Test@123",
    productName: "ZARA COAT 3"
  }
});
