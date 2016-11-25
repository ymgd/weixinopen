//index.js
//获取应用实例
var app = getApp()
var xsd = require("../../xsd/index")
var sync = require('../../utils/sync')
var Promise = require("../../utils/bluebird.min")

Page({
  data: {
  },
  onLoad: function () {
    xsd.station.auth()
  }
})
