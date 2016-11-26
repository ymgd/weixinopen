//app.js
App({
  onLaunch: function () {
    
    var autodown = wx.getStorageSync(this.key.isAutoDown),
        autoplay = wx.getStorageSync(this.key.isAutoPlay);
    if(typeof autodown == 'undefined' || ('' + autodown) == ''){ wx.setStorageSync(this.key.isAutoDown, true)  }
    if(typeof autoplay == 'undefined' || ('' + autoplay) == ''){ wx.setStorageSync(this.key.isAutoPlay, true)  }
        
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  recordPlayInfo  : function(info){
     /*
       { 
            type:{
              hash : { //hash码
                  num : 1,				 // 播放次数
                  singername : '歌手',
                  songname   : '歌名',,
                  alum       : '专辑/照片',
                  loc_alum   : '本地',
                  url        : '播放地址',
                  loc_url    : '本地地址',
                  lasttime   : 1000			 //最后一次播放时间
              }

            },
            type :{}
        }
     */
      var that = this,data = wx.getStorageSync(that.key.recordPlayInfo);
      if(data == ''){ data = {}; }

      var _type = data[info.type] || {},_info = _type[info.hash];
      if(typeof _info == 'undefined'){
          info.num = 1;
          _info = info;
      }else{
          for(var key in info){  _info[key] = info[key]; }
            _info.num = (_info.num || 1 ) +  1;
      }

      if(typeof data[info.type] === 'undefined'){ data[info.type] = {}; }

      data[info.type][info.hash] = _info;
        
      wx.setStorage({ key : that.key.recordPlayInfo , data : data});
  } 
  ,getPlayInfos    : function(cb){
     if(typeof cb == "function"){ 
       var info = wx.getStorageSync(this.key.recordPlayInfo);
       cb(info == '' ? {} : info); 
     }
  }
  ,getLastPlayInfo : function(cb){
      var that = this;
      if(typeof cb == "function"){
        var info = wx.getStorageSync(that.key.lastPlayInfo);
        cb(info == '' ? {} : info);
      }
  },
  setLastPlayInfo : function(info){
      var that = this;
      this.getLastPlayInfo(function(res){
            for(var key in info){
                res[key] = info[key];
            }
            wx.setStorageSync(that.key.lastPlayInfo,res);
      });
  },
  key : {
     //是否自动下载
     isAutoDown   : '_is_autodown'
     ,isAutoPlay  : '_is_autoplay'
     ,lastPlayInfo: '_last_playinfo'
     ,recordPlayInfo : '_record_play_info'
  }
})