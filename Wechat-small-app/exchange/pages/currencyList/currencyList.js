//所有货币信息
var list = require('../../utils/list.js');
var allDataList = list.allDataList;
Page({
    //页面数据
    data:{
        allDataList:allDataList,
        tradeListAll:"",
        capitalList:"",
        tradeListHot:""
    },

    //页面初次加载
    onReady: function(){
        var tradeListAll=this.tradeListAll();
        var capitalList=this.capitalList();
        var tradeListHot=this.tradeListHot();
        this.setData({
            tradeListAll:tradeListAll,
            capitalList:capitalList,
            tradeListHot:tradeListHot
        });
    },

    //全部交易币种
    tradeListAll:function(){
        return allDataList.trade.all;
    },

    //交易币种首字母
    capitalList:function(){
        return this.getKeys(allDataList.trade.all);
    },

    //获取对象key方法
    getKeys: function(obj){
        var keys = [];
        if(!obj || obj.length < 1){
            return ;
        }else{
            for(var i in obj){
                keys.push(i);
            }
        }
        return keys;
    },

    //热门币种列表
    tradeListHot: function () {
        return allDataList.trade.hot;
    },

    //点击某个货币
    changeCurrency:function(e){
        var app = getApp();
        var currencyArray = (e.target.id).split("-");
        app.tradeCurrency = {
            name:currencyArray[1],
            description:currencyArray[2],
            comments:currencyArray[3]
        };
        wx.navigateBack();
    }
})
