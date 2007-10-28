function OnLoad() {
  var matchOn=['on','On','ON','開啟']
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;  
  var tmp=doc.body.innerHTML;
  //var tmp1=tmp.indexOf('mode=bbcode');
  //window.alert(tmp.substring(tmp1-50,tmp1+10));    
  tmp=tmp
    .match(/>[^<]+<u>([^<]+)<\/u><br[^>]*><a href=\"faq[^\?]+\?mode=bbcode/i);    
  if (tmp) {  
    tmp=tmp[1].replace(/^\s+|\s+$/);
    if (matchOn.indexOf(tmp)<0) {
      document.getElementById('modephpBBNoHTML').setAttribute('checked','true');
      //window.alert('yes');
    }
  } else {
    document.getElementById('modephpBBNoHTML').setAttribute('checked','true');
  }
  baseOnLoad();
}

function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var formText = doc.getElementsByName("message");
  if (formText.length > 0) {
    addcredit(formText[0],instring,id);
  }
}

function putextbutton (instring,id) {
  baseputextbutton(instring,id);  
}
