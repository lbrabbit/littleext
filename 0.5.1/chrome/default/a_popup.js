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

function icon (popupleft,popuptop) {
  var a_popup = getCurWW().openWindow(null,
    "chrome://little/content/default/images.xul", "images", 
    "chrome,left="+popupleft+",top="+popuptop, null);  
}