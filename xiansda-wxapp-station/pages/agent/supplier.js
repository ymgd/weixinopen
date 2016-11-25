'use strict';

const xsd = require('../../xsd/index')

Page({
  data:{
  	supplier:null,
  	items:[]
  },
  onLoad(options){
  	xsd.api.get('station/supplier/'+options.id, true).then(data=>{
  	  this.setData({
  	  	supplier:data.supplier,
  	  	items:data.items
  	  })
  	})
  }
})