const xtc = require('../../libraries/douban.js')

Page({
  data:{
    // text:"这是一个页面"
    switchOb:{relateTrainNumber:"G1350"}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    xtc.getTrainInfo(switchOb).then(data => console.log(data))
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})