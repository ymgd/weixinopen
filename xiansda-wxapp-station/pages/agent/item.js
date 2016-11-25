'use strict';

const xsd = require('../../xsd/index')

Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

  	prod:null,
  	agent:null
  },
  onLoad(options){
  	xsd.api.get('station/item/'+options.id, true).then(data=>{
  	  this.setData({
  	  	prod:data.item,
  	  	agent:data.agent
  	  })
  	})
  },
  addAgent(){
  	console.log('add')
  }
})