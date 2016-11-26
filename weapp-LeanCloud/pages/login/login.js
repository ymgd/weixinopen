const AV = require( '../../utils/leancloud.js' );
AV.init( {
    appId: "GEkVRhKfRqKLuM3aGyYI8dhP-gzGzoHsz",
    appKey: "vNUdRqi1y96IavDkoX2weFEy",
});

var app = getApp()

Page( {
    data: {
        toastHidden: true
    },
    onLoad: function( options ) {
        console.log( 'Login Page Loaded' );
        console.log(app.globalData.userToken);
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    formSubmit: function( e ) {
        //console.log('form发生了submit事件，携带数据为：', e.detail.value);
        AV.User.logIn( e.detail.value.username, e.detail.value.password ).then( user => {
           // this.globalData.user = user;
           console.log(user);
           app.globalData.userToken=user.id;
           wx.redirectTo({
               url:"../index/index"
           })
        }, console.error );
    },
    DirectSignUp: function() {
        wx.redirectTo( {
            url: "../signup/signup",
        })
    }
})