var $sw = require('switcher.js')
var $image_path = "../../../assets/images/"

Page({
    data: {
        chevron_png: {
            src: $image_path + "chevron.png"
        },
        blank_rect_png: {
            src: $image_path + "blank_rect.png"
        },
        country: {
            index: 0,
            array: ['中国', '外国'],
            change: 'bindCountryChange'
        },
        checkRows: [
            {checkStyle: "display:inline-block", id: 1},
            {checkStyle: "display:none", id: 2},
            {checkStyle: "display:none", id: 3}
        ],

        switchers: [
            {id: 1, label: "开启中", checked: "checked", bindchange: "switchChange"},
            {id: 2, label: "关闭", checked: "", bindchange: "switchChange"}
        ],

        multCheckRows: [
            {id:1, icon_type: 'success'},
            {id:2, icon_type: 'circle'},
            {id:3, icon_type: 'circle'}
        ]
    },

    onLoad: function(options){
        this.data.title = options.title
    },

    onReady: function(){
        var title = this.data.title || "调试当前页"
        wx.setNavigationBarTitle( {
            title: title
        })
    },

    bindCountryChange: function(e){
        var country = this.data.country
        country.index = e.detail.value
        country.picked_country = country.array[country.index]
        this.setData({country: country})

    },

    bindCheckChange: function(e){
        var checkId = parseInt(e.target.dataset.checkId)
        var rows = this.data.checkRows
        rows.forEach(function(row){
            if(row.id === checkId){
                row.checkStyle = 'display:inline-block'
            } else {
                row.checkStyle = 'display:none'
            }
        })

        this.setData({checkRows: rows})
    },

    switchChange: function(e){
        var id = parseInt(e.target.dataset.id)
        var sw_list = this.data.switchers
        var sw = sw_list.find(function(sw){
            return sw.id === id
        })
        $sw.op(sw, e.detail.value)
        this.setData( {
            switchers: sw_list
        })
    },

    bindMultCheckChange: function(e){
        var checkId = parseInt(e.currentTarget.dataset.checkId)
        var rows = this.data.multCheckRows
        var row = rows.find(function(row){
            return row.id === checkId
        })

        if(row.icon_type === 'success'){
            row.icon_type = 'circle'
        } else {
            row.icon_type = 'success'
        }

        this.setData({
            multCheckRows: rows
        })
    }

   
})