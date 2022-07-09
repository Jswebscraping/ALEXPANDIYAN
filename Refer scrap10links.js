const puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
    try{
        var browser = await puppeteer.launch({ headless: false });
        var page = await browser.newPage();
        
        await page.goto('https://news.ycombinator.com/');
        await page.waitForSelector('.titlelink');
        var news = await page.evaluate(() => {

            var titleNodeList = document.querySelectorAll('.titlelink');
            var ageList = document.querySelectorAll('.age');
            var scoreList = document.querySelectorAll('.score');
            
            var titleLinkArray = [];

            for (var i = 0; i < titleNodeList.length; i++) {
                if (!titleNodeList[i] || !ageList[i] || !scoreList[i]) continue;
                titleLinkArray[i] = {
                    tittle: titleNodeList[i].innerText.trim(),
                    Link: titleNodeList[i].getAttribute("href"),
                    age: ageList[i].innerText.trim(),
                    score: scoreList[i].innerText.trim(),

                    
                };
                
            }
            return titleLinkArray;
        });
        await browser.close();
            fs.appendFile("../hackernews.json", JSON.stringify(news), (err) => {
            if (err) throw err;
            console.log("saved JSON");
        });
    } catch(e) {
        console.log('Error',e);
        await browser.close();
    }
})();
