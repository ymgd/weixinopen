//common/tag.js

function sayHello(name) {
  console.log('Hello ' + name + '!')
}

//头部导航条跳转
function turnToTag(event) {
  var tagId = event.currentTarget.id;
  var tagUrl = '/pages/news/list/news';
  if(tagId=='news'){
    tagUrl = '/pages/news/list/news';
  }else if(tagId=='audio'){
    tagUrl = '/pages/radio/list/radiolist';
  }else if(tagId=='china'){
    tagUrl = '/pages/china/list/news';
  }else if(tagId=='zhengzhou'){
    tagUrl = '/pages/zhengzhou/list/zhengzhoulist';
  }else if(tagId=='ballot'){
    tagUrl = '/pages/ballot/list/ballotlist';
  }
  var app = getApp();
  var currentPage = app.getCurrentPage();
  var currentUrl =  "/"+currentPage.__route__;
  if(tagUrl!=currentUrl){
    wx.redirectTo({
      url: tagUrl
    })
  }else{
    console.log('不用跳转')
  }
  
}
//对外暴露接口
module.exports = {
  sayHello: sayHello,
  turnToTag:turnToTag
}