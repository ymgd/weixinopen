Page({
  data:{
    imageSrc:'../../image/default.jpg',
    imageHeight:560,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log(options);
    wx.getSystemInfo({
      success: function(res) {
          console.log("width="+res.windowWidth+", height="+res.windowHeight);
          that.setData({
            imageSrc:options.imagepath,
            imageHeight:res.windowHeight*0.98
        });
      }
    })
  },
  deletePhoto:function(event){
    // 确认是否删除
    wx.showModal({
      title:"删除照片",
      content:"确认删除？",
      
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeSavedFile({
            filePath: event.target.dataset.imagePath,
            success: function(res){
              // 返回到相册页 photogallery
              wx.navigateBack();
            }
          })
        }
      }
    });
  }
})