function OnLoad() {
  var matchOn=['on','On','ON','開啟']
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var tmp=doc.body.innerHTML
    .match(/>[^<]+<u>([^<]+)<\/u><br[^>]*><a href=\"faq[^\?]+\?mode=bbcode\"/i)[1];
  tmp=tmp.replace(/^\s+|\s+$/);
  if (matchOn.indexOf(tmp)<0) {
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