const fs = require('fs')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    // 是否运行浏览器无头模式(boolean)
    headless: false,
    // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
    devtools: true,
    // 设置超时时间(number)，若此值为0，则禁用超时
    timeout: 20000,
  });

  const page = await browser.newPage();

  const url = 'http://www.dzkbw.com/city/'

  await page.goto(url);

  //等待元素加载成功
  await page.waitForSelector('#main > #citylist > a');

  const getPageInfo = async (_href) => {
    await page.goto(_href, { waitUntil: 'networkidle2' });

    const query = '#mainbg > #main > .ih3'

    const hasDom = await page.$(query)

    if (hasDom) {
      //等待元素加载成功
      await page.waitForSelector(query);

      const gradeList = await page.$$eval(query, eles => eles.map(ele => {
        return {
          title: ele.title,
          href: ele.href,
          text: ele.text
        }
      }));

      list[index].district[i].gradeList = gradeList
    } else {
      console.log(_href, hasDom)
    }
  }

  // const province = await page.$$eval('#main > #citylist > b', eles => eles.map(ele => {

  // }))

  // 获取全国省市
  const list = await page.$$eval('#main > #citylist > a', eles => eles.map(ele => {
    return {
      // province: 
      city: ele.innerHTML,
      href: ele.href
    }
  }));

  // 遍历每个城市
  // for (let index = 0; index < list.length; index++) {
  for (let index = 0; index < 1; index++) {
    const href = list[index].href;

    await page.goto(href, { waitUntil: 'networkidle0' });

    const res = await page.$("#main > .Districtlist");

    // 如果存在地区
    if (res) {
      //等待元素加载成功
      await page.waitForSelector('#main > .Districtlist > ul > li');

      const Districtlist = await page.$$eval('#main > .Districtlist > ul > li > a', eles => eles.map(ele => {
        return {
          district: ele.innerHTML,
          href: ele.href
        }
      }));

      list[index].district = Districtlist

      // 遍历每个地区
      for (let i = 0; i < Districtlist.length; i++) {
        const _href = Districtlist[i].href;
        await getPageInfo(_href)
      }
    } else {
      // 地区不存在
      await getPageInfo(href)
    }
  }

  // 将笔记本电脑信息写入文件
  writerStream = fs.createWriteStream('city.json');
  writerStream.write(JSON.stringify(list, undefined, 2), 'UTF8');
  writerStream.end();

  // await browser.close();
})();