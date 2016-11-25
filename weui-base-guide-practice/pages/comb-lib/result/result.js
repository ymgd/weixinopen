var $image_path = "../../../assets/images/"

Page({
    data: {
    },

    onLoad: function( options ) {
        this.data.title = options.title
    },

    onReady: function() {
        var title = this.data.title || "调试当前页"
        wx.setNavigationBarTitle( {
            title: title
        })
    }
})