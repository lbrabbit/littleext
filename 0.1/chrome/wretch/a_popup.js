const wretchmsnpath="http://pic.wretch.cc/icon/blog/smiley/msn/"
const ossfpath="http://littleext.openfoundry.org/"

function addwmpath(instring) {
  return wretchmsnpath + instring;
}

function addossfpath(instring) {
  return ossfpath + instring;
}

function addimg(instring) {
  return '<img src="'+instring+'">';
}

function puttextarea(instring) {
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  if (doc.getElementById("text___Frame")==null) {
    var formText = doc.getElementById("text");
    if (formText!=null) {
      formText.value+=instring;
    }
  }else{
    bW.alert ("不適用!");
  } 
}

function putwmbutton (instring) {
  var tmp = addwmpath(instring);
  tmp = addimg(tmp);
  puttextarea(tmp);
}

function putossfbutton (instring) {
  var tmp = addossfpath(instring);
  tmp = addimg(tmp);
  puttextarea(tmp);
}



