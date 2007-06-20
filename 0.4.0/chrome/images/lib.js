const extpath="http://littleext.openfoundry.org/";
const icocredit="--小圖出處--"

var db = new Object;
db.onion=new Object;
db.onion.url='http://blog.yam.com/onion_club';
db.onion.title='洋蔥酷樂部';
db.onion.banner='<a href="'+db.onion.url+'">'+db.onion.title+'</A>';
db.onion.phpbbbanner=' [url='+db.onion.url+']'+db.onion.title+'[/url]';
db.cwwany=new Object;
db.cwwany.url='http://www.wretch.cc/blog/cwwany';
db.cwwany.title="彎彎～用漫畫寫日誌";
db.cwwany.banner='<a href="'+db.cwwany.url+'">'+db.cwwany.title+'</A>';
db.cwwany.phpbbbanner=' [url='+db.cwwany.url+']'+db.cwwany.title+'[/url]';

function addhtmlimg(instring,id) {
  var tmp = '<img src="'+instring+'"';
  tmp = tmp+' title="'+db[id].title+'"';
  tmp = tmp+' border="0"';
  tmp = '<a href="'+db[id].url+'" target="_blank">'+tmp+'></A>';
  return tmp;
}

function addhphpbbimg(instring,id) {
  var tmp = '<img src="'+instring+'"';
  tmp = tmp+' title="'+db[id].title+'"';
  tmp = tmp+' border="0"';
  tmp = '[url='+db[id].url+']'+tmp+'>[/url]';
  return tmp;
}

function addphpbbimg(instring,id) {
  var tmp = '[img]'+instring+'[/img]';
  tmp = '[url='+db[id].url+']'+tmp+'[/url]';
  return tmp;
}

function addcredit(formText,instring,banner,br) {
  var bodyText;
  var credit;
  var bodyLen;  
  var tmp = formText.value.indexOf(br+icocredit);

  if (tmp>=0) {
    bodyText = formText.value.substring(0,tmp);
    bodyText+= instring;
    bodyLen = bodyText.length;
    credit = formText.value.substring(tmp);
    tmp = credit.indexOf(banner);
    if (tmp<0) {
      credit+=banner;
    }
    formText.value=bodyText+credit;
  }else{
    bodyLen=formText.value.length;
    formText.value+=instring+br;
    formText.value+=icocredit+br;
    formText.value+=banner;
  }
  formText.focus();
  formText.scrollTop= formText.scrollHeight;
  formText.selectionStart=bodyLen;
  formText.selectionEnd=bodyLen+3;
}