const extpath="http://littleext.openfoundry.org/";
const icocredit="--小圖出處--";
//const baseHostBanner="由<A HREF='http://rt.openfoundry.org/Foundry/'><img src='http://littleext.openfoundry.org/OSSF.gif' border='0' title='自由軟體鑄造場'></A>提供網上空間";
const baseHostBanner="由<A HREF='http://rt.openfoundry.org/Foundry/'>自由軟體鑄造場</A>提供網上空間";

var oinstring,oid;

var db = {};
db.onion={};
db.onion.url='http://blog.roodo.com/onion_club';
db.onion.title='洋蔥酷樂部 作者：Ethan';
db.cwwany={};
db.cwwany.url='http://www.wretch.cc/blog/cwwany';
db.cwwany.title="彎彎～用漫畫寫日誌 作者：彎彎";
db.fjumonkey={};
db.fjumonkey.url='http://www.wretch.cc/blog/fjumonkey';
db.fjumonkey.title="因為我是輔大猴 作者：輔大猴";
db.momo={};
db.momo.url='http://blog.sina.com.cn/wangmomo';
db.momo.title="兔斯基 作者：王卯卯（MOMO）";
db.samwoo={};
db.samwoo.url='http://www.wretch.cc/blog/samwoo';
db.samwoo.title="老吳的尪仔標 作者：老吳";

var mode={};

var conv={};
conv.HTML={};
conv.phpBB={};
conv.phpBBNoHTML={};
conv.phpBBNoHTML.phpBB=function (instring) {
  instring=instring.replace(/\[url=([^\]]+)\]/ig,"<A HREF='$1'>");      
  instring=instring.replace(/\[\/url\]/ig,'</A>');
  instring=instring.replace(/\[img\]([^\[]+)\[\/img\]/ig,"<img src='$1'>");      
  return instring;  
}
conv.phpBB.phpBBNoHTML=function (instring) {
  instring=instring.replace(/<A[^>]+HREF=['"]([^'"]+)['"][^>]*>/ig,'[url=$1]');      
  instring=instring.replace(/<\/A>/ig,'[/url]');      
  instring=instring.replace(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/ig,"[img]$1[/img]");      
  return instring;    
}
conv.HTML.phpBB=function (instring) {
  instring=instring.replace(/<BR[^>]*>\s*\n/ig,"\n");
  instring=instring.replace(/<BR[^>]*\/>\s*\n/ig,"\n");
  instring=instring.replace(/<BR[^>]*>/ig,"\n");
  instring=instring.replace(/<BR[^>]*\/>/ig,"\n");    
  return instring;  
}
conv.phpBB.HTML=function (instring) {
  instring=instring.replace(/\n/g,"<BR>\n");
  return instring;  
}
conv.HTML.phpBBNoHTML=function (instring) {
  instring=conv.HTML.phpBB(instring);
  instring=conv.phpBB.phpBBNoHTML(instring);
  return instring;  
}
conv.phpBBNoHTML.HTML=function (instring) {
  instring=conv.phpBBNoHTML.phpBB(instring);
  instring=conv.phpBB.HTML(instring);
  return instring;  
}

function setmode(inmode){
  if (mode.oldmode!=inmode) {
    mode.oldmode=inmode;
  }
  switch(inmode)
  {
    case 'HTML':
      mode.value=inmode;
      mode.br="<BR>\n";
      mode.hostBanner=baseHostBanner;
      break;      
    case 'phpBB': 
      mode.value=inmode;
      mode.br="\n";
      mode.hostBanner=conv.phpBB.phpBBNoHTML(baseHostBanner);
      break;      
  }
}

function cmdmodeHTML(){
  document.getElementById('modephpBBNoHTML').setAttribute('disabled','true');
  setmode('HTML');
}

function cmdmodephpBB() {
  document.getElementById('modephpBBNoHTML').setAttribute('disabled','false');
  setmode('phpBB');
}

