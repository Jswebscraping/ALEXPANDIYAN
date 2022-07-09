const puppeteer = require('puppeteer');
const fs = require('fs')


try {
(async () => {
     
     const browser = await puppeteer.launch({headless:false})
     const page = await browser.newPage()
     await page.goto('https://www.bigbasket.com/' ,{waitUntil: 'networkidle2', timeout: 0});

     await page.waitForSelector('#input');
            
     await page.type('#input','beverages');
        
     await page.keyboard.press("Enter");
     await page.waitForTimeout(30000);
        
     var checkbox= await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
   

      const details = [];
      for(let j=0;j<checkbox.length;j++){
      await page.waitForTimeout(5000);

      var checkbox= await page.$x('//*[@id="deck"]/div[5]/div/div/label/span[2]');
      await checkbox[j].click();
      await page.waitForTimeout(10000);
      const Brandname = await page.$x('//div[@class="col-sm-12 col-xs-7 prod-name"]//h6');
      const Productname=await page.$x('//div[@qa="product_name"]/a');
      const Price=await page.$x('//div[@qa="price"]//h4');
      const Ratings=await page.$x('//div[@qa="rnr_section"]');

      for(i=0;i<Brandname.length;i++) {
      try{
      details.push ({
      Brandname:await page.evaluate(el => el.textContent,Brandname[i]),
      Productname:await page.evaluate(el => el.textContent,Productname[i]),
      Price:await page.evaluate(el => el.textContent,Price[i]),
      Ratings:await page.evaluate(el => el.textContent,Ratings[i]),
     })
    }
    catch(e)
    {
        console.log("link err");
    }
      }
      const clearbutton=await page.$x('//*[@class="clear-all"]')
      await clearbutton[0].click(); 
      await page.waitForTimeout(10000);

    }
      console.log(details)

      await browser.close();

      fs.writeFile("bigbasket.csv",JSON.stringify(details,'',2),(err) => {
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
    });

  })()

}
    catch(e)
    {
        console.log("Error",e);
    }