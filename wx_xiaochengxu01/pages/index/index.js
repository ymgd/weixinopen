//index.js
//获取应用实例
var app = getApp()
var page = {
  data: {
    phoneNumber: '',
    message: ''
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
  
  // 监听手机号输入
  listenPhoneInput: function(e) {
      this.data.phoneNumber = e.detail.value
  },

  // 查询手机号归属地
  queryHome4Phone: function() {
    var page = this
    console.log("手机号是"+ this.data.phoneNumber)
    wx.request({
      url: 'http://apis.juhe.cn/mobile/get',
      data: {
        phone: this.data.phoneNumber,
        key: '自己的key'
      },
      header: {
        'Content-Type': 'application/json',
      },
      success: function(res) {
        var result = res.data
        console.log(res.data)
        if(result.error_code == 201101) {
            page.setData({
              message: '手机号不能为空'
          })
        } else if(result.error_code == 201102) {
            page.setData({
              message: '错误的手机号码'
            })
        } else if(result.error_code == 201103) {
            page.setData({
              message: '查询无结果'
            })
        } else {
          page.setData({
            message: result.result.province + " " + result.result.city + " " + result.result.company
          })
        }
      }
    })
  },
}
Page(page)
