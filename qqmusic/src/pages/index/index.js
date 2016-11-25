//index.js

var _ = require('../../utils/lodash.js');
var MusicService = require('../../services/music');
var SearchService = require('../../services/search');

//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        slider: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        radioList: [],
        songList: [],
        mainView: 1,
        topList: [],
        hotkeys: [],
        showSpecial: false,
        special: {key: '', url: ''},
        searchKey: '',
        searchSongs: [],
        zhida: {},
        showSearchPanel: 1,
        historySearchs: [],
        isShowCancel: false,
        isShowOk:  false

    },
    //事件处理函数
    bindViewTap: function (e) {
        console.log(e);
        // wx.navigateTo({
        //   url: '../logs/logs'
        // })
    },

    onLoad: function () {
        var that = this;

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        });

        // MusicService.getPlayMusicList();
        // wx.playBackgroundAudio({
        //   dataUrl: 'http://ws.stream.qqmusic.qq.com/C100000OIGu03YtdZj.m4a?fromtag=0',
        //   success: function () {
        //     console.log(arguments);
        //   }
        // });

        // wx.playVoice({
        //   filePath: 'http://ws.stream.qqmusic.qq.com/C100001ZYRMB3PpkaH.m4a?fromtag=0',
        //   success: function () {
        //     console.log(arguments);
        //   },
        //   complete: function(){
        //   }
        // })
        MusicService.getIndexMusic(that.initPageData);
        MusicService.getTopMusicList(that.initTopList);
        SearchService.getHotSearchKeys(that.initSearchHotKeys);
    },
    initPageData: function (data) {
        var self = this;
        if (data.code == 0) {
            self.setData({
                slider: data.data.slider,
                radioList: data.data.radioList,
                songList: data.data.songList
            })
        }
    },
    initTopList: function (data) {
        var self = this;
        if (data.code == 0) {
            self.setData({
                topList: data.data.topList
            })
        }
    },
    initSearchHotKeys: function (data) {
        var self = this;
        if (data.code == 0) {
            var special = {key: data.data.special_key, url: data.data.special_url};
            var hotkeys = [];
            if (data.data.hotkey && data.data.hotkey.length) {
                for (var i = 0; (i < data.data.hotkey.length && i < 6); i++) {
                    var item = data.data.hotkey[i];
                    hotkeys.push(item);
                }
            }

            if (special != undefined) {
                self.setData({
                    showSpecial: true
                })
            } else {

            }
            self.setData({
                special: special,
                hotkeys: hotkeys
            })
        }
    },
    tabItemTap: function (e) {
        var _dataSet = e.currentTarget.dataset;
        this.setData({
            mainView: _dataSet.view
        });
    },
    radioTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        MusicService.getRadioMusicList(dataSet.id, function (data) {

            if (data.code == 0) {
                var list = [];
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    var song = {};
                    var item = dataList[i];
                    song.id = item.id;
                    song.mid = item.mid;
                    song.name = item.name;
                    song.title = item.title;
                    song.subTitle = item.subtitle;
                    song.singer = item.singer;
                    song.album = item.album
                    song.url = 'http://ws.stream.qqmusic.qq.com/C100' + item.mid + '.m4a?fromtag=38';
                    song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + item.album.mid + '.jpg?max_age=2592000'
                    list.push(song);
                }
                app.setGlobalData({
                    playList: list,
                    playIndex: 0
                });
            }
            wx.navigateTo({
                url: '../play/play'
            });
        });
    },
    hotKeysTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var key = dataSet.key;
        var self = this;
        if (key != '') {
            self.addHistorySearchs(key);
            self.setData({
                searchKey: key,
                showSearchPanel: 3,
                isShowCancel: true
            });
            MusicService.getSearchMusic(key, function (data) {
                if (data.code == 0) {
                    var songData = data.data;
                    self.setData({
                        searchSongs: songData.song.list,
                        zhida: songData.zhida
                    });
                }
            });
        }
    },
    hotMusicTap: function (e) {
        var _dataSet = e.currentTarget.dataset;
        app.setGlobalData({
            mainImg: _dataSet.imgsrc,
            hotMusicId: _dataSet.id
        });
        wx.navigateTo({
            url: '../taoge/taoge'
        })
    },
    topListTap: function (e) {
        var _dataSet = e.currentTarget.dataset;
        app.setGlobalData({
            topListId: _dataSet.id
        });
        wx.navigateTo({
            url: '../toplist/toplist'
        })
    },
    // 本方法由于新版的api不支持keyup事件，所以目前弃用
    searchBoxKeyUp: function (e) {
        var keyCode = e.keyCode;
        var self = this;
        if (keyCode == 13 && this.data.searchKey != '') {
            var searchkey = this.data.searchKey;
            self.addHistorySearchs(searchkey);
            self.setData({
                showSearchPanel: 3
            });
            MusicService.getSearchMusic(searchkey, function (data) {
                if (data.code == 0) {
                    var songData = data.data;
                    self.setData({
                        searchSongs: songData.song.list,
                        zhida: songData.zhida
                    });
                }
            });
        }
    },
    addHistorySearchs: function (key) {
        var historySearchs = this.data.historySearchs;
        if (this.findHistorySearchs(key) == -1) {
            historySearchs.push(key);
            this.setData({
                historySearchs: historySearchs
            })
        }
    },
    findHistorySearchs: function (key) {
        var historySearchs = this.data.historySearchs;

        for (var i = 0; i < historySearchs.lenght; i++) {
            if (historySearchs[i] == key)
                return i;
        }
        return -1;
    },
    bindBlur: function (e) {
        var self = this;
        // self.setData({
        //     isShowCancel: true,
        //     isShowOk: false,
        // })

    },
    bindFocus: function (e) {
        var self = this;
        if (this.data.showSearchPanel == 1) {
            self.setData({
                showSearchPanel: 2
            })
        }
        self.setData({
            isShowCancel: false,
            isShowOk: true,
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            searchKey: e.detail.value
        });
    },
    searchOk: function (e) {
        var self = this;
        var searchKey = this.data.searchKey;
        self.setData({
                showSearchPanel: 3
            });
        MusicService.getSearchMusic(searchKey, function (data) {
            if (data.code == 0) {
                var songData = data.data;
                console.log(songData);
                self.setData({
                    searchSongs: songData.song.list,
                    zhida: songData.zhida
                });
            }
        });
    },
    // 本方法目前弃用
    searchCancel: function (e) {
        this.setData({
            showSearchPanel: 1,
            searchKey: '',
            isShowCancel: false
        })
    },
    historysearchTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var key = dataSet.key;
        var self = this;
        self.setData({
            searchKey: key,
            showSearchPanel: 3
        });
        MusicService.getSearchMusic(key, function (data) {
            if (data.code == 0) {
                var songData = data.data;
                self.setData({
                    searchSongs: songData.song.list,
                    zhida: songData.zhida
                });
            }
        });
    },
    zhidaTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var mid = dataSet.id;

        app.setGlobalData({'zhidaAlbummid': mid});
        wx.navigateTo({
            url: '../cdinfo/cdinfo'
        })

    },
    delHistoryItem: function (e) {
        var historySearchs = this.data.historySearchs;
        var dataSet = e.currentTarget.dataset;
        if (dataSet.index != '') {
            var _index = parseInt(dataSet);
            historySearchs.splice(_index, 1);
            this.setData({
                historySearchs: historySearchs
            });
        }
    },
    clearHistorySearchs: function () {
        this.setData({
            historySearchs: []
        })
    },
    musuicPlay: function (e) {
        var dataSet = e.currentTarget.dataset;
        var playingSongs = app.globalData.playList;
        if (typeof dataSet.index !== 'undefined') {
            var index = dataSet.index;
            var item = this.data.searchSongs[index];
            console.log(item);
            var song = {};
            var album = {};
            album.mid = item.albummid
            album.id = item.albumid
            album.name = item.albumname;
            album.desc = item.albumdesc

            song.id = item.songid;
            song.mid = item.songmid;
            song.name = item.songname;
            song.title = item.songorig;
            song.subTitle = '';
            song.singer = item.singer;
            song.album = album;
            song.time_public = item.time_public;
            song.url = 'http://ws.stream.qqmusic.qq.com/C100' + song.mid + '.m4a?fromtag=38';
            song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + album.mid + '.jpg?max_age=2592000'
            this.addPlayingSongs(song);
        }
    },
    addPlayingSongs: function (song) {
        var playingSongs = app.globalData.playList;
        var index = -1;
        if (typeof playingSongs === 'undefined') {
            playingSongs = [];
            playingSongs.push(song);
            app.setGlobalData({
                playList: playingSongs,
                playIndex: 0
            });
        } else {
            for (var i = 0; i < playingSongs.length; i++) {
                var item = playingSongs[i];
                if (item.mid == song.mid) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                app.setGlobalData({
                    playIndex: index
                });
            } else {
                playingSongs.push(song);
                index = playingSongs.length - 1;
                app.setGlobalData({
                    playList: playingSongs,
                    playIndex: index
                });
            }
        }
        wx.navigateTo({
            url: '../play/play'
        });
    },
    searchSubmit: function (e) {
        console.log(e);

    }
})
