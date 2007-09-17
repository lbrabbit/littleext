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
  document.getElementById("modeHTML").addEventListener('command',convModeHTML, true);
  document.getElementById("modephpBB").addEventListener('command',convModephpBB, true);
  document.getElementById("modephpBBNoHTML").addEventListener('command',convModephpBBNoHTML, true);
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
  if (id.length>0) {
    iconText.value=instring;
    addcredit(creditText,'',id);
  }else {
    iconText.value=instring;
  }
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
}  

function convModeHTML() {
  //window.alert("convModeHTML "+oinstring+' '+oid);
  var creditText=document.getElementById("creditText");  
  creditText.value=conv.phpBBNoHTML.HTML(creditText.value);  

  var iconText = document.getElementById("iconText");   
  var tmp=addimg(oinstring,oid);
  if (tmp) {
    iconText.value=tmp;
  }
}

function convModephpBB() {
  //window.alert("convModephpBB "+oinstring+' '+oid);
  var creditText=document.getElementById("creditText");  
  var tmp=creditText.value;
  
  tmp=conv.HTML.phpBB(tmp);
  if (document.getElementById("modephpBBNoHTML").checked){
    tmp=conv.phpBB.phpBBNoHTML(tmp);
  }
  creditText.value=tmp;

  var iconText = document.getElementById("iconText");   
  tmp=addimg(oinstring,oid);
  if (tmp) {
    iconText.value=tmp;
  }
}

function convModephpBBNoHTML(event) {
  //window.alert("convModephpBBNoHTML "+event.target.checked);
  var creditText=document.getElementById("creditText");  
  if (document.getElementById("modephpBBNoHTML").checked){
    creditText.value=conv.phpBB.phpBBNoHTML(creditText.value); 
  }else{
    creditText.value=conv.phpBBNoHTML.phpBB(creditText.value);     
  }

  var iconText = document.getElementById("iconText");   
  var tmp=addimg(oinstring,oid);
  if (tmp) {
    iconText.value=tmp;
  }
}