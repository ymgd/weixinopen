Page({
	data:{
		loading:false,
		disabled:false,
		toast1Hidden:true
	},
	jmpToInfo: function(){
		wx.navigateTo({url:"/pages/index/index"});
	},
	jmpToWX: function(){
		wx.navigateTo({url:"/pages/apps/apps"});
	},
	clearStorage: function(){
		var that = this;
		that.setData({
			loading:true,
			disabled:true
		});
		that.update();
		wx.clearStorage({
			success:function(){
				that.setData({
					loading:false,
					disabled:false,
					toast1Hidden:false
				});
				that.update();
			}
		});
	},
	toast1Change: function(){
		this.setData({
			toast1Hidden:true
		})
	},
	commitToGank: function(){
		wx.navigateTo({url:"/pages/commit/commit"});
	}
})