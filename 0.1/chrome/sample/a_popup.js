function extpath(){
  var extf = getExtFile();
  return extf.path;
}

function initwin(){
  var txtpath=document.getElementById('txtpath');
  txtpath.setAttribute("value",extpath());
}