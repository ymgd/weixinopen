var $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: { src: $image_path + "chevron.png" },
        rectangle_png: {src: $image_path + "rectangle.png"},
        loading_png: {src: $image_path + "loading.png"},
        default_avatar1x_png: {src: $image_path + "default_avatar1x.png"},
        default_avatar2x_png: {src: $image_path + "default_avatar2x.png"},
        default_avatar3x_png: {src: $image_path + "default_avatar3x.png"},
        content: "由各种物质组成单巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        content2: "尘埃扩散着，为一片土壤的凝固，母体子宫里的星云密布，在膨胀中复活，更多多魔力化作脐带",
        pg_loading_list: ['文字标题一', '文字标题二', '文字标题三', '文字标题四', '文字标题五', '文字标题六']
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