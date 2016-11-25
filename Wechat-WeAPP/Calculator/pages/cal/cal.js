//index.js
//获取应用实例
var rpn = require("../../utils/rpn.js");
var app = getApp()
Page({
  data: {
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5:"9",
    id6:"8",
    id7:"7",
    id8:"-",
    id9:"6",
    id10:"5",
    id11:"4",
    id12:"×",
    id13:"3",
    id14:"2",
    id15:"1",
    id16:"÷",
    id17:"0",
    id18:".",
    id19:"history",
    id20:"=",
    screenData:"0",
    lastIsOperator: false,
    logs: []   
  },
  //事件处理函数
 
  onLoad: function () {
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUpload: function () {

  },
  history: function () {
    wx.navigateTo({
      url:'../list/list'
    })
  },
  clickButton: function (event) {
    console.log(event);
    var data = this.data.screenData.toString();
    var id = event.target.id;
    if(id == this.data.id1) {
      if(data == 0){
        return;
      }
      console.log(data);
      console.log("data.substring(0,data.length-1)"+data.substring(0,data.length-1));
      var data = data.substring(0,data.length-1);
      console.log(data);
    } else if(id == this.data.id2) {
      data = 0;
    } else if (id == this.data.id3) {
      var firstWord = data.substring(0,1);
      if(firstWord != '-'){
        data = '-' + data;
      } else {
        data = data.substring(1);
      }
    } else if (id == this.data.id20){
      if(data == 0) {
        return;
      }
      var lastWord = data.substring(data.length-1, data.length);
      if(isNaN(lastWord)) {
        return;
      }
      console.log("parseFloat(data)"+parseFloat(data));
      console.log("data"+data)
      if(parseFloat(data) == data){
        return;
      }
      var log = data;
      var data = rpn.calCommonExp(data);
      log = log + '=' +data;
      this.data.logs.push(log);
      wx.setStorageSync('callogs',this.data.logs)
      console.log(wx.getStorageSync('callogs'));
    } else {
      if(id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        if(this.data.lastIsOperator || data == 0) {
          return;
        }
      }
      if(data == 0) {
        data = id;
      } else {
        data = data + id
      }
      if(id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        this.setData({lastIsOperator:true});
      } else {
        this.setData({lastIsOperator:false})
      }
    }

    this.setData({
        screenData:data 
    })
  }
})
