var longTouch = false;

Page({
	data:{
		img:{},
		results:[],
		video:null,
		hidden:false,
		display:"none",
		previewImage:"none",
		saveImage:true,
	},
	onLoad: function(options){
		var time = options.time.replace(/-/g,"/");
		var that = this;
		wx.request({
			url:"http://gank.io/api/day/" + time,
			header:{
				"Content-Type":"application/json"
			},
			success: function(req){
				var data = req.data;
				var results = [];
				var img = {};
				var video;
				for(var i = 0;i < data.category.length;i++){
					// 福利
					if(data.category[i] == "\u798f\u5229"){
						img.url = data.results[data.category[i]][0].url.replace("//ww","//ws");
						img.time = data.results[data.category[i]][0].publishedAt.split('T')[0];
					}else if(data.category[i] == "\u4f11\u606f\u89c6\u9891"){ //视频
						video = data.results[data.category[i]][0].url;
					}else{
						var temp = {
							'category':data.category[i]
						};
						temp.detail = data.results[temp.category];
						results.push(temp);
					}
				}
				that.setData({
					img:img,
					results:results,
					video:video,
					hidden:true,
					display:"block"
				});
				that.update();
			}
		})
	},
	previewImg:function(){
		this.setData({
			previewImage:"block"
		});
	},
	saveImg:function(){
		longTouch = true;
		this.setData({
			saveImage:false
		})
	},
	closePrev:function(){
		if(longTouch){
			longTouch = false;
		}else{
			this.setData({
				previewImage:"none"
			});
		}
	},
	actionSheetChange:function(){
		this.setData({
			saveImage:!this.data.saveImage
		})
	},
	downloadFile:function(e){
		var imgUrl = e.currentTarget.dataset.imageHref;
		var that = this;
		wx.downloadFile({
  			url: imgUrl,
  			type: 'image',
  			success:function(res){
  				var tempFilePath = res.tempFilePath;
    			console.log(tempFilePath);
    			wx.saveFile({
      				tempFilePath:tempFilePath,
      				success:function(res){
        				var savedFilePath = res.savedFilePath;
        				console.log(savedFilePath);
        				that.setData({
        					saveImage:true
        				});
      				},
      				fail:function(res){
      					console.log(res);
      				}
    			});
  			},
  			fail:function(res){
  				console.log(res);
  			}
		});
	}
});