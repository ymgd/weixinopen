const conf = {
	fetch(url, callback) {
		wx.request({
			url,
			data: {},
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				callback(null, res.data);
			},
			fail(e) {
				callback(e);
			}
		})
	},

	// 程序启动时触发一次
	onLaunch() {
		console.log('App Launch');
		
	},

	// 当程序进入前台状态时触发
	onShow() {
		console.log('App Show');
	},

	// 当程序进入后台状态时触发
	onHide() {
		console.log('App Hide');
	}
};

// App() 函数创建应用程序对象
App(conf);
