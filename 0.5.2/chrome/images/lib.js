const extpath="http://littleext.openfoundry.org/";
const icocredit="--小圖出處--";
const bannerEnd="提供網上空間";
const license='使用條件：';

var cc={};
cc['by']      ='姓名標示';
cc['by-nc']   ='姓名標示─非商業性';
cc['by-nc-nd']='姓名標示─非商業性─禁止改作';
cc['by-nc-sa']='姓名標示─非商業性─相同方式分享';   
cc['by-nd']   ='姓名標示─禁止改作';
cc['by-sa']   ='姓名標示─相同方式分享';

var creditID=[];
var db = {};
db.onion={};
db.onion.url='http://blog.roodo.com/onion_club';
db.onion.title='洋蔥酷樂部，作者：Ethan';
db.onion.icon=extpath+'/onion.jpg';
db.onion.cc='by-nc-nd';
db.cwwany={};
db.cwwany.url='http://www.wretch.cc/blog/cwwany';
db.cwwany.title="彎彎～用漫畫寫日誌，作者：彎彎";
db.cwwany.icon=extpath+'/cwwany.gif';
db.cwwany.license='禁止改作、非商業性';
db.fjumonkey={};
db.fjumonkey.url='http://www.wretch.cc/blog/fjumonkey';
db.fjumonkey.title="因為我是輔大猴，作者：輔大猴";
db.fjumonkey.icon=extpath+'fjumonkey.gif';
db.fjumonkey.cc='by-nc-nd';
db.momo={};
db.momo.url='http://blog.sina.com.cn/wangmomo';
db.momo.title="兔斯基，作者：王卯卯（MOMO）";
db.momo.icon=extpath+'momo.jpg';
db.momo.license='禁止改作、非商業性';
db.samwoo={};
db.samwoo.url='http://www.wretch.cc/blog/samwoo';
db.samwoo.title="老吳的尪仔標，作者：老吳";
db.samwoo.license='禁止改作、非商業性';
db.sana={};
db.sana.url='http://www.wretch.cc/blog/sana217';
db.sana.title="Sana的漫畫網誌，作者：SANA(發音近似～紗娜)";
db.sana.icon=extpath+'sanablog_logo.gif';
db.sana.cc='by-nc-nd';
db.vivian9668={};
db.vivian9668.align='top';
db.vivian9668.url='http://www.wretch.cc/blog/vivian9668';
db.vivian9668.title="薇薇兔的無聊日誌，作者：薇薇兔";
db.vivian9668.icon=extpath+'vivian9668.gif';
db.vivian9668.license='禁止改作、非商業性';
db.lamji={};
db.lamji.url='http://wailam_628.mysinablog.com/';
db.lamji.title="Lamji的塗鴉日誌，作者：Lamji";
db.lamji.icon=extpath+'lamji.gif';
db.lamji.license='禁止改作、非商業性';

db.hostbanner = {};
db.hostbanner.url ='http://rt.openfoundry.org/Foundry/';
db.hostbanner.title='自由軟體鑄造場';
db.hostbanner.icon=extpath+'OSSF.gif';

var oinstring,oid;
var mode={};
function setmode(inmode){
/*  if (mode.oldmode!=inmode) {
    mode.oldmode=inmode;
  }*/
  switch(inmode)
  {
    case 'HTML':
      mode.value=inmode;
      mode.br="<br>\n";
      break;      
    case 'phpBB': 
      mode.value=inmode;
      mode.br="\n";
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
      if (db[id].align) {
        tmp = tmp+' align="'+db[id].align+'"';
      }
      tmp = tmp+'>';
      tmp = '<a href="'+db[id].url+'" target="_blank">'+tmp+'</A>';
    }
    return tmp;
  }
}

function addcreditbanner(id){
  var banner;
  
  if (mode.value=='phpBB' && document.getElementById('modephpBBNoHTML').checked) {
    banner='[url='+db[id].url+']';
    if (db[id].icon) {
      banner+='[img]'+db[id].icon+'[/img]';
    }
    banner+=db[id].title+'[/url]';
    if (db[id].license || db[id].cc) {
      banner+='，'+license;
      if (db[id].license) {
        banner+=db[id].license;
      }else{
        banner+='[url=http://creativecommons.org/licenses/'+db[id].cc+'/3.0/]';
        banner+='[img]'+extpath+'cc/'+db[id].cc+'.png[/img][/url]';
        banner+=cc[db[id].cc];
      }    
    }
  }else{
    banner ='<a href="'+db[id].url+'" target="_blank">';
    if (db[id].icon) {
      banner+='<img src="'+db[id].icon+'"';
      banner+=' title="'+db[id].title+'"';
      banner+=' border="0"></A>';
      banner+='<a href="'+db[id].url+'" target="_blank">';      
    }    
    banner+=db[id].title+'</A>';      
    if (db[id].license || db[id].cc) {
      banner+='，'+license;
      if (db[id].license) {
        banner+=db[id].license;
      }else{
        banner+='<a href="http://creativecommons.org/licenses/'+db[id].cc+'/3.0/" target="_blank">';
        banner+='<img src="'+extpath+'cc/'+db[id].cc+'.png"';
        banner+=' title="'+cc[db[id].cc]+'"';
        banner+=' border="0"></A>';
        banner+=cc[db[id].cc];      
      }    
    }
  }  
  return banner;
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
  var credit,bodyLen,buffer;
  var bodyEnd='';
  if (formText.tagName=='BODY'){
    buffer = formText.innerHTML;  
  }else{
    buffer = formText.value;  
  }
  var tmp = findcredit(buffer);
  
  if (tmp>=0) {
    var tmp1=buffer.indexOf(bannerEnd);
    if (tmp1>=0) {
      bodyEnd=buffer.substring(tmp1+bannerEnd.length);
    }    
    buffer = buffer.substring(0,tmp);
  }
  buffer+=instring;
  bodyLen=buffer.length;
  buffer+=mode.br+icocredit;
  
  if (creditID.indexOf(id)<0) {
    creditID.push(id);
  }
  for (var i=0;i<creditID.length;i++) {
    buffer+=mode.br+addcreditbanner(creditID[i]);
  }  
  buffer+=mode.br+mode.br+addcreditbanner('hostbanner');
  buffer+=bannerEnd+bodyEnd;
  if (formText.tagName=='BODY'){
    formText.innerHTML=buffer;
  }else {
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
  //window.alert(tabID);
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

function baseputextbutton (instring,id) {
  oinstring=extpath+instring;
  oid=id;
  
  puttextarea(addimg(oinstring,id),id);  
}
