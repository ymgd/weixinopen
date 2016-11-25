var Constant = require('./constant.js');
var Mock = require('./mock.js');

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 直接发送对象php获取不到参数
 * @param data
 * @returns {string}
 */
function convertatatoString(data) {
    let str = '';
    for (var d in data) {
        str += d + '=' + data[d] + '&';
    }
    return str;
}

function requestData(config) {
    if (getApp().globalData.isMock) {
        switch (config.url) {
            case Constant.ALBUM_LIST:
                callBack(Mock.albumlist);
                break;
            case Constant.ALBUM_DETAIL:
                callBack(Mock.albumdetail);
                break;
        }
    } else {
        wx.request({
            url: config.url,
            data: convertatatoString(config.data),
            method: config.method ? config.method : (config.data ? 'POST' : 'GET'),
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                if (res.data.data) {
                    config.success(res.data.data);
                }else{
                    config.error(res.data);
                }
            }
        });
    }
}

module.exports = {
    formatTime: formatTime,
    requestData: requestData
}
