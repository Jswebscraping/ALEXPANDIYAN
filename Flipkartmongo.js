const puppeteer = require('puppeteer');
const fs = require('fs');
const products = fs.readFileSync("./keyword.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);
const Mongoclient = require('mongodb').MongoClient;
try {
    (async () => {

        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage();
        await page.goto('https://www.flipkart.com', { waitUntil: 'load' });
        await page.waitForTimeout(30000);
        //await page.click("._2KpZ6l._2doB4z");
        const results = [];
        for (i = 0; i < keywords.length; i++) {
            await page.waitForSelector('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > div > input');
            await page.waitForTimeout(30000);
            await page.type('#container > div > div._1kfTjk > div._1rH5Jn > div._2Xfa2_ > div._1cmsER > form > div > div > input',keywords[i]);
    
            await page.keyboard.press("Enter");
   
            await page.waitForTimeout(30000);
            //var button = await page.$x('//*[@id="container"]/div/div[3]/div[1]');
            await page.waitForXPath('//div[@class="_36fx1h _6t1WkM _3HqJxg"]');
            await page.waitForTimeout(30000);
        
            var brandname = await page.$x('//div[@class="_2WkVRV"]');
            var product_title = await page.$x('//a[@class="IRpwTa"]');
            var product_price = await page.$x('//div[@class="_30jeq3"]');
            
            for (j = 0; j < 3; j++) {
                try {
                    results.push({

                        brandname: await page.evaluate(h1 => h1.textContent, brandname[j]),
                        product_title: await page.evaluate(h1 => h1.textContent, product_title[j]),
                        product_price: await page.evaluate(xl => xl.textContent, product_price[j]),
                        
                    })
                }

                catch (e) {
                    console.log("link err",e);
                }
            }
            console.log(results);
            await browser.close();
            const url = 'mongodb://localhost:27017';
            Mongoclient.connect(url, function (err, db) {
                if (err) console.log("Error", err)
                const mydb = db.db('Flipkart');
                mydb.collection('FlipkartDB').insertMany(results, function (err, res) {
                    if (err) console.log("Error", err);
                    console.log("Document Inserted");
                    db.close();
                });
            })
        }
 })();
}
catch (e) {
    console.log("error", e);
}