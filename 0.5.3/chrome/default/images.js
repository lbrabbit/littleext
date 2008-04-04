const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].
  getService(Components.interfaces.nsIClipboardHelper);

function OnLoad() {
  if (getlittleIntPref("icons.HTML")==1) {
    document.getElementById('modeHTML').setAttribute('selected','true');
    document.getElementById('modephpBBNoHTML').setAttribute('disabled','true');
  } else {
    document.getElementById('modephpBB').setAttribute('selected','true');    
  }
  if (getlittleIntPref("icons.NoHTML")==1) {
    document.getElementById('modephpBBNoHTML').setAttribute('checked','true');
  }
  document.getElementById("modeHTML").addEventListener('command',renew, true);
  document.getElementById("modephpBB").addEventListener('command',renew, true);
  document.getElementById("modephpBBNoHTML").addEventListener('command',renew, true);
  baseOnLoad();  
}

function OnUnload() {
  baseOnUnload();
  setlittleIntPref("icons.NoHTML",document.getElementById('modephpBBNoHTML').checked);
  setlittleIntPref("icons.HTML",document.getElementById('modeHTML').selected);
}

function puttextarea(instring,id) {
  var iconText = document.getElementById("iconText"); 
  var creditText = document.getElementById("creditText");
  creditText.value='';    
  if (id.length>0) {
    iconText.value=instring;
    addcredit(creditText,'',id);
  }else {
    iconText.value=instring;
  }
}

function putextbutton (instring,id) {
  baseputextbutton(instring,id);  
}

function iconCopy() {
  var iconText = document.getElementById("iconText"); 
  gClipboardHelper.copyString(iconText.value);  
}

function creditCopy() {
  var tmp=document.getElementById("creditText").value
  if (navigator.platform=='Win32') {
    tmp=tmp.replace(/\n/g,String.fromCharCode(13)+"\n");
  }
  gClipboardHelper.copyString(tmp);
}

function creditClear() {
  var creditText=document.getElementById("creditText");  
  creditText.value='';
  creditID=[];
}  

function renew() {
  window.setTimeout('baseputextbutton(oinstring,oid)',200); 
}

