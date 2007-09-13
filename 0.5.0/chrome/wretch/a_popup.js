const intpath="http://pic.wretch.cc/icon/blog/smiley/msn/";

function puttextarea(instring,id) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  if (doc.getElementById("text___Frame")==null) {
    var formText = doc.getElementById("text");
    if (formText!=null) {
      if (id.length>0)
        addcredit(formText,instring,id);
      else
        beforecredit(formText,instring);
    }
  }else{
    bW.alert ("不適用!");
  } 
}

function putintbutton (instring) {
  var tmp = '<img src="'+intpath+instring+'">';
  puttextarea(tmp,'');
}

