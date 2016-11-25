//app.js
var Util = require( 'utils/util.js' );
App({
  //调用API从本地缓存中获取数据
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  //获取用户手机硬件信息
  getSystemInfo: function(cb){
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        cb(res)
      }
    })
  },

  //更新tokenID
  updateTokenID: function(tokenID){
    var that = this
    console.log('8888')
    console.log(tokenID)
    that.globalData.tokenID = tokenID
  },
  //获取省市学校信息
  getLocationInfo: function(cb){
    var that = this
    wx.request({
      url: that.globalData.localhost + 'get_provinces_colleges_and_citys/',
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
      }
    })
  },
  //获取商品类型列表
  getTypeInfo: function(cb){
    var that = this
    wx.request({
      url: that.globalData.localhost + 'get_merchandise_type_alchemy/',
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
      }
    })
  },

  //获取系统标签列表
  getSignatureInfo: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    queryInfo['signatureTypeID'] = requestInfo['signatureTypeID']
    queryInfo['tag'] = requestInfo['tag']
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'get_signature_list/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        console.log(res.data.data)
        cb(res.data.data)
      }
    })
  },

  //用户登录
  logIn: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    queryInfo['tel'] = requestInfo['tel']
    queryInfo['password'] = requestInfo['password']
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'login_with_portrait/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
      }
    })
  },

  //获取默认首页界面
  getHomePageInfo: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    queryInfo['startIndex'] = requestInfo['startIndex']
    queryInfo['pageCount'] = requestInfo['pageCount']
    queryInfo['cityID'] = requestInfo['cityID']
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'get_home_page_info/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
        console.log('2222')
        console.log(res.data.data)
      }
    })
  },

  // 发布闲置商品
  createMerchandiseWithSignature: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    queryInfo['tokenID'] = requestInfo['tokenID']
    queryInfo['imgList'] = requestInfo['imgList']
    queryInfo['signatureIDList'] = requestInfo['signatureIDList']
    queryInfo['customSignatureList'] = requestInfo['customSignatureList']
    queryInfo['merchandiseName'] = requestInfo['merchandiseName']
    queryInfo['description'] = requestInfo['description']
    queryInfo['merchandiseTypeID'] = requestInfo['merchandiseTypeID']
    queryInfo['currentPrice'] = requestInfo['currentPrice']
    queryInfo['oldPrice'] = requestInfo['oldPrice']
    queryInfo['shipmentPrice'] = requestInfo['shipmentPrice']
    queryInfo['cityID'] = requestInfo['cityID']
    queryInfo['collegeID'] = requestInfo['collegeID']
    var queryInfoString = JSON.stringify(queryInfo)
    // wx.request({
    //   url: that.globalData.localhost + 'create_merchandise_with_signature/',
    //   data: Util.json2Form( {data: queryInfoString}),
    //   method: 'post',
    //   header: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   success: function(res){
    //     cb(res.data.data)
    //     console.log('2222')
    //     console.log(res.data.data)
    //   }
    // })
  },

  //获取默认发现首页
    getSearchPageInfo: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'get_search_page_info/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
        console.log('333')
        console.log(res.data.data)
      }
    })
  },


  //获取闲置商品列表
  getMerchandiseList: function(cb, requestInfo){
    var that = this
    var queryInfo = {}
    queryInfo['startIndex'] = requestInfo['startIndex']
    console.log(requestInfo['startIndex'])
    queryInfo['pageCount'] = requestInfo['pageCount']
    queryInfo['merchandiseType'] = requestInfo['merchandiseType']
    queryInfo['sortType'] = requestInfo['sortType']
    queryInfo['collegeID'] = requestInfo['collegeID']
    queryInfo['cityID'] = requestInfo['cityID']
    queryInfo['provinceID'] = requestInfo['provinceID']
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'get_latest_merchandise_list/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        that.globalData.merchandiseInfoList = res.data.data
        cb(that.globalData.merchandiseInfoList, requestInfo['startIndex'] + requestInfo['pageCount'])
      }
    })
  },


  //获取闲置商品详情
  getMerchandiseInfo: function(cb, merchandiseID){
    var that = this
    var merchandiseID = merchandiseID
    var queryInfo = {}
    queryInfo['startIndex'] = 0
    queryInfo['pageCount'] = 10
    queryInfo['tokenID'] = "-1"
    queryInfo['merchandiseID'] = merchandiseID
    var queryInfoString = JSON.stringify(queryInfo)
    wx.request({
      url: that.globalData.localhost + 'get_merchandise_detail_with_signature/',
      data: Util.json2Form( {data: queryInfoString}),
      method: 'post',
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: function(res){
        cb(res.data.data)
      }
    })
  },


  //获取微信用户信息
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  //app中的全局变量
  globalData:{
    // localhost: 'http://192.168.30.156/',
    localhost: 'http://121.41.56.218:5005/',
    header: {'Content-Type': 'application/json'},
    merchandiseInfoList: null,
    homePageInfo: null,
    tokenID: '2222'
  }
})