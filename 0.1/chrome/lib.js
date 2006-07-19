function getCurBrowser() {
  return Components.classes["@mozilla.org/appshell/window-mediator;1"]
    .getService(Components.interfaces.nsIWindowMediator)
    .getMostRecentWindow("navigator:browser");
}

function getCurWW() {
  return Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
    .getService(Components.interfaces.nsIWindowWatcher);
}

function getExtFile() {
  return extf = Components.classes["@mozilla.org/extensions/manager;1"]
    .getService(Components.interfaces.nsIExtensionManager)
    .getInstallLocation("Little@black.rabbit")
    .getItemLocation("Little@black.rabbit");
}

function getProDFile() {
  return Components.classes["@mozilla.org/file/directory_service;1"]
    .getService(Components.interfaces.nsIProperties)
    .get("ProfD", Components.interfaces.nsIFile);
}

function openAndReuseOneTabPerURL(url) {
// Reusing tabs for the same URL (from MozillaZine)
  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
           .getService(Components.interfaces.nsIWindowMediator);
  var browserEnumerator = wm.getEnumerator("navigator:browser");

  // Check each browser instance for our URL
  var found = false;
  while (browserEnumerator.hasMoreElements() && !found) {
    var browserInstance = browserEnumerator.getNext();
    browserInstance = browserInstance.getBrowser();

    // Check each tab of this browser instance
    var index = 0, numTabs = browserInstance.mPanelContainer.childNodes.length;
    while (index < numTabs && !found) {
      var currentTab = browserInstance.getBrowserAtIndex(index);
      if (url == currentTab.currentURI.spec) {
        // The URL is already opened. Select its tab.
        //browserInstance.selectedTab = currentTab;
        browserInstance.setAttribute("selectedTab",currentTab);
        // Focus *this* browser
        browserInstance.focus();
        found = true;
      }
      index++;
    }
  }

  // Our URL isn't open. Open it now.
  if (!found) {
    var recentWindow = wm.getMostRecentWindow("navigator:browser");
    if (recentWindow) {
      // Use an existing browser window
      recentWindow.delayedOpenTab(url);
    }
    else {
      // No browser windows are open, so open a new one.
      window.open(url);
    }
  }
}

function helppath(){
  var extf = getExtFile();
  var path = extf.path;
  path = path.replace (/\\/g,"/");
  path = path.replace (/\s/g,"%20");
  if (path.substring(0,1)!="/") {
    path = "/"+path;
  }
  return "file://" + path + "/chrome/help/help.htm";
}