var requests = require('../../requests/request.js');
var utils = require('../../utils/util.js');
Page({
    data: {
        id: '', //当前日报id
        loading: false, //是否加载中
        isTheme: false,
        news: {}, //日报详情
        modalHidden: true,
        extraInfo: {},
        modalMsgHidden: true,
        pageShow: 'none',
        isCollect: false //是否被收藏
    },
    onLoad: function(options) {
        var id = options.id;
        var isTheme = options['theme'];
        var pageData = wx.getStorageSync('pageData') || []
        for (var i = 0; i < pageData.length; i++) {
            if (pageData[i].id == id) {
                this.setData({ isCollect: true });
                break;
            }
        }
        this.setData({ id: id, isTheme: isTheme });
    },
    onReady: function() {
        loadData.call(this);
    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    collectOrNot: function() {
        var pageData = wx.getStorageSync('pageData') || [];
        if (this.data.isCollect) {
            for (var i = 0; i < pageData.length; i++) {
                if (pageData[i].id == this.data.id) {
                    pageData.splice(i, 1);
                    this.setData({ isCollect: false });
                    break;
                }
            }
        } else {
            var images = new Array(this.data.news.image);
            var item = { id: this.data.id, title: this.data.news.title, images: images };
            pageData.unshift(item);
            this.setData({ isCollect: true });
        }
        try {
            wx.setStorageSync('pageData', pageData);
        } catch (e) {}
    },
    showModalEvent: function() {
        this.setData({ modalHidden: false });
    },
    hideModalEvent: function() {
        this.setData({ modalHidden: true });
    },
    //重新加载数据
    reloadEvent: function() {
        loadData.call(this);
    },
    previewImgEvent: function(e) {
        var src = e.currentTarget.dataset.src;
        console.log(src);
        if (src && src.length > 0) {
            wx.previewImage({
                urls: [src]
            });
        }
    },
    toCommentPage: function(e) {
        var storyId = e.currentTarget.dataset.id;
        var longCommentCount = this.data.extraInfo ? this.data.extraInfo.data.long_comments : 0; //长评数目
        var shortCommentCount = this.data.extraInfo ? this.data.extraInfo.data.short_comments : 0; //短评数目
        //跳转到评论页面，并传递评论数目信息
        wx.navigateTo({
            url: '../comment/comment?lcount=' + longCommentCount + '&scount=' + shortCommentCount + '&id=' + storyId
        });
    }
});


//加载页面相关数据
function loadData() {
    var _this = this;
    var id = this.data.id;
    var isTheme = this.data.isTheme;
    //获取日报详情内容
    _this.setData({ loading: true });

    requests.getNewsDetail(id, (data) => {
        if ("image" in data.data) {
            data.data.image = data.data.image.replace("pic1", "pic3");
            data.data.image = data.data.image.replace("pic2", "pic3");
        }

        data.data.body = utils.parseStory(data.data.body, isTheme);
        _this.setData({ news: data.data, pageShow: 'block' });
        wx.setNavigationBarTitle({ title: data.data.title }); //设置标题
    }, null, () => {
        _this.setData({ loading: false });
    });

    //请求日报额外信息（主要是评论数和推荐人数）
    requests.getStoryExtraInfo(id, (data) => {
        _this.setData({ extraInfo: data });
    });
}
