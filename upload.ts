const fs = require('fs')
const puppeteer = require('puppeteer')
const configJson = require('./excel/njyl-7.json')

const url = 'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises'
const account = 'zhengyn@gongfudou.com'
const signInUrl = 'https://kfb.xbxxhz.com/admins/sign_in'
const admin_email = '#admin_email'
const admin_password = '#admin_password'
const submitBtn = '.btn-primary'

const MiddleId = 5
const EnglishId = 52372

;(async () => {
  const browser = await puppeteer
    .launch({
      // 是否运行浏览器无头模式(boolean)
      headless: false,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
      // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
      devtools: false,
      // 设置超时时间(number)，若此值为0，则禁用超时
      timeout: 20000
    })
    .catch(() => browser.close)

  const page = await browser.newPage()

  /**
   * 设置请求拦截
   */
  // await page.setRequestInterception(true)

  // 跳转到登录
  // await page.goto(signInUrl)
  // // 输入邮箱和密码, 点击登录
  // await page.type(admin_email, account, { delay: 500 })
  // await page.type(admin_password, account, { delay: 500 })
  // await page.click(submitBtn)

  // // 跳转
  // await page.waitForNavigation()
  // await page.goto(url)

  // // 点击年级
  // await page.click('#select2-stage_id-container')
  // // 等待下拉框出现
  // await page.waitFor('#select2-stage_id-results')
  // // 选择初中
  // await page.click('#select2-stage_id-results > :nth-child(3)')

  // await page.waitFor(500)

  // // 点击学科
  // await page.click('#select2-subject_id-container')
  // // 等待下拉框出现
  // await page.waitFor('#select2-subject_id-results')
  // // 选择英语
  // await page.click('#select2-subject_id-results > :nth-child(4)')

  // await page.waitFor(500)

  // // 点击版本
  // await page.click('#select2-version_id-container')
  // // 等待下拉框出现
  // await page.waitFor('#select2-version_id-results')
  // // 选择外研版
  // await page.click('#select2-version_id-results > :nth-child(4)')

  // await page.waitFor(500)

  // // 点击教材
  // await page.click('#select2-textbook_id-container')
  // // 等待下拉框出现
  // await page.waitFor('#select2-textbook_id-results')
  // // 选择外研版
  // await page.click('#select2-textbook_id-results > :nth-child(5)')

  // await page.waitFor(500)

  // // 点击搜索
  // await page.click(submitBtn)

  /**
   * 设置 cookie
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

  await page.setCookie(...cookies)

  // 牛津译林七下
  const module1Url =
    'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises/53245/edit'
  const Version = '牛津译林'
  const grade = '七年级下'
  const unit = 'Unit 1'

  await page.goto(module1Url)

  const CurrentList = configJson.Sheet1.filter(
    item => item['册'] === grade && item['单元/章节'] === unit
  )

  const addRowItem = async (fileName: string, index: number) => {
    /**
     * 难点就在于每次怎么选中当前的行
     */
    // 点击同步学 添加
    await page.click('.add_fields:nth-of-type(1)')

    // 第几行就是 .table-responsive 下面第 index 个 tr
    const CurrentRow = `.table-responsive .nested-fields:nth-of-type(${index})`

    const CurrentType = `${CurrentRow} .content_type`
    await page.waitFor(CurrentType)
    // 内容选择第三方
    await page.select(CurrentType, 'ApiContent')

    // 填写附件名称
    await page.type(`${CurrentRow} .center:nth-of-type(2) .m-input`, fileName)

    // 内容描述
    await page.click(`${CurrentRow} .td_c_id .select2-selection__rendered`)

    // 输入搜索
    await page.type('.select2-search__field', fileName)

    await page.waitFor(500)

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
    // 筛选
    const selectedIndex = list
      ?.filter(item => item.text.includes(grade))
      .filter(item => item.text.includes(unit))
      .filter(item => item.text.includes(Version))
      .filter(item => item.text.includes(fileName))?.[0]?.index

    if (selectedIndex) {
      // 点击选中
      await page.click(
        `.select2-results__options .select2-results__option:nth-of-type(${selectedIndex})`
      )
    }
  }

  CurrentList.forEach(async (Row, index) => {
    await addRowItem(Row?.['视频名称'], index + 1)
  })
})()
