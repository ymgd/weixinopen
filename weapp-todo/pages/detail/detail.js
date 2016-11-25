var util = require('../../utils/util.js')
Page({
  data: {
    data: {}
  },
  onLoad: function (option) {
    let self = this;
    let id = option.id;
    let all = wx.getStorageSync('todo');
    all.map(function(todo) {
      if(todo.id == id) {
        self.setData({
          data: todo
        })
      }
    })
  }
})
