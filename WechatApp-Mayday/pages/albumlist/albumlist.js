var Constant = require('../../utils/constant.js');
var Util = require('../../utils/util.js');

Page({
    OnItemClick: function (event) {
        var index = event.target.dataset.index;
        wx.navigateTo({url: '../albumdetail/albumdetail?id=' + this.data.list[index]._id + '&name=' + this.data.list[index].name})
    },
    onLoad: function (options) {// 页面初始化 options为页面跳转所带来的参数
        Util.requestData({
            url: Constant.ALBUM_LIST,
            success: (res)=> {
                this.setData({
                    list: res
                });
            }
        });
    },
    /*    onLoadMore: function () {
     Util.requestData(Constant.ALBUM_LIST, (res)=> {
     this.setData({
     list: this.data.list.concat(res)
     });
     });
     },*/
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
