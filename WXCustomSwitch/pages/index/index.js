//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    switchData: [
      {
        id: 1,
        color: 'darkorange',
        isOn: false
      },
      {
        id: 2,
        color: 'darksalmon',
        isOn: true
      },
      {
        id: 3,
        isOn: false,
      },
      {
        id: 4,
        color: 'firebrick',
        isOn: true
      }
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapSwitch: function(event) {
    var index = event.currentTarget.id - 1;
    this.data.switchData[index].isOn = !this.data.switchData[index].isOn
    this.setData({
        switchData: this.data.switchData
    });
  }
})
