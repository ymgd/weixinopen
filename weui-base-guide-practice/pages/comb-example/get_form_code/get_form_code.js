const $form = require('../../../utils/form')
const $image_path = "../../../assets/images/"
const $WC = 11

Page({
    data: {
        chevron_png: { src: $image_path + 'chevron.png'},
        country_picker: {
            items: ['中国(+86)', '外国'],
            index: 0
        },
        button: {
            content: '下一步',
            disabled: true
        },
        code: {
            get_hidden: 'hidden',
            resend_hidden: ''
        },
        timeCount: $WC

    },

    onShow() {
        var that = this
        $form.codeWaiting(this.data, function(data){
            that.setData(data)
        }, 1000)
    },

    sendCode(e){
        var that = this
        var code = this.data.code
         $form.codeWaiting(this.data, function(data){
            that.setData(data)
        }, 1000)
        code.get_hidden = 'hidden'
        code.resend_hidden = ''
        this.setData({code: code, timeCount: $WC})
    }
})