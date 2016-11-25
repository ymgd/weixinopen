var crypt = require("./crypt.js")
var app = getApp();

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}



function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getData() {
  wx.request({
    url: 'http://apptest.vzan.com/f/s-1',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      // success
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

// 举报
function tipOff(user) {
    console.info("举报");
}

// 登陆必要参数
function primaryLoginArgs(unionid) {
    var sysInfo = wx.getSystemInfoSync();
    var versionCode = 1;
    var deviceType = sysInfo.model;
    var timestamp = ( new Date() ).getTime();    
    // var timestamp = Math.round(timestamp);
    var sign = crypt.getVerifyModel(unionid, versionCode, deviceType, timestamp);
    var verifyModel = {};
    verifyModel.deviceType = "ios9.0";//deviceType;
    verifyModel.timestamp = 1479174892808;//timestamp;
    verifyModel.uid = "oW2wBwUJF_7pvDFSPwKfSWzFbc5o"//unionid;
    verifyModel.versionCode= "1.0"//versionCode;
    verifyModel.sign= "817AF07823E5CF86031A8A34FB593D1EC12A5499D66EBA10E7C4B6D034EF1C67A9C8FE9FF2A33F82"//sign;
    return verifyModel;
}

function login(data) {
    // 登陆服务器
    wx.request({
      url: 'https://apptest.vzan.com/minisnsapp/loginByWeiXin',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {}, // 设置请求的 header
      success: function(res){
        // success
      }
    })
}


module.exports = {
  formatTime: formatTime,
  tipOff: tipOff,
  primaryLoginArgs:primaryLoginArgs,
  login:login
}

