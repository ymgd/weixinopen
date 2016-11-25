'use strict';

const api = require('request.js')
const sync = require('../utils/sync.js')

const suppliers = sync.initEntity('suppliers', ()=>{
    return api.get('station/suppliers', true).then(data=>{
      return data.suppliers
    })
})

module.exports = {
	suppliers
}