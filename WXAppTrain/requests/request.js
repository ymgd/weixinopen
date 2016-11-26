var utils = require('../utils/util.js');

/**
 * 网路请求
 */
function request(url, method, header, data, successCb, errorCb, completeCb) {
    wx.request({
        url: url,
        method: method,
        header: header,
        data: data,
        success: function(res) {
            utils.isFunction(successCb) && successCb(res);
        },
        error: function() {
            utils.isFunction(errorCb) && errorCb();
        },
        complete: function() {
            utils.isFunction(completeCb) && completeCb();
        }
    });
}

module.exports= {
    request: request,
}