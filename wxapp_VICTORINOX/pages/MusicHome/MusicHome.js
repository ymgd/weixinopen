var MusicHelper = require('controller/MusicHelper.js');
var errcodes = require('../../data/ErrCodes.js');


//获取应用实例
var app = getApp()
var musicHelper = new MusicHelper();
Page({
  data: {
    hot_song_list: [],
    userInfo: {},
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '挪威的森林',
    author: '伍佰',
    //action:{method:'play'},
    // src: '../../source/demo.mp3',
    src:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
  },
  customData: {

  },


  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (uinfo) {
      //更新数据
      that.setData({
        userInfo: uinfo
      })
    });

    musicHelper.requestMusicList(2, 0, 10, function (retCode, res) {
      console.log('retcode:', retCode);
      console.log('res:', res);

      if (retCode == errcodes.ret_ok) {
        that.setData(
          {
            hot_song_list: res.song_list
          }
        );
      }

    });

  },

  songClick:function(event){
    var that = this;
    console.log("songClick:", event);
    var id = event.currentTarget.id;
    if(id && id >= 0 && id < 10){
      //var url = "http://vip.baidu190.com/uploads/2017/2017116ca18e7b8c64bafa156c3138a95861c3.mp3";
      var url = "../../source/demo.mp3";
      // wx.stopVoice();
      // wx.playVoice({
      //   filePath: url,
      //   success: function(res){
      //     // success
      //     console.log('playVoice success:', res);
      //   },
      //   fail: function() {
      //      console.log('playVoice fail:');
      //     // fail
      //   },
      //   complete: function() {
      //     console.log('playVoice complete:');
      //     // complete
      //   }
      // })
    }
  }





})
