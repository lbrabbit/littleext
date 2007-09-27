function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;  
  var tmp= doc.getElementById("editmoderich");
  if(tmp.className!='selected'){
    alert('請不要使用Edit HTML');
    return;
  }
  var formText = doc.getElementById("RadEWrapperwerichtext");
  formText = formText.getElementsByTagName("IFRAME");
  formText = formText[0].contentDocument.body;
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
