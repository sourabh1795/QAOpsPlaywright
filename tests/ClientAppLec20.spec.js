const {test,expect} =require('@playwright/test'); 

test('Browser Context Playwright Test',async({page})=> //when you don't have any context loading ,then directly you can use the page object to open the browser and go to the URL mentioned in the next line

{
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');//meaning for this line is to navigate to the specified URL using the Page object created in the previous line. It loads the web page and waits for it to be fully loaded before proceeding with the next steps in the test.    
      await page.locator('#userEmail').fill("anshika@gmail.com");
      await page.locator('#userPassword').fill("Iamking@000");
      await page.locator("[value='Login']").click();

      
      //await page.waitForLoadState('networkidle'); //meaning for this line is to wait for the page to reach a state where there are no ongoing network requests. It ensures that the page has finished loading and all necessary resources have been fetched before proceeding with the next steps in the test.
      //waitForLoadState is not a recommended approach because it may not always guarantee that the page is fully loaded, especially in cases where there are dynamic elements or asynchronous requests. It is better to use explicit waits for specific elements or conditions to ensure that the desired state is achieved before proceeding with the test.
      //also their is limitation for timeout, if the page is taking more time to load then it will throw error. So we can use waitForSelector method to wait for a specific element to be present in the DOM before proceeding with the next steps in the test. It ensures that the element is available and ready for interaction.
      
      await page.locator(".card-body b").first().waitFor(); //meaning for this line is to locate the first element with the class 'card-body' and the tag 'b' on the web page and wait for it to be present in the DOM. It ensures that the element is available before proceeding with the next steps in the test.   
      //waitFor method only work when their locator return single element, if locator return multiple element then it will throw error. In that case we can use first() method to get the first element from the locator and then use waitFor() method on that element.


      const titles= await page.locator(".card-body b").allTextContents(); //meaning for this line is to locate all the elements with the class 'card-body' and the tag 'b' on the web page and retrieve their text contents. It allows you to extract the visible text from all matching elements and store them in an array.     
      console.log(titles); //meaning for this line is to log the array of text contents retrieved from the located elements with the class 'card-body' and the tag 'b'. It allows you to see the extracted text values in the console for verification or further analysis.





      
});
