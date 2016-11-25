var $image_path = "../../../assets/images/"

Page({
    data: {
        modal1: {
            title: '普通弹框',
            no_cancel: true,
            confirm_text: '确定',
            hidden: false,
            change: 'modal1Change'
        },
        modal2: {
            title: '普通弹框',
            no_cancel: true,
            confirm_text: '确定',
            hidden: true,
            change: 'modal2Change',
            content_text: '告知当前状态，信息和解决方法'
        }
    },

    modal1Change: function(e){
        var modal = this.data.modal1
        modal.hidden = true
        this.setData({modal1: modal})
    },

    modal2Change: function(e){
        var modal = this.data.modal2
        modal.hidden = true
        this.setData({modal2: modal})
    },

    modal1Tap: function(e) {
        var modal = this.data.modal1
        modal.hidden = false
        this.setData({modal1: modal})
    },

    modal2Tap: function(e) {
        var modal = this.data.modal2
        modal.hidden = false
        this.setData({modal2: modal})
    }
})