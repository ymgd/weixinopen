//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'this is a demo test!',
    userInfo: {},
    lati:0,
    longi:0,
    markers: [{
      latitude: 39.988570,
      longitude: 116.387070,
      name: '盘古大观写字楼',
      desc: '我现在的位置'
    }]
  },
  

  //获取用户信息
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    //获取位置信息
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          wx.openLocation({
            lati: res.latitude,
            longi: res.longitude,
            scale: 28
          })
        },
        fail:function(res) {
          console.log("fail");
          console.log(res);
        }
      });
  }
})