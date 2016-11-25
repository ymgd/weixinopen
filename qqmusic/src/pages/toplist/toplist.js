var commonService = require('../../services/common.js');
var MusicService = require('../../services/music');
var util = require('../../utils/util.js')
var app = getApp();

Page({
    data: {
        // text:"这是一个页面"
        songList: [],
        imgUrl: '',
        id: 0,
        listName: '',
        topinfo: {},
        update_time: '',
        listBgColor: ''
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        var id = app.globalData.topListId;
        this.setData({
            id: id
        });
        MusicService.getTopListInfo(id, this.getTopListCallback)
    },
    getTopListCallback: function (data) {
        console.log(data);
        var imgUrl = data.topinfo.pic_album;
        this.setData({
            topinfo: data.topinfo,
            update_time: data.update_time
        });
        this.setSongList(data.songlist);
        this.setListBgColor(data.color);
    },
    setSongList: function (songs) {
        var list = [];

        for (var i = 0; i < songs.length; i++) {
            var item = songs[i];
            var song = {};
            var album = {};

            album.mid = item.data.albummid
            album.id = item.data.albumid
            album.name = item.data.albumname;
            album.desc = item.data.albumdesc

            song.id = item.data.songid;
            song.mid = item.data.songmid;
            song.name = item.data.songname;
            song.title = item.data.songorig;
            song.subTitle = '';
            song.singer = item.data.singer;
            song.album = album;
            song.time_public = item.time_public;
            song.url = 'http://ws.stream.qqmusic.qq.com/C100' + song.mid + '.m4a?fromtag=38';
            song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + album.mid + '.jpg?max_age=2592000'
            list.push(song);
        }

        this.setData({
            songList: list
        })

    },
    mainTopTap: function (e) {
        var list = this.data.songList;
        app.setGlobalData({
            playList: list,
            playIndex: 0
        });
        wx.navigateTo({
            url: '../play/play'
        });
    },
    musicItemTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var index = dataSet.index;
        var list = this.data.songList;
        app.setGlobalData({
            playList: list,
            playIndex: index
        });
        wx.navigateTo({
            url: '../play/play'
        });
    },
    setListBgColor: function (color) {
        var a = util.dealColor(color);

        this.setData({
            listBgColor: a
        });
    }
})