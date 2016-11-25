const kQQKAPIClientKey = "api_ioslekongkong";
const kQQKAPIClientSecret = "7c5f4aa961a44dc248d12692ca2add09";
const kQQKAPIHost = "api_ioslekongkong";
const kUDID = "d33d2fce6c1748beb102dd7abb7f8cef";
const kUSERTOKEN = "";

var util = require("util.js");
var config = require("../config.js");

function apiHash(url) {
    var host = config.host;
    var querys = (typeof url == 'string') && url.split(host);
    var url_ = querys && querys.pop();
    var plain = kUDID + kUSERTOKEN + url_ + kQQKAPIClientSecret + kUDID;
    return util.MD5(plain);
}

function header(url) {
    return {
        "BAPI-APP-KEY": kQQKAPIHost,
        "UDID": kUDID,
        "APP_VERSION": config.appVersion,
        "BAPI-HASH": apiHash(url),
        "BAPI-NONCE": kUDID
    };
}

function fullUrl(url, data) {
    var isFirstObj = true;
    var url_ = url;
    for (var key in data) {
        if (isFirstObj) {
            isFirstObj = false;
            url_ = url_ + "/?" + key + "=" + encodeURIComponent(data[key]);
        } else {
            url_ = url_ + "&" + key + "=" + encodeURIComponent(data[key]);
        }
    }
    return url_;
}

function errorWithCode(code) {

}

function request({url, data, method, success, fail, complete}) {
    var fullUrlString = fullUrl(url, data);
    console.log("request url:" + fullUrlString);
    wx.request({
      url: fullUrlString,
      data: {},
      method: method, 
      header: header(fullUrlString), // 设置请求的 header
      success: function(res){
        // success
        console.log("request url successed:" + fullUrlString);
        console.log(res);
        (typeof success == 'function') && success(res);
      },
      fail: function() {
        // fail
        console.log("request url faild" + fullUrlString);
        typeof fail == 'function' && fail('发生错误');
      },
      complete: function() {
        // complete
        console.log("request url complete");
        typeof complete == 'function' && complete();
      }
    })
}

module.exports = {
    fullUrl: fullUrl,
    request: request
}