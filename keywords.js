const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main (){
    try{
// first product        
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.loblaws.ca/one-dry-puppy-food-smartblend-formula/p/21221441_C01', {waitUntil: 'networkidle2', timeout: 0});
        await page.waitForSelector('.product-details-page-details');
        var tittle1 = await page.$eval('.product-name__item.product-name__item--brand', div => div.innerText);
        var price1 = await page.$eval('.price.selling-price-list__item__price.selling-price-list__item__price--now-price.selling-price-list__item__price--', div => div.innerText);
        var comp_price1 = await page.$eval('.price.comparison-price-list__item__price', div => div.innerText);
        var result1 = {tittle1,price1,comp_price1};
        console.log(result1); 
        
        //const browser = await puppeteer.launch({ headless: false });
        //const page = await browser.newPage();
        
        await page.goto('https://www.loblaws.ca/organic-pear-apple-broccoli-strained-baby-food/p/20666167007_EA', {waitUntil: 'networkidle2', timeout: 0});
        await page.waitForSelector('.product-details-page-details__visibility-sensor');
        var tittle2 = await page.$eval('.product-name__item.product-name__item--brand', div => div.innerText);
        console.log(tittle2);
        //var price2 = 
        //var comp_price2 = 
        /*fs.appendFile('Info.json',  JSON.stringify
        (result), (err) => {
            if (err) {
                throw err;
            }
        })*/
        await browser.close();

    }catch(e){

    }
})(); 