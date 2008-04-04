function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  //var formText = doc.getElementById("appendix");
  var formText = doc.getElementById("content");
  if (formText!=null) {
    if (id.length>0)
      addcredit(formText,instring,id);
    else
      beforecredit(formText,instring);
  }
}

function putextbutton (instring,id) {
  baseputextbutton(instring,id);  
}


