const https = require('https')
const http = require('http')

// var url = 'https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=8d3d3e8e00014053&ie=utf-8&f=8&rsv_bp=1&tn=99249017_hao_pg&wd=node.js%E5%8F%91%E8%B5%B7%E8%AF%B7%E6%B1%82&oq=node.js%25E5%258F%2591%25E8%25B5%25B7%25E8%25AF%25B7%25E6%25B1%2582&rsv_pq=8d3d3e8e00014053&rsv_t=52263TeNJSjTD1jWb%2BPPvcea9zcWZFsZpw693eMMa8Q96CHUSac%2BYwAOpeh4TrjEeWv6Ya5U&rqlang=cn&rsv_enter=0&bs=node.js%E5%8F%91%E8%B5%B7%E8%AF%B7%E6%B1%82&rsv_sid=undefined&_ss=1&clist=&hsug=&f4s=1&csor=11&_cr1=31878'
// var deUrl = decodeURI(url)
// var deUrl2 = decodeURIComponent(url)
// var deUrl3 = unescape(url)
//
// console.log(deUrl)
// console.log(deUrl2)
// console.log(deUrl3)

const word = encodeURIComponent('李清照')
const url = `http://www.baidu.com/s?ie=utf-8&mod=1&rqlang=cn&wd=${word}`
console.log(url)
http.get(url, data => {
  var str = ''
  data.on('data', chunk => {
    str += chunk;
  })
  data.on('end', () => {

    console.log('------------------------------------------------------------------------')
    console.log(getTotal(str))
    getResult(str)
  })
})


function getTotal(str) {
  var total = [];
  var reg = /\<\w+\s+class=['"]nums_text['"]\>([^<]+)\<\/\w+\>/i;
  var reg2 = /(\d)/g;
  var m = reg.exec(str);
  var p = null;
  if(m) {
    while (p = reg2.exec(m[1])) {
      total.push(p[1]);
    }
  }
  total = +total.join('') || 0;
  return total;
}

function getResult(str) {
  // console.log(str)
  // var reg = /<a(?:\sdata-click=)?[^>]+\>([^<]+)<\/a>/ig;
  // var reg = /<div\s+class="(?:[\w\s]*)?c\-container(?:[\w\s]*)?"[^>]+\>([^<]+)<\/div>/ig;
  var reg = /<div\s+class="[\w\s]*c-container[\s\w]*"[^>]*\>([^<]+)<\/div>/ig;
  var m = null;
  var p = []
  while (m = reg.exec(str)) {
    console.log(m)
    p.push(m[1]);
  }
  console.log(p)
}

