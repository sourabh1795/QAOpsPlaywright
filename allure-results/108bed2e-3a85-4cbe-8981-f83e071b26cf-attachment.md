# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> Upload download excel validation
- Location: tests\upload-download.spec.js:37:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const ExcelJs = require('exceljs');
  3  | const { text } = require('node:stream/consumers');
  4  | 
  5  | async function writeExcelTest(searchText, replaceText, change, filePath) {
  6  | 
  7  |     const workbook = new ExcelJs.Workbook();
  8  |     await workbook.xlsx.readFile(filePath);
  9  |     const worksheet = workbook.getWorksheet('Sheet1');
  10 | 
  11 |     const output = await readExcel(worksheet, searchText);
  12 | 
  13 |     const cell = worksheet.getCell(output.row, output.column + change.colChange);
  14 |     cell.value = replaceText;
  15 |     await workbook.xlsx.writeFile(filePath);
  16 | }
  17 | async function readExcel(worksheet, searchText) {
  18 |     let output = { row: -1, column: -1 };
  19 | 
  20 |     worksheet.eachRow((row, rowNumber) => {
  21 |         row.eachCell((cell, colNumber) => {
  22 |             if (cell.value == searchText) {
  23 |                 output.row = rowNumber;
  24 |                 output.column = colNumber;
  25 | 
  26 | 
  27 |             }
  28 | 
  29 |         })
  30 |     })
  31 |     return output;
  32 | 
  33 | }
  34 | //update mango price to 350.
  35 | //writeExcelTest("Mango", 350,{rowChange:0,colChange:2}, "C:\\Users\\Sourabh\\Desktop\\Playwright_ByRahulShetty\\Excel_downloadeddata\\exceldownloadTest1.xlsx");
  36 | 
  37 | test("Upload download excel validation", async ({ page }) => {
  38 |     const textSearch = "Mango"; //chapter 85
  39 |     const updateValue = "353"; //chapter 85
  40 |     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  41 |     const downloadPromise = page.waitForEvent('download');
  42 |     await page.getByRole('button', { name: 'Download' }).click();
  43 |     const download = await downloadPromise;
  44 |     const filePath = "C:\\Users\\Sourabh\\Downloads\\download.xlsx";
  45 |     await download.saveAs(filePath);
  46 | 
  47 |     await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:\\Users\\Sourabh\\Downloads\\download.xlsx");
> 48 |     await page.locator("#fileinput").click();
     |                                      ^ Error: locator.click: Target page, context or browser has been closed
  49 |     await page.locator("#fileinput").setInputFiles("C:\\Users\\Sourabh\\Downloads\\download.xlsx");
  50 | 
  51 |     //chapter 85
  52 |     const textlocator = page.getByText(textSearch);
  53 |     const desiredRow = await page.getByRole('row').filter({ has: textlocator });
  54 |     await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
  55 | 
  56 | 
  57 | 
  58 | 
  59 | });
```