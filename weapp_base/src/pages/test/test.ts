/// <reference path="../../libs/webApp.d.ts" />
import {App, Event} from "wx";

var util = require('../../utils/util.js')
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return util.formatTime(new Date(log))
            })
        })
    },
    onReady(){
        // 调用微信原生方法
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    }
})
