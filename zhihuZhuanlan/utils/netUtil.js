
/**
 * 基于Promise封装网络请求
 * 引入了https://github.com/tildeio/rsvp.js
 */

// var Promise = require('../libs/bluebird/browser/bluebird.min');

import {Promise} from '../libs/rsvp-latest.min';
   
export default class NetUtil {
   
 static postJson(url,data){
    return NetUtil.requestJson(url,data,"post");
 }

 static getJson(url,data){
     return NetUtil.requestJson(url,data,"get");
 }
 
  static requestJson(url,data,method){
       data = data || {}; 
       return new Promise(function(resolve, reject) {
            // wx.showNavigationBarLoading();
            wx.request({
                    "method":method,
                    "url": url, 
                    "data": data,
                    "header": {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                    //    wx.hideNavigationBarLoading();
                       resolve(res);
                    },
                    fail : function(err){
                        // wx.hideNavigationBarLoading();
                        reject(err);
                      
                    }
                })
       });
  }
}