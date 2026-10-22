const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');
const { text } = require('node:stream/consumers');

async function writeExcelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value == searchText) {
                output.row = rowNumber;
                output.column = colNumber;


            }

        })
    })
    return output;

}
//update mango price to 350.
//writeExcelTest("Mango", 350,{rowChange:0,colChange:2}, "C:\\Users\\Sourabh\\Desktop\\Playwright_ByRahulShetty\\Excel_downloadeddata\\exceldownloadTest1.xlsx");

test("Upload download excel validation", async ({ page }) => {
    const textSearch = "Mango"; //chapter 85
    const updateValue = "353"; //chapter 85
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const filePath = "C:\\Users\\Sourabh\\Downloads\\download.xlsx";
    await download.saveAs(filePath);

    await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "C:\\Users\\Sourabh\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Sourabh\\Downloads\\download.xlsx");

    //chapter 85
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);




});