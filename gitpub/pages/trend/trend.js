//index.js
//获取应用实例
let githubSearchUrl = "https://api.github.com/search/repositories";
let language = ['javascript', 'java', 'php', 'python'];
let lanIndex = 0;

var app = getApp()
Page({
    data: {
    	language:['javascript', 'java', 'php', 'python'],
    	lanIndex: 0,
        trendData: {}
    },
    onLoad: function() {
    	// console.log(this.language);
            // this.getTrendingData(language[lanIndex]);
        // console.log(wx.getStorageSync('trendData'));
        if (wx.getStorageSync('trendData')) {
        	console.log('have cache');
            this.setData({
                trendData: wx.getStorageSync('trendData'),
                lanIndex: wx.getStorageSync('lanIndex')
            })
        } else {
        	console.log('no cache');
            this.getTrendingData(this.data.language[this.data.lanIndex]);
        }
    },
    bindPickerChange: function(e) {
    	console.log(e);
    	this.setData({
    		lanIndex: e.detail.value
    	})
    	// console.log(this.data.language);
    	this.getTrendingData(this.data.language[this.data.lanIndex]);
    },
    getTrendingData: function(lan) {
        let that = this;
        wx.request({
            url: githubSearchUrl + '?sort=starts&order=asc&q=language:' + lan,

            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                //      	this.setData({
                //   trendData: res.data.items
                // });
                that.data.trendData = {};
                that.setData({
                    trendData: res.data.items
                });
                wx.setStorage({
                    key: "trendData",
                    data: res.data.items
                });
                wx.setStorage({
                    key: "lanIndex",
                    data: that.data.lanIndex
                });
                    // this.trendData = res.data.items;
                    // this.test.push({message: 1});
                console.log(that.data.trendData);
                console.log(res)
            }
        })


    }
})