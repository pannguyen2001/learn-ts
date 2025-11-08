// Have some issue, not digest this yet

// import { Builder, By } from "selenium-webdriver";
// import chrome from "selenium-webdriver/chrome";
// import * as fs from "fs";
// // Source: https://www.zenrows.com/blog/selenium-nodejs#scrolling

// async function scraper() {
   
//     // set the browser options
//     const options = new chrome.Options().addArguments('--headless');
 
//     // initialize the webdriver
//     const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    
//     try {
        
//         // navigate to the target webpage
//         await driver.get('https://www.scrapingcourse.com/infinite-scrolling');

//         // loop to keep scrolling until no more content is loaded
//         let lastHeight = 0;
//         while (true) {
//             // scroll to the end of the page
//             await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');

//             // wait for 3 seconds
//             await driver.sleep(3000);

//             // get the current height of the page
//             const currentHeight:any = await driver.executeScript('return document.body.scrollHeight');

//             // break the loop if no more content is loaded
//             if (currentHeight === lastHeight) {
//                 break;
//             }
//             lastHeight = currentHeight;
//         }

//         // locate the parent elements
//         let parentElements = await driver.findElements(By.css('.product-info'));

//         let namesArray = [];
//         let pricesArray = [];

//         for (let parentElement of parentElements) {
//             // find child elements within the parent element
//             let names = await parentElement.findElement(By.css('.product-name'));
//             let prices = await parentElement.findElement(By.css('.product-price'));

//             namesArray.push(await names.getText());
//             pricesArray.push(await prices.getText());      
//         }

//         console.log(namesArray);
//         console.log(pricesArray);

//         // export to csv file
//         let productsData = "name,price\n";
//         for (let i = 0; i < namesArray.length; i++) {
//             productsData += `${namesArray[i]},${pricesArray[i]}\n`;
//         }
//         fs.writeFile("ProductDetails.csv", productsData, err => {
//             if (err) {
//                 console.error("Error:", err);
//             } else {
//                 console.log("Success!");
//             }
//         });


//     } catch (error) {
//         // handle error
//         console.error('An error occurred:', error);
//     } finally {
//         // quit browser session
//         await driver.quit(); 
//     }
 
// }
 
// scraper();
