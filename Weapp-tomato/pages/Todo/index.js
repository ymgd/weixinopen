//index.js
//获取应用实例
const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        //天气
        weather: '',
        //时间
        currentTime: '',
        weekday: '',
        //任务
        taskNumber: '',
        succNumber: ''
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    goDoTask: function () {
        wx.navigateTo({
            url: './blank'
        })
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        //天气接口
        util.loadWeatherData(function(data){

            console.log(data);
            that.setData({
                weather: data
            });
        });

        //时间
        setInterval(function () {
            let time = new Date();
            let week = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
            week = week[time.getDay()];
            time = `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
            that.setData({
                currentTime: time,
                weekday: week
            })
        },1000)

        //任务
        let taskLogs = wx.getStorageSync('Todologs') || []
        let len = taskLogs.length

        if (len > 0) {
            let num = 0
            let time = taskLogs[len-1][0].startTime
            let now = Date.now()
            let reg = /^\d{4}\/\d{1,2}\/\d{1,2}\s{1}/
            time = new Date(time).toLocaleString()
            now = new Date(now).toLocaleString()

            time = time.match(reg) ? time.match(reg)[0] : '2016/10/25'
            now = now.match(reg) ? now.match(reg)[0] : '2016/10/25'

            if (time == now) {
                num = taskLogs[len-1].length
            }
            that.setData({
                taskNumber: num
            })
        }
    }
})
