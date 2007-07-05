function OnLoad() {
  var mainbox=document.getElementById("mainbox");
  mainbox.selectedIndex=getlittleIntPref("phpbb.selectedIndex");
}

function OnUnload() {
  setlittleIntPref("screenX",window.screenX);
  setlittleIntPref("screenY",window.screenY);
  var mainbox=document.getElementById("mainbox");
  setlittleIntPref("phpbb.selectedIndex",mainbox.selectedIndex);
}

function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var formText = doc.getElementsByName("message");
  if (formText.length > 0) {
    addcredit(formText[0],instring,db[id].phpbbbanner,hostphpbbbanner,"\n");
  }
}

function putextbutton (instring,id) {
  var tmp;
  if (!document.getElementById('NoHTML').checked) {
    tmp = addhphpbbimg(extpath+instring,id);
  }else{
    tmp = addphpbbimg(extpath+instring,id);
  }
  puttextarea(tmp,id);
}