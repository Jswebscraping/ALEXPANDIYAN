const puppeteer =require("puppeteer");
const fs = require("fs");


(async function main(){
    try{
    var work = ['Baby food', 'Chocolate icecream','Dry puppy food'];
    const browser = await puppeteer.launch({headless :false});
    const page = await browser.newPage();
    
    const output = [];
    
    
    console.log("ok");

   for(i=0;i<3;i++){
        await page.goto('https://www.loblaws.ca/',{ waitUntil: 'networkidle2', timeout: 0 });
        const searchbox = await page.waitForSelector('.search-input__input');
        await searchbox.type(work[i]);
        await page.keyboard.press('Enter');
        console.log(work[i]);
        const key=work[i];
        const o=3;
        for(var j=0;j<o;j++)
        {
            await page.waitForSelector('.product-tile-group__list__item',{ waitUntil: 'networkidle2', timeout: 0 });
            const search = await page.$$('.product-tile-group__list__item');
            
            const p=await page.$eval('.product-tile__details__info__name',h3=>h3.innerText,search[j]);
            const q=await page.$eval('.price__value ',span=>span.innerText,search[j]);
            const r=await page.$eval('.comparison-price-list',ul=>ul.innerText,search[j]);
        
            output.push({
                title:key,
                product:p,
                productprice:q,
                compprice:r

            })
        
        } 
        }
      
            console.log(output);
    
            fs.writeFile("loblaws.json",JSON.stringify(output,'',2),(err) => {
                if(err){console.log(err)}
                else{console.log('URL Saved Successfully')};
            });       
       
   
            await browser.close();}
    catch(e)
        {
            console.log("error",e);
        }
})();
       