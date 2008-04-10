function puttextarea(instring,id) {
  var formText;
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  formText = doc.getElementById("mce_editor_1");
  if (!formText) {
    formText = doc.getElementById("postExtendedText");
  } else {
    formText = formText.contentDocument.body;
  }
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
