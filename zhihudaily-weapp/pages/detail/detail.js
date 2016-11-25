// detail.js

//获取应用实例
var app = getApp();

//require引入文件
var util = require("../../utils/util.js");

//require引入api.js文件
var CONFIG = require("../../utils/config.js");
var dialog = require("../../utils/dialog.js");

// 引入富文本解析自定义组件
var WxParse = require('../../wxParse/wxParse.js');

Page({

    //初始化数据
    data: {
        newsid:"",
        title:"",
        imgsrc:"",
        wxParseData:"",
        comments:0,
        popularity:0,
        long_comments:0,
        short_comments:0
    },
    //评论页面跳转
    showComments:function(e){
        console.log(e.currentTarget.id);
        wx.navigateTo({
           url: '../comments/comments?id='+e.currentTarget.id
         })
    },
    loadExtraData:function(newsid){

        console.log(CONFIG.API_URL.NEWS_EXTRADATA_QUERY+newsid);
        var _this = this;
         wx.request({
            url: CONFIG.API_URL.NEWS_EXTRADATA_QUERY+newsid, 
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                _this.setData({
                    comments:res.data.comments,
                    popularity:res.data.popularity,
                    long_comments:res.data.long_comments,
                    short_comments:res.data.short_comments
                })
            }
         })
    },
    onLoad: function(option){
        console.log(JSON.stringify(option.id));
        dialog.loading();

        var _this = this;
        
        wx.request({
            url: CONFIG.API_URL.NEWS_DETAIL_QUERY+option.id, 
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)

                // //html解析
                // var str = util.coder(res.data.body);

                _this.setData({
                    newsid:res.data.id,
                     title:res.data.title,
                     imgsrc:res.data.image,
                     wxParseData:WxParse('html',res.data.body)//使用WxParse组件解析html  markdow解析将html替换成md
                })


                //加载新闻额外信息
                _this.loadExtraData(res.data.id);
                
            },
            complete:function(){
                setTimeout(function(){
                    dialog.hide(); 
                },1000);
            }
         })

    }





});