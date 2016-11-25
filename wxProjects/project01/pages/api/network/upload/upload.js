Page({
  data:{
    msg:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  uploadImage:function(){
   
    var that = this;
      wx.chooseImage({
        success: function(res) {
            var tempFilePaths = res.tempFilePaths
             that.setData({msg:tempFilePaths});
            wx.uploadFile({
            url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData:{
                'user': 'test'
            },
            success: function(res){
                var data = res.data
                //do something
                that.setData({msg:data});
            }
            })
        },
        fail:function(error){
            that.setData({msg:error});
          }
        })
  },

  download:function(){
    wx.downloadFile({
      url: 'http://example.com/audio/123', //仅为示例，并非真实的资源
      success: function(res) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    })
  }


})