const nsIFilePicker = Components.interfaces.nsIFilePicker;
const pollWait=300;
var delayCount=-1;
var loaded=false;
var listPage=0;
var listPageCount=0;

function OnLoad() {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.addEventListener('load', testLoad, true);
  var locstr=window.locstr;
  if (locstr.indexOf("http://hk.myblog.yahoo.com/")!=-1) {
    locstr=locstr.replace(/\/index\?&page=\d+$/,'');
    tmpDocument.setAttribute('src',locstr);
    window.setTimeout('collectBlogRows()',100);
    loaded=false;
    document.title='網誌備份';
/* Special Backup
  }else if (window.locstr.indexOf("http://Site URL/")!=-1){
    tmpDocument.setAttribute('src','about:blank');
    window.setTimeout('createSpecialPages()',100);
    loaded=true;
    document.title='Special';*/
  }else {
    window.alert('有問題3...'); 
  }
}

function changeSrc (url) {
  //window.alert(url);
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.setAttribute('src',url);
}

function testLoad () {
  var tmpDocument=document.getElementById("tmpDocument");
  if (tmpDocument.currentURI.spec=='about:blank') return;
  loaded=true;
}

function reload(url) {
  var tmpDocument=document.getElementById("tmpDocument");
  window.setTimeout("changeSrc('"+url+"')",1000*delaySec);
  tmpDocument.setAttribute('src','about:blank');  
}

