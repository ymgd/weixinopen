import API from "../../api/api.js";
const app = getApp();

const conf = {
	data: {
		title: '加载中...',
		movies: [],
		loading: true,
	},

	onLoad() {
		app.fetch(API.top, (err, data) => {
			this.setData({
				title: 'Top 100' || data.title,
				movies: data.subjects,
				loading: false
			})
		})
	},
	lower() {
		var self = this;
		self.setData({
			loading: true
		});
		app.fetch(API.top, (err, data) => {
			this.setData({
				title: 'Top 100' || data.title,
				movies: self.data.movies.concat(data.subjects),
				loading: false
			})
		})
	}
};
// Page() 函数注册页面
Page(conf);