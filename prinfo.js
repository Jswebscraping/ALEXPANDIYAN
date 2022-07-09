const puppeteer = require('puppeteer');
const fs = require('fs')

try {
    (async() => {
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();

        await page.goto('https://www.nseindia.com/get-quotes/equity?symbol=SBIN' ,{waitUntil: 'networkidle2', timeout: 0});
        //await page.waitForTimeout(10000);
        await page.waitForSelector('.table-wrap.table-onerow')
        //.securityInfo

        const heads = await page.$eval('#securityInfo > thead > tr', x => x.innerText);
        const data = await page.$eval('#securityInfo > tbody > tr', y => y.innerText);

        console.log(heads,data);
        await browser.close();
        fs.writeFile("Secinfo.txt", JSON.stringify(heads,datas,'',2),(err) => {
            if(err){console.log(err)}   
            else{console.log('Saved Successfully')}
        });
    })()
}
catch(e)
{
    console.log("Error",e);
}