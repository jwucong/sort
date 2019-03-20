

var n = 10

var t = setInterval(function() {
    if(--n <= 0) {
      clearInterval(t)
      console.log('end:', n)
    }else {
      console.log(n)
    }
}, 1000)
