var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

var weekdayStr = ['日', ' 一', '二', '三', '四', '五', '六'];

Page({
    data: {
        pageData: {}, //列表数据
        themeData: {}, //主题菜单数据
        sliderData: {}, //轮播图数据
        currentDateStr: '',
        currentDate: new Date(),
        refreshAnimation: {}, //加载更多旋转动画数据
        loadingMore: false, //是否正在加载
        avatarUrl: '', //当前开发者头像
        nickName: '', //当前开发者名字

        loading: false,
        loadingMsg: '加载中...',
        pageShow: 'none',

        maskDisplay: 'none',
        slideHeight: 0,
        slideRight: 0,
        slideWidth: 0,
        slideDisplay: 'none',
        screenHeight: 0,
        screenWidth: 0,
        slideAnimation: {},

        ballBottom: 20,
        ballRight: 30,
        ballOpacity: '.8',
        modalMsgHidden: true,
        themeId: 0, //当前主题id

        id: null,
        background: '',
        editorData: [], //主编数据
        description: '',
    },
    onLoad: function(options) {
        var _this = this;
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth,
                    slideHeight: res.windowHeight,
                    slideRight: res.windowWidth,
                    slideWidth: res.windowWidth * 0.7
                });
            }
        });
        var app = getApp();
        app.getUserInfo((data) => {
            _this.setData({ avatarUrl: data.avatarUrl, nickName: data.nickName });
        });
    },
    onReady: function() {
        var date = utils.getCurrentData();
        this.setData({ currentDateStr: date.year + '.' + date.month + '.' + date.day + '　' + '星期' + weekdayStr[date.weekday] });

        var _this = this;
        _this.setData({ loading: true });
        //获取数据
        requests.getNewsLatest((data) => {
            data = utils.correctData(data.data);
            _this.setData({
                sliderData: data.top_stories,
                pageData: data.stories,
            });
            _this.setData({ pageShow: 'block' });
        }, null, () => {
            _this.setData({ loading: false });
        });
        //获取主题日报列表
        requests.getTheme((data) => {
            _this.setData({ themeData: data.data.others });
        }, null, () => {});
    },
    onShow: function() {},
    onHide: function() {

    },
    onUnload: function() {

    },
    //浮动球点击 侧栏展开
    ballClickEvent: function() {
        slideUp.call(this);
    },
    //遮罩点击  侧栏关闭
    slideCloseEvent: function() {
        slideDown.call(this);
    },
    //浮动球移动事件
    ballMoveEvent: function(e) {
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        var pageY = touchs.pageY;
        if (pageX < 25) return;
        if (pageX > this.data.screenWidth - 25) return;
        if (this.data.screenHeight - pageY <= 25) return;
        if (pageY <= 25) return;
        var x = this.data.screenWidth - pageX - 25;
        var y = this.data.screenHeight - pageY - 25;
        this.setData({
            ballBottom: y,
            ballRight: x
        });
    },
    authorShowEvent: function() {
        this.setData({ modalMsgHidden: false });
    },
    modalMsgHiddenEvent: function() {
        this.setData({ modalMsgHidden: true });
    },
    toHomePage: function() {
        if (this.data.themeId != 0) {
            var _this = this;
            _this.setData({ loading: true, themeId: 0 });
            requests.getNewsLatest((data) => {
                data = utils.correctData(data.data);
                _this.setData({
                    sliderData: data.top_stories,
                    pageData: data.stories,
                    pageShow: 'block'
                });
                slideDown.call(this);
                wx.setNavigationBarTitle({ title: '知乎日报' }); //设置标题
            }, null, () => {
                _this.setData({ loading: false });
            });
        }
    },
    toThemePage: function(e) {
        if (this.data.themeId != e.currentTarget.dataset.id) {
            var _this = this;
            _this.setData({ loading: true, themeId: e.currentTarget.dataset.id });
            requests.getThemeStories(_this.data.themeId, (data) => {
                data.data.background = data.data.background.replace("pic1", "pic3");
                data.data.background = data.data.background.replace("pic2", "pic3");
                for (var i = 0; i < data.data.editors.length; i++) {
                    data.data.editors[i].avatar = data.data.editors[i].avatar.replace("pic1", "pic3");
                    data.data.editors[i].avatar = data.data.editors[i].avatar.replace("pic2", "pic3");
                }
                data = utils.correctData(data.data);
                _this.setData({
                    pageData: data.stories,
                    background: data.background,
                    description: data.description,
                    editorData: data.editors,
                    pageShow: 'block'
                });
                slideDown.call(this);
                wx.setNavigationBarTitle({ title: data.name }); //设置标题
            }, null, () => {
                _this.setData({ loading: false });
            });
        }
    },
    loadingMoreEvent: function(e) {
        if (this.data.loadingMore) return;
        var _this = this;
        var pageData = [];

        this.setData({ loadingMore: true });
        updateRefreshIcon.call(this);
        var date = new Date(Date.parse(this.data.currentDate) - 1000 * 60 * 60 * 24);
        var y = date.getFullYear();
        var m = (date.getMonth() + 1);
        var d = date.getDate();
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        var dateStr = [y, m, d].join('');
        requests.getBeforeNews(dateStr, (data) => {
            data = utils.correctData(data.data);
            pageData = _this.data.pageData;
            pageData.push({ type: '3', title: (dateStr + '  星期' + weekdayStr[date.getDay()]) });
            pageData = pageData.concat(data.stories);
            _this.setData({ currentDate: date, pageData: pageData });
        }, null, () => {
            _this.setData({ loadingMore: false });
        });
    },
    toCollectPage: function() {
        if (this.data.themeId != -1) {
            var _this = this;
            _this.setData({ themeId: -1 });
            var pageData = wx.getStorageSync('pageData') || [];
            _this.setData({
                themeId: -1,
                pageData: pageData
            });
            slideDown.call(this);
            wx.setNavigationBarTitle({ title: '我的收藏' }); //设置标题
        }
    },
    toDetailPage: function(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        });
    },
    toSettingPage: function() {
        wx.navigateTo({
            url: '../setting/setting'
        });
    }
});


//侧栏展开
function slideUp() {
    var animation = wx.createAnimation();
    this.setData({ maskDisplay: 'block' });
    animation.translateX('100%').step();
    this.setData({
        slideAnimation: animation.export()
    });
}

//侧栏关闭
function slideDown() {
    var animation = wx.createAnimation({
        duration: 600
    });
    animation.translateX('-100%').step();
    this.setData({
        slideAnimation: animation.export()
    });
    this.setData({ maskDisplay: 'none' });
}


/**
 * 旋转上拉加载图标
 */
function updateRefreshIcon() {
    var deg = 360;
    var _this = this;

    var animation = wx.createAnimation({
        duration: 1000
    });

    var timer = setInterval(function() {
        if (!_this.data.loadingMore)
            clearInterval(timer);
        animation.rotateZ(deg).step();
        deg += 360;
        _this.setData({
            refreshAnimation: animation.export()
        })
    }, 1000);
}
