const $image_path = "../../../assets/images/"
const $page_path = '../../'

Page({
    data: {
        chevron_png: { src: $image_path + 'chevron.png'},
        button: {
            content: '确定',
            disabled: true
        }
    },

    inputName(e){
        var button = this.data.button
        button.disabled = false
        this.setData({button: button})
    },

    formSubmit(e){
        console.log("form submit", e.detail.value)
        wx.navigateTo({
            url: $page_path + 'comb-example/result/result'
        })
    }
})