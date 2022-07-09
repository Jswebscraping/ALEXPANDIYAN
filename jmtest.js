const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try{
         const browser = await puppeteer.launch({headless:false});
         const page = await browser.newPage();
         await page.setViewport({ width: 1280, height: 800 })
 
         await page.waitForTimeout(5000);
         
         await page.goto('https://www.jiomart.com/',{waitUntil:'networkidle2',timeout:0});
         
         // Main Search box

         await page.waitForSelector('#search');
         await page.type('#search','Dairy');
         await page.keyboard.press("Enter");
         
         // Categories Search box
         
         await page.waitForSelector('#category_filter > div > div > div > form > input');
         await page.type('#category_filter > div > div > div > form > input','Dairy & Backery');
         await page.keyboard.press("Enter");
          

         const sortbyoption = await page.$x('//*[@id="sort-by"]//button');
        
         const details = [];
         for(let j=0;j<sortbyoption.length-1;j++){
         //await page.waitForTimeout(30000);
   
         const sortbyoption= await page.$x('//*[@id="sort-by"]//button');
         await sortbyoption[j].click();
         await page.waitForTimeout(10000);
         //await page.waitForXPath('//*[@id="maincontent"]');
         const Name = await page.$x('//span[@class="clsgetname"]');
         const Price = await page.$x('//*[@id="final_price"]');

         //const result = {Name,Price}
         
   
         for(i=0;i<sortbyoption.length;i++) {
         try{
         details.push ({
         Product_Title:await page.evaluate(el => el.textContent,Name[i]),
         Product_Name:await page.evaluate(el => el.textContent,Price[i]),
        })
       }
       catch(e)
       {
           console.log("link err");
       }
         }
         
        }
        await browser.close(); 
        fs.appendFile("JioMart.csv",JSON.stringify(details,'',2),(err) => {
            if(err){console.log(err)}
            else{console.log('Saved Successfully!')}
        });
}
    catch(e)
        {
            console.log("error",e)
        }
})();