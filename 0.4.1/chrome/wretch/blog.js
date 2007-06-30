function OnUnload() {
  setlittleIntPref("screenX",window.screenX);
  setlittleIntPref("screenY",window.screenY);
}

function toggledelay () {
  var wm = getCurBrowser();
  var delaybar=wm.document.getElementById('delay-toolbar');
  delaybar.setAttribute('collapsed',!delaybar.collapsed);
  window.close();
}

function blogBack () {
  var a_popup = getCurWW().openWindow(null,
    "chrome://little/content/wretch/blogBack.xul", "blogBack", 
    "chrome,alwaysRaised,centerscreen,resizable", null);
  a_popup.locstr=window.locstr;
}