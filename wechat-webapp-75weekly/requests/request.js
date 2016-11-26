import * as API from './api.js'
import * as UTIL from '../utils/util.js'

var app = getApp()

/**
 * 网络请求方法
 * @param url {string} 请求url
 * @param data {object} 参数
 * @param successCallback {function} 成功回调函数
 * @param errorCallback {function} 失败回调函数
 * @param completeCallback {function} 完成回调函数
 * @returns {void}
 */
export const fetchGet = ( url, successCallback, errorCallback, completeCallback ) => {
    if( app.debug ) {
      console.log( 'requestData url: ', url )
    }
    wx.request( {
      url: url,
      header: { 'Content-Type': 'application/json' },
      success: function( res ) {
          if( app.debug ) {
              console.log( 'response data: ', res )
          }

          UTIL.isFunction( successCallback ) && successCallback( res.data )

      },
      error: function() {
          UTIL.isFunction( errorCallback ) && errorCallback()
      },
      complete: function() {
          UTIL.isFunction( completeCallback ) && completeCallback()
      }
  })
}

export const fetchPost = ( url, data, successCallback, errorCallback, completeCallback ) => {
    if( app.debug ) {
      console.log( 'requestData url: ', url )
    }
    wx.request( {
      url: url,
      data: data,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function( res ) {
          if( app.debug ) {
              console.log( 'response data: ', res )
          }

          UTIL.isFunction( successCallback ) && successCallback( res.data )

      },
      error: function() {
          UTIL.isFunction( errorCallback ) && errorCallback()
      },
      complete: function() {
          UTIL.isFunction( completeCallback ) && completeCallback()
      }
  })
}
