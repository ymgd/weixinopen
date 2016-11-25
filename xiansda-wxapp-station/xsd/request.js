'use strict';

const Promise = require("../utils/bluebird.min")
const base64 = require('../utils/base64')

const API_PATH = 'http://localhost/xiansda/1/wxapp/'
//const API_PATH = 'https://xiansda.sinaapp.com/wxapp/'
const sync = require('../utils/sync')

const _request = opts => {
  return new Promise((resolve, reject) => {

  	const options = Object.assign({
	  method:'GET',
	  success:res=>{
	  	//console.log(res)
	  	if(res.statusCode==200)
	  		resolve(res.data)
	  	else if(res.statusCode==401){
	  		wx.navigateTo({url:'/pages/index/index'})
	  	}
	  	else{
	  		const msg = (!!res.data.error)?res.data.error.message:res.data
		    wx.showModal({
		      title: '抱歉，发生错误！',
		      content: msg,
		      showCancel:false,
		      confirmText:'知道了'
		    })
	  		reject(msg)
	  	}
	  },
	  fail:err=>{
	    wx.showModal({
	      title: '抱歉，发生错误！',
	      content: err.errMsg,
	      showCancel:false,
	      confirmText:'知道了'
	    })
	  	reject(err.errMsg)
	  }
	}, opts)

  	const auth = sync.getEntityData('auth')
  	if(!!auth){
  		options.header = {
  			'Authorization': base64.encode(auth.id + ":" + auth.token)
  		}
  	}
	options.url = API_PATH + options.url
	console.log(options)
	wx.request(options)
  })	
}

const _cache = []
const get = (url, cache=false) => {
	if(!!_cache[url] && _cache[url].dirty !== true)
		return Promise.resolve(_cache[url])
	else
      return _request({url, method:'GET'}).then(data=>{
        if(cache === true) 
        	_cache[url] = data
        return data
      })
}
const dirty = url => {
	if(!!_cache[url]) _cache[url].dirty = true
}
const post = (url, data) => _request({url, method:'POST', data})

module.exports = {
  get,
  dirty,
  post
}