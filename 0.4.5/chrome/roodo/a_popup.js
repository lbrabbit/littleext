function OnLoad() {
  var mainbox=document.getElementById("mainbox");
  mainbox.selectedIndex=getlittleIntPref("wretch.selectedIndex");
}

function OnUnload() {
  setlittleIntPref("screenX",window.screenX);
  setlittleIntPref("screenY",window.screenY);
  var mainbox=document.getElementById("mainbox");
  setlittleIntPref("wretch.selectedIndex",mainbox.selectedIndex);
}

function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  if (confirm('本文？')) {
    var formText = doc.getElementById("content");
  }else{
    var formText = doc.getElementById("appendix");
  }
  if (formText!=null) {
    if (id.length>0)
      addcredit(formText,instring,db[id].banner+"&nbsp;&nbsp;",hostbanner,"\n<BR>");
    else
      formText.value+=instring;
  }
}

function putextbutton (instring,id) {
  puttextarea(addhtmlimg(extpath+instring,id),id);
}
