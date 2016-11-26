var _songsList = [{
    dataUrl: 'http://stream.qqmusic.tc.qq.com/137192078.mp3',
    name: '告白气球',
    mid: "003OUlho2HcRHC",
    singer: '周杰伦',
    coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
}, {
        dataUrl: 'http://stream.qqmusic.tc.qq.com/138549169.mp3',
        name: '你还要我怎样', 
        mid: "000E62Tc3bMiJB",
        singer: '薛之谦',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000000aWdOx24i3dG.jpg'
    }, {
        dataUrl: 'http://stream.qqmusic.tc.qq.com/137903929.mp3',
        name: '微微一笑很倾城',
        mid: "002NbtFA3fuJhD",
        singer: '杨洋',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg'
    }, {
        dataUrl: 'http://stream.qqmusic.tc.qq.com/132636799.mp3',
        name: '演员',
        mid: "001Qu4I30eVFYb",
        singer: '薛之谦',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003y8dsH2wBHlo.jpg'
    }]
var that;
var pageObj = {
    data: {
        songsList: _songsList,
        action: {
            method: ""
        },
        playBar: _songsList[0],
        searchRes: [],
        display: "none"
    }, playMusic: function (event) {
        var index = event.currentTarget.dataset.num;
        that.setData({ playBar: _songsList[index] });
        start();
    }, onLoad: function (options) {
        that = this;
    }, toSearch: function (event) {
        wx.request({
            url: 'http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
            data: {
                is_xml: 0,
                format: 'jsonp',
                key: event.detail.value,
                g_tk: 5381,
                jsonpCallback: 'SmartboxKeysCallbackmod_top_search463',
                loginUin: 0,
                hostUin: 0,
                format: 'jsonp',
                inCharset: 'utf8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'yqq',
                needNewCode: 0
            },
            success: function (res) {
                that.setData({
                    searchRes: JSON.parse(res.data.substring(38, res.data.length - 1)).data,
                    display: "block"
                });
            }
        })
    }, closeResult: function (event) {
        that.setData({
            display: "none"
        });
    }, play: function (event) {
        var num = event.currentTarget.dataset.num;
        var res = that.data.searchRes.song.itemlist[num];
        res.dataUrl = 'http://stream.qqmusic.tc.qq.com/' + res.id + '.mp3';
        res.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg';
        that.setData({ playBar: res });
        start();
    }
};

Page(pageObj);

/**
 * 开始音乐
 */
function start() {
    that.setData({
        action: {
            method: "play"
        }
    });
}