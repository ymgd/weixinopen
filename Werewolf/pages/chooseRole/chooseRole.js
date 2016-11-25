var util = require("../../utils/util.js");

var app = getApp();
Page({
    data: {
        config: {},
        cover: "../../images/cover.jpg",
        swiperCurrent: 1,
        isChoosing: true,
        roles: [],
        choosedRole: {},
        roleLogoAnimationData: {}
    },
    onLoad: function () {
        var roles = [];
        app.globalData.gameConfig.forEach(function (item) {
            var count = item.count;
            var role = item.role;
            for (var i = 0; i < count; i++) {
                roles.push(role);
            }
        });
        util.shuffle(roles);
        this.setData({
            config: app.globalData.gameConfig,
            roles: roles
        });
    },
    onShow: function () {
    },
    onHide: function () {
        this.setData({
            roleLogoAnimationData: {}
        });
    },
    swiperCurrentChange: function (e) {
        var current = e.detail.current;
        this.setData({
            swiperCurrent: current + 1
        });
    },
    setReady: function () {
        wx.navigateTo({
            url: "../playground/playground"
        });
    },
    chooseRole: function () {
        this.setData({
            isChoosing: false,
            choosedRole: this.data.roles[this.data.swiperCurrent - 1]
        });
        var that = this;
        setTimeout(function () {
            var animation = wx.createAnimation({
                duration: 2000,
                timingFunction: 'ease'
            });
            animation.scale(10, 10).step();
            that.setData({
                roleLogoAnimationData: animation.export(),
            });
        }, 100);
    }
});