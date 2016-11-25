// 拿到全局应用程序实例

const app = getApp()

var  API_URL = 'http://www.tngou.net/api/cook/list'

const  API_IMG = 'http://tnfs.tngou.net/image'

// 创建一个页面对象用于控制页面逻辑

Page({

	data: {
		title: '菜单列表',
		list: [],
		img: API_IMG,
		loading: true
	},

	onLoad: function (options) {

		console.log("options:"+options)


		var FULL_URL = API_URL + '?id=' + options.id

		console.log(FULL_URL)

		app.fetchApi(FULL_URL,(err, data) => {
			this.setData({ list:data.tngou, loading: false})
		})

	}

})