//index.js
//获取应用实例
var app = getApp()
Page({
  // 页面初始数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    text:"init data",
    array:[{text:'array data'}],
    object:{
      text:"object data"
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeText: function() {
    this.setData({
      text:"changed date"
    })
  },
  changeItemInArray: function() {
    var changedData = {};
    var index = 0;
    changedData['array[' + index + '].text'] = 'changed data array';
    this.setData(changedData);
  },
  changeItemObject: function() {
    this.setData({
      "object.text":'changed data obj'
    });
  },
  addNewField: function() {
    this.setData({
      "newField.text":"new Field"
    });
  },

  // 生命周期函数
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
  onReady: function () {
    console.log("onReady");
  },
  onShow:function () {
    console.log("onShow");
  },
  onHide: function() {
    console.log("onHide")
  },
  onUnload: function () {
    console.log("onUnload")
  }
})
