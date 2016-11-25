
Page({
	data:{
		title:'Load...',
		list:[]
	},
	onLoad(params){
			const _this = this;
			const apiUrl = 'https://api.douban.com/v2/movie/'+params.type;
			wx.request({
				  url: apiUrl, 
				  data: {
				    
				  },
				  header: {
				      'Content-Type': 'application/json'
				  },
				  success: function(res) {
				    	_this.setData({
				    		list:res.data.subjects,
				    		title:res.data.title
				    	})
				  }
				})
	}
})