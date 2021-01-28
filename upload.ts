/***
 * excel 转换的网站是：https://wejson.cn/excel2json/
 * 把转换出来的复制粘贴到 excel 文件下 data.json 文件中
 * 执行的命令是 npm run start
 */

/**
 * 当前版本：1.0.3
 * 说明：将 Version 优先 filter
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 以下要修改
 */

/**
 * Version 版本
 * 主要是在 内容描述中下拉框 搜索中匹配用
 */
const Version = '牛津译林'
/**
 * grade 年级：
 * 要对应到 excel 表格中的 “册”
 */
const grade = '七年级下'
/**
 * unit 单元：
 * 要对应到 excel 表格中的 “单元/章节”
 */
const unit = 'Unit 2'
/**
 * pageUrl：
 * 需要修改的模块的页面的地址：
 * 就是搜索出来的，点击编辑之后跳转出去的地址，从浏览器复制过来
 */
const pageUrl =
  'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises/53242/edit'

/**
 * 设置 cookie
 * 如果页面打开之后跳转到登录页面的话，就说明cookie过期了
 */
const cookies = [
  {
    name: '_leviathan_session',
    value:
      'NEtUhDGlDEnfVaNG28p9hqw0RXr8jck%2BZzelf%2BBKfPj80EsanHBVVUFj1TXoFQbN7nN%2FeeHPohoDz6pKcL8zbJp0ZStJ1skYqfoqxRYpM9mA32Aw3V0uefaoacI%2Fvx1BDUGxBSxHgGpYIQJIgoZWbeqby3KfGALSpycLLITPr93KepH9L9O%2FAUzNVJK5%2FRpGDhdS12GBZYzElfYijq6%2B7WPuZZsiU7rIneHQi4rWVEYcQICq36Ps%2FjFXO3W5FUeYVr%2BQfCIFq6caxvXophqTgd%2BCD29Uymza1UQa3vJAmqA1CFPdYT8gIizY0p4GLvkrOSdZClyIlJuQ8fJaT0oEFQLE4sJSaK36c9kt1pNbi67NfyEMR6myIPZRyID1sDevZ8zxesZXKCDDTGoBMM1txvbcAq%2BPWEN8%2FveXUz8WklrAapm66mDZvtcHf2ypn076qra%2BcXUv2wN%2FLw8KyIYGZYT3WNWMzVrgIR8VKJdFj5ye2QOmI914guMfvP%2B5DQrCCko%3D--VCr07JiIKM1OjsC2--X0Tm8wkzRJb%2BPco%2FbTV0xA%3D%3D',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  },
  {
    name: 'ahoy_visit',
    value: '592c9013-19d1-4775-885f-da85d792661e',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  },
  {
    name: 'ahoy_visitor',
    value: 'dfdf1dc7-a7bd-4df9-9d91-bf794355400d',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  },
  {
    name: 'Hm_lvt_079fac161efc4b2a6f31e80064f14e82',
    value: '1607499835',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  },
  {
    name: 'Hm_lvt_3d8e7fc0de8a2a75f2ca3bfe128e6391',
    value: '1607499835',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  }
]

/**
 * 分割线以上部分可以修改
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 以下部分代码不需要修改
 */

const puppeteer = require('puppeteer')
const configJson = require('./excel/data.json')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

;(async () => {
  const browser = await puppeteer
    .launch({
      // 是否运行浏览器无头模式(boolean)
      headless: false,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: null,
      // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
      devtools: false,
      // 设置超时时间(number)，若此值为0，则禁用超时
      timeout: 20000
    })
    .catch(() => browser.close)

  const page = await browser.newPage()

  await page.setCookie(...cookies)

  await page.goto(pageUrl)

  const CurrentList = configJson.Sheet1.filter(
    item => item['册'] === grade && item['单元/章节'] === unit
  )

  asyncForEach(CurrentList, async () => {
    await page.click('.add_fields:nth-of-type(1)')
  })

  const addRowItem = async (fileName: string, index: number) => {
    try {
      await page.waitFor(1000)
      /**
       * 难点就在于每次怎么选中当前的行
       */
      // 第几行就是 .table-responsive 下面第 index 个 tr
      const CurrentRow = `.table-responsive .nested-fields:nth-of-type(${index})`

      await page.waitFor(CurrentRow)

      const CurrentType = `${CurrentRow} .content_type`
      await page.waitFor(CurrentType)
      // 内容选择第三方
      await page.select(CurrentType, 'ApiContent')

      await page.waitFor(500)

      // 填写附件名称
      await page.type(`${CurrentRow} .center:nth-of-type(2) .m-input`, fileName)

      await page.waitFor(500)

      // 内容描述
      await page.click(`${CurrentRow} .td_c_id .select2-selection__rendered`)

      await page.waitFor(500)

      // 输入搜索
      let searchKey = fileName
      /**
       * 如果是英文开头，只用搜英文第一个单词即可
       */
      const RegExp = /[A-Za-z]+/
      if (searchKey.search(RegExp) >= 0 && searchKey.includes(',')) {
        searchKey = searchKey.split(',')[0]
      }
      await page.type('.select2-search__field', searchKey)

      await page.waitFor(1500)

      // 根据关键词进行选择
      const list = await page.$$eval(
        '.select2-results__options > .select2-results__option',
        eles =>
          eles.map((ele, index) => {
            return {
              text: ele.innerHTML,
              index: index + 1
            }
          })
      )
      await page.waitFor(1500)
      // 筛选
      const selectedIndex = list
        ?.filter(item => item.text.includes(Version))
        .filter(item => item.text.includes(grade))
        .filter(item => item.text.includes(unit))
        .filter(item => item.text.includes(fileName))?.[0]?.index

      console.log(
        '附件名称==========',
        fileName,
        '所在行数==========',
        index,
        '搜索结果=======',
        list,
        '选中的行=======',
        selectedIndex
      )

      if (selectedIndex) {
        // 点击选中
        await page.click(
          `.select2-results__options .select2-results__option:nth-of-type(${selectedIndex})`
        )
      }
    } catch (error) {
      console.log(
        '附件名称==========',
        fileName,
        '所在行数==========',
        index,
        '报错信息：',
        error
      )
    }
  }

  asyncForEach(CurrentList, async (Row, index) => {
    await addRowItem(Row?.['视频名称'], index + 1)
  })

  // 点击确定按钮
  /**
   * 考虑到涉及线上数据问题，需要核对后手动点击确定
   */
})()
