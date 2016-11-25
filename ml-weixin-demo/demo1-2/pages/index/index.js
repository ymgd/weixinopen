//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    // userImageUrl: "https://www.wangcaigu.com/template/default/Public/images/favicon.icov",
    userImageUrl: null,
    changeImageBtn: '更换头像'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击按钮：改变图像函数
  changeImageClick: function(){

      var page = this;

      //APIAPI 上传图片（从本地相册选择图片或使用相机拍照）
       wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths

             console.log(tempFilePaths)
            page.setData({userImageUrl: tempFilePaths})
          }
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
    }
})
