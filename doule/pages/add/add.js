//index.js
//获取应用实例
var app = getApp()
Page({

  data: {
  	newJoke: ''
  },

  addNew: function(){
  	var that = this
  	console.log('in click')
  	app.addReq(that.data.newJoke,'add')
  },

  textContent: function(e){

  	var that = this

  	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  	var hashId = ''
  	for(var i=0,len=32;i<len;i++){
        var key = Math.ceil(Math.random()*35)
        hashId += chars[key]
  	}

  	var content = e.detail.value

  	var time = new Date()
  	var updatetime = time.toLocaleString()
  	var newJoke = {
    	"content": content,
    	"hashId": hashId,
    	"updatetime": updatetime		
  	}

    that.setData({
    	newJoke: newJoke
    })

  },

  onLoad: function () {


  }
})
