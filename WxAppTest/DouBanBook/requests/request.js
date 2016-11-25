var api = require('./api.js');
var utils = require('../utils/util.js');

/**
 *网络请求
 */
function request(url, data, successCb, errorCb, completeCb) {
    wx.request({
        //必需
        url: url,
        method: 'GET',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            utils.isFunction(successCb) && successCb(res.data);
        },
        fail: function(res) {
            utils.isFunction(errorCb) && errorCb();
        },
        complete: function(res) {
            utils.isFunction(completeCb) && completeCb();
        }
    })
}

/**
 *搜索图书
 */
function requestSearchBook(data,successCb,errorCb,completeCb){
	request(api.API_BOOK_SEARCH,data,successCb,errorCb,completeCb);
}

/**
*获取图书详情
*/
function requestBookDokDetail(id,data,successCb,errorCb,completeCb){
	request(api.API_BOOK_DETAIL.replace(':id', id),data,successCb,errorCb,completeCb);
}

/**
*关键字是否Tag
*/
function requestHasTag(tag,successCb,errorCb,completeCb){
	request(api.API_BOOK_SEARCH,{tag: tag, count: 1},successCb,errorCb,completeCb);
}

module.exports = {
  requestSearchBook: requestSearchBook,
  requestBookDokDetail: requestBookDokDetail
}