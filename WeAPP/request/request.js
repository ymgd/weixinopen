// request.js
var api = require('api.js');
var util = require('../utils/util.js');
var start = 0;
var count = 10;

// 搜索图书
function searchBook(isTag, query, successCb, failCb){
    if(isTag === 'true'){
        wx.request({
            url: api.API_BOOK_SEARCH,
            data: {
                tag: query,
                start: start,
                count: count
            },
            success: function(res){
                util.isFunction(successCb) && successCb(res.data);
            },
            fail: function(){
                util.isFunction(failCb) && failCb();
            }
        });
    }else{
        wx.request({
            url: api.API_BOOK_SEARCH,
            data: {
                q: query,
                start: start,
                count: count
            },
            success: function(res){
                util.isFunction(successCb) && successCb(res.data);
            },
            fail: function(){
                util.isFunction(failCb) && failCb();
            }
        });
    }
}
 
// 加载下一页
function getNextPage(isTag, query, successCb, failCb){
    start += count;
    if(isTag === 'true'){
        wx.request({
            url: api.API_BOOK_SEARCH,
            data: {
                tag: query,
                start: start,
                count: count
            },
            success: function(res){
                util.isFunction(successCb) && successCb(res.data);
            },
            fail: function(){
                util.isFunction(failCb) && failCb();
            }
        });
    }else{
        wx.request({
            url: api.API_BOOK_SEARCH,
            data: {
                q: query,
                start: start,
                count: count
            },
            success: function(res){
                util.isFunction(successCb) && successCb(res.data);
            },
            fail: function(){
                util.isFunction(failCb) && failCb();
            }
        });
    }
}

// 获取图书详情
function searchBookDetail(bookId, successCb, failCb){
    wx.request({
        url: api.API_BOOK_DETAIL.replace(':id', bookId),
        data: {},
        success: function(res){
            util.isFunction(successCb) && successCb(res.data);
        },
        fail: function(){
            util.isFunction(failCb) && failCb();
        }
    });
}

module.exports = {
    searchBook: searchBook,
    searchBookDetail: searchBookDetail,
    getNextPage: getNextPage
}