function OnLoad() {
/*  var matchOn=['on','On','ON','開啟']
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
  }*/
  baseOnLoad();
}

function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var formText;
  if (window.locstr.indexOf('/viewthread.php')+window.locstr.indexOf('/forumdisplay.php')!=-2) {    
    formText = doc.getElementById("message");
  } else {
    formText = doc.getElementById("posteditor_textarea");
    if(formText.style.display=='none'){
      formText = doc.getElementById("posteditor_iframe");
      formText = formText.contentDocument.body
    }
  }      
  if (formText!=null) {
    if (id.length>0)
      addcredit(formText,instring,id);
    else
      beforecredit(formText,instring);    
  }
}

function putextbutton (instring,id) {
  var omode=mode.value;  
  var bW = getCurBrowser();
  try {
    var tmp= bW.document.getElementById("content").contentDocument
      .getElementById("posteditor_textarea");
  } catch (e) {}
  if (tmp) {
    tmp=tmp.style.display;
  }
  if (tmp=='none') {
    if (omode!='HTML') {
      setmode('HTML');
    }
  }  
  baseputextbutton(instring,id);  
  if (tmp=='none') {
    if (omode!='HTML') {
      setmode(omode);
    }
  }    
}
