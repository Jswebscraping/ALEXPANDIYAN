const puppeteer = require('puppeteer');
//const fs = require('fs');
try{
    (async () => {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        const url =['https://www.chemistwarehouse.co.nz/buy/87293/l-oreal-serie-expert-nutrifier-shampoo-300ml'];
        
        for(let i=0;i<url.length;i++){
            try {
                await page.goto(url[i],{waitUntil:'load'});
                await page.waitForTimeout(10000);
                //await page.waitForXPath('//div[@class="Main-Container"]');
                //await page.waitForTimeout(30000);
                const check=await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-write-review-container bv-write-container"]/button');
                await check[0].hover();
 
                await page.waitForXPath('//div[@class="Main-Container"]');
                await page.waitForTimeout(10000);
                var rating= await page.$x('//*[@id="BVRRContainer"]//*[@class="bv-secondary-rating-summary-rating bv-table-cell"]');
                //await page.waitForTimeout(10000);
                let starrate = await page.evaluate(x => x.textContent, rating[0]);
                var content = ('Star Rate :');
                console.log(content);
                console.log(starrate);
                //var rating = await page.$x('')
                
    
            }
            catch(e)
            {
                console.log('Hidden Ratings');
            }
        }
        await browser.close();
    })();

}
catch(e)
{
    console.log('Link error',e);
}