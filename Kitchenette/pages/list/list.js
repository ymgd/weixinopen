// 拿到全局应用程序实例

const app = getApp()

const API_URL = 'http://www.tngou.net/api/cook/classify'


// 创建一个页面对象用于控制页面逻辑

Page({
	
	data: {
		title: '分类|小厨房',
		list: [],
		loading: true
	},

	onLoad: function () {

		app.fetchApi(API_URL,(err, data) => {
			this.setData({ list:data.tngou, loading: false})
		})

	}
})