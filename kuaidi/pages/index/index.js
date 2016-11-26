//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    expressNo: null,
    expressInf: null,
    expressCom: null,
    array: ['汇通', '中通', 'EMS', '天天', '韵达', '圆通', '申通', '顺丰'],
    index: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  btnClick: function() {
    var thisPage = this;
    app.getExpressInfo(this.data.expressCom, this.data.expressNo, function(data){
      console.log(data)
      thisPage.setData({expressInfo:data})
    })
  },

  input: function(e) {
    this.setData({expressNo:e.detail.value})
  },

  // 快递公司选择器
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    if(this.data.index==0){
      this.setData({expressCom: 'ht'});
    } else if(this.data.index == 1) {
      this.setData({expressCom: 'zto'});
    } else if(this.data.index == 2) {
      this.setData({expressCom: 'ems'});
    } else if(this.data.index == 3) {
      this.setData({expressCom: 'tt'});
    } else if(this.data.index == 4) {
      this.setData({expressCom: 'yd'});
    } else if(this.data.index == 5) {
      this.setData({expressCom: 'yt'});
    } else if(this.data.index == 6) {
      this.setData({expressCom: 'sto'});
    } else if(this.data.index == 7) {
      this.setData({expressCom: 'sf'});
    }
    console.log(this.data.expressCom)
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
  }
})
