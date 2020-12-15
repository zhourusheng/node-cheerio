const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const charset = require("superagent-charset");
const agent = require("superagent");
charset(agent)


const url = 'http://www.dzkbw.com/city/'

function getHtml(url) {

  agent.get(url).charset('gbk').end((err, res) => {
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
      // provinceList.forEach(item => {
      item.city.forEach((city, i) => {
        const _url = encodeURI(`${url}${city.cityFullName}`)
        agent.get(_url).charset('gbk').end((err, res) => {
          html = res.text;
          const $ = cheerio.load(html, { decodeEntities: false })
          const $district = '#main .Districtlist ul li a'
          $($district).map((i, val) => {
            const text = $(val).text()
            provinceList[index].city[i].districtList.push({
              districtName: text
            })
          })
        })
      })
    })

    // 写入文件
    writerStream = fs.createWriteStream('province.json');
    writerStream.write(JSON.stringify(provinceList, undefined, 2), 'UTF8');
    writerStream.end();
  })
}

getHtml(url)
