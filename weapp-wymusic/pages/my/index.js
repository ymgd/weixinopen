var fav = require('../../utils/fav.js');

Page({
    data: {},
    onLoad: function() {},
    onShow: function() {
        this.setData({
            favlist: fav.getFavList()
        })
    },
    playTap: function(e) {

    }
})