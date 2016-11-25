var util = require('../../utils/util.js')
var app = getApp()

var MusicPlayType = {
    PLAY_LOOP    : 0,
    PLAY_SHUFFLE : 1,
    PLAY_ONE     : 2
};

Page({
    data: {
        // text:"这是一个页面"
        playList: [],
        playIndex: 0,
        showPlayList: true,
        playingMusic: {},
        musicTime: 0,
        currTime: 0,
        musicTimeStr: 0,
        currTimeStr: 0,
        isPlay: false,
        playInv: 0,
        playPro: '',
        playType: 1
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        var list = app.globalData.playList;
        var playingMusic = null;
        if (list.length) {
            var index = app.globalData.playIndex;
            index = (list.length - 1 < index) ? list.length - 1 : index;
            this.setData({
                playList: list,
                playIndex: index
                // playingMusic: playingMusic
            });
        }

        playingMusic = list[index];
        self.playMusic(playingMusic);


        // var inv = setInterval(function () {
        //     wx.({
        //         success: function (res) {
        //             var status = res.status;
        //             if (status == 1) {
        //                 clearInterval(inv);
        //
        //                 var musicTime = res.duration, currTime = res.currentPosition;
        //                 var musicTimeStr = self.timeToString(musicTime);
        //                 var currTimeStr = self.timeToString(currTime);
        //                 var pro = (currTime / musicTime).toFixed(1) + '%';
        //
        //                 var tempinv = setInterval(function () {
        //                     var _currTime = self.data.currTime + 1;
        //                     var _currTimeStr = self.timeToString(_currTime);
        //                     var _pro = (_currTime / musicTime * 100).toFixed(1) + '%';
        //
        //                     self.setData({
        //                         currTime: _currTime,
        //                         currTimeStr: _currTimeStr,
        //                         playInv: tempinv,
        //                         playPro: _pro
        //                     })
        //                 }, 1000);
        //
        //                 self.setData({
        //                     currTime: res.currentPosition,
        //                     musicTime: res.duration,
        //                     musicTimeStr: musicTimeStr,
        //                     currTimeStr: currTimeStr,
        //                     playPro: pro,
        //                     isPlay: true,
        //                     playInv: tempinv
        //                 })
        //
        //             }
        //         },
        //         fail: function () {
        //
        //         }
        //     })
        // }, 1000)
    },
    // 时间格式的转换
    timeToString: function (time) {
        var str = '';
        str = (time / 60).toFixed(0) + ':' + ((time % 60).toFixed(0).length < 2 ? '0' + (time % 60).toFixed(0) : (time % 60).toFixed(0))
        return str;
    },
    // 修改播放类型，
    changePlayType: function (e) {
        var dataSet = e.currentTarget.dataset;
        if (dataSet.type == MusicPlayType.PLAY_SHUFFLE) {
            this.setData({
                playType: MusicPlayType.PLAY_ONE
            });
        }
        if (dataSet.type == MusicPlayType.PLAY_ONE) {
            this.setData({
                playType: MusicPlayType.PLAY_LOOP
            });
        }
        if (dataSet.type == MusicPlayType.PLAY_LOOP) {
            this.setData({
                playType: MusicPlayType.PLAY_SHUFFLE
            });
        }
    },

    closePlayList: function (e) {
        this.setData({
            showPlayList: true
        })
    },

    showPlayList: function (e) {
        this.setData({
            showPlayList: false
        })
    },
    pauseTap: function () {
        var self = this;

    },
    
    playNextMusic: function () {
        var self = this;
        var playInv = this.data.playInv;
        var list = this.data.playList;
        var index = this.data.playIndex;
        var playType = this.data.playType;
        var playingMusic = this.data.playingMusic;
        clearInterval(playInv);

        if (list.length == 0) {
            self.playMusic(playingMusic);
            return;
        }
        if(playType != MusicPlayType.PLAY_ONE) {
            index ++;
        }

        (index == list.length) && (index = 0);
        self.setData({
            playIndex: index
        });
        var music = list[index];
        self.playMusic(music);
    },
    playPrevMusic: function () {
        var self = this;
        var playInv = this.data.playInv;
        var list = this.data.playList;
        var index = this.data.playIndex;
        var playType = this.data.playType;
        var playingMusic = this.data.playingMusic;
        clearInterval(playInv);

        if (list.length == 0) {
            self.playMusic(playingMusic);
            return;
        }
        if(playType != MusicPlayType.PLAY_ONE) {
            index --;
        }

        (index == -1) && (index = list.length-1);
        self.setData({
            playIndex: index
        });
        var music = list[index];
        self.playMusic(music);
    },
    playMusic: function (music) {
        var self = this;
        wx.playBackgroundAudio({
            dataUrl: music.url,
            title: music.title,
            coverImgUrl: music.img,
            success: function () {
                console.log('音乐播放成功！');
                var pro = '0%', currTime = 0, currTimeStr = '0', musicTime = 0, musicTimeStr = '0';
                self.setData({
                    currTime: currTime,
                    musicTime: musicTime,
                    musicTimeStr: musicTimeStr,
                    currTimeStr: currTimeStr,
                    playingMusic: music,
                    playPro: pro,
                    isPlay: true
                });
            },
            fail: function () {
                console.log('播放失败!');
            }
        });
        self.getMusicInfo();
    },

    getMusicInfo: function () {
        var self = this;
        var inv = setInterval(function () {
            wx.getBackgroundAudioPlayerState({
                success: function (res) {
                    var status = res.status;
                    if(status == 1) {
                        clearInterval(inv);
                        var musicTime = res.duration, currTime = res.currentPosition;
                        var musicTimeStr = self.timeToString(musicTime);
                        var currTimeStr = self.timeToString(currTime);
                        var pro = (currTime / musicTime).toFixed(1) + '%';

                        self.setData({
                            currTime: currTime,
                            musicTime: musicTime,
                            musicTimeStr: musicTimeStr,
                            currTimeStr: currTimeStr,
                            playPro: pro,
                            isPlay: true
                        });
                        self.setPlayProcess();
                    }else {

                    }
                },
                fail: function () {
                    console.log('获取音乐信息失败！');
                }
            })
        }, 1000)
    },
    setPlayProcess: function () {
        var self = this;
        var inv = setInterval(function () {
            var _currTime = self.data.currTime + 1;
            var _currTimeStr = self.timeToString(_currTime);
            var musicTime = self.data.musicTime;
            var _pro = (_currTime / musicTime * 100).toFixed(1) + '%';
            self.setData({
                currTime: _currTime,
                currTimeStr: _currTimeStr,
                playInv: inv,
                playPro: _pro
            })
        }, 1000)
    },
    // 移除
    clearPlayInv: function (inv) {
        var self = this;
        if(typeof inv !== 'undefined') {
            clearInterval(inv)
        }else{
            clearInterval(self.data.playInv);
            self.setData({
                playInv: 0
            })
        }


    }
});