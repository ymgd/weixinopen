//tomato.js
//获取应用实例
const util = require('../../utils/util.js')

var app = getApp()

const defaultLogName = {
    work: '工作',
    rest: '休息'
}

const actionName = {
    stop: '停止',
    start: '开始'
}

const setTime = {
    work: 25,
    rest: 5
}

Page({
    data: {
        remainTimeText:'',
        timerType: 'work',
        log: {},
        completed: false,
        isRunning: false,
        workTime: setTime.work,
        restTime: setTime.rest,
        isStoped: false,
        keepTime: 0,
        //结束文案
        stopText: '结束'
    },
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '任务'
        })
    },
    //数据初始化
    initData () {
        const data = {
            remainTimeText:'',
            timerType: this.data.timerType,
            log: {},
            completed: false,
            isRunning: false,
            workTime: setTime.work,
            restTime: setTime.rest,
            isStoped: false,
            keepTime: 0,
            stopText: '结束'
        }

        this.setData(data)

        console.log(this.data)
    },
    //任务名称
    bindlogNameInput (e) {
        this.logName = e.detail.value
    },
    onStartTime (e) {
        if (e.target.dataset.type == 'work') {
            this.setData({
                stopText: '结束',
            })
        } else {
            this.setData({
                stopText: '休息好了',
            })
        }
        this.startTimer(e);
    },
    //开始时间
    startTimer (e) {
        let self = this;
        let startTime = Date.now();
        let isRunning = this.data.isRunning;
        let timerType = e.target.dataset.type;
        let showTime = this.data[timerType + 'Time'];
        let keepTime = showTime * 60 * 1000;
        let logName = this.logName || defaultLogName[timerType];
        this.data.keepTime = keepTime

        if (!isRunning) {
            this.timer = setInterval(function(){
                self.updateTimer()
            },1000)
        }

        if(e.target.dataset.type == 'rest') {
            logName = '休息'
        }

        this.setData({
            isRunning: !isRunning,
            completed: false,
            timerType: timerType,
            taskName: logName
        })

        this.data.log = {
            name: logName,
            startTime: startTime,
            keepTime: keepTime,
            endTime: keepTime + startTime,
            action: actionName[isRunning ? 'stop' : 'start'],
            type: timerType
        }

        this.saveLog(this.data.log)
    },
    onStopTimer () {
        if (this.data.timerType == 'rest') {
            this.setData({
                timerType: 'work'
            })
        } else {
            this.setData({
                isStoped: true
            })
        }

        this.setData({
            isRunning: false
        })
        console.log(this.data.timerType)

        this.timer && clearInterval(this.timer)
    },
    updateTimer () {
        let log = this.data.log
        let now = Date.now()
        let remainingTime = Math.round(log.endTime - now)/1000
        let remainTimeText

        if (remainingTime > 0) {
            remainTimeText = '还剩: ' + this.formatRemainTime(remainingTime)
        } else {
            remainingTime = Math.round(now + this.data.keepTime - log.endTime)/1000
            remainTimeText = '已用: ' + this.formatRemainTime(remainingTime)
        }

        this.setData({
            remainTimeText: remainTimeText
        })
    },
    formatRemainTime (remainingTime) {
        let H = util.formatTime(Math.floor(remainingTime / (60*60)) % 24, 'HH')
        let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
        let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')

        let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S

        return remainTimeText
    },
    completed () {
        this.setData({
            isComplete: true,
            timerType: 'rest'
        })

        this.initData()
    },
    uncompleted () {
        this.setData({
            isComplete: false,
            timerType: 'rest'
        })
        this.initData()
    },
    goTomato () {
        wx.navigateTo({
            url: '/tomato'
        })
    },
    saveLog: function(log) {
        let logs = wx.getStorageSync('Todologs') || []
        let len1 = logs.length

        if (len1) {
            let len2 = logs[0].length
            let day = logs[0][0].startTime
            let logday = log.startTime
            let reg = /^\d{4}\/\d{1,2}\/\d{1,2}\s{1}/

            day = new Date(day).toLocaleString()
            logday = new Date(logday).toLocaleString()

            day = day.match(reg) ? day.match(reg)[0] : '2016/10/25'
            logday = logday.match(reg) ? logday.match(reg)[0] : '2016/10/25'

            if (day != logday) {
                logs.unshift([])
            }
            logs[0].unshift(log)

        } else {
            logs[0] = []
            logs[0].unshift(log)
        }
        wx.setStorageSync('Todologs', logs)
    },
    onLoad () {
        var that = this
    }
})
