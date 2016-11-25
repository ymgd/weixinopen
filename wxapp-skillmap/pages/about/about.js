const config = require('../../config.js')

Page({
    data: {
        version: config.version,
        copyleft: config.copyleft,
        infos: [
            ['技能图谱', 'github.com/TeamStuQ/skill-map'],
            ['小程序', 'github.com/TeamStuQ/wxapp-skillmap'],
        ]
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: "关于我们"
        })
    }
})
