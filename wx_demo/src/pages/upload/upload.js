//logs.js
var wxp = require('../../utils/wxp.js');

Page({
    data: {
        loading: false,
    },
    onLoad: function() {

    },
    upload_click: function() {
        console.log('upload_click')
        co(function*() {
            var res_ci = yield wxp(wx.chooseImage, {
                count: 8
            });
            debugger;
            var res_up = yield wxp(wx.uploadFile, {
                url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                filePath: res_ci.tempFilePaths[0],
                name: 'file',
                formData: {
                    'user': 'test'
                }
            });
            debugger;
        }).catch(function(e) {
            debugger;
        })
    }
})