var util = require('../../utils/util.js');

Page({
	data: {
		boards: [{
			type: 'in_theaters',
			name: '正在热映'
		}, {
			type: 'coming_soon',
			name: '即将上映'
		}, {
			type: 'top250',
			name: 'TOP250'
		}],
		movies: [],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		mode: "aspectFill"
	},

	onLoad: function () {
		var that = this;
		util.fetchAPI('in_theaters', 1, 5, '', function (data) {
			that.setData({
				movies: data.subjects
			})
		});
	}
})