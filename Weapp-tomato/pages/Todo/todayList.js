//todayList.js
const util = require('../../utils/util.js')
const blank = require('../../utils/blank.js')

let reg = /^\d{4}\/\d{1,2}\/\d{1,2}\s{1}/

Page({
    data: {
        logs: [],
        modalHidden: true,
        toastHidden: true
    },
    onShow: function () {
        let today = Date.now()
        today = new Date(today).toLocaleString()
        today = today.match(reg) ? today.match(reg)[0] : '2016/10/25'
        wx.setNavigationBarTitle({
            title: today + '记录'
        })
        this.getLogs()
    },
    getLogs: function () {
        if (wx.getStorageSync('Todologs').length == 0) {
            wx.setStorageSync('Todologs', blank)
        }
        let HisLogs = wx.getStorageSync('Todologs')
        let len = HisLogs.length

        if (len > 0) {
            HisLogs.forEach(function (logs, index, arry) {
                logs.forEach(function (item, index, arry) {
                    item.startTime = new Date(item.startTime).toLocaleString()
                    item.start = item.startTime.replace(reg, '')
                })
            })

            let now = Date.now()
                now = new Date(now).toLocaleString()
            let day = HisLogs[0][0].startTime


            now = now.match(reg) ? now.match(reg)[0] : '2016/10/25'
            day = day.match(reg) ? day.match(reg)[0] : '2016/10/25'


            if(now == day) {
                this.setData({
                    logs: HisLogs[0]
                })
            }
            console.log(this.data.logs)
        }
    },
    onLoad: function () {
    },
    onEditName: function () {
        this.setData({
            modalHidden: !this.data.modalHidden
        })
    },
    hideToast: function () {
        this.setData({
            toastHidden: true
        })
    },
    onChangeName: function (e) {
        let logs = []
        this.setData({
            logs: logs
        })
        wx.setStorageSync('Todologs', logs)
        this.switchModal()
        this.setData({
            toastHidden: false
        })
        this.getLogs()
    }
})