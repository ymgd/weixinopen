


/**
 * 登陆服务器
 */
function login(data) {
    // 登陆服务器
    wx.request({
      url: 'https://apptest.vzan.com/minisnsapp/loginByWeiXin',
      data: data,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          "Content-Type": "multipart/form-data" 
      }, // 设置请求的 header
      success: function(res){
         console.log("loginByWeiXin 成功", res);
      },
      complete: function(){
          console.log("loginByWeiXin 结束");
      }
    })
}

/**
 * 获取用户信息
 */
function userinfo(data, cb){
  wx.request({
    url: 'https://apptest.vzan.com/minisnsapp/userinfo',
    data: data,
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header:{
          "Content-Type": "multipart/form-data;"
      }, // 设置请求的 header
    success: function(res){
      cb(res)
    }
  })
}
/**
 * 获取论坛顶部内容
 * 
 */
function headInfo(data, cb) {
    wx.request({
      url: 'https://apptest.vzan.com/minisnsapp/getMinisnsHeadInfo',
      header:{
          "Content-Type": "multipart/form-data;"
      },
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          if (typeof cb == "function") {
              cb(res);
          }
      },
      fail: function() {
         cb("error");
      }
    })
}

/**
 * 获取论坛帖子
 */
function articles(data, cb) {
    wx.request({
      url: 'https://URL/minisnsapp/getArtListByMinisnsId',
      data: data,
      head:{
          "Content-Type": "multipart/form-data;"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          if (typeof cb == "function") {
              cb(res);
          }
      }
    })
}



/**
 * 
 */
function getRequest(data, cbObj) {
    wx.request({
      url: cbObj.url,
      data: cbObj.data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          if (typeof cbObj.success == "function") {
            cbObj.success(res);
          }
      },
      fail: function() {
          if (typeof cbObj.fail == "function") {
            cbObj.fail();
          }
      },
      complete: function() {
          if (typeof cbObj.complete == "function") {
            cbObj.complete();
          }
      }
    })
}





module.exports = {
  login:login,
  headInfo:headInfo,
  articles:articles,
  getRequest:getRequest,
  userinfo:userinfo,
}