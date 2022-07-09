const puppeteer = require('puppeteer');
const fs = require('fs');
(async function main (){
    try{
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        const url = 'https://grofers.com/prn/eno-lemon-digestive-antacid/prid/10841';

        await page.goto(url, {waitUntil: 'networkidle2', timeout: 0});

        //await page.goto('https://grofers.com/prn/eno-lemon-digestive-antacid/prid/10841', {waitUntil: 'networkidle2', timeout: 0});
        await page.waitForSelector('.css-1dbjc4n');

            var title = await page.$eval('.css-cens5h', div => div.innerText);
            var price = await page.$eval('.css-901oao.r-cqee49.r-1b1savu.r-1b43r93.r-14yzgew.r-1d4mawv', div => div.innerText);
            var details = await page.$eval('.product-attributes--additional-properties', div => div.innerText);
            var result = {title,price,details};

            console.log(result);

            fs.appendFile('ProductInfo.json', JSON.stringify(result), (err) => {
                if (err) {
                    throw err;
                }
            })
            await browser.close();

    }catch(e){
        console.log('Error',e);
    }
})();