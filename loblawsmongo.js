const puppeteer = require('puppeteer');
const fs = require('fs');
const products = fs.readFileSync("./keywords.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);
const  Product= fs.readFileSync("./xpath.csv",'utf-8');
const XPATH = Product.split(',\r\n');

const Mongoclient = require('mongodb').MongoClient;
try {
    (async () => {

        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage();
        await page.goto('https://www.loblaws.ca/', { waitUntil: 'load' });
        await page.waitForTimeout(30000);
        //await page.click("._2KpZ6l._2doB4z");
        const results = [];
        for (i = 0; i < keywords.length; i++) {
            await page.waitForSelector('.search-input__input');
            await page.waitForTimeout(30000);
            await page.type('.search-input__input',keywords[i]);
    
            await page.keyboard.press("Enter");
   
            await page.waitForTimeout(30000);
            
            for(k=0;k<XPATH.length;k++){
                await page.waitForXPath('//div[@class="search-page__result"]');
                await page.waitForTimeout(40000);
        
                var brandname = await page.$x(XPATH[0]);
                var product_title = await page.$x(XPATH[1]);
                var comp_price = await page.$x(XPATH[2]);
                await page.waitForTimeout(40000);
            
                for (j = 0; j < 3; j++) {
                   try {
                      results.push({

                        Brandname: await page.evaluate(x => x.innerText, brandname[j]),
                        Product_title: await page.evaluate(x => x.innerText, product_title[j]),
                        Comp_price: await page.evaluate(x => x.innerText, comp_price[j]),
                        
                    })
                }

                catch (e) {
                    console.log("info not found",e);
                }
            }
        }
            console.log(results);
            
            await browser.close();
            const url = 'mongodb://localhost:27017';
            Mongoclient.connect(url, function (err, db) {
                if (err) console.log("Error", err)
                const mydb = db.db('Loblaws');
                mydb.collection('LoblawsDB').insertMany(results, function (err, res) {
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