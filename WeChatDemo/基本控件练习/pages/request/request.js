var util = require('../../utils/util.js')
Page({
    data: {
        id: 0,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示
        var urlData = {
            xiaoqu_id: 3,
            channel:1,
            request_time:(new Date()).valueOf(),
            platform:'iphone',
            network_type:'WIFI',

        };
        var url= util.fullUrl('1.0/other/banner/list', urlData);
        wx.request({
            url: url,//'https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html?t=20161107',
            data: urlData,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
              header: {
            //     'Content-Type': 'application/json'
            //     // apikey:'cdf1c81047d6d85bfb6581314aec3233'
            cookie:{
                ganbadie_xiaoqu:1
            }
              },
            success: function (res) {
                // success
                console.log(res);
                if (res.statusCode == 200) {

                }
            },
            fail: function (res) {
                // fail
                console.log("失败:" + res);
            },
            complete: function () {
                // complete
                console.log("完成");
                wx.stopPullDownRefresh();//完成刷新
            }
        })
    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    request: function () {
        var that = this;
        wx.request({
            url: util.fullUrl('/1.0/other/banner/list', this.data),//'https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html?t=20161107',
            data: {
                xiaoqu_id: 3
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            header: {
                // 'Content-Type': 'application/json'
                // apikey:'cdf1c81047d6d85bfb6581314aec3233'
            },
            success: function (res) {
                // success
                // console.log(res);
                if (res.statusCode == 200) {
                    var images = res.data.tngou;
                    var id = images[images.length - 1].id;
                    images = images.concat(that.data.imgsUrl);
                    that.setData({
                        imgsUrl: images,
                        id: id
                    })
                    console.log(images);
                }
            },
            fail: function () {
                // fail
                console.log("失败");
            },
            complete: function () {
                // complete
                console.log("完成");
                wx.stopPullDownRefresh();//完成刷新
            }
        })
    },
    onPullDownRefresh: function () {
        this.request();
    },
})