
var app = getApp();
var net = require('../common/net.js'),
	util = require('../common/util.js'),
	conf = require('../conf/conf.js');

module.exports = {
    limit: 30,
    guides: null,
    total: -1, // 列表的长度
    areaId: 0, // maybe a country id or and area id
    loading: false, 
    pageNo: 0,

    tmpGuides: null, // 查询过滤后的列表
    tmpTotal: -1, // 查询过滤后的列表长度

    reqData: function(pageNo, callback, opt){
        pageNo = pageNo || 0;
        var url = conf.apiDomain + conf.api.areaDetail,
            data = {
                offset: pageNo * this.limit,
                limit: this.limit,
                start: opt && opt.start || 0,
                end: opt && opt.end || 0,
                sp: opt && opt.sp || 0,
                keyword: this.areaId, 
                time: util.getTime()
            };
        this.loading = true;
        net.post({
            url: url,
            data: data,
            success: (data) => {
                callback && callback.call(this, data);
            },
            complete: ()=>{
                this.loading = false;
            }
        });
    },
    renderEachItem: function(arr, cnt){
        var page = app.getPage('area'),
            more = true;
        arr = arr || this.guides;
        cnt = cnt || this.total;
        if (arr.length >= cnt) {
            more = false;
        }
        page.setData({
            hasMore: more,
            guideCnt: cnt,
            items: arr
        });
    },
    prepareData: function(data, arr){
        var list = data.result;
        arr = arr || this.guides;
        for (var k in list) {
            var item = list[k];
            item = this.formatItem(item);
            if (item) {
                arr.push(item);
            }
        }
    },
    formatItem: function(item){
        /*if (item.ser_status != '1') { // 过滤status
            return;
        }*/
        return {
            bg: conf.guidePrefix + item.ser_face,
            avatar: conf.guidePrefix + item.user_avatar,
            name: item.user_name,
            job: item.gd_job,
            title: item.ser_title,
            status: parseInt(item.ser_status||0),
            id: item.user_id,
            commentCnt: parseInt(item.ser_rmkc||0),
            area: item.area_name
        }
    },
    checkData: function(){
        // load from the cache
        var key = conf.storeKeys.area(this.areaId); // 0
        this.guides = wx.getStorageSync(key);
        key = conf.storeKeys.areaCnt(this.areaId);
        this.total = wx.getStorageSync(key);

        if (this.guides && this.total > -1) {
            return true;
        }
        else {
            return false;
        }
    },

    firstRenderList: function(areaId, callback) { 
        if (this.loading) {
            console.error('Another request is proccessing.');
            return;
        }
        if (areaId) {
            this.areaId = areaId;
        }
        if(!this.checkData()) {
            this.guides = [];
            this.pageNo = 0;
            this.reqData(this.pageNo, (data)=>{
                // 存个数
                this.total = data.count;
                wx.setStorageSync(conf.storeKeys.areaCnt(this.areaId), this.total);

                this.prepareData(data); // 格式化数据

                // 存到storage中
                wx.setStorage({
                    key: conf.storeKeys.area(this.areaId, 0),
                    data: this.guides
                });

                this.renderEachItem();
            });
        }
        else {
            this.renderEachItem();
        }
        this.pageNo++;
        callback && callback.call(null);
    }, 
    renderMore: function() {
        if (this.loading) {
            console.error('Another request is proccessing.');
            return;
        }
        this.reqData(this.pageNo++, (data)=>{
            this.prepareData(data); // 格式化数据
            this.renderEachItem();
        });
    },
    // 在详情页中进行查询 
    renderFilter: function(filtOpt) { 
        // 调用这个方法的时候，this.areaId已经被设置了 
        //      如果没设置，说明此时不该调用这个方法 
        if (!this.areaId) {
            return ;
        }
        this.tmpGuides = [];
        this.reqData(0, (data)=>{
            // 存个数 
            this.tmpTotal = data.count;
            // 格式化数据 
            this.prepareData(data, this.tmpGuides);
            this.renderEachItem(this.tmpGuides, this.tmpTotal);
        }, filtOpt);
    }
};