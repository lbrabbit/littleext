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

function guestBack () {
  var a_popup = getCurWW().openWindow(null,
    "chrome://little/content/wretch/back.xul", "back", 
    "chrome,alwaysRaised,centerscreen,resizable,width=600,height=400", null);
  a_popup.locstr=window.locstr;
}