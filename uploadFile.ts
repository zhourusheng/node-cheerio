/**
 * 当前版本：1.0.0
 * 说明：
 * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 以下要修改
 */

/**
 * grade 年级：
 */
const grade = '小学'
/**
 * unit 单元：
 */
const unit = 'Unit7'
/**
 * Version 版本
 */
 const Version = '仁爱'

/**
 * 设置 cookie
 * 如果页面打开之后跳转到登录页面的话，就说明cookie过期了
 */
const cookies = [
  {
    name: '_leviathan_session',
    value:
      'hh%2Fr4uOE8bCfEZP8xgwNESlTt87NqibXczqzQFAQmY9CRtjWWJBhSDhR303oK9k7f9bP0foSqn4p%2Bp757y3xVbULHNGg%2FB5VihxN0r5MwbAy8GyD1UOXJljqj1Ou8b%2FosivMrFLxkoxzBJ03FcOqmfzecUiuk8%2BWhcjNzruZWZs8SttItauIVD6r%2B%2BS3yewLMkeCSmD131Ur0FfvYvEaezXO7hLWi9L8WM6VAoGJfxWLWCE3hndLQbCFutcXoA955MvASATvWfaYWbFmdKkepk50cGywFqeZ4T2kA2nOSmH32ryb%2F83IjV1UaIACJNyE8SpaPU2hC8UPayT3yFNHpLz19S4auDQ5FR7F2FP9uAW%2BA3wVMkqG7ai1zmnEPqcFr39XH8xlW6dgtwtrKzTJqa8zwmc%2B8bfUGh6vRY4uFcOcMrctXzso0VagNM3weZqpxtJpT0P6sQlgl1iPyEQgCnxQzStZJ69n2QDlBBUrIwOmzw%3D%3D--fGa%2F3RJRT4QJARIc--lHzrHe1Af%2FWGYDb%2BcJ9v%2FQ%3D%3D',
    domain: 'kfb.xbxxhz.com',
    path: '/'
  },
  {
    name: 'ahoy_visit',
    value: 'c3ac6824-f5fe-4088-912a-33500c06d872',
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
  },
  {
    name: 'remember_admin_token',
    value:
      'eyJfcmFpbHMiOnsibWVzc2FnZSI6Ilcxc3lNRjBzSWlReVlTUXhNU1F3T1V4QlRVeGlXWFI1YW5CWE9FcHFlbGxRZW14bElpd2lNVFl4T0RBeU1qZzJNeTQwTkRJNE5DSmQiLCJleHAiOiIyMDIxLTA0LTI0VDAyOjQ3OjQzLjQ0MloiLCJwdXIiOiJjb29raWUucmVtZW1iZXJfYWRtaW5fdG9rZW4ifX0%3D--70f992db7c48826add0706be243b0ec5f42e5830',
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
const searchPage = 'https://kfb.xbxxhz.com/dashboard/xuekewang_exercises'

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

  await page.goto(searchPage)

  // 年级：选择小学
  await page.click('#select2-stage_id-container')
  await page.click('.select2-results__option:nth-of-type(2)')
  await page.waitFor(500)

  // 学科：选择英语
  await page.click('#select2-subject_id-container')
  await page.click('.select2-results__option:nth-of-type(4)')
  await page.waitFor(1000)

  // 版本：广州版
  await page.click('#select2-version_id-container')
  await page.waitFor('.select2-results__option')
  await page.click('.select2-results__option:nth-of-type(16)')
  await page.waitFor(1000)

  // 教材：三年级下册
  await page.click('#select2-textbook_id-container')
  await page.waitFor('.select2-results__option')
  await page.click('.select2-results__option:nth-of-type(7)')
  await page.waitFor(1000)

  // 搜索
  await page.click('.btn-primary')

  // 点击确定按钮
  /**
   * 考虑到涉及线上数据问题，需要核对后手动点击确定
   */
})()
