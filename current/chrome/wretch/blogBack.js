var rows=new Array();
var blogPtr;
delayCount=-1;

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
  filePath = Components.classes["@mozilla.org/file/local;1"]
    .createInstance(Components.interfaces.nsILocalFile);
  try {
    filePath.initWithPath(fileName);  
  } catch(e) {
    window.alert('路徑不對喔！');
    return;    
  }
  if( !filePath.exists() || !filePath.isDirectory() ) {
    window.alert('路徑不對喔！');
    return;
  }
  //Backup  
  blogPtr=rows.length-1;
  //blogPtr=5;
  pollLoop();
}

function pollLoop() {
  if (saved && delayCount==-1) { 
    //var found=rows[blogPtr].link.match(/(\d+)$/);
    //var blogID=found[1];
    //localFileName=blogID+'.htm';
    localFileName=rows[blogPtr].date+' '+rows[blogPtr].title;
    var obj=document.getElementById("lblMsg");
    obj.setAttribute('value',localFileName);
    var obj=document.getElementById("progress");
    obj.setAttribute('value',(rows.length-blogPtr+1)*100/rows.length);
    localFileName+='.htm';
    savePage(rows[blogPtr].link);
    blogPtr--;
    delayCount=10;    
  } else if (saved) {
    var obj=document.getElementById("lblMsg");
    obj.setAttribute('value','延時'+delayCount+'秒');
    delayCount--;
  }
  
  if (blogPtr>=0) {
    window.setTimeout('pollLoop()',1000);
  } else {
    window.alert('備份完畢');
  }
}

function OnLoad() {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.setAttribute('src',window.locstr+'&list=1');
  tmpDocument.addEventListener('load', testLogin, true);
}

function testLogin(evt) {
  var tmpDocument=document.getElementById("tmpDocument");
  tmpDocument.removeEventListener('load', testLogin, true);
  tmpDocument=evt.target;  
  var divThird2 = tmpDocument.getElementById("divThird2");  
  var aList = divThird2.getElementsByTagName("a"); 
  for (var i = aList.length-1; i>=0; i--) { 
    if (aList[i].getAttribute("class") == "powerin")  
      if (aList[i].getAttribute("href")==window.locstr) {
        collectRows(tmpDocument);
        return;
      }
  }
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

function collectRows(tmpDocument){
  //window.alert('成功了');
  var objList=tmpDocument.forms[0].getElementsByTagName("div"); 
  for (var i = 0 ; i<objList.length; i++)  
    if (objList[i].getAttribute("class") == "articletext")
      break 
  if (i>=objList.length) {     
    window.alert('有問題...'); 
  } else {
    var objList=objList[i].getElementsByTagName("table");
    var objList=objList[0].getElementsByTagName("td");
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
/*    var tmpstr='';
    for (var i = 0 ; i<rows.length; i++)  
      tmpstr+=rows[i].date+rows[i].title+rows[i].link;
    window.alert(tmpstr);*/
    
    buildLst();
  }
}

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