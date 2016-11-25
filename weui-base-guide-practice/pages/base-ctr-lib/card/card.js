var $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: { src: $image_path + "chevron.png" },
        rectangle_png: {src: $image_path + "rectangle.png"},
        loading_png: {src: $image_path + "loading.png"},
        big_rect_png: {src: $image_path + "big_rect.png"},
        starbak_png: {src: $image_path + "starbak.png"},
        detail_disclosure_png: {src: $image_path + "detail_disclosure.png"},
        default_avatar1x_png: {src: $image_path + "default_avatar1x.png"},
        default_avatar2x_png: {src: $image_path + "default_avatar2x.png"},
        default_avatar3x_png: {src: $image_path + "default_avatar3x.png"},
        content: "昭和无惨绘｜丸尾末广×花轮和一 新英名二十八众句"
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