var inputContent = {
	debug:true
};
var lock = true;
var items = ['前端', 'Android', 'iOS', '休息视频', '福利', '拓展资源', '瞎推荐', 'App'];

Page({
	data:{
		toast1Hidden:true,
		loading:false,
		disabled:false,
		actionSheetHidden:true,
		actionSheetItems: items,
		typeName:''
	},
	toast1Change: function(){
		this.setData({
			toast1Hidden:true
		});
		wx.navigateBack();
	},
	submitGank: function(){
		var that = this;
		if(lock){
			that.setData({
				loading:true,
				disabled:true
			});
			lock = false;
			console.log(inputContent);
			wx.request({
				url:"https://gank.io/api/add2gank",
				data:inputContent,
				method:"POST",
				header:{
					"Content-Type":"application/json"
				},
				success:function(req){
					console.log(req.data);
					lock = true;
					that.setData({
						loading:false,
						disabled:false,
						toast1Hidden:false
					});
				}
			});
		}
	},
	bindChange:function(e){
		inputContent[e.currentTarget.id] = e.detail.value;
	},
	actionSheetChange:function(){
		this.setData({
			actionSheetHidden:!this.data.actionSheetHidden
		})
	},
	showSheet:function(){
		this.setData({
			actionSheetHidden:false
		})
	},
	bindName: function(e){
		this.setData({
			typeName:e.currentTarget.dataset.typeName,
			actionSheetHidden:true
		});
		inputContent['type'] = e.currentTarget.dataset.typeName;
	}
});