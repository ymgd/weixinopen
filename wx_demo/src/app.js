//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})

// var wxp = require('./utils/wxp.js');

// function sleep(time, arg) {
//     console.log('sleep start at:' + new Date());
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             resolve(arg);
//             console.log('sleep end at:' + new Date() + ';arg:' + arg);
//         }, time);
//     });
// }

// function* fuck() {
//     var arg1 = yield sleep(1000, 'a');
//     var arg2 = yield sleep(2000, 'b');
//     var arg3 = yield sleep(1500, 'c');
//     return arg3;
// }

// function* fucku(arg) {
//     var arg1 = yield sleep(1000, arg);
//     console.log('fuck haha')
//     var arg2 = yield* fuck();
//     console.log('fuck() return:' + arg2);
//     var res = yield wxp(wx.showModal, {
//         title: 'showModal',
//         content: '还想再来一次吗?',
//         confirmText: '再来一次',
//         cancelText: '结束吧'
//     });
//     if (res.confirm) {
//         yield* fucku(arg);
//     }
//     // throw new Error('error test');
//     return arg1;
// }
// co(fucku('hahaha')).then(function(data) {
//     console.log(data);
// }).catch(function(error) {
//     console.error(error);
// });