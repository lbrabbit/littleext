var base = 30;
var factor =0;

function DelayLoop () {
  var i;

  i=0;
  do { i++; }
  while ((i<factor*base) && document.getElementById('UseDelay').checked);
  if (document.getElementById('UseDelay').checked) {
    window.setTimeout('DelayLoop()',2);
  }
}

function UpdateText(){
  factor=parseInt(document.getElementById('Dfactor').getAttribute("curpos"))+1;
  var Textf=document.getElementById('txtfactor');
  Textf.setAttribute("value",factor);
}

function StartDelay(){
  if (document.getElementById('UseDelay').checked) {
    //alert(document.getElementById('UseDelay').checked);
    DelayLoop();
  }  
}