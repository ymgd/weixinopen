/**
 * 情绪音乐( v0.0.4)简化版
 * 开源地址地址： https://github.com/hank583746309/wmusic
 *               http://git.oschina.net/laohuangshu/wmusic
 */
var app = getApp()
var util = require('../../../utils/util.js')
//用于控制头像旋转 css 暂不可用
var intervalPic = null,loading = false,startTouchX = 0,endTouchX = 0,currentPosition = 0,currentDuration = 0;
Page({
  data: {
    hidden  : true

   // 程序中使用到底属性初始化值\
   ,sliderVisibility:'hidden'
   ,curPosition    : '00:00'
   ,musicTypeTitle : '频道选择'
   ,singername  : '未知'
   ,songname    : '未知'
   ,singerpic   : '../../../res/image/logo_music.png'
   ,songHash    : ''
   ,singerPicRotate : 0
   ,selectIndex : 0
   ,musicTypes : [
      {type:'calm'     ,src:"../../../res/image/calm"     ,title:'平静'}
     ,{type:'happy'    ,src:"../../../res/image/happy"    ,title:'愉快'}
     ,{type:'puzzled'  ,src:"../../../res/image/puzzled"  ,title:'困惑'}
     ,{type:'surprised',src:"../../../res/image/surprised",title:'惊讶'}
     ,{type:'angry'    ,src:"../../../res/image/angry"    ,title:'愤怒'}
     ,{type:'scared'   ,src:"../../../res/image/scared"   ,title:'恐惧'}
     ,{type:'sad'      ,src:"../../../res/image/sad"      ,title:'悲伤'}
     ,{type:'smiling'  ,src:"../../../res/image/smiling"  ,title:'爱心'}
    ]
    ,playList : []
    ,curMusicInfo : {}
  }
  
  ,onLoad: function () {
    var that = this;  
    //TODO 第二次进来时时,应还原播放状态,暂时没处理，播放器v0.0.5会解决此类问题
     wx.getBackgroundAudioPlayerState({
         success : function(){
             console.log(arguments);
         }
     });
    
    
    wx.onBackgroundAudioStop (function(e){ that.playNext();   });
    wx.onBackgroundAudioPause(function(e){
       that.clearRotate();  
       
    });
    wx.onBackgroundAudioPlay (function(e){ 
       that.setData({  sliderVisibility : 'hidden'  });
       
       that.clearRotate();
       that.bindRotate();

    });
  }


  ,catchtouchstart  : function(e){
     startTouchX = e.touches[0].screenX;  endTouchX = 0;currentPosition = 0;
  }
  ,catchtouchmove   : function(e){
     endTouchX = e.touches[0].screenX;
     //快进控制 
     var that = this;

     if(endTouchX > 0 && startTouchX < endTouchX){
        wx.getBackgroundAudioPlayerState({
            success : function(res){
              if(typeof res.duration == 'undefined'){ return; }
              
              if(currentPosition == 0){  currentPosition = res.currentPosition; wx.pauseBackgroundAudio(); }
              currentPosition += 1;
              if(currentPosition > res.duration){ currentPosition = res.duration; }
              that.setData({
                curPosition:util.formatString('当前: {0}/总时长: {1}秒',parseInt(currentPosition),parseInt(res.duration)),
                sliderVisibility : 'visible' 
              });
            }
        })
     }
  }
  ,catchtouchend    : function(e){
    //判定为向左滑
    if(endTouchX > 0 && endTouchX - startTouchX < 30){
        this.playNext();
    }
    // right
    if(endTouchX > 0 && startTouchX < endTouchX){
        this.play(currentPosition);
    }
    
  }
  ,loadErrorHandler : function(e){
     this.setData({singerpic : '../../res/image/logo_music.png' });
  }
  ,musicTypeHandler : function(e){
      if(loading){ return; } //加载中中 暂不允许继续
      
      var index = parseInt(e.currentTarget.dataset.index);
      this.setData({selectIndex:index});
      this.playNext();
  }
  ,playOrPauseHandler : function(){
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success : function(res){
         if(res.status == 1){ wx.pauseBackgroundAudio(); }else 
         if(res.status == 0){ that.play(res.currentPosition);  }
      }
    });
  }
  ,playNext:function(){
       var that = this,_type = that.data.musicTypes[that.data.selectIndex]['type'];
       if(loading){ return; }loading = true;
       that.setData({musicTypeTitle:'歌曲切换中...'});

       wx.request({
              url    : app.globalData.host + '/HMusic/bdServlet',
              data   : { method:'play',  'type'  : _type },
              success: function(res) {
                if(res.data && res.data.status == 'success'){
                    var music = res.data.data;

                    that.setData({ songHash : music.hash , singername: music.singername, songname  : music.songname ,singerpic : music.image || '../../res/image/logo_music.png' });
                    that.setData({ singerPicRotate : 0 });
                    that.setData({
                        curMusicInfo : {
                          dataUrl: music.url,
                          title  : music.songname,
                          singer : music.singername,
                          coverimageUrl: music.image || ''
                        }
                      });

                    that.play(); loading = false;that.setData({musicTypeTitle:'频道选择'});
                }else{  this.fail(); }
              },
              fail : function(){
                  loading = false; that.playNext();
              }
       })
      
  }
  ,play: function(position){
      var that = this;
      wx.playBackgroundAudio(that.data.curMusicInfo);
      //用于控制继续播放
      if(typeof position != 'undefined'){
         wx.seekBackgroundAudio({position : position})
      }
  },
  clearRotate : function(){
      if(intervalPic != null){ clearInterval(intervalPic); intervalPic = null;}
  },
  bindRotate  : function(){
       var that = this;
       intervalPic = setInterval(function(){
          if(that.data.singerPicRotate == 360){  that.setData({ singerPicRotate : 0 }); }
          that.setData({ singerPicRotate : (that.data.singerPicRotate + 1) });
        },50);
  }
})