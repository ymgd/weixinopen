var commonService = require('../../services/common.js');
var MusicService = require('../../services/music');
var util = require('../../utils/util.js')

var app = getApp();
Page({
    data: {
        imgUrl: '',
        id: 0,
        logs: [],
        dissname: '',
        listBgColor: '',
        desc: '',
        tags: [],
        visitnum: 0,
        nick: '',
        songList: []
    },
    onLoad: function () {
        var selft = this;
        var id = app.globalData.hotMusicId;
        var imgUrl = app.globalData.mainImg;
        this.setData({
            id: id
        });
        MusicService.getHotMusicInfo(id, this.getMusicInfoCallback);

    },
    getMusicInfoCallback: function (data) {
        var self = this;
        if (data.code == 0) {
            var cdlist = data.cdlist;
            if (cdlist && cdlist.length) {
                var hotMusicInfo = cdlist[0];
                var imgUrl = hotMusicInfo.logo;
                var visitnum = (hotMusicInfo.visitnum / 10000).toFixed(1);
                this.setData({
                    dissname: hotMusicInfo.dissname,
                    imgUrl: hotMusicInfo.logo,
                    desc: hotMusicInfo.desc,
                    tags: hotMusicInfo.tags,
                    visitnum: visitnum,
                    nick: hotMusicInfo.nick
                });
                commonService.getBodyBgColor(imgUrl, this.setListBgColor)
                this.setSongList(hotMusicInfo.songlist);
            }
        } else {

        }
    },
    setSongList: function (songs) {
        var list = [];
        for (var i = 0; i < songs.length; i++) {
            var song = {};
            var item = songs[i];
            song.id = item.id;
            song.mid = item.mid;
            song.name = item.name;
            song.title = item.title;
            song.subTitle = item.subtitle;
            song.singer = item.singer;
            song.album = item.album;
            song.time_public = item.time_public;
            song.url = 'http://ws.stream.qqmusic.qq.com/C100' + item.mid + '.m4a?fromtag=38';
            song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + item.album.mid + '.jpg?max_age=2592000'
            list.push(song);
        }
        this.setData({
            songList: list
        });
    },
    setListBgColor: function (color) {
        var a = util.dealColor(color);
        this.setData({
            listBgColor: a
        });
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
    }
})