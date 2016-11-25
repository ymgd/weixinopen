var app = getApp();
var subjectUtil = require("../../utils/subjectUtil");
Page({
    data:{
        inputVal:"",
        movie: []
    },
    bindKeyInput: function(e) {
        console.log(e);
        this.setData({
            inputVal: e.detail.value
        })
    },
    search: function() {
        var that = this;
        if(that.data.inputVal.trim() == "") {
           wx.showModal({
               title: "小提示",
               content: "请输入查询关键字！",
               showCancel: false,
               fail: function() {
                that.setData({
                    inputVal: "请输入查询关键字！",
                });
               }
           })
            return;
        }
        wx.showToast({
            "title": "玩命加载中",
            "icon": "loading",
            "duration":　10000
        });
        console.log("aaaa"+that.data.inputVal);
        var url = "https://api.douban.com/v2/movie/search?q=" + that.data.inputVal;
        console.log(url);

        wx.request({
            url: url,
            header:{
                "Content-Type": "application/json,application/json"
            },
            success: function(res) {
                var subjects = res.data.subjects;
                if(subjects.length < 1 ) {
                    that.setData({
                        inputVal: "暂无相关内容！",
                        movie: []
                    });
                     wx.hideToast();
                    return;
                }
                subjectUtil.processSubjects(subjects);
                that.setData({
                    movie: subjects
                });
                console.log(res);
                wx.hideToast();
            }
        })
    },
    detail: function(e) {
        app.detail(e);
    }
    
})