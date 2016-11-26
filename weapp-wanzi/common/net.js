var util = require('util.js');

module.exports = {
    post: function(opt){
        wx.request({
            url: opt.url,
            method: 'POST',
            data: util.urlencode(opt.data),
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res)=> {
                console.log(res.data);
                if (opt.success) {
                    if (res.data.code === 1000) {
                        opt.success.call(null, res.data.result);
                    }
                    else {
                        opt.fail && opt.fail.call(null);
                    }
                }
            },
            fail: (err) => {
                opt.fail && opt.fail.call(null);
            },
            // complete方法
            complete: (data)=> {
                opt.complete && opt.complete.call(null, data);
            }
        });
    },
    get: function(opt){
        wx.request({
            url: opt.url,
            success: (res)=> {
                console.log(res.data);
                if (opt.success) {
                    if (res.data.code === 1000) {
                        opt.success.call(null, res.data);
                    }
                    else {
                        opt.fail && opt.fail.call(null);
                    }
                }
            },
            fail: (err) => {
                opt.fail && opt.fail.call(null);
            },
            // complete方法
            complete: (data)=> {
                opt.complete && opt.complete.call(null, data);
            }
        });
    }
}