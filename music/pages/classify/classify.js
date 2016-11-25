var app=getApp();

Page({
    data: Object.assign({
        tabActive: 'rank',
        classify_list: 
        [
            {
                name: "新歌榜",
                url: "../list/list?type=1"
            },
            {
                name: "热歌榜",
                url: "../list/list?type=2"
            },
            {
                name: "摇滚榜",
                url: "../list/list?type=11"
            },
            {
                name: "爵士",
                url: "../list/list?type=12"
            },
            {
                name: "流行",
                url: "../list/list?type=16"
            },
            {
                name: "欧美金曲榜",
                url: "../list/list?type=21"
            },
            {
                name: "经典老歌榜",
                url: "../list/list?type=22"
            },
            {
                name: "情歌对唱榜",
                url: "../list/list?type=23"
            },
            {
                name: "影视金曲榜",
                url: "../list/list?type=24"
            },
            {
                name: "网络歌曲榜",
                url: "../list/list?type=25"
            }
        ]
    },app.globalData.data),
    onReady: function(){
        wx.setNavigationBarTitle({
          title: '在线音乐'
        })
    }
})