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
  const browser = await puppeteer.launch({
    // 是否运行浏览器无头模式(boolean)
    headless: false,
    // 是否自动打开调试工具(boolean)，若此值为true，headless自动置为fasle
    devtools: false,
    // 设置超时时间(number)，若此值为0，则禁用超时
    timeout: 20000
  })

  const page = await browser.newPage()

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
  await page.goto(module1Url)

  /***
   * 内容描述搜索接口
   * https://kfb.xbxxhz.com/dashboard/xuekewang_exercises/videos?q=try%E7%9A%84%E7%94%A8%E6%B3%95
   */

  const grade = '七年级下'
  const unit = 'Unit 1'

  const CurrentList = configJson.Sheet1.filter(
    item => item['册'] === grade && item['单元/章节'] === unit
  )

  // CurrentList.forEach(async (Row, index) => {
  //   await addRowItem(Row)
  // });

  const addRowItem = async (fileName: string) => {
    /**
     * 难点就在于每次怎么选中当前的行
     */
    // 点击同步学 添加
    await page.click('.add_fields:nth-of-type(1)')

    await page.waitFor('.content_type')
    // 内容选择第三方
    await page.select('.content_type', 'ApiContent')

    // 填写附件名称
    await page.type('.m-input', fileName, { delay: 500 })
  }

  addRowItem('share的用法')
})()
