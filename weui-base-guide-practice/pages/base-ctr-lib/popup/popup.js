var $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: { src: $image_path + "chevron.png" },
        rectangle_png: {src: $image_path + "rectangle.png"},
        loading_png: {src: $image_path + "loading.png"},
        big_rect_png: {src: $image_path + "big_rect.png"},
        starbak_png: {src: $image_path + "starbak.png"},
        blank_rect_png: {src: $image_path + "blank_rect.png"},
        detail_disclosure_png: {src: $image_path + "detail_disclosure.png"},
        default_avatar1x_png: {src: $image_path + "default_avatar1x.png"},
        default_avatar2x_png: {src: $image_path + "default_avatar2x.png"},
        default_avatar3x_png: {src: $image_path + "default_avatar3x.png"},
        modal1: {
            title: '普通弹框',
            confirm_text: '确定',
            hidden: true,
            no_cancel: true,
            change: 'modal1Change',
            content_text: '告知当前状态，信息和解决方法'
        },
        modal2: {
            confirm_text: '知道了',
            hidden: true,
            no_cancel: true,
            change: 'modal2Change',
            content_text: '告知当前状态，信息和解决方案，文字换行的情况。'
        },
         modal3: {
            title: '标题',
            confirm_text: '知道了',
            hidden: true,
            no_cancel: true,
            change: 'modal3Change',
            content_text: '描述内容，最好不超过一行'
        },
        modal4: {
            title: '普通弹框',
            confirm_text: '确定',
            hidden: true,
            no_cancel: true,
            change: 'modal4Change',
            content_text: '告知当前状态，信息和解决方案，文字换行的情况'
        },
         modal5: {
            title: '弹框标题',
            confirm_text: '主操作',
            cancel_text: '辅助操作',
            hidden: true,
            no_cancel: false,
            change: 'modal5Change',
            content_text: '告知当前状态，信息和解决方案'
        }
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

    modalTap1: function(e) {
        var modal = this.data.modal1
        modal.hidden = false
        this.setData({modal1: modal})
    },

    modal1Change: function(e){
        var modal = this.data.modal1
        modal.hidden = true
        this.setData({modal1: modal})
    },

    modalTap2: function(e) {
        var modal = this.data.modal2
        modal.hidden = false
        this.setData({modal2: modal})
    },

    modal2Change: function(e){
        var modal = this.data.modal2
        modal.hidden = true
        this.setData({modal2: modal})
    },

    modalTap4: function(e) {
        var modal = this.data.modal4
        modal.hidden = false
        this.setData({modal4: modal})
    },

    modal4Change: function(e){
        var modal = this.data.modal4
        modal.hidden = true
        this.setData({modal4: modal})
    },

    modalTap5: function(e) {
        var modal = this.data.modal5
        modal.hidden = false
        this.setData({modal5: modal})
    },

    modal5Change: function(e){
        var modal = this.data.modal5
        modal.hidden = true
        this.setData({modal5: modal})
    },

     modalTap3: function(e) {
        var modal = this.data.modal3
        modal.hidden = false
        this.setData({modal3: modal})
    },

    modal3Change: function(e){
        var modal = this.data.modal3
        modal.hidden = true
        this.setData({modal3: modal})
    }
})