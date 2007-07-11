const nsIFilePicker = Components.interfaces.nsIFilePicker;
var delayCount=-1;
var loaded=false;
var listPage=0;
var listPageCount=0;

function OnLoad() {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.addEventListener('load', testLoad, true);
  if (window.locstr.indexOf("http://www.wretch.cc/blog/")!=-1) {
    tmpDocument.setAttribute('src',window.locstr+'&list=1');
    window.setTimeout('collectBlogRows()',100);
    loaded=false;
    document.title='網誌備份';
  }else if (window.locstr.indexOf("http://www.wretch.cc/guestbook/")!=-1){
    tmpDocument.setAttribute('src',window.locstr);
    window.setTimeout('collectGuestRows()',100);
    loaded=false;
    document.title='留言備份';
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

function collectBlogRows(){
  //window.alert('成功了');
  var tmpDocument=document.getElementById("tmpDocument");
  if (!loaded) {
    if (!tmpDocument.webProgress.isLoadingDocument) {
      if (tmpDocument.currentURI.spec!='about:blank') {
        window.setTimeout("changeSrc('"+tmpDocument.currentURI.spec+"')",1000*delaySec);
        tmpDocument.setAttribute('src','about:blank');      
      }
    }
    window.setTimeout('collectBlogRows()',100);
    return;    
  }
  tmpDocument=tmpDocument.contentDocument;
  var divThird2 = tmpDocument.getElementById("divThird2");  
  if (!divThird2) {
    window.setTimeout('collectBlogRows()',100);
    return;
  }   
  var objList=tmpDocument.getElementsByTagName("div"); 
  for (var i = 0 ; i<objList.length; i++)  
    if (objList[i].getAttribute("class") == "articletext")
      break 
  if (i>=objList.length) {     
    //window.alert('有問題1...'+i); 
    window.setTimeout('collectBlogRows()',100);
    return;
  } else {
    var articletext=objList[i];
    if (listPageCount==0) {
      objList=articletext.getElementsByTagName("div");
      for (var i = 0 ; i<objList.length; i++)  
        if (objList[i].getAttribute("class") == "list-linkcontrol")
          break    
      if (i>=objList.length) {     
        window.alert('有問題2...'); 
      } else {
        objList=objList[i].getElementsByTagName("a");
        if (objList.length>0) {
          //window.alert(objList[objList.length-2]+'  '+objList.length)
          listPageCount=objList.length;
        } else {
          listPageCount=1;
        }        
      }
      listPage=1;
    }
    objList=articletext.getElementsByTagName("table");
    objList=objList[0].getElementsByTagName("td");
    for (var i = 0 ; i<objList.length; i++) { 
      var found;
      if (found=objList[i].innerHTML
        .match(/(\d{4}\.\d{2}\.\d{2})\s\<a\shref=\"([^\>\<\"]+)\"\>(.+)<\/a\>/m)) {
        var obj={};
        obj['date']=found[1].replace(/\./g,'-');
        obj['link']=found[2].replace('&amp;','&');
        obj['title']=normTitle(found[3]);
        buildLst(obj);
      }
    }
    listPage++;
    var tmpDocument=document.getElementById("tmpDocument");
    if (listPage<listPageCount+1) {
      tmpDocument.setAttribute('src',window.locstr+'&list=1&page='+listPage);  
      window.setTimeout('collectRows()',100);
      loaded=false;      
    }else {
      setupBtn();
    }
  }
}

function collectGuestRows(){
  var tmpDocument=document.getElementById("tmpDocument");
  if (!loaded) {
    if (!tmpDocument.webProgress.isLoadingDocument) {
      if (tmpDocument.currentURI.spec!='about:blank') {
        window.setTimeout("changeSrc('"+tmpDocument.currentURI.spec+"')",1000*delaySec);
        tmpDocument.setAttribute('src','about:blank');      
      }
    }
    window.setTimeout('collectGuestRows()',100);
    return;    
  }
  tmpDocument=tmpDocument.contentDocument;
  var obj = tmpDocument.getElementById("banner");  
  if (!obj) {
    window.setTimeout('collectGuestRows()',100);
    return;
  }   
  obj=obj.getElementsByTagName("span");
  obj=obj[0];
  var guestPageCount = Math.ceil(parseInt(obj.innerHTML.match(/\:\s*(\d+)\s*\</)[1],10)/10);
  //window.alert(guestPageCount);
  var userName=window.locstr.match(/guestbook\/([^\&]+)/)[1];
  for (i=guestPageCount;i>=1;i--) {
    var obj={};
    obj['date']='';
    obj['link']='http://www.wretch.cc/guestbook/'+userName+'&page='+i;
    obj['title']='留言第'+i+'頁';
    buildLst(obj);
  }
  setupBtn();  
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.setAttribute('src','about:blank');  
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
  instring=instring.replace(/\<img[^\>]+\>/g,'ICO ');
  
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
  var obj=document.getElementById('btnBack');
  obj.setAttribute('disabled','false');
  var obj=document.getElementById('btnStop');
  obj.setAttribute('disabled','true');  
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
      if (document.getElementById('btnStop').getAttribute('disabled')=='false')
        window.setTimeout('pollLoop()',1000);
    } else if (!(saveObj.saving||saveObj.saved
      ||tmpDocument.webProgress.isLoadingDocument)) {
      delayCount--;
      saveObj.saving=false;
      saveObj.saved=true;
      tmpDocument.setAttribute('src','about:blank');
      if (document.getElementById('btnStop').getAttribute('disabled')=='false')
        window.setTimeout('pollLoop()',1000);
    } else {
      window.setTimeout('pollLoop()',1000);
    }   
  } else {
    window.alert('備份完畢');
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