var sort = require("./digit.js")
  , digit = sort.digit;
var CANVAS_WIDTH = 375
  , CANVAS_HEIGHT = 500
  , RADIUS = 8
  , MARGIN_TOP = 60
  , MARGIN_LEFT = 60;
function render(time,cxt){
  cxt.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  renderDigit(MARGIN_LEFT , MARGIN_TOP , parseInt(time/10) , cxt );
  renderDigit(MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(time%10) , cxt );
}

function renderDigit(x,y,num,cxt){
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
      if (digit[num][i][j]){
        cxt.beginPath();
        cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 ,2*Math.PI);
        cxt.closePath();
        cxt.fill();
      }
    } 
  }
}
function loopTime(time,cxt){
  render(time,cxt); 
  wx.drawCanvas({
    canvasId:"canvas",
    actions:cxt.getActions()
  });
}
function init(time,cxt){
  loopTime(time,cxt)
  var loop = setInterval(function(){
    time--;
    (time < 1 ) && (
      clearInterval(loop)
    )
    loopTime(time,cxt)
  },1000);
}

module.exports = {
  init:init
}
