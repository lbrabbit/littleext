var saved=true;
var filePath;
var localFileName;

function getStringBundle()
{
  const bundleURL = "chrome://global/locale/contentAreaCommands.properties";
  
  const sbsContractID = "@mozilla.org/intl/stringbundle;1";
  const sbsIID = Components.interfaces.nsIStringBundleService;
  const sbs = Components.classes[sbsContractID].getService(sbsIID);
  
  const lsContractID = "@mozilla.org/intl/nslocaleservice;1";
  const lsIID = Components.interfaces.nsILocaleService;
  const ls = Components.classes[lsContractID].getService(lsIID);
  var appLocale = ls.getApplicationLocale();
  return sbs.createBundle(bundleURL, appLocale);    
}


function savePage(location) 
{
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.setAttribute('src',location);
  tmpDocument.addEventListener('load', afterLoad, true);  
  //window.alert(location);
  saved=false;
}

function afterLoad(evt) 
{
  var consoleService= Components.classes['@mozilla.org/consoleservice;1']
    .getService(Components.interfaces.nsIConsoleService);
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.removeEventListener('load', afterLoad, true);
  tmpDocument=evt.target;
  //window.alert(tmpDocument.location); 
  //consoleService.logStringMessage(tmpDocument.location); 
  var source=Components.classes["@mozilla.org/network/io-service;1"]
    .getService(Components.interfaces.nsIIOService)
    .newURI(tmpDocument.location.href,null,null);

  var file=filePath.clone();
  file.append(localFileName);
  file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0664);
  consoleService.logStringMessage(file.path); 
  var fileURL=Components.classes["@mozilla.org/network/io-service;1"]
    .getService(Components.interfaces.nsIIOService)
    .newFileURI(file);
  
  //retrieve image from cache
  var persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
    .createInstance(Components.interfaces.nsIWebBrowserPersist);

  // Calculate persist flags.
  const nsIWBP = Components.interfaces.nsIWebBrowserPersist;
  const flags = nsIWBP.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
  persist.persistFlags = flags | nsIWBP.PERSIST_FLAGS_FROM_CACHE;
  
  // Leave it to WebBrowserPersist to discover the encoding type (or lack thereof):
  persist.persistFlags |= nsIWBP.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION; 
  
  // Create download and initiate it (below)
  var tr = Components.classes["@mozilla.org/transfer;1"]
    .createInstance(Components.interfaces.nsITransfer);
  
  var filesFolder = file.clone();
  var nameWithoutExtension = filesFolder.leafName.replace(/\.[^.]*$/, "");
  var filesFolderLeafName = getStringBundle()
    .formatStringFromName("filesFolder",[nameWithoutExtension],1);
  filesFolder.leafName = filesFolderLeafName;

  var encodingFlags = nsIWBP.ENCODE_FLAGS_ENCODE_BASIC_ENTITIES;
  tr.init(source,fileURL, "", null, null, null, persist);
  persist.progressListener = tr;
  persist.saveDocument(tmpDocument,file,filesFolder,null,encodingFlags,null);
  saved=true;
}