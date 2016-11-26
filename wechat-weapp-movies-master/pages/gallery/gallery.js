Page({
  data:{
    // text:"这是一个页面"
    url: '',
    screenHeight: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
        url: options.url
    })
    wx.getSystemInfo({
        success: function(res){
            that.setData({
                screenHeight: res.windowHeight
            })    
        }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onImgClick: function(e) {
      //wx.navigateBack();
  },
  onImgLongClick: function(e) {
      var that = this;
      wx.showActionSheet({
          itemList: ['保存到手机', '预览', '转发'],
          success: function (res) {
              if (!res.cancel) {
                  switch (res.tapIndex) {
                      case 0:
                          saveImage(that);
                          break;
                      case 1:
                          preview(that);
                          break;
                      case 2:
                          forward(that);
                          break;
                  }
              }
          }
      })
  }
}) 

function saveImage(that) {
    wx.downloadFile({
          url: that.data.url,
          type: 'image',
          success: function(res) {
            console.log('保存成功:' + res.tempFilePath);
            wx.showModal({
                title: '提示',
                content: '保存成功',
                showCancel: false,
                success: function (res) {
                    if (res.confirm == 1) {
                        console.log('用户点击确定');
                    }
                }
            })
          },
          fail: function(e) {
            console.log('保存失败!');
            wx.showToast({
                title: '保存失败',
                icon: 'success'
            })
          }
      })
}

function preview(that) {
    wx.showToast({
        title: '预览',
        icon: 'success'
    })
}

function forward(that) {
    wx.showToast({
        title: '转发',
        icon: 'success'
    })
}