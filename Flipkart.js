const puppeteer = require('puppeteer');
const fs = require('fs');
const products = fs.readFileSync("./keyword.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);
(async () =>{
try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        for(let i=0;i<keywords.length;i++){

        
        await page.goto('https://www.flipkart.com/',{waitUntil:'networkidle2',timeout:0});
        await page.waitForSelector('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > div > input');
        await page.waitForTimeout(30000);
        await page.type('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > div > input',keywords[i]);
    
        await page.keyboard.press("Enter");
    
        
        await page.waitForXPath('//div[@class="_36fx1h _6t1WkM _3HqJxg"]');
        await page.waitForTimeout(30000);
        const Details = [];
        const productTitle = await page.$x('//a[@class="IRpwTa"]');
        const productBrand = await page.$x('//div[@class="_2WkVRV"]');
        const productPrice = await page.$x('//div[@class="_30jeq3"]');
        //const productImage = await page.$x('//img[@class="_2r_T1I"]', img => img.src);
        for (j = 0; j < 10; j++)
        Details.push({
            ProductTitle:await page.evaluate(x => x.innerText,productTitle[0]),
            Productbrand:await page.evaluate(y => y.innerText,productBrand[0]),
            Productprice:await page.evaluate(z => z.innerText,productPrice[0]),
            //'Product Image Urls' : productImage,   
        });
        console.log(Details);
    }  
       
       await browser.close();
       
       fs.appendFile("PRinfO.csv",JSON.stringify(Details,'',2),(err) => {
            if(err){console.log(err)}
    
        });
    }
    catch(e)
    {
        console.log('File error',e);
    }
})();