function extractEle(ele){
  var found;
  var obj={};
  if (found=ele.innerHTML
    .match(/<a\shref=\"http:\/\/hk\.rd\.yahoo\.com\/blog\/mod\/art_title\/\*([^\>\<\"]+)\"\s*[^\>\<]*>(.+)<\/a><\/h/im)) {	    
    obj['link']=found[1].replace('&amp;','&');
    obj['title']=normTitle(found[2]);
  }
  if (found=ele.innerHTML
    .match(/(\d{4}-\d{2}-\d{2})\s\d+:\d+/)) {    
    obj['date']=found[1];
  }  
  buildLst(obj);
}

function collectBlogRows(){
  //window.alert('成功了');
  var tmpDocument=document.getElementById("tmpDocument");
  if (!loaded) {
    if (!tmpDocument.webProgress.isLoadingDocument)
      if (tmpDocument.currentURI.spec!='about:blank')
        reload(tmpDocument.currentURI.spec);
    window.setTimeout('collectBlogRows()',pollWait);
    return;    
  }
  tmpDocument=tmpDocument.contentDocument;
//  if (tmpDocument.documentElement.innerHTML.indexOf('uncompressed/chunked')!=-1)
//    reload(tmpDocument.location);
  var thisBody = tmpDocument.evaluate('//body', 
    tmpDocument,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);  
  if (!thisBody) {
    window.setTimeout('collectBlogRows()',pollWait);
    window.alert('thisBody');
    return;
  }

  var rights=tmpDocument.evaluate("//div[@class='rights']", 
    thisBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
  if (!rights) {
    window.setTimeout('collectBlogRows()',pollWait);
    //window.alert('rights');
    return;
  }
  
  var main_hd=tmpDocument.evaluate("//div[@class='main-hd']", 
    thisBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
  if (main_hd) {
    extractEle(main_hd);
  }
  
/*  var comment_more=tmpDocument.evaluate("//div[@class='comment-more']", 
    thisBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
  if (!comment_more) {
    window.setTimeout('collectBlogRows()',pollWait);
    window.alert('comment_more');
    return;
  }    
  var objList=comment_more.getElementsByTagName("ul");
  objList=objList[0].getElementsByTagName("li"); 
  for (var i = 0 ; i<objList.length; i++)  
    extractEle(objList[i]);*/

  var mod_alist=tmpDocument.evaluate("//div[@class='mod-alist']", 
    thisBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if (mod_alist) {
    for (var i = 0 ; i<mod_alist.snapshotLength; i++) {
      extractEle(mod_alist.snapshotItem(i));
    }
  }    
        
  var pagination=tmpDocument.evaluate("//div[@class='pagination']", 
    thisBody,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
  if (!pagination) {
    setupBtn();
    saveObj.minLen=9*1024;
  }else{  
    var nextPage=tmpDocument.evaluate("//a[@class='next']", 
      pagination,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null).snapshotItem(0);
    if (nextPage) {
      var tmpDocument=document.getElementById("tmpDocument");
      tmpDocument.setAttribute('src',nextPage.href);  
      window.setTimeout('collectBlogRows()',pollWait);
      loaded=false;   
    } else {
      setupBtn();
      saveObj.minLen=9*1024;
    }   
  }
}

function setupBtn() {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.removeEventListener('load', testLoad, true);
  var lstEntry=document.getElementById("lstEntry");
  var obj=document.getElementById('lblMsg');
  obj.setAttribute('value','共有'+lstEntry.childNodes.length+'篇');
  var obj=document.getElementById('btnBack');
  obj.setAttribute('disabled','false');
  var obj=document.getElementById('btnSelectUncheck');
  obj.setAttribute('disabled','false');
  var obj=document.getElementById('btnSelectCheck');
  obj.setAttribute('disabled','false');   
}

function buildLst (obj) {
  var lstEntry=document.getElementById("lstEntry");
  var titem = document.createElement("treeitem");
  var trow = document.createElement("treerow");
  var tcell = document.createElement("treecell");
  tcell.setAttribute('value','true');
  trow.appendChild(tcell);    
  tcell = document.createElement("treecell");
  tcell.setAttribute('label',obj.date);
  trow.appendChild(tcell);
  tcell = document.createElement("treecell");
  tcell.setAttribute('label',obj.title);
  trow.appendChild(tcell);
  tcell = document.createElement("treecell");
  tcell.setAttribute('label',obj.link);
  trow.appendChild(tcell);
  titem.appendChild(trow);    
  lstEntry.appendChild(titem);
}

function normTitle(instring) {
  instring=instring.replace(
    '<img src="http://pic.wretch.cc/photos/icon/blog/lock.gif" border="0">','LOCKED ');
  instring=instring.replace(/<img[^\>]+>/g,'ICO ');
  instring=instring.replace(/<em[^\>]+><\/em>/g,'ICO ');
  
  //Invalid char for file name
  instring=instring.replace(/\\/g,'＼');
  instring=instring.replace(/\//g,'／');
  instring=instring.replace(/\:/g,'：');
  instring=instring.replace(/\*/g,'﹡');
  instring=instring.replace(/\|/g,'｜');
  instring=instring.replace(/\?/g,'？');
  instring=instring.replace(/\"/g,'”');
  instring=instring.replace(/\</g,'＜');
  instring=instring.replace(/\>/g,'＞');
  instring=instring.replace('&amp;','&');
  return instring;
}

function entryBack () {
  //Test filePath
  var fileName = document.getElementById("txtFilePath").value;
  if( fileName==0 ) {
    window.alert('路徑不對喔！');
    return;
  }
  saveObj.filePath = Components.classes["@mozilla.org/file/local;1"]
    .createInstance(Components.interfaces.nsILocalFile);
  try {
    saveObj.filePath.initWithPath(fileName);  
  } catch(e) {
    window.alert('路徑不對喔！');
    return;    
  }
  if( !saveObj.filePath.exists() || !saveObj.filePath.isDirectory() ) {
    window.alert('路徑不對喔！');
    return;
  }
  var obj=document.getElementById('btnBack');
  obj.setAttribute('disabled','true');
  var obj=document.getElementById('btnStop');
  obj.setAttribute('disabled','false');
  pollLoop();
}

function entryStop() {
  var obj=document.getElementById('btnStop');
  obj.setAttribute('disabled','true');  
  if (!saveObj.saving||saveObj.saved||!tmpDocument.webProgress.isLoadingDocument) {
    var obj=document.getElementById('btnBack');
    obj.setAttribute('disabled','false');
  }
}

/* Considered long and hard about getting status code through nsIHttpChannel
But due to Richard P. Gabriel's worst is better, I chose to use a combination of
load event and isLoadingDocument.

Info to get nsIHttpChannel
http://developer.mozilla.org/en/docs/Code_snippets:Progress_Listeners
http://developer.mozilla.org/en/docs/Mozilla_Embedding_FAQ:How_do_I...#How_do_I_know_when_saving_is_done.2C_monitor_progress_etc..3F (QI means QueryInterface) 
http://developer.mozilla.org/samples/SimplePersist.cpp
*/

function pollLoop() {
  var tmpDocument=document.getElementById("tmpDocument");
  var rowobj=findLastRow();
  if (rowobj) {
    if (saveObj.saved && delayCount==-1) { 
      //var found=rows[blogPtr].link.match(/(\d+)$/);
      //var blogID=found[1];
      //localFileName=blogID+'.htm';
      var localFileName=rowobj.childNodes[1].getAttribute('label')
        +' '+rowobj.childNodes[2].getAttribute('label');
      var obj=document.getElementById("lblMsg");
      obj.setAttribute('value',localFileName);
      localFileName+='.htm';
      saveObj.localFileName=localFileName;
      saveObj.savePage(rowobj.childNodes[3].getAttribute('label'));
      delayCount=delaySec;
      window.setTimeout('pollLoop()',1000);    
    } else if (saveObj.saved) {
      if (delayCount==delaySec)
        uncheckLastRow();
      var obj=document.getElementById("lblMsg");
      obj.setAttribute('value','延時'+delayCount+'秒');
      delayCount--;
      if (document.getElementById('btnBack').getAttribute('disabled')=='true') {
        if (document.getElementById('btnStop').getAttribute('disabled')=='true')
          document.getElementById('btnBack').setAttribute('disabled','false');
        else 
          window.setTimeout('pollLoop()',1000);
      }
    } else if (!(saveObj.saving||saveObj.saved
      ||tmpDocument.webProgress.isLoadingDocument)) {
      delayCount--;
      saveObj.saving=false;
      saveObj.saved=true;
      tmpDocument.setAttribute('src','about:blank');
      if (document.getElementById('btnBack').getAttribute('disabled')=='true')
        if (document.getElementById('btnStop').getAttribute('disabled')=='true')
          document.getElementById('btnBack').setAttribute('disabled','false');
        else
          window.setTimeout('pollLoop()',1000);
    } else {
      window.setTimeout('pollLoop()',pollWait);
    }   
  } else {
    window.alert('備份完畢');
    entryStop();
  }
}

function selectCheck(bool) {
  var lstEntry=document.getElementById("lstEntry");
  var treEntry=document.getElementById('treEntry');
  var start = new Object();
  var end = new Object();
  var numRanges = treEntry.view.selection.getRangeCount();
  var titem;
  
  for (var t = 0; t < numRanges; t++){
    treEntry.view.selection.getRangeAt(t,start,end);
    for (var v = start.value; v <= end.value; v++){
      lstEntry.childNodes[v].firstChild.firstChild.setAttribute('value',bool); 
    }
  }
}

function findLastRow() {
  var lstEntry=document.getElementById("lstEntry");
  
  for (var i = lstEntry.childNodes.length-1; i >= 0; i--){
    if (lstEntry.childNodes[i].firstChild.firstChild.getAttribute('value')=='true')
      return lstEntry.childNodes[i].firstChild
  }
}

function uncheckLastRow() {
  var lstEntry=document.getElementById("lstEntry");
  
  for (var i = lstEntry.childNodes.length-1; i >= 0; i--){
    if (lstEntry.childNodes[i].firstChild.firstChild.getAttribute('value')=='true') {
      lstEntry.childNodes[i].firstChild.firstChild.setAttribute('value','false');
      var obj=document.getElementById("progress");
      obj.setAttribute('value',(lstEntry.childNodes.length-i+1)*100/lstEntry.childNodes.length);   
      return;   
    }
  }
}

function showNum() {
  var treEntry=document.getElementById('treEntry');
  var start = new Object();
  var end = new Object();
  var numRanges = treEntry.view.selection.getRangeCount();
  var num=0;
  
  for (var t = 0; t < numRanges; t++){
    treEntry.view.selection.getRangeAt(t,start,end);
    num+=end.value-start.value+1;
  }
  var obj=document.getElementById("lblMsg");
  obj.setAttribute('value','選擇了'+num+'項');
}

function filePath() {
  var fp = Components.classes["@mozilla.org/filepicker;1"]
  	           .createInstance(nsIFilePicker);
  fp.init(window, "備份路徑", nsIFilePicker.modeGetFolder);
  
  var rv = fp.show();
  if (rv == nsIFilePicker.returnOK)  {
    //window.alert(fp.file.path);
    document.getElementById("txtFilePath").setAttribute('value',fp.file.path);    
  }  
}

function btnTest () {
  var tmpDocument=document.getElementById("tmpDocument");   
  //window.alert(tmpDocument.currentURI.spec+' '
  //  +tmpDocument.webProgress.isLoadingDocument);
  var obj=document.getElementById("lblMsg");
  obj.setAttribute('value',obj.value+' '
    +tmpDocument.currentURI.spec
    +tmpDocument.webProgress.isLoadingDocument
    +saveObj.saving+saveObj.saved);  
  window.alert(findLastRow().childNodes[1].getAttribute('label'));
  window.alert(document.getElementById('btnStop').getAttribute('disabled'));
}