var config = require("./config.js");
function getApiData(type, req, success, fail){
  wx.request({
      url: config.API_BASE_URL + type,
      header: {
          'Content-Type': 'application/json'
      },
      data: req,
      success: function(res) {
          success(res);
      },
      fail: function(res){
          fail(res);
      }
  });
}


module.exports = {
  getApiData: getApiData
}
