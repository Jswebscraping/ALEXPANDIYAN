const puppeteer = require('puppeteer');

try{
    (async () => {
        const browser = await puppeteer.launch({headless:false});

        const page = await browser.newPage();

        await page.goto('https://en.wikipedia.org/wiki/Zoobooks');
    
        await page.waitForXPath('//*[@id="mw-content-text"]/div[1]/ul[1]');
    
        // evaluate XPath expression of the target selector (it return array of ElementHandle)
        let content = await page.$x('//*[@id="mw-content-text"]/div[1]/ul[1]');
    
        // prepare to get the textContent of the selector above (use page.evaluate)
        let books_list = await page.evaluate(x => x.textContent, content[0]);
    
        console.log('List of Books in Alphabetical Order :',books_list);
    
        await browser.close();
    })();
}
 catch(e)
{
    console.log("error",e);
}