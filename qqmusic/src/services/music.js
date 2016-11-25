(function (exports) {
    // 获取音乐列表
    exports.getMusicList = function () {

    };

    exports.getTopMusicList = function (callback) {
        var data = {
            format: 'json',
            g_tk: 5381,
            uin: 0,
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data)
                } else {

                }
            }
        });
    };

    // 获取首页的音乐数据
    exports.getIndexMusic = function (callback) {
        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data)
                } else {

                }

            }
        });
    };
    exports.getHotMusicInfo = function (id, callback) {

        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'app',
            needNewCode: 1,
            new_format: 1,
            pic: 500,
            disstid: id,
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            nosign: 1,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
            data: data,
            header: {
                'Content-Type': 'application/jsonp'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    var str = res.data.replace('jsonCallback(', '');
                    str = str.substr(0, str.length - 1);
                    var data = JSON.parse(str);
                    callback(data);
                } else {

                }

            }
        });

    }

    exports.getTopListInfo = function (id, callback) {
        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            tpl: 3,
            page: 'detail',
            type: 'top',
            topid: id,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data);
                } else {

                }

            }
        });
    }
    exports.getSearchMusic = function (word, callback) {
        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            w: word,
            zhidaqu: 1,
            catZhida: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            sem: 1,
            aggr: 0,
            perpage: 20,
            n: 20,
            p: 1,
            remoteplace: 'txt.mqq.all',
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data);
                } else {

                }

            }
        });
    }
    exports.getRadioMusicList = function (id, callback) {
        var data = {
            labelid: id,
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now(),
        }
        wx.request({
            url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data);
                } else {

                }

            }
        });
    };

    /**
     *
     * 获取专辑的详细信息
     *
     */
    exports.getAlbumInfo = function (albummid, callback) {
        var data = {
            albummid: albummid,
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    callback(res.data);
                } else {

                }

            }
        });
    };

    exports.getPlayMusicList = function (ids, calcallbackl) {
        var data = {
            playindex: 0,
            from: 'myqq',
            ADTAG: 'myqq',
            channel: 10007100,
            songid: '102636799,5106429,104862561,107192078,107903929,108836628,102793935,108829124,105030812,108708182,107192538,104783753,105632815,102349482,9058628,5016168,102193601,9082287,1313990,108034918,102425546,647969,104936872,102376507,1166273,1313992,5016169,9103820,5002691,7228566,5002692,9059607,5002687,7168586,105974515,102954020,102367085,102629053,107602121,102657429,102415346,107329447,102689038,108553675,5080232,101555425,107899426,108661547,4830342,107738401'
        };

        wx.request({
            //url: 'http://c.y.qq.com/v8/playsong.html?playindex=0&songid=102636799,5106429,104862561,107192078',
            url: 'http://c.y.qq.com/v8/playsong.html?ADTAG=newyqq.index.song&songid=102636799',
            // data: data,
            method: 'GET',
            header: {
                'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*',
                // 'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                // 'UUID':1652808458,
                // 'Connection':'keep-alive'
            },
            success: function (res) {
                console.log(res);
                // if(res.statusCode == 200) {
                //     callback(res.data);
                // }else {

                // }

            }
        });

    }
}(module.exports))