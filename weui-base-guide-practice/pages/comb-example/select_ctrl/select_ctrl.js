var $util = require('../../../utils/util.js')
const $image_path = "../../../assets/images/"
const $page_path = '../../'

Page({
    data: {
        chevron_png: { src: $image_path + 'chevron.png'},
        button: {
            content: '下一步',
            disabled: true
        },
        datePicker: {
            start: $util.formatDate(new Date(), function(obj){
                return obj.ymd.join('-')
            }),
            end: '2017-12-31',
            current: $util.formatDate(new Date(), function(obj){
                return obj.ymd.join('-')
            })
        },
        timePicker: {
            start: $util.formatDate(new Date(), function(obj){
                return obj.hm.join(':')
            }),
            end: '24:59',
            current: $util.formatDate(new Date(), function(obj){
                return obj.hm.join(':')
            })
        }
    },

    pickDate(e){
        var datePicker = this.data.datePicker
        datePicker.current = e.detail.value
        this.setData({datePicker: datePicker})
    },

    pickTime(e){
        var timePicker = this.data.timePicker
        timePicker.current = e.detail.value
        this.setData({timePicker: timePicker})
    }

})