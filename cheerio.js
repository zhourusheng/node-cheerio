const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const charset = require("superagent-charset");
const agent = require("superagent");
charset(agent)
// agent.buffer[mime] = true


const url = 'http://www.dzkbw.com/city/'

const getHtml = async (url) => {

  await agent.get(url).charset('gbk').end((err, res) => {
    const provinceList = []
    html = res.text;
    const $ = cheerio.load(html, { decodeEntities: false })
    const $provinceList = '#main #citylist b'
    $($provinceList).map((i, val) => {
      const text = $(val).text()
      provinceList.push({
        province: text,
        city: []
      })
    })

    const $citylist = '#main #citylist a'
    $($citylist).map((i, val) => {
      const text = $(val).text()
      const href = $(val).attr('href').split('/city/')[1]
      provinceList.map((p, i) => {
        if (href.includes(p.province)) {
          provinceList[i].city.push({
            cityName: text,
            cityFullName: href,
            districtList: []
          })
        }
      })
    })

    provinceList.slice(0, 2).forEach((item, index) => {
      // provinceList.forEach((item, index) => {
      item.city.forEach(async (city, i) => {
        const _url = encodeURI(`${url}${city.cityFullName}`)
        await agent.get(_url).charset('gbk').end((err, res) => {
          html = res.text;
          const $ = cheerio.load(html, { decodeEntities: false })
          const $district = '#main .Districtlist ul li a'
          // 获取到区
          $($district).map((disItem, val) => {
            const text = $(val).text()
            const href = $(val).attr('href').split('/city/')[1]
            provinceList[index].city[i].districtList.push({
              districtName: text,
              districtFullName: href,
            })
          })

          // 获取到年级内容
          provinceList[index].city[i].districtList.forEach(async (district, c) => {
            const _url2 = encodeURI(`${url}${district.districtFullName}`)
            await agent.get(_url2).charset('gbk').end(async (err, res) => {
              html = res.text;
              const $ = cheerio.load(html, { decodeEntities: false })
              const $book = '#main .divlist .ih3'

              const EnglishList = []

              await $($book).map((bookItem, book) => {
                const text = $(book).text()
                const title = $(book).attr('title')
                if (text.includes('英语')) {
                  EnglishList.push({
                    text,
                    title,
                  })
                }
              })

              provinceList[index].city[i].districtList[c].起始年级 = EnglishList[0].text.split('英语')[0]
              provinceList[index].city[i].districtList[c].版本 = EnglishList[0].title.split('义务教育')[0]
              provinceList[index].city[i].districtList[c].标题 = EnglishList[0].title
              provinceList[index].city[i].districtList[c].简称 = EnglishList[0].text
              provinceList[index].city[i].districtList[c].备注 = EnglishList[0].text.match(/\((.+?)\)/g)[0]
            })
          })
        })
      })
    })

    setTimeout(() => {
      // // 写入文件
      writerStream = fs.createWriteStream('province.json');
      writerStream.write(JSON.stringify(provinceList, undefined, 2), 'UTF8');
      writerStream.end();
    }, 5000);
  })
}

getHtml(url)
