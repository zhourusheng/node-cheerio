var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var charset = require("superagent-charset");
var agent = require("superagent");
charset(agent); //

var obj = {};

var page = 1;   // 开始页码
var MAXPAGE = 38;   // 结束页码

var num = 0;    // 记录条数

var url = "http://www.cqfire.com/xxzx/news.asp?class1=%D0%C2%CE%C5%D6%D0%D0%C4&class2=%CA%D0%C4%DA%D0%C2%CE%C5";

startRequest(url + "&PageNo=" + page, 0);

function startRequest(site, flag) {
  var html = '';
  var resStr = '';
  agent.get(site).charset('gbk').end((err, res) => {
    html = res.text;
    var $ = cheerio.load(html);  // 采用cheerio模块解析html

    if (flag == 0) {
      // 如果flag为0，表示列表页面，需要对页面进行解析
      var eles = $("a").not(".nav_menu").not(".left_menu_class").not(".copy_menu");
      for (var i = 0; i < eles.length; i++) {
        // 将提取出a中的url传入flag为1的本方法中
        var target = "http://www.cqfire.com/" + eles.eq(i).attr("href");
        startRequest(target, 1);
      }

      if (page < MAXPAGE) {
        // 如果未达到最大页数，则进行下一页，传入flag为0
        page++;
        console.log(url + "&PageNo=" + page);
        startRequest(url + "&PageNo=" + page, 0);
      }
    } else {
      // 如果flag为1，则表示为具体新闻页面，需要对标题和来源进行提取
      // 获取新闻标题
      var title = $("span.STYLE2").text().trim();
      // 获取新闻来源
      var origin = $("span.STYLE2").parent().parent().parent().parent().parent().next().find("td[align='middle']").text().trim();
      var from = origin.split(" ")[0].split("：")[1];

      num++;  // num表示当前新闻的条数
      console.log(num + "-->" + title);

      // 将来源为key，统计个数为value存入结果对象中
      if (!obj[from]) {
        obj[from] = 0;
      }
      obj[from] += 1;

      for (var key in obj) {
        resStr += key + '\t' + obj[key] + '\n';
      }
      // 将结果以字符串的形式存入txt中，这里要使用同步方法，否则输出会出现很多null，但是txt文档中统计结果与同步方法一致，这里不解
      fs.writeFileSync('./data/result.txt', resStr, 'utf-8', function (err) {
        console.log(err);
      })
    }

  })

}