const puppeteer = require('puppeteer');
const fs = require('fs');


    try {
        async function SearchKeyword() {

            const browser = await puppeteer.launch({headless:false});
            const page = await browser.newPage();
        
            await page.goto('https://www.amazon.in/',{waitUntil:'networkidle2',timeout:0});
            await page.waitForSelector('#twotabsearchtextbox');
            
            //await page.waitForTimeout(30000);
            await page.type('#twotabsearchtextbox','moisturizer for face');
        
            await page.keyboard.press("Enter");
        
            
            await page.waitForSelector(".s-main-slot.s-result-list.s-search-results.sg-row");
            const arr = [];
            const details = await page.$$('.s-main-slot.s-result-list.s-search-results.sg-row');
    
            for(const a of details) {
                urls= await a.$$eval('.a-link-normal.s-no-outline', (a) => {return a.map(x => x.href)});
    
                for(i = 0;i < 5;i++) {
                    if(urls[i] != null) {
                    arr.push(urls[i]); };
                };
            };
           
           await browser.close();
            fs.appendFile("URL's.csv",JSON.stringify(arr,'',2),(err) => {
                if(err){console.log(err)}
                else{console.log('URL Saved Successfully')};
            });
            return arr; 
        };
    
        async function eachdetails() {
            const browser = await puppeteer.launch({headless:false});
            const page = await browser.newPage();
            const links = await Promise.resolve(SearchKeyword());
            console.log(links);
            let count = 1;
        
            for(let i = 0;i< links.length;i++) {
                await page.goto(links[i], {waitUntil:'load',visible:false});
                
                await page.waitForSelector('#dp',{waitUntil:'networkidle2',timeout:0});
                
                await page.waitForTimeout(5000);

                const arr = [];
                const details = await page.$$('#dp');
                        
                for(const a of details) {
                    try {
                        const productTitle = await a.$eval('#productTitle', span => span.innerText);
                        const productBrand = await a.$eval('.po-brand > td.a-span9', td => td.innerText);
                        const productRating = await a.$eval('.averageStarRating', span => span.innerText);
                        const productPrice = await a.$eval('.apexPriceToPay > span.a-offscreen', span => span.innerText);
                        const productMrp = await a.$eval('#corePrice_desktop > div > table > tbody > tr:nth-child(1) > td.a-span12', span => span.innerText);
                        const productImage = await a.$eval('#imgTagWrapperId > img', img => img.src);
                        const productAvailability = await a.$eval('#availability > span', span => span.innerText);
                        const productDetails = await a.$eval('#feature-bullets > ul', li => li.innerText);
    
                   
    
                        arr.push({
                            'Product Title'      : productTitle,
                            'Product Brand'      : productBrand,
                            'Product Rating'     : productRating,
                            'Product MRP'        : productMrp,
                            'Product Price'      : productPrice,
                            'Product Image Urls' : productImage,
                            'Product Availabilty': productAvailability,
                            'Product Details'    : productDetails,   
                        });
                    } // for loop try 
                    catch(e) {
                        console.log('Link Error');
                    };
                }; // for details
                        
                for(let j = 0;j<arr.length;j++) {
                    if(arr[i] != 0) {
                        fs.appendFile("amazonprodetails.csv",JSON.stringify(arr,'',2),(err) => {
                            if(err){console.log(err)}
                            else{ console.log('Saved Successfully!',count); count++;};
                        });
                    }; // if
                }; // for file
            }; // for links length
            await browser.close();
        }; // eachdetails
        eachdetails();
    } // main try block
    catch(e) {
        console.log("Error");
    }