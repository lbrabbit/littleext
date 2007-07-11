var prefs=Components.classes["@mozilla.org/preferences-service;1"]
  .getService(Components.interfaces.nsIPrefService);
var branch=prefs.getDefaultBranch("littleext.");
if (branch.getPrefType("screenX")!=prefs.PREF_INT
  || branch.getPrefType("screenY")!=prefs.PREF_INT) {
  branch.setIntPref("screenX",100);
  branch.setIntPref("screenY",100);
  branch.setIntPref("wretch.selectedIndex",0);
  branch.setIntPref("phpbb.selectedIndex",0);
  prefs.savePrefFile(null);
}

function little_toolbar_popup (popupleft,popuptop) {
//alert (popupleft+' '+popuptop);
  var bW = getCurBrowser();
  var doc= bW.document.getElementById("content").contentDocument;
  var locstr=doc.location.toString();

  if (locstr.indexOf("http://mysinablog.com/admin.php?op=newPost")!=-1
    || locstr.indexOf("http://mysinablog.com/admin.php?op=editPost&postId=")!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/mysinablog/a_popup.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
  }else if (locstr.indexOf("http://adm.blog.roodo.com/article/add")!=-1
    || locstr.indexOf("http://adm.blog.roodo.com/article/edit&aID=")!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/roodo/a_popup.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
  }else if (locstr.indexOf("www.wretch.cc/blog/modify.php")!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/wretch/a_popup.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
  }else if (locstr.search(/www\.wretch\.cc\/guestbook\/\w+/i)!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/wretch/guest.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
    a_popup.locstr=locstr;
  }else if (locstr.search(/www\.wretch\.cc\/blog\/\w+$/i)!=-1) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/wretch/blog.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
    a_popup.locstr=locstr;
  }else if (test_phpbb(doc,locstr)) {
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/phpbb/a_popup.xul", "a_popup", 
      "chrome,alwaysRaised,left="+popupleft+",top="+popuptop, null);
  }else{
    var a_popup = getCurWW().openWindow(null,
      "chrome://little/content/default/a_popup.xul", "a_popup", 
      "chrome,left="+popupleft+",top="+popuptop, null);
  }
}

function test_phpbb(doc,locstr) {
  if (locstr.indexOf("posting.php")!=-1) {
    var tmp=doc.getElementsByName("message");   
    return (tmp.length > 0); 
  } else {
    return false;
  }
}
