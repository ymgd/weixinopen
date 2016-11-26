
var app = getApp();
var net = require('../common/net.js'),
	util = require('../common/util.js'),
	conf = require('../conf/conf.js');

module.exports = {

    countries: null, // 国家数据，按洲分
    areas: null, // 国家、地区

    renderSearchPage: function(){
        var page = app.getPage('search');
        page && this._initData_(()=>{
            // 把数据设置到搜索页中
            page.setData({
                items: this.countries
            });
        });
    },
    renderCountryPage: function(countryId){
        var page = app.getPage('country');
        page && this._initData_(null, ()=>{
            // 把数据设置到搜索页中
            // console.log(this.areas, countryId);
            page.setData({
                country: this.areas[countryId]
            });
        });
    },
    renderDetailTop: function(countryId, areaId, callback) {
        var page = app.getPage('area');
        page && this._initData_(null, ()=>{
            var item = null;
            var areas = this.areas[countryId]['children'];
            if (areaId) {
                for (var k in areas) {
                    var obj = areas[k];
                    if (obj.id == areaId) {
                        item = obj;
                    }
                }
            }
            else {
                item = this.areas[countryId];
            }
            if (item) {
                var baseData = this._getDataFromLay1_(item);
                page.setData({
                    base: baseData
                });
                console.log(baseData);
                callback && callback.call(null);
            }
            else {
                console.log('area not found.')
            }
        });
    },

    // 从请求的数据中生成本项目需要的地区数据结构
    _initData_: function(countryCallback, areaCallback) {
        if (this._checkData_()) { // 内存中和缓存中是否有
            countryCallback && countryCallback.call(this);
            areaCallback && areaCallback.call(this);
            return;
        }
        this.areas = {};

        // 请求数据
        var url = conf.apiDomain + conf.api.countries;
        net.get({
            url: url,
            success: (res) => {
                var list = res.result;
                this._genDataFromRsp_(list, countryCallback, areaCallback);
            }
        });
    },

    // 从网络请求的结果中，生成国家、地区数据
    _genDataFromRsp_: function(data, countryCallback, areaCallback) {
        // 把数据按层分成几组
        var levels = [];
        for (var item of data) {
            // 格式化一下
            item = this._formatArea_(item); 
            // 分类
            var level = parseInt(item.level);
            if (!levels[level]) {
                levels[level] = [item];
            }
            else {
                levels[level].push(item);
            }
        }

        // 开始一层层处理
        var result = this._genCountries_(levels, countryCallback);
        if (result) { // 如果countries数据处理成功
            this._genAreas_(levels, areaCallback)
        }
    },

    // 从第一、二级数据中生成countries数据
    _genCountries_: function(levels, countryCallback) {
        // level 0 至少有一个数据的话
        if (levels[0].length > 0) {
            var dataItems = {};
            // 处理level 0
            for (var item of levels[0]) { 
                var id = item.id;
                dataItems[id] = item;
                item['children'] = [];
            }
            // level 1 至少有一个数据的话
            if (levels[1].length > 0) { 
                // 处理level 1
                for (var item of levels[1]) {
                    var id = item.id,
                        parent = item.parent;
                    if (dataItems[parent]) {
                        dataItems[parent]['children'].push(item);
                    }
                    else {
                        // 丢弃
                    }
                    this.areas[id] = item;
                }

                /* countries国家数据生成完闭 */

                // 要clone，因为再往下的流程会给每一项添加更多数据
                var tmpRef = util.clone(dataItems);
                // 保留拷贝的数据且以数据的形式保存到this.countries
                this.countries = util.sortObjs( // 同时做个排序
                    util.objVal2Arr(tmpRef), 'id', conf.homeOrder);
                // 给国家排序
                for (var item of this.countries) {
                    util.sortObjs(item['children'], 'pin', conf.countryOrder);
                }
                
                // 删除对拷贝数据的引用
                // delete(tmpRef);  // 微信屏蔽了这个方法
                // 回调
                countryCallback && countryCallback.call(null); 
                
                // 把国家数据存入缓存
                wx.setStorage({
                    key: 'countries', 
                    data: this.countries
                });
                return true;
            }
        }
        return false;
    },

    // 从第三级数据中生成areas数据
    _genAreas_: function(levels, areaCallback){
        // level 2 至少有一个数据的话
        if (levels[2].length > 0) {
            // 处理level 2
            for (var item of levels[2]) { 
                var id = item.id,
                    parent = item.parent;
                if (this.areas[parent]) {
                    if (!this.areas[parent]['children']) {
                        this.areas[parent]['children'] = [];
                    }
                    this.areas[parent]['children'].push(item);
                }
                else {
                    // 丢弃
                }
            }
            // 排序
            for (var k in this.areas) {
                var places = this.areas[k]['children'];
                places && util.sortObjs(places, 'pin');
            }
            // 把国家数据存入缓存
            wx.setStorage({
                key: 'areas', 
                data: this.areas
            });
            areaCallback && areaCallback.call(null); 
        }
    },

    // 两个数据都存在的时候才能判断true
    _checkData_: function(){
        if (this.areas && this.countries) {
            return true;
        }
        else {
            this.areas = wx.getStorageSync('areas');
            this.countries = wx.getStorageSync('countries');
            if (this.areas && this.countries) {
                return true;
            }
            return false;
        }
    },

    _formatArea_: function(item) {
        var data = {
            id: item.area_id,
            parent: item.area_fid,
            nameCn: item.area_name,
            nameEn: item.area_en,
            pin: item.area_pin,
            img: conf.flagImgPrefix + item.area_id + '.png',
            level: item.area_level
        };
        return data;
    },

    _getDataFromLay1_: function(obj){
        var newObj = {};
        for (var k in obj) {
            var value = obj[k];
            if (typeof(value) != 'object') {
                newObj[k] = value;
            }
        }
        return newObj;
    }
};