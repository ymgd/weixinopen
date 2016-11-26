//index.js
//获取应用实例
var focus
var isShowView
Page({
  data:{
    // text:"这是一个页面"
    focus:false,
    isShowView:true,
    messages:[
      {
        title:"+9.9500000",
        url:"/images/icon_recharge_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"-32.233223233",
        url:"/images/icon_extract_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"+9.9500000",
        url:"/images/icon_recharge_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"+9.9500000",
        url:"/images/icon_recharge_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"-32.233223233",
        url:"/images/icon_extract_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"+9.9500000",
        url:"/images/icon_recharge_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
      {
        title:"+9.9500000",
        url:"/images/icon_recharge_b.png",
        message:"yQedsakdaskldjahbmbsdkladlksajdksandklashlkd",
        time:"成功",
        count:0
      },
    ]
  },
  bindfocus:function(){
    this.setData({
      focus:true
    })
    this.setData({
      isShowView:false
    })
  },
  bindblur:function(){
    this.setData({
      focus:false
    })
    this.setData({
      isShowView:true
    })
  },
  InButton:function() {
    wx.navigateTo({
      url: '../receive/receive'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
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
