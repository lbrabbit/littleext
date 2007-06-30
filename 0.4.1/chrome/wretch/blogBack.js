const delaySec=10;
var rows=new Array();
var blogPtr;
var delayCount=-1;
var loaded=false;
var listPage=0;
var listPageCount=0;

function OnLoad() {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.setAttribute('src',window.locstr+'&list=1');
  tmpDocument.addEventListener('load', testLoad, true);
  window.setTimeout('testLogin()',100);
  loaded=false;
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

function testLogin() {
  var tmpDocument=document.getElementById("tmpDocument");
  if (!loaded) {
    if (!tmpDocument.webProgress.isLoadingDocument) {
      if (tmpDocument.currentURI.spec!='about:blank') {
        window.setTimeout("changeSrc('"+tmpDocument.currentURI.spec+"')",1000*delaySec);
        tmpDocument.setAttribute('src','about:blank');      
      }
    }
    window.setTimeout('testLogin()',100);
    return;    
  } 
  tmpDocument=tmpDocument.contentDocument;
  var divThird2 = tmpDocument.getElementById("divThird2");  
  if (!divThird2) {
    window.setTimeout('testLogin()',100);
    return;
  }
  var aList = divThird2.getElementsByTagName("a"); 
  for (var i = aList.length-1; i>=0; i--) { 
    if (aList[i].getAttribute("class") == "powerin")  
      if (aList[i].getAttribute("href")==window.locstr) {
        collectRows();
        return;
      }
  }
//collectRows();
//return;
  //XPath does not work for malformed DingDing Pages
  //It would have saved me a lot of work
/*  var obj=document.evaluate("//a[@class='powerin']", document, 
    null, XPathResult.FIRST_ORDERED_NODE_TYPE,null); 
  if(obj.singleNodeValue.getAttribute("href")==window.locstr) {
    collectHrefs();
    return;
  }*/
  window.alert('本功只能為登入了的會員備份自己的網誌');
  window.close();
}

function collectRows(){
  //window.alert('成功了');
  var tmpDocument=document.getElementById("tmpDocument");
  if (!loaded) {
    if (!tmpDocument.webProgress.isLoadingDocument) {
      if (tmpDocument.currentURI.spec!='about:blank') {
        window.setTimeout("changeSrc('"+tmpDocument.currentURI.spec+"')",1000*delaySec);
        tmpDocument.setAttribute('src','about:blank');      
      }
    }
    window.setTimeout('collectRows()',100);
    return;    
  } 
  tmpDocument=tmpDocument.contentDocument;
  var objList=tmpDocument.getElementsByTagName("div"); 
  if (!objList) {
    window.setTimeout('collectRows()',100);
    return;
  }  
  for (var i = 0 ; i<objList.length; i++)  
    if (objList[i].getAttribute("class") == "articletext")
      break 
  if (i>=objList.length) {     
    //window.alert('有問題1...'+i); 
    window.setTimeout('collectRows()',100);
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
        rows.push(obj);
      }
    }
    listPage++;
    var tmpDocument=document.getElementById("tmpDocument");
    if (listPage<listPageCount+1) {
      tmpDocument.setAttribute('src',window.locstr+'&list=1&page='+listPage);  
      window.setTimeout('collectRows()',100);
      loaded=false;      
    }else {
      tmpDocument.removeEventListener('load', testLoad, true);
      buildLst();    
    }
  }
}


/*    var tmpstr='';
    for (var i = 0 ; i<rows.length; i++)  
      tmpstr+=rows[i].date+rows[i].title+rows[i].link;
    window.alert(tmpstr);*/

function buildLst () {
  var lstBlog=document.getElementById("lstBlog");
  for (var i = 0 ; i<rows.length; i++)  {
    var item = document.createElement("listitem");
    var col = document.createElement("label");
    col.setAttribute('value',rows[i].date);
    item.appendChild(col);
    var col = document.createElement("label");
    col.setAttribute('value',rows[i].title);
    item.appendChild(col);
    var col = document.createElement("label");
    col.setAttribute('value',rows[i].link);
    item.appendChild(col);
    lstBlog.appendChild(item);      
  }
  var obj=document.getElementById('lblMsg');
  obj.setAttribute('value','共有'+rows.length+'篇文章');
  var obj=document.getElementById('btnBlogBack');
  obj.setAttribute('disabled',false);
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

function blogBack () {
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
  //Backup  
  blogPtr=rows.length-1;
  //blogPtr=5;
  pollLoop();
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
  if (saveObj.saved && delayCount==-1) { 
    //var found=rows[blogPtr].link.match(/(\d+)$/);
    //var blogID=found[1];
    //localFileName=blogID+'.htm';
    var localFileName=rows[blogPtr].date+' '+rows[blogPtr].title;
    var obj=document.getElementById("lblMsg");
    obj.setAttribute('value',localFileName);
    var obj=document.getElementById("progress");
    obj.setAttribute('value',(rows.length-blogPtr+1)*100/rows.length);
    localFileName+='.htm';
    saveObj.localFileName=localFileName;
    saveObj.savePage(rows[blogPtr].link);
    blogPtr--;
    delayCount=delaySec;    
  } else if (saveObj.saved) {
    var obj=document.getElementById("lblMsg");
    obj.setAttribute('value','延時'+delayCount+'秒');
    delayCount--;
  } else if (!(saveObj.saving||saveObj.saved
    ||tmpDocument.webProgress.isLoadingDocument)) {
    blogPtr++;
    delayCount=delaySec;
    saveObj.saving=false;
    saveObj.saved=true;
    tmpDocument.setAttribute('src','about:blank');                
  }
      
  if (blogPtr>=0) {
    window.setTimeout('pollLoop()',1000);
  } else {
    window.alert('備份完畢');
  }
}

function btnTest () {
  var tmpDocument=document.getElementById("tmpDocument");   
  //window.alert(tmpDocument.currentURI.spec+' '
  //  +tmpDocument.webProgress.isLoadingDocument);
  var obj=document.getElementById("lblMsg");
  obj.setAttribute('value',obj.value+' '
    +tmpDocument.currentURI.spec+' '
    +tmpDocument.webProgress.isLoadingDocument);  
}