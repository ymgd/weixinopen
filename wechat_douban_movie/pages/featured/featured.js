// 拿到全局应用程序实例
const app = getApp()

//api地址
const API_URL = 'https://api.douban.com/v2/movie/top250'

// 创建一个页面对象用于控制页面的逻辑
Page({
	data: {
		//页面page-header标题
		title: '加载中...',
		//定义电影列表
		movies: [],
		//加载开始
		loading: true,
	},
	
	onLoad() {
		//api调用应用实例的方法获取全局数据
		app.fetchApi(API_URL, (err, data) => {
			//更新数据
			this.setData({
				//重新设置页面page-header标题
				title: data.title,
				//设置定义电影列表
				movies: data.subjects,
				//加载结束
				loading: false
			})
		})
	}
})