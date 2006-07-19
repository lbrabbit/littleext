function little_toolbar_popup (popupleft,popuptop) {
//alert (popupleft+' '+popuptop);
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var locstr=doc.location.toString();

  if (locstr.indexOf("www.wretch.cc/blog/modify.php")!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/wretch/a_popup.xul", "a_popup", 
      "chrome,left="+popupleft+",top="+popuptop, null);
  }else{
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/default/a_popup.xul", "a_popup", 
      "chrome,left="+popupleft+",top="+popuptop, null);
  }
}