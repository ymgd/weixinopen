var Constant = require('../../utils/constant.js');
var Util = require('../../utils/util.js');
var MD5 = require('../../utils/md5.js');

Page({
    data: {
        isHiddenLoginToast: true,
        loginMessage: ''
    },
    OnItemClick: function (event) {
        var index = event.target.dataset.index;
        wx.navigateTo({ url: '../albumdetail/albumdetail?id=' + this.data.list[index]._id + '&name=' + this.data.list[index].name })
    },
    onLoad: function (options) {// 页面初始化 options为页面跳转所带来的参数
    },
    formSubmit: function (e) {
        this.doLogin({
            username: e.detail.value.username,
            passwords: MD5.createHash(e.detail.value.passwords)
        });
    },
    handleToast: function () {
        this.setData({
            isHiddenLoginToast: true
        })
    },
    doLogin: function (data) {
        Util.requestData({
            url: Constant.USER_LOGIN,
            data: data,
            success: (res) => {
                console.log(res);
                let userinfo = {
                    wsqtoken: res.wsqtoken,
                    wsquid: res.wsquid,
                    qiniutoken: res.qiniutoken
                };
                this.setData({
                    isHiddenLoginToast: false,
                    loginMessage: '登录成功'
                })
            },
            error: (res) => {
                console.log(res);
                wx.showToast({
                    title: '( ⊙ o ⊙ )啊！ ' + res.err_msg,
                    duration: 3000
                })
            }
        });
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    }
});
