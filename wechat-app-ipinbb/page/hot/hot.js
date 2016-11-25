var Util = require("../../util/util");

Page({
    data: {
        
        hidden: true,           // loading动画是否显示
        tipShow: false,         // 判断是否还有更多数据
        page: 0,                // 当前分页
        nextPage: "",           // 分页信息
        us: "",                 // 用户分享的ID，之前为了做分享统计什么的，现在没卵用
        lists: []
    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '正在热拼'
        })
    },
    onLoad: function(e) {
        var listArr = [],
            self = this,
            page = self.data.page,
            nextPage = self.data.nextPage,
            us = self.data.us;
        
        // 显示加载动画;
        self.setData({
             hidden: false,
        });

        // 发送请求
        wx.request({
            url: "http://service.ipinbb.com:8080/dispatcherService/getAttendGroupList",
            data: {
                page: page,
                nextPage: nextPage,
                us: us
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res){

               var nextPage = res.data.nextPage;  

                // 关闭加载动画并将请求回来的数据添加到data中
                self.setData({
                    hidden: true,
                    page: page + 1,
                    nextPage: nextPage,
                    lists: self.dataRead(res.data.lst)
                })
                // console.log(nextPage);
                // console.log(typeof nextPage);
                // console.log(self.data.lists);

                var listData = self.data.lists;

                listData.forEach(function(item, i) {

                    var time = item.groupEndTime;
                    self.countDown(listData, time, i);
                });
            },
            file: function(e){
                console.log("网络错误!!");
            }
        });
    },

    // 上拉加载跟多数据
    loadList: function(e) {
        var listArr = [],
            self = this;

        // 判断是否存在更多数据
        if(!self.tipShow) {
            // 显示加载动画;
            self.setData({
                hidden: false,
            });

            var page = Number(self.data.page);
            // console.log(typeof self.data.nextPage);
            self.data.nextPage.nextPage = page + 1;
            console.log(self.data.nextPage);

            
            // 发送请求
            wx.request({
                url: "http://service.ipinbb.com:8080/dispatcherService/getAttendGroupList",
                data: {
                    page: page,
                    nextPage: self.data.nextPage,
                    us: self.data.us
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res){

                    
                    var nextPage = res.data.nextPage;

                    if(res.data != null) {
                        // 将请求回来的数据添加到data中
                        self.setData({
                            hidden: true,
                            page: page + 1,
                            nextPage: nextPage,
                            lists: self.data.lists.concat(self.dataRead(res.data.lst))
                        })
                    } else {
                        self.setData({
                            hidden: true,
                            tipShow: true
                        });
                    }
                },
                file: function(e){
                    console.log("网络错误!!");
                }
            });
        }
    },

    // 对数据进行提取
    dataRead: function(data) {
        // 用于存放提取后的数据
        var dataArr = [];

        data.forEach(function(item) {
            // 用于存放单条团数据
            var groupData = {};

            groupData.groupId = item.groupId;
            groupData.goodsImg = item.goodsImg;
            groupData.goodsTitle = item.goodsTitle;
            groupData.groupSize = item.groupSize;
            groupData.groupPrice = item.groupViewPrice;
            groupData.lessNum = item.lessNum;
            groupData.groupEndTime = (item.restTime)/1000;
            groupData.displayTime = "";
            groupData.userLst = item.userLst;

            dataArr.push(groupData);
        });

        return dataArr;
    },

    // 倒计时方法
    countDown: function(listData, time, i) {

        var self = this, interval = "cleartime" + i;
        
        if(time != 0) {

            interval = setInterval(function(){
                listData[i].groupEndTime = time - 1;
                listData[i].displayTime = Util.formatTime(listData[i].groupEndTime);

                self.setData({
                    lists: listData
                })
                // console.log(i);
                
                if(time <= 0) {
                    clearInterval(interval);
                }

            }, 1000)
        }
    },
})