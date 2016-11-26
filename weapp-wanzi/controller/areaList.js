
var app = getApp(),
    net = require('../common/net.js'),
    util = require('../common/util.js'),
	conf = require('../conf/conf.js');

module.exports = {
    getIndexPage: function() {
        return app.getPage('index');
    },
    versionKey: 'area-version', // area的版本
    areaKey: 'area-data', // area的data

    checkVersion: function(updateCb, notUpdateCb) {
        var localVersion = wx.getStorageSync(this.versionKey);
        var url = conf.apiDomain + 'version/getAreaVersion';
        net.get({
            url: url,
            success: (res) => {
                // console.log(res);
                var version = res.result;
                if (version > localVersion) { // 有更新
                    updateCb && updateCb.call(this, version);
                    // 更新storage
                    wx.setStorage({
                        key: this.versionKey,
                        data: version
                    });
                }
                else {
                    notUpdateCb && notUpdateCb.call(this);
                }
            },
            fail: () => { // 请求失败也从缓存中加载
                notUpdateCb && notUpdateCb.call(this);
            }
        });
    },

    check2fetch2render: function(){
        this.checkVersion(
            this.fetchAndRender,
            this.renderFromCache);
    },

    renderFromCache: function(){
        wx.getStorage({
            key: this.areaKey,
            success: (data) => {
                if (data.errMsg && data.errMsg.indexOf('ok') > -1) {
                    this.renderAreaList(data.data, true);
                }
            }
        });
    },
    
    fetchAndRender: function(isPrepend, callback) {
        var indexPage = this.getIndexPage();

        if (indexPage.data.loading) {
            console.log('Prevented for the other request is processing...');
            return;
        }

        var url = conf.apiDomain + conf.api.home;

        indexPage.setData({
            loading: true
        });
        // 显示标题栏的加载图标
        wx.showNavigationBarLoading();
        var data = {
            cn_id: indexPage.lastId, 
            time: util.getTime()
        };

        net.post({
            url: url,
            data: data,
            success: (data) => {
                if (!callback) {
                    this.renderAreaList(data);
                } 
                else {
                    callback.call(null, data);
                }
            },
            complete: () => {
                indexPage.setData({
                    loading: false
                });
                // 隐藏标题栏的加载图标
                wx.hideNavigationBarLoading();
                
                // 停止下拉的加载图标，可以在网络加载完时调用
                wx.stopPullDownRefresh();
            }
        })
    },
    
    formatAreaItem: function(data){
        var item = {};

        for (var d of data.file_content) {
            if (d.field === 'area_photo') {
                item.img = conf.imgPrefix + d.value;
            }
            else if (d.field === 'area_name') {
                item.desc = d.value;
            }
            else if (d.field === 'area_id') {
                item.id = d.value;
            }
        }
        return item;
    },

    renderAreaList: function(data, formated){ // formated表示数据是否被格式化过，默认无
        var indexPage = this.getIndexPage();

        var items = indexPage.data.items;
        for (var item of data) {
            if (!formated) {
                item = this.formatAreaItem(item);
            }
            items.push(item);
        }
        if (!formated) {
            // 更新storage
            wx.setStorage({
                key: this.areaKey,
                data: items
            });
        }
        indexPage.setData({
            items: items
        });
    }
};