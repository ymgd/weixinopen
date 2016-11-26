//index.js
//获取应用实例
var app = getApp();
Page({
	data: {
		mode: 'scaleToFill',
		src: '../../images/splash.jpg'
	},
	onLoad: function() {
		setTimeout(function() {
			wx.navigateTo({
				url: '../liwushuo/main/main'
			})
		}, 2500);
	}
})
