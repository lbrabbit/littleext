const extpath="http://littleext.openfoundry.org/";

var db = new Object;
db.onion=new Object;
db.onion.url='http://blog.yam.com/onion_club';
db.onion.title='洋蔥酷樂部';
db.cwwany=new Object;
db.cwwany.url='http://www.wretch.cc/blog/cwwany';
db.cwwany.title="彎彎～用漫畫寫日誌";

function addimg(instring,id) {
  var tmp = '<img src="'+instring+'"';
  tmp = tmp+' title="'+db[id].title+'"';
  tmp = tmp+' border="0"';
  tmp = '<a href="'+db[id].url+'">'+tmp+'></A>';
  return tmp;
}

function putextbutton (instring,id) {
  puttextarea(addimg(extpath+instring,id));
}
