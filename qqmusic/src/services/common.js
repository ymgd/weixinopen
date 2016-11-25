(function (exports) {

    exports.getBodyBgColor = function (imgurl, callback) {
        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            pic_url: imgurl,
            _: Date.now()
        };

        wx.request({
            url: 'http://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200 && res.data.code == 0) {
                    callback(res.data.magic_color);
                } else {

                }
            }
        });

    }

}(module.exports))