const request = require('../../lib/session-request.js');

Page({
    data: {
        info: '点击按钮请求',
    },

    doRequest() {
        request({
            url: 'https://www.qcloud.la/applet/session',
            method: 'GET',

            success(data) {
                console.log('success', data);
            },

            fail(error) {
                console.log('error', error);
            },

            complete(what) {
                console.log('complete', what);
            },
        });
    },
});