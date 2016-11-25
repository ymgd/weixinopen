Page({
  data:{
    netWorkType:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  getNetworkType:function(){

    var that = this
    wx.getNetworkType({
      success: function(res) {
        var _networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        that.setData({netWorkType:_networkType});
      }
    })
  }
})