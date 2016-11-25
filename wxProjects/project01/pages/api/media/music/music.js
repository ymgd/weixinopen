
var util = require('../../../../utils/util.js')
Page({
  data:{
   status:"",
   dataUrl:"",
   currentPosition:"",
   duration:"",
   downloadPercent:""
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
  playMusic:function(){
      console.log("play...");
      wx.playBackgroundAudio({
            // dataUrl: '../../../../media/music.mp3',
            dataUrl:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
            title: '音乐标题',
            coverImgUrl: '../../../../images/icon.png'
        })
  },
  pauseMusic:function(){
    wx.pauseBackgroundAudio()
  },
  stopMusic:function(){
    wx.stopBackgroundAudio()
  }
  // playerState:function(){
  //   var that = this
  //   wx.getBackgroundAudioPlayerState({
  //       success: function(res) {
    
  //           that.setData({
  //             status:res.status,
  //             dataUrl:res.dataUrl,
  //             currentPosition:util.formateTime(res.currentPosition),
  //             duration:res.util.formateTime(res.duration),
  //             downloadPercent:res.downloadPercent
  //           })
  //       }
  //   })
  // }

})