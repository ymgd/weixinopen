var $image_path = "../../../assets/images/"

Page( {
    data: {
        imageMode: 'scaleToFill',

        add_image_png: {
            src: $image_path + "add_image.png",
            mode: 'scaleToFill'
        },
        preview_images: [
        ]
    },

    onLoad: function( options ) {
        this.data.title = options.title
    },

    onReady: function() {
        var title = this.data.title || "调试当前页"
        wx.setNavigationBarTitle( {
            title: title
        })
    },

    addImage: function(e){
        var page = this
        var preview_images = []
        wx.chooseImage( {
            count: 3, // 默认9
            sizeType: [ 'original', 'compressed' ], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: [ 'album', 'camera' ], // 可以指定来源是相册还是相机，默认二者都有
            success: function( res ) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                tempFilePaths.forEach(function(path){
                    preview_images.push({src: path})
                })
                page.setData({preview_images: preview_images})
            }
        })
    }

})