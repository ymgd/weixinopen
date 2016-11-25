var MusicService = require('../../services/music');
var util = require('../../utils/util.js')
var app = getApp()

Page({
    data: {
        // text:"这是一个页面"
        albumInfo: {},
        listBgColor: "#fff",
        coverImg: '',
        songList: []
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var mid = app.globalData.zhidaAlbummid;

        MusicService.getAlbumInfo(mid, this.setPageData)
    },
    setPageData: function (data) {
        if (data.code == 0) {
            var albummid = data.data.mid;
            var img = 'http://y.gtimg.cn/music/photo/mid_album_500/' + albummid.slice(-2, -1) + '/' + albummid.slice(-1) + '/' + albummid + '.jpg'
            this.setData({albumInfo: data.data, coverImg: img});

            this.setListBgColor(data.data.color);
            this.dealSongData(data.data.list);
        }
    },
    setListBgColor: function (color) {
        var a = util.dealColor(color);

        this.setData({
            listBgColor: a
        });
    },
    dealSongData: function (dataList) {
        var list = [];
        for (var i = 0; i < dataList.length; i++) {
            var song = {};
            var item = dataList[i];
            var album = {};
            album.mid = item.albummid
            album.id = item.albumid
            album.name = item.albumname;
            album.desc = item.albumdesc

            song.id = item.songid;
            song.mid = item.songmid;
            song.name = item.songname;
            song.title = item.title || item.songname;
            song.subTitle = item.subtitle || '';
            song.singer = item.singer;
            song.album = album
            song.url = 'http://ws.stream.qqmusic.qq.com/C100' + item.mid + '.m4a?fromtag=38';
            song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + album.mid + '.jpg?max_age=2592000'
            list.push(song);
        }

        this.setData({
            songList: list
        })

    },
    bindMusicTab: function (e) {
        
        var dataSet = e.currentTarget.dataset;
        var list = this.data.songList;
        if(dataSet.index != 'undefined') {
            app.setGlobalData({
                    playList: list,
                    playIndex: dataSet.index
                });
            wx.navigateTo({
                url: '../play/play'
            });
        }
    },
    bindPlayAll: function (e) {
        var list = this.data.songList;
        app.setGlobalData({
                    playList: list,
                    playIndex: 0
                });
        wx.navigateTo({
            url: '../play/play'
        });
    }
})