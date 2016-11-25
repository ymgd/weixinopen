var crypt =  require("./utils/crypt.js");
var util = require("./utils/util.js");
var api = require("./utils/api.js")
//app.js
var that;
var inited = false;// 初始化过程
var fid = 3;
App({
  onLaunch: function () {
    that = this;
    //调用API从本地缓存中获取数据
    // this.getTypes();
    // this.login();
    // this.getUserInfo();
    this.init();
  },

  // getUserInfo:function(cb){
  //   var that = this;
    // var that = this
    // wx.getUserInfo({
    //   success: function(res){
    //   }
    // })
    // if(this.globalData.userInfo){
    //   typeof cb == "function" && cb(this.globalData.userInfo)
    // }else{
    //   //调用登录接口
    //   that.login();
    // }
  // },
  // getTypes: function() {
  //     var that = this;
  //     var types =  [{
  //         ArticleTypeID : 0,
  //         ArticleTypeName : "全部"
  //       },{
  //         ArticleTypeID : 3132,
  //         ArticleTypeName : "运营日报"
  //       },{
  //         ArticleTypeID : 875,
  //         ArticleTypeName : "操作指南"
  //       },{
  //         ArticleTypeID : 2038,
  //         ArticleTypeName : "常见问题"
  //       },{
  //         ArticleTypeID : 2033,
  //         ArticleTypeName : "微赞故事"
  //       },{
  //         ArticleTypeID : 1,
  //         ArticleTypeName : "更新进度"
  //       }];
  //     that.globalData.types = types;
  // },


  /**
   * 获取用户信息
   */
  getUserInfo: function(cb) {
      var that = this;
      var userInfo = wx.getStorageSync("user");
      if (typeof userInfo == "undefined") {
          that.init(cb);
      } else {
        cb(wx.getStorageSync("userInfo"));
      }
  },
  
  /**
   * 获取论坛信息
   */
  getMinisnsInfo: function(cb) {
      var minisnsInfo = wx.getStorageSync('minisns');
      if (typeof minisnsInfo == "undefined") {
          that.init(cb);
      } else {
        cb(wx.getStorageSync('minisns'));
      }
  },
  

  /**
   * 初始化数据
   */
  init:function(cb) {
      wx.login({
        success: function(loginRes){
              var url = "https://api.weixin.qq.com/sns/jscode2session?"+ "appid=wx61575c2a72a69def&secret=442cc056f5824255611bef6d3afe8d33&"+
                  "js_code="+ loginRes.code +"&grant_type=authorization_code";
              wx.request({
                url: url,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                success: function(sessionRes){
                    wx.getUserInfo({
                      success: function(userInfoRes){
                          var str = crypt.decryptUserInfo(userInfoRes.encryptedData, sessionRes.data.session_key, userInfoRes.iv); // 解密用户信息
                          var userInfo = JSON.parse(str);
                          var verifyModel = util.primaryLoginArgs(userInfo.unionId);
                          // 登陆服务器
                          // wx.request({
                          //   url: 'http://apptest.vzan.com/minisnsapp/loginByWeiXin',
                          //   data: {"deviceType":verifyModel.deviceType, "uid":verifyModel.uid, 
                          //   "sign":verifyModel.sign, "timestamp":verifyModel.timestamp, "versionCode":verifyModel.versionCode,
                          //   "openid":userInfo.openId, "nickname":userInfo.nickName, "sex":userInfo.gender,"province":userInfo.province,
                          //   "city":userInfo.city,"country":userInfo.country,"headimgurl":userInfo.avatarUrl,"unionid":userInfo.unionId},
                          //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          //   // header: {}, // 设置请求的 header
                          //   success: function(res){
                          //     console.log("loginByWeiXin", res);
                          //   }
                          // })

                          // var formdata = new FormData();
                          // formdata.append("fid",fid); formdata.append("deviceType",verifyModel.deviceType);
                          // formdata.append("uid", verifyModel.uid); formdata.append("sign", verifyModel.sign);
                          // formdata.append("timestamp",verifyModel.timestamp); formdata.append("versionCode", verifyModel.versionCode);
                          wx.downloadFile({
                            url: "http://i.pengxun.cn/images/logo/2015921102133221.JPG",
                            type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
                            // header: {}, // 设置请求的 header
                            success: function(res){
                                console.log("下载文件", res);
                                wx.saveFile({
                                  tempFilePath: res.tempFilePath,
                                  success: function(save){
                                      console.log("SaveFile");
                                      wx.setStorageSync('tmpFile', save.savedFilePath);
                                      wx.uploadFile({ // 获取userInfo
                                          url: 'http://apptest.vzan.com/minisnsapp/userinfo',
                                          filePath:wx.getStorageSync('tmpFile'),
                                          name:'file',
                                          // header: {}, // 设置请求的 header
                                          formData: {"fid":fid,"deviceType":verifyModel.deviceType, "uid":verifyModel.uid, 
                                          "sign":verifyModel.sign, "timestamp":verifyModel.timestamp, "versionCode":verifyModel.versionCode}, // HTTP 请求中其他额外的 form data
                                          success: function(res){
                                              var result = JSON.parse(res.data);
                                              wx.setStorageSync('user', result.obj._LookUser);
                                              wx.setStorageSync('minisns', result.obj._Minisns);
                                              wx.setStorageSync('myArtCount', result.obj._MyArtCount);
                                              wx.setStorageSync('myMinisnsCount', result.obj._MyMinisnsCount);
                                              wx.setStorageSync('concernCount', result.obj.ConcernCount);
                                              wx.setStorageSync('myConcernCount', result.obj.MyConcernCount);
                                              console.log("APP.JS loginRes ", res);
                                              if (typeof cb == "function") {
                                                cb(result.obj._LookUser);
                                              }
                                          }
                                      })
                                  }
                                })
                            }
                          })
                          // wx.request({ 
                          //   url: 'https://xiuxun.top/wx/app/minisnsapp/userinfo',
                          //   data: {"fid":fid,"deviceType":verifyModel.deviceType, "uid":verifyModel.uid, 
                          //   "sign":verifyModel.sign, "timestamp":verifyModel.timestamp, "versionCode":verifyModel.versionCode},
                          //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                          //   // header: {"Content-Type":"multipart/form-data;charset=utf-8"}, // 设置请求的 header
                          //   success: function(loginRes){
                          //       wx.setStorageSync('user', loginRes.data.obj._LookUser);
                          //       wx.setStorageSync('minisns', loginRes.data.obj._Minisns);
                          //       wx.setStorageSync('myArtCount', loginRes.data.obj._MyArtCount);
                          //       wx.setStorageSync('myMinisnsCount', loginRes.data.obj._MyMinisnsCount);
                          //       wx.setStorageSync('concernCount', loginRes.data.obj.ConcernCount);
                          //       wx.setStorageSync('myConcernCount', loginRes.data.obj.MyConcernCount);
                          //       console.log("APP.JS loginRes ", loginRes);
                          //   } 
                          // })
                      }
                    })
                }
              })
        },
        complete: function() {
            console.log("APP.js 初始化数据结束");
            inited = true;
            // 模拟数据
            // wx.setStorageSync('minisnsInfo', {"id":3});
            // wx.setStorageSync('userInfo', {"unionid":"oW2wBwaOWQ2A7RLzG3fcpmfTgnPU","Openid":"obiMY0YuQSpXSAY21oWjKw-OJC0E",
                        // "IsSign":true,"ArticleCount":20,"CommentCount":12,"PraiseCount":1231,"IsWholeAdmin":false})
        }
      })
      var user = wx.getStorageSync('user');
      wx.showToast({title:"初始化数据中...", icon:"loading", duration:1500});
  },
  
})