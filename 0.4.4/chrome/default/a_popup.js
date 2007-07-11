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