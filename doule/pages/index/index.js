//index.js
//获取应用实例
const app = getApp()

const API_URL = 'http://localhost:4466/api/pic';

Page({
  data: {
  	req: []
  },
  //下拉更新
  scrollUpData: function(e){
  	console.log('scrollUpData')
  	var that = this

    app.fetchApi (API_URL,(err,data) => {
      that.setData({
        req: data
      })
      console.log('updata');
      console.log('updata--'+data[0].content);
    })      
  	
  },
  //TODO 上拉加载
  lower: function(e){
  	console.log('lower')
  },
  //TODO 滚动add/del列表
  scroll: function(e){
  	console.log('scroll')
  },

  collection: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].col_url)
  			if (list[i].col_url) {
  				list[i].col_url = false;
  				wx.removeStorageSync('wx_req')
  			}else{
	  			list[i].col_url = true;
				app.setClt(list[i]);       
  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  zan: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].iszan)
  			if (list[i].iszan) {
  				list[i].iszan = false;
  				list[i].zan = list[i].zan-1;
  			}else{
	  			list[i].iszan = true;
  				list[i].zan = list[i].zan+1;
  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  cai: function(event){
  	var id = event.target.dataset.id;
  	var list = this.data.req;
  	for(var i=0,len=list.length; i<len; i++){
  		if (list[i].hashId==id) {
  			console.log(list[i].iscai)
  			if (list[i].iscai) {
  				list[i].iscai = false;
  				list[i].cai = list[i].cai-1;
  			}else{
	  			list[i].iscai = true;
  				list[i].cai = list[i].cai+1;
  			}
  		}
  	}
  	this.setData({
  		req: list
  	})
  },

  onLoad () {

  	var that = this

    app.fetchApi (API_URL,(err,data) => {
      that.setData({
        req: data
      })
    })   

  }
})

