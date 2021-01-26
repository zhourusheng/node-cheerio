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

// 版本
const BanbenList = [
  {
    text: '人教新目标Go For It!（2012）',
    value: '52373'
  },
  {
    text: '人教版（五四学制）（2012）',
    value: '52616'
  },
  {
    text: '外研版（2012）',
    value: '52686'
  },
  {
    text: '仁爱版（2012）',
    value: '53051'
  },
  {
    text: '牛津译林版（2012）',
    value: '53174'
  },
  {
    text: '牛津上海版（2008）',
    value: '53305'
  },
  {
    text: '牛津深圳版（广州沈阳通用）',
    value: '53438'
  },
  {
    text: '冀教版（2012）',
    value: '53543'
  },
  {
    text: '鲁教版（五四学制）（2012）',
    value: '53890'
  },
  {
    text: '北师大版（同北京课改版）（2013）',
    value: '53967'
  },
  {
    text: '教科版（五四学制）',
    value: '54249'
  },
  {
    text: '上外版新世纪英语（五四学制）',
    value: '54352'
  },
  {
    text: '剑桥英语青少版（第二版）',
    value: '54499'
  }
]

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
})()
