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
        省份: text
      })
    })

    // 写入文件
    writerStream = fs.createWriteStream('province.json');
    writerStream.write(JSON.stringify(provinceList, undefined, 2), 'UTF8');
    writerStream.end();
  })
}

getHtml(url)
