// 拿到全局应用程序实例

const app = getApp()

var  API_URL = 'http://www.tngou.net/api/cook/show'

const  API_IMG = 'http://tnfs.tngou.net/image'


// 创建一个页面对象用于控制页面逻辑

Page({

	data: {
		title: '菜单详情',
		img: API_IMG,
		show: [],
		loading: true,
		help: 'API里面有HTML标签,小程序又不支持,我也很无奈啊!'
	},

	onLoad: function (options) {

		console.log("options:"+options.id)

		var FULL_URL = API_URL + '?id=' + options.id

		console.log(API_URL)

		app.fetchApi(FULL_URL,(err, data) => {
			this.setData({ show:data, loading: false})
		})

	}

})