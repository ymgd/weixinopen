'use strict';

const xsd = require('../../xsd/index')

Page({
  data:{
    price:0.00,
    fee:0.00,
  	prod:null,
  	agent:null,
    disabled:true
  },
  onLoad(options){
  	xsd.api.get('station/item/'+options.id, true).then(data=>{
  	  this.setData({
  	  	prod:data.item,
  	  	agent:data.agent,
        price:parseFloat(data.item.price)
  	  })
  	})
  },
  inputChanged(e){
    const disabled = !xsd.sd.regex.price.test(e.detail.value)
    const fee = disabled?0.00:parseFloat(e.detail.value)
    this.setData({disabled, fee})
  }
})