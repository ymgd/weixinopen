import * as UTIL from '../../utils/util.js'
import * as API from '../../requests/api.js'
import { fetchGet, fetchPost } from '../../requests/request.js'
var WxParse = require('../../wxParse/wxParse.js')

Page({
  data: {
  	title: '',
    wxParseData:[]
  },
  onLoad: function (options) {
    var _this = this
    var url = options.url
    
		// 获取最新一期数据
		fetchGet(
		  API.getTrans(url),
		  (data) => {
		  	var cont = UTIL.unicode2HZ( data.data.content )
		    _this.setData({
		    	title: data.data.title,
		      wxParseData: WxParse('html', cont)
		    })
		  },
		  null,
		  null
		)
  },
  onReady: function(){
  	var _this = this
  	// 不能在onload阶段设置
  	wx.setNavigationBarTitle({
  	  title: _this.data.title,
  	  success: function(){
  	  	console.log('setNavigationBarTitle success')
  	  },
  	  fail: function(){
  	  	console.log('setNavigationBarTitle fail')
  	  }
  	})
  }
})
