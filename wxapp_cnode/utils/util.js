/**
 * [request 数据请求]
 * @param  {[Object]} options [description]
 * @return {[Promise]}         [description]
 */
function request(options) {
    var opts = Object.assign({
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        showLoading: true,
        showFailMsg: true
    }, options);
    var promise = new Promise(function (resolve, reject) {
        opts.success = function (res) {
            resolve(res);
        }
        opts.fail = function (res) {
            opts.showFailMsg && wx.showToast({
                title: '请求失败',
                icon: 'warn',
                duration: 10000
            });
            reject(res);
        }
        opts.complete = function () {
            opts.showLoading && wx.hideToast();
            typeof options.complete === 'function' && options.complete(res);
        }
        opts.showLoading && wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 100000
        });
        wx.request(opts);
    });

    return promise;

}

/**
 * [dateFormat 时间格式化]
 * @param  {[String]} date   [description]
 * @param  {[String]} format [description]
 * @return {[String]}        [description]
 */
function dateFormat(date, format) {

    var date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}



module.exports = {
    request: request,
    dateFormat: dateFormat
}
