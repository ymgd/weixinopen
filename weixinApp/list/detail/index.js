var util = require('../../utils/util.js')

Page({
  data: {
    title: ''
  },
  onLoad: function (options) {
    
    console.log(options)
    var id = options.id

    var s_title = wx.getStorageSync('s_title')
    if(!id){
        return false;
    }
    var title = '';
    title = s_title[id].title;
    this.setData({
      title: title
    })
  }
})
