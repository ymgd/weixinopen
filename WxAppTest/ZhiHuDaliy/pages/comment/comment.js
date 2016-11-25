var requests = require('../../requests/request.js');
Page({
    data: {
        storyId: null,
        loading: false,
        toastHidden: true,
        longCommentData: [],
        shortCommentData: null,
        shortCommentCount: 0,
        longCommentCount: 0,
        loadingMsg: '加载中...',
        toastMsg: ''
    },
    onLoad: function(options) {
        var storyId = options['id'];
        var longCommentCount = parseInt(options['lcount']);
        var shortCommentCount = parseInt(options['scount']);
        this.setData({ storyId: storyId, longCommentCount: longCommentCount, shortCommentCount: shortCommentCount });
    },
    onReady: function() {
        var storyId = this.data.storyId;
        var _this = this;
        this.setData({ loading: true, toastHidden: true });
        //如果长评数量大于0，则加载长评，否则加载短评
        if (this.data.longCommentCount > 0) {
            requests.getStoryLongComments(storyId, (data) => {
                console.log(data);
                _this.setData({ longCommentData: covertDate(data.comments) });
            }, () => {
                _this.setData({ toastHidden: false, toastMsg: '请求失败' });
            }, () => {
                _this.setData({ loading: false });
            });
        } else {
            loadShortComments.call(this);
        }
    },
    loadShortCommentEvent: function() {
        //已经加载过就无需再次加载 判断是否为null
        if (this.data.shortCommentData)
            return;
        loadShortComments.call(this);
    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    }
});
/**
 * 加载短评列表
 */
function loadShortComments() {
    var storyId = this.data.storyId;
    var _this = this;
    this.setData({ loading: true, toastHidden: true });
    requests.getStoryShortComments(storyId, (data) => {
        _this.setData({ shortCommentData: covertDate(data.comments) });
    }, () => {
        _this.setData({ toastHidden: false, toastMsg: '请求失败' });
    }, () => {
        _this.setData({ loading: false });
    });
}

function covertDate(comments) {
    if (comments) {
        for (var i = 0, len = comments.length; i < len; i++) {
            comments[i]['time'] = getDateDesc(comments[i]['time']);
        }
    }
    return comments;
}

function getDateDesc(timstamp) {
    var date = new Date(timstamp * 1000);
    return (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes();
}
