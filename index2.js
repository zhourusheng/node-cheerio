const fs = require('fs')
const json2xls = require('json2xls');

fs.readFile('city.json', 'utf8', (err, data) => {
  if (err) throw err;
  const json = JSON.parse(data);
  const jsonArray = [];

  json.forEach(function (item) {
    let temp = {
      '城市': item.city,
      '连接': item.href,
      '答案': item.trueAnswer
    }
    jsonArray.push(temp);
  });

  let xls = json2xls(jsonArray);

  fs.writeFileSync('city.xlsx', xls, 'binary');
})