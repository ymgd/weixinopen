const store = require('../../store/store.js')

Page({
    data: {
        skills: store.skills
    },
    onTap(e) {
        wx.navigateTo({
            url: `/pages/skill/skill?index=${e.currentTarget.dataset.index}`
        })
    }
})
