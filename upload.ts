const fs = require('fs')
const puppeteer = require('puppeteer')

const url = 'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises'
const account = 'zhengyn@gongfudou.com'
const signInUrl = 'https://kfb.xbxxhz.com/admins/sign_in'
const admin_email = '#admin_email'
const admin_password = '#admin_password'
const submitBtn = '.btn-primary'

const MiddleId = 5
const EnglishId = 52372

const module1Url =
  'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises/52894/edit'

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
  await page.goto(signInUrl)
  // 输入邮箱和密码, 点击登录
  await page.type(admin_email, account, { delay: 500 })
  await page.type(admin_password, account, { delay: 500 })
  await page.click(submitBtn)

  // 跳转
  await page.waitForNavigation()
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
   *
   *
   */

  await page.goto(module1Url)

  /***
   * 内容描述搜索接口
   * https://kfb.xbxxhz.com/dashboard/xuekewang_exercises/videos?q=try%E7%9A%84%E7%94%A8%E6%B3%95
   */
})()
