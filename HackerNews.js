const puppeteer= require('puppeteer');

(async() =>{
    try{
    
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage()
            await page.goto('https://news.ycombinator.com/',{waitUntil:'networkidle0' , timeout:0});
            await page.waitForSelector('.athing');
            const Linklist = await page.$$('.athing');   
            
            for(j=0;j<=9;j++){
            var data = await Linklist[j].$eval('.titlelink', a => a.href);
            var links ={data};
            console.log(links)
    }
            await browser.close();

        }catch(e){
            console.log('Error',e);
        }
} )();