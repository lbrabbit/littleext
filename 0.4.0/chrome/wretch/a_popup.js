const intpath="http://pic.wretch.cc/icon/blog/smiley/msn/";

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
  if (doc.getElementById("text___Frame")==null) {
    var formText = doc.getElementById("text");
    if (formText!=null) {
      if (id.length>0)
        addcredit(formText,instring,db[id].banner+"&nbsp;&nbsp;","\n<BR>");
      else
        formText.value+=instring;
    }
  }else{
    bW.alert ("不適用!");
  } 
}

function putintbutton (instring) {
  var tmp = '<img src="'+intpath+instring+'">';
  puttextarea(tmp,'');
}

function putextbutton (instring,id) {
  puttextarea(addhtmlimg(extpath+instring,id),id);
}
