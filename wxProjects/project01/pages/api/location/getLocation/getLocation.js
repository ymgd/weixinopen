Page({
  data:{
      latitude:"",
      longitude:"",
      speed:"",
      accuracy:""
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
  getLocation:function(){
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
            console.log(res);
            var _latitude = res.latitude
            var _longitude = res.longitude
            var _speed = res.speed
            var _accuracy = res.accuracy
            that.setData({
                latitude:_latitude,
                longitude:_longitude,
                speed:_speed,
                accuracy:_accuracy
            })
        }
        })
  }
})