const $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: { src: $image_path + 'chevron.png'},
        add_png: {src: $image_path + 'add.png'},
        ship_address_list: [
            '广东省广州市新港中路TIT创意园腾讯自编八号楼前台',
            '广东省广州市新港中路鸿景花园 B8 区 2902 室'
        ],
        button: {
            content: '下一步',
            disabled: true
        }
    }
})