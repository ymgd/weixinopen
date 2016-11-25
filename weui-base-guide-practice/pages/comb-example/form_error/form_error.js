const $image_path = "../../../assets/images/"

Page({
    data: {
        check_box_png: {src: $image_path + 'check_box.png'},
        check_box_blank_png: {src: $image_path + 'check_box_blank.png'},
        check_toggles: ['hidden', ''],
        checked_term: false,
        form: {
            error_msg: '卡号格式不正确',
            error_hidden: 'hidden'
        }
    },

    checkTap(e){
        var check_toggles = this.data.check_toggles
        var checked_term = this.data.checked_term
        for(var i=0; i < check_toggles.length; i++){
            if( check_toggles[i] == 'hidden' ) {
                check_toggles[i] = ''
            } else {
                check_toggles[i] = 'hidden'
            }
        }
        if(check_toggles[0] != 'hidden'){
            checked_term = true
        } else {
            checked_term = false
        }
        this.setData({check_toggles: check_toggles, checked_term: checked_term})
    },

    formSubmit(e){   
        var form = this.data.form
        if(form.error_hidden == 'hidden'){
            form.error_hidden = ''
        }     
        this.setData({form: form})
    }
})