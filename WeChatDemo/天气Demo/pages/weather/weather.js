var app = getApp();
Page({
  data:{
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.request();
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
    request:function(){
        wx.request({
          url: 'https://free-api.heweather.com/v5/forecast',
          data: {
              city:"shanghai",
              key:app.apikey
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
            }, // 设置请求的 header
          success: function(res){
            // success
            console.log(res.data);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    //push到添加城市页面
    addCity:function(){
        wx.navigateTo({
          url: '../addcityvc/addcityvc',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})