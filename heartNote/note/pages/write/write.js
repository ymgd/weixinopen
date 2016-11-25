//获取应用实例
var app = getApp()
Page({
  data: {
    title: '',
    content: ''
  },
  onShow:function(){
    wx.getStorage({
      key: 'note',
      fail: function(res){
        wx.setStorage({
          key: 'note',
          data: []
        })
      }
    })
  },
  bindTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  save:function(e) {
    var that = this
    var noteData = {
      title: that.data.title,
      content: that.data.content,
      date: new Date()
    }
    var data = []
    wx.getStorage({
      key: 'note',
      success: function(res){
        data = res.data;
        console.log(noteData)
        data.push(noteData);
        console.log(data);
        wx.setStorage({
          key: 'note',
          data: data,
          success: function() {
            wx.showModal({
              title: '保存成功',
              content: '确定之后去查看',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        })
      },
    })
  }
})
