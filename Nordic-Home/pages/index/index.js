//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Spanking world',
    introduction: "住宅本身是活性的，它独立存在于时空之中，与四季、气象、居住者互动，甚至悄悄改变着居住者对生活形态。我们致力于北欧风格的诗性表达，为您带来独特而自然的感官体验。",
    timer: new Date(),
    avatarShow: true,
    nightMoodShow: false,
    userInfo: {},
    imageUrl: null,
    tel: "Tel:18735159854",
    contact: "前往线下体验店",
    btnText: "打开地图导航"
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  changePhoto: function () {

    var page = this; //通过这个变量传递this环境，解决了作用御的问题。

    wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths

    page.setData( { imageUrl: tempFilePaths } );
      }
    })
  },

  // nightMood: function () {
  //   this.setData( { nightMoodShow: !this.data.nightMoodShow } );
  //    console.log(this.data.nightMoodShow);
  // },

  updateTime() {
    this.setData({
      // timer: new Date(),
      timer: util.formatTime(new Date())
    });
  },

  onLoad: function () {
    console.log('onLoad')

    setInterval(()=>{
      this.updateTime();
    },1000)

    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

getLocation: function() {
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',

     success: function(res) {
    var latitude = res.latitude
    var longitude = res.longitude
    console.log(res)
    wx.chooseLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,

      success: function(res){
        console.log(res)
      }
    })
  }
    })
    // wx.chooseLocation({
    //     success: function(res) {
    // var latitude = res.latitude
    // var longitude = res.longitude
    // console.log(res)
    //     }
    // })
  }

})
