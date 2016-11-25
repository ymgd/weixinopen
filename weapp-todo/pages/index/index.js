//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: '',
    text: '',
    done: false,
    showlist: [],
    allList: wx.getStorageSync('todo') || [],
    id: wx.getStorageSync('id') || 0
  },
  //input输入
  bindKeyInput: function(e) {
    this.setData({
      text: e.detail.value
    })
  },
  //切换完成状态
  switch: function(data) {
    if(data.currentTarget.dataset.idx == 'done') {
      this.setData({
        done: true
      })
    }
    else { 
      this.setData({
        done: false
      })
    }
    this.show(this.data.done)
  },
  //当前显示列表
  show: function(status) {
    let self = this;
    let list = [];
    if(self.data.done) {
      self.data.allList.map(function(todo) {
        if(todo.status) {
          list.push(todo)
        }
      })
    }
    else {
      self.data.allList.map(function(todo) {
        if(!todo.status) {
          list.push(todo)
        }
      })
    }
    this.setData({
      showList: list
    })
  },
  //添加任务
  newtodo: function() {
    let self = this;
    let list = self.data.allList;
    list.push({
      value: self.data.text,
      time: util.formatTime(new Date()),
      status: false,
      id: self.data.id
    })
    self.setData({
      allList: list,
      text: ''
    })
    
    self.setStorage();
    self.setData({
      id: self.data.id + 1
    })
    this.show(this.data.done);
    
    wx.setStorageSync('id', self.data.id);
  },
  setStorage: function() {
    let self = this;  
    const key = 'todo';
    wx.setStorageSync('todo', self.data.allList)
  },
  //完成任务
  switchChange: function(e) {
    let list = this.data.allList;
    list[e.target.dataset.index].status = !!e.detail.value[0]
    this.setData({
      allList: list
    })
    this.show(this.data.done);
  },
  gotoDetail: function(e) {
    let id = e.currentTarget.dataset.rowId;
    wx.navigateTo({
      url: '../detail/detail?id='+ id
    })
  },
  onLoad: function () {
    var that = this;
    this.show(this.data.done);
    //wx.clearStorage()
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      that.update()
    })
  }
})
