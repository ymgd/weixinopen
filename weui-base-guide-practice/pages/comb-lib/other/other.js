const sw = require('switch.js')
const $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: {src: $image_path + "chevron.png"},
        switches: [
                {id:1, label: '开启中', bindchange: 'switch1Change', checked: true},
                {id:2, label: '关闭', bindchange: 'switch2Change', checked: false}
            ],
        list: [
            { content: '广东省广州市新港中路TIT创意园腾讯自编八号楼前台'},
            { content: '广东省广州市新港中路鸿景花园B8区 2902室'}
        ],
        picker: {
            range: ['按钮一','按钮二']
        }
    },

    switch1Change(e){
        let switches = sw.toogle(1, this)
        this.setData({switches: switches})
    },

    switch2Change( e ) {
        let switches = sw.toogle(2, this)
        this.setData({switches: switches})
    }

})