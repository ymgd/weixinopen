// 详情

Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
  },
  onReady:function(){
    // 页面渲染完成
    console.log('onReady')
    wx.setNavigationBarTitle({
        title: '西部世界'
    })
  },
  onShow:function(){
    // 页面显示
    console.log('onShow')
  },
  onHide:function(){
    // 页面隐藏
    console.log('onHide')
  },
  onUnload:function(){
    // 页面关闭
    console.log('onUnload')
  }
})