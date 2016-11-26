//index.js
/**
 * 情绪音乐( v0.0.4)
 * 未尽事项事项 ： 受限于 AppID 下载功能无法使用，故离线部分部分 暂未完成
 * @version v0.0.4
 * @author 老皇叔 官方网站 ： http://118.178.85.4/ (备案完成后请访问 www.zhixingai.ren 知性爱人)
 * @date  2016.10.05 19:10 
 */
var app = getApp()
var util = require('../../utils/util.js')
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
   ,singerpic   : '../../res/img/logo_music.png'
   ,songHash    : ''
   ,singerPicRotate : 0
   ,selectIndex : 0
   ,musicTypes : [
      {type:'calm'     ,src:"../../res/img/calm"     ,title:'平静'}
     ,{type:'happy'    ,src:"../../res/img/happy"    ,title:'愉快'}
     ,{type:'puzzled'  ,src:"../../res/img/puzzled"  ,title:'困惑'}
     ,{type:'surprised',src:"../../res/img/surprised",title:'惊讶'}
     ,{type:'angry'    ,src:"../../res/img/angry"    ,title:'愤怒'}
     ,{type:'scared'   ,src:"../../res/img/scared"   ,title:'恐惧'}
     ,{type:'sad'      ,src:"../../res/img/sad"      ,title:'悲伤'}
     ,{type:'smiling'  ,src:"../../res/img/smiling"  ,title:'爱心'}
    ]
    ,playList : []
    ,curMusicInfo : {}
  }
  //用于节省内存
  // onHide : function(){ this.clearRotate(); }
  // ,onShow : function(){ this.bindRotate(); }
  ,onLoad: function () {
    var that = this,
    autoplay = wx.getStorageSync(app.key.isAutoPlay);
    
    app.getLastPlayInfo(function(res){
        if(res.url){
          that.setData({ songHash : res.songHash ,singername: res.singername, songname  : res.songname ,singerpic : res.singerpic || '../../res/img/logo_music.png' });

          that.setData({
              curMusicInfo : {
                dataUrl: res.url, title  : res.songname, singer : res.singername, coverImgUrl: res.singerpic || ''
              }
          });
          var _type = res.type,types = that.data.musicTypes;
          for(var i=0,len = types.length;i<len;i++){
              if(types[i]['type'] == _type){  that.setData({selectIndex: i }); break;}
          }
          
          if(res.status == 'play' && autoplay){ that.play(); }
          
        }

    });

    //如果不自动播放 且重新进入时 先暂停其他背景音乐
    if(!autoplay){
       wx.pauseBackgroundAudio();
    }
   
    wx.onBackgroundAudioStop (function(e){ that.playNext();   });
    wx.onBackgroundAudioPause(function(e){
       that.clearRotate();  
       app.setLastPlayInfo({  status : 'pause' });
    });
    wx.onBackgroundAudioPlay (function(e){ 
       that.setData({  sliderVisibility : 'hidden'  });
       
       that.clearRotate();
       that.bindRotate();

        //设置最后一次播放信息
        app.setLastPlayInfo({ 
          status : 'play'
          ,'type' :  that.data.musicTypes[that.data.selectIndex]['type'] 
          ,songHash  : that.data.songHash
          ,singername: that.data.singername
          ,songname  : that.data.songname
          ,url       : e.dataUrl          
          ,singerpic : that.data.singerpic || ''
        });

        //TODO 记录播放历史【可以与lastplayinfo合并 暂不处理】
        app.recordPlayInfo({
          'type' :  that.data.musicTypes[that.data.selectIndex]['type'] 
           ,hash : that.data.songHash
           ,singername : that.data.singername
           ,songname   : that.data.songname
           ,alum       : that.data.singerpic || ''
           ,url        : e.dataUrl
           ,lasttime   : (new Date()).getTime()			 //最后一次播放时间
        });

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
     this.setData({singerpic : '../../res/img/logo_music.png' });
  }
  ,settingHandler   : function(e){
     wx.navigateTo({url : '../setting/setting'});
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
       //如果网络错误导致死循环？
       wx.request({
              url    : 'http://www.zhixingai.ren/HMusic/bdServlet',// http://118.178.85.4/HMusic/bdServlet http://127.0.0.1:8080/HMusic/bdServlet
              data   : { method:'play',  'type'  : _type },
              success: function(res) {
                if(res.data && res.data.status == 'success'){
                    var music = res.data.data;

                    that.setData({ songHash : music.hash , singername: music.singername, songname  : music.songname ,singerpic : music.image || '../../res/img/logo_music.png' });
                    that.setData({ singerPicRotate : 0 });
                    that.setData({
                        curMusicInfo : {
                          dataUrl: music.url,
                          title  : music.songname,
                          singer : music.singername,
                          coverImgUrl: music.image || ''
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

  //这个方法方法 自己可以随意更正更正 保证数据接口一致即可 v0.0.3 固定一个接口 以下俩将接口作废 敬请期待[已作废]
  /*,randomMusic : function(i){
      var that    = this;
      var singer  = ['黑龙','westlife','许巍','崔健','伍佰','王菲','张学友','张宇'][i];
      var page    = parseInt(Math.random()*5 + 1, 10);

      wx.request({
            url: 'http://118.178.85.4/HMusic/bdServlet',
            data: {
              method:'query',
              params: singer,
              page  : page
            },
            success: function(res) {
              that.setData({ hidden: true  })
              if(res.data && res.data.status == 'success'){
                  that.setData({
                    playList : res.data.data.data
                  })
                   
                  that.playMusic();
              }
            },
            fail : function(){
              that.setData({ hidden: true  })
            }
        })
  }
  ,playMusic : function(){
      var that    = this;
      var playList = that.data.playList;
      if(playList.length == 0){ 
        var i = this.data.selectIndex;
        i++;
        if(i > 8){ i = 0 }
        that.randomMusic(i); 
        return;
      }
      
      var music = playList.shift();
      wx.request({
          url: 'http://118.178.85.4/HMusic/bdServlet',
          data: {
              method:'playinfo',
              hash  : music.hash
          },
          success: function(res) {
              if(res.data && res.data.status == 'success'){
                  that.setData({ singername: music.singername, songname  : music.songname  });

                  that.setData({ singerPicRotate : 0 });
                  
                  that.setData({
                    curMusicInfo : {
                      dataUrl: res.data.data.url,
                      title  : music.songname,
                      singer : music.singername,
                      coverImgUrl: 'http://img2.imgtn.bdimg.com/it/u=2355890692,3670237808&fm=21&gp=0.jpg'
                    }
                  });

                 that.play();
                
                 var autodown = wx.getStorageSync(app.key.isAutoDown),url = res.data.data.url;
                 if(autodown){
                   wx.getNetworkType({
                    success: function(res) {
                       // 返回网络类型2g，3g，4g，wifi
                      if('wifi' == res.networkType){
                          wx.downloadFile({ 
                              url : url,success : function(res){ 
                                wx.saveFile({ tempFilePath: res.tempFilePath,success: function(res) { var savedFilePath = res.savedFilePath  }  }) } 
                           })
                      }
                    }
                  })
                   
                 }
              }else{
                 that.playMusic();
              }
          }
      })
  },*/
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