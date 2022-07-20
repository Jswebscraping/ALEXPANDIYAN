const puppeteer = require('puppeteer');
const fs = require('fs');
const products = fs.readFileSync("./key.csv",'utf-8');
const keywords = products.split(',\r\n');
console.log(keywords);
const  Product= fs.readFileSync("./xpaths.csv",'utf-8');
const XPATH = Product.split(',\r\n');



(async () => {
    try{
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage();
        await page.goto('https://www.carrefouruae.com/mafuae/en/', {waitUntil: 'networkidle2', timeout: 0});
        await page.waitForTimeout(20000);
        
        const results = [];
        for (i = 0; i < keywords.length; i++) {
            await page.waitForSelector('.css-1jv2uvu');
            await page.waitForTimeout(20000);
            await page.type('.css-1jv2uvu',keywords[i]);
    
            await page.keyboard.press("Enter");

            await page.waitForXPath('//div[@class="css-4jlmt"]');
            await page.waitForTimeout(30000);
        
            for(k=0;k<XPATH.length;k++){
                
                var name = await page.$x(XPATH[0]);
                var Db = await page.$x(XPATH[1]);
                var price = await page.$x(XPATH[2]);
                await page.waitForTimeout(20000);
            
                for (j = 0; j < 2; j++) {
                   try {
                      results.push({

                        Name: await page.evaluate(x => x.innerText,name[j]),
                        Delivery_by: await page.evaluate(y => y.innerText, Db[j]),
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
           /* fs.writeFile("carrfouruae.csv",JSON.stringify(results,'',2),(err) => {
                if(err){console.log(err)}
                else{console.log('Saved Successfully!')}
            });*/
            
        }
    }
    catch (e) {
        console.log("error", e);
    }
    })();