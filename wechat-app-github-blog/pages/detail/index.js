var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var config = app.globalData.config;
Page({
	data: {
		id: 0,
		item: null,
		wxParseData: ''
	},
	fetchDetail(id){
		return new Promise(function(resolve, reject){
			wx.request({
				url: config.apiUrl + '/issues/' + id,
				success: function(res){
					resolve(res.data);
				},
				fail: function(err){
					reject(err);
				}
			})
		}) 
	},
	onReady: function(){
		wx.setNavigationBarTitle({
			title: this.data.item.title
		})

	},
	onLoad: function(){
		var data = app.globalData.detailData;
		var that = this;
		data.wxParseData = WxParse('html', data.item.body)
		if(data && data.id){
			this.setData(data)
			if(!data.item){
				fetchDetail(data.id)
				.then(function(data){
					// wxParseData = WxParse('html', data.body)
					// console.log(wxParseData, data)
					that.setData({
						item: data,
						wxParseData
					})
				})
			}
		}
	}
})