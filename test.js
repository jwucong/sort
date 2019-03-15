var str = '<div class="a c-container b" da="">56</div>';
var str = `
<div
          class="result c-container "
          id="2"
          srcid="1599"
          tpl="se_com_default"
          data-click="{'rsv_bdr':'0' }"  ><div>fewmfkmk</div></div>

`
var reg = /<div\s+class="[\w\s]*c-container[\s\w]*"[^>]*\>(.+(?!<\/div>))<\/div>/ig;

var m = null;
while (m = reg.exec(str)) {
  console.log(m)
}