function addimg(instring,id) {
  if (instring && id) {  
    var tmp;
    
    if (mode.value=='phpBB' && document.getElementById('modephpBBNoHTML').checked) {
      tmp = '[img]'+instring+'[/img]';
      tmp = '[url='+db[id].url+']'+tmp+'[/url]';      
    } else {
      tmp = '<img src="'+instring+'"';
      tmp = tmp+' title="'+db[id].title+'"';
      tmp = tmp+' border="0"';
      tmp = '<a href="'+db[id].url+'" target="_blank">'+tmp+'></A>';
    }
    return tmp;
  }
}

function findcredit(buffer){
  var tmp = buffer.indexOf(mode.br+icocredit);
  if (tmp<0) {
    if (mode.br!="\n") {
      tmp = buffer.indexOf("\n"+icocredit);
    }
    if (tmp<0) {
      tmp = buffer.indexOf(icocredit);
    }    
  }
  return tmp;
}
function addcredit(formText,instring,id) {
  var bodyText,credit,bodyLen,banner;
  var buffer = formText.value;  
  var tmp = findcredit(buffer);
  if (mode.value=='phpBB') {
    banner='[url='+db[id].url+']'+db[id].title+'[/url]';
  }else{
    banner='<a href="'+db[id].url+'">'+db[id].title+'</A>';      
  }
  
  if (tmp>=0) {
    bodyText = buffer.substring(0,tmp);
    bodyText+= instring;
    bodyLen = bodyText.length;
    credit = buffer.substring(tmp);
    tmp = credit.indexOf(banner);
    if (tmp<0) {
      tmp=credit.indexOf(mode.br+mode.br+mode.hostBanner);
      credit=credit.substring(0,tmp);
      credit+=mode.br+banner;
      credit+=mode.br+mode.br+mode.hostBanner;
    }
    formText.value=bodyText+credit;
  }else{
    bodyLen=buffer.length;
    buffer+=instring+mode.br;
    buffer+=icocredit+mode.br;
    buffer+=banner;
    buffer+=mode.br+mode.br+mode.hostBanner;
    formText.value=buffer;
  }
  formText.focus();
  formText.scrollTop= formText.scrollHeight;
  formText.selectionStart=bodyLen;
  formText.selectionEnd=bodyLen+3;
}
function beforecredit(formText,instring) {
  var bodyText,credit,bodyLen;
  var buffer = formText.value;  
  var tmp = findcredit(buffer);
  if (tmp>=0) {
    bodyText = buffer.substring(0,tmp);
    bodyText+= instring;
    bodyLen = bodyText.length;
    credit = buffer.substring(tmp);
    formText.value=bodyText+credit;
  }else{
    bodyLen=buffer.length;
    formText.value=buffer+instring;
  }
  formText.focus();
  formText.scrollTop= formText.scrollHeight;
  formText.selectionStart=bodyLen;
  formText.selectionEnd=bodyLen+3;  
}

function baseOnLoad() {
  var mainbox=document.getElementById("mainbox");
  mainbox.selectedIndex=getlittleIntPref("tabSelectedIndex");
  var tabID=mainbox.selectedTab.id;
  tabID=tabID.substring(0,tabID.length-3);
  try { 
    document.loadOverlay('chrome://little/content/images/'+tabID+'.xul',null);
  } catch (e) {}
  if(document.getElementById('modeHTML').selected) {
    setmode('HTML');
  }else if(document.getElementById('modephpBB').selected) {
    setmode('phpBB');
  }
  
}

function baseOnUnload() {
  setlittleIntPref("screenX",window.screenX);
  setlittleIntPref("screenY",window.screenY);
  var mainbox=document.getElementById("mainbox");
  setlittleIntPref("tabSelectedIndex",mainbox.selectedIndex);
}

function putextbutton (instring,id) {
  oinstring=extpath+instring;
  oid=id;
  
  puttextarea(addimg(oinstring,id),id);  
}
