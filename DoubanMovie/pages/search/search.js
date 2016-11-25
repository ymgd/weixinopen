const newData = require('../../data/data.js');
Page({
	data:{
		start: 0,
		scrollHeight: 0,
		hidden: true,
    	noRes: true,
    	movieName: {},
    	hot: [],
    	title: {}
	},
	clickShow: function (event) {
	    wx.setStorageSync("movieId",event.currentTarget.id);
	    wx.navigateTo({
	      url: '../show/show',
	    })
	},
	onLoad: function () {
		this.setData({
			hidden: false
		});
	},
	onShow: function () {
		wx.getSystemInfo( {
	        success: ( res ) => {
	            this.setData( {
	                scrollHeight: res.windowHeight
	            })
	        }
	    })
	    this.setData({hidden: true});
	},
	getMovie: function (e) {
		this.setData({movieName: e.detail.value});
	},
	searchMovie: function (e) {
		this.setData({hidden: false});
		//发送ajax请求获取数据
		console.log(this.data.movieName);
		let _this = this;
	    let param = {
	      API_URL : 'https://api.douban.com/v2/movie/search?q=' + this.data.movieName,
	      data: {
	      	'start' : this.data.start,
	      	'count' : 10
	      }
	    }
	    newData.result(param).then( data => {    
	      this.setData({
	      	  title:data.data,
	          hot:data.data.subjects,
	          hidden: true
	      })
	    });
	},
	lower: function () {
	    this.setData({
	        start: this.data.start + 10,
	        hidden: false
	    });
	    let param = {
	      API_URL : 'https://api.douban.com/v2/movie/search?q=' + this.data.movieName,
	      data: {
	      	'start' : this.data.start,
	      	'count' : 10
	      }
	    }
	    newData.result(param).then( data => {    
	      if (data.data.length == 0) {
	        this.setData({
	          hidden: true,
	          noRes: false
	        });
	      }else {
	        this.setData({
	          hot: this.data.hot.concat(data.data.subjects),
	          hidden: true
	        });
	      }
	    });
	},
	toastChange: function (event) {
		this.setData({noRes: true});
	}
})