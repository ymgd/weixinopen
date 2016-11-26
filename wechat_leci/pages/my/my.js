//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        modalHidden: true,
        nickName: "",
        avatarUrl: "",
        // userInfo: {
        //     nickName:"",
        //     avatarUrl:""
        // },
        inputname: ""
    },

    onLoad: function() {
        console.log('onLoad')
        var that = this
        app.getUserInfo(function(userInfo) {
                that.setData({
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl
                })
        })
    },
    login: function() {
        this.setData({
            modalHidden: false
        })
    },
    saveInput: function(e) {
        this.setData({
            inputname: e.detail.value
        });
    },
    actionConfirm: function(e) {
        var that = this
        wx.setStorageSync('username', this.data.username);
        wx.setStorageSync('password', this.data.password);
        this.setData({
            modalHidden: true,
            nickName: that.data.inputname
        })
    },
    actionCancel: function() {
        this.setData({
            modalHidden: true
        })
    },
    switchChange: function() {

    }





})
