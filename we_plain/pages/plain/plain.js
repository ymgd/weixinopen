const WxFly = require('../../lib/wxplain.js');

Page({
    data: {
        modalHidden: "modal_hide",
        score: '0'
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成
    },
    startGame: function () {
        const fly = this.fly;
        this.setData({ score: 0, modalHidden: "modal_hide" });
        fly.startGame();
    },
    move: function (event) {
        const fly = this.fly;
        var x = event.touches[0].x;
        var y = event.touches[0].y;
        fly.touchmove(x, y);
    },
    click: function () {
        const fly = this.fly;
        fly.touchclick();
    },
    onShow: function () {
        const fly = this.fly = new WxFly(
            {
                ctx: wx.createContext(),
                id: 'plainId',
                height: 625,
                width: 375,
            });
        fly.on('over', packet => {
            this.setData({ score: packet.score, modalHidden: "" });
        });
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
})