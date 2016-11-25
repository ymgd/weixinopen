'use strict';
const xsd = require('../../xsd/index')

Page({
  data:{
  	suppliers:[]
  },
  onLoad(){
    xsd.sync.suppliers.get().then(suppliers=>{
      this.setData({
        suppliers
      })
    })
  },
  onShow(){
    console.log('onShow');
  }

})