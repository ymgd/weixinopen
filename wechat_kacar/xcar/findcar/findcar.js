Page({
  data: {
    src:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46",
  },
  onReady:function(e) {
    this.audioCtx = wx.createAudioContext('myAudio');
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    //this.refresh();
  },
  audioPlay:function() {
    this.audioCtx.play()
  },
  audioPause:function() {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  showSheet:function(e) {
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost/wei/', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'user': 'test'
          },
          success: function(res){
            var data = res.data
            //do something
            console.log("success");
            console.log(res);
            wx.saveFile({
              tempFilePath: tempFilePath,
              success: function(res) {
                var savedFilePath = res.savedFilePath
              }
            })
          },
          fail:function(res){
            console.log("fail");
            console.log(res);
          }
        })
      }
    })
  }

});
