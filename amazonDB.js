const puppeteer = require('puppeteer');
const fs = require('fs');
const products = fs.readFileSync("./keywords.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);
const  Product= fs.readFileSync("./xpath.csv",'utf-8');
const XPATH = Product.split(',\r\n');

const Mongoclient = require('mongodb').MongoClient;

(async () => {
    try{
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage();
        await page.goto('https://www.amazon.in/', { waitUntil: 'load' });
        await page.waitForTimeout(30000);
        //await page.click("._2KpZ6l._2doB4z");
        const results = [];
        for (i = 0; i < keywords.length; i++) {
            await page.waitForSelector('#twotabsearchtextbox');
            await page.waitForTimeout(30000);
            await page.type('#twotabsearchtextbox',keywords[i]);
    
            await page.keyboard.press("Enter");
   
            await page.waitForTimeout(40000);
            
            for(k=0;k<XPATH.length;k++){
                await page.waitForXPath('//div[@class="sg-col-inner"]');
                await page.waitForTimeout(40000);
        
                var name = await page.$x(XPATH[0]);
                var rattings = await page.$x(XPATH[1]);
                var price = await page.$x(XPATH[2]);
                await page.waitForTimeout(40000);
            
                for (j = 0; j < 2; j++) {
                   try {
                      results.push({

                        Name: await page.evaluate(x => x.innerText,name[j]),
                        Rattings: await page.evaluate(y => y.innerText, rattings[j]),
                        Price: await page.evaluate(z => z.innerText, price[j]),
                        
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
                const mydb = db.db('Amazon');
                mydb.collection('amazonDB').insertMany(results, function (err, res) {
                    if (err) console.log("Error", err);
                    console.log("Document Inserted");
                    db.close();
                });
            })
        }
    }
    catch (e) {
        console.log("error", e);
    }
    })();