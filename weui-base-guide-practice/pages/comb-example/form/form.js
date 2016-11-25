const $image_path = "../../../assets/images/"

Page({
    data: {
        check_box_png: {src: $image_path + 'check_box.png'},
        check_box_blank_png: {src: $image_path + 'check_box_blank.png'},
        check_toggles: ['hidden', ''],
        checked_term: false,
        card: {
            valid_dates: ['2016-10', '2016-11', '2016-12', '2017-01'],
            date: ''
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

    selectCardDate(e){
        var card = this.data.card
        card.date = e.detail.value
        this.setData({card:card})
    }
})