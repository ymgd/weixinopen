

// section.js

//require引入config.js文件
var CONFIG = require("../../utils/config.js");

// 页面注册
Page({

    data:{
        themes:"",
        stories:"",
        themename:"",
        description:"",
        themeimage:"",
        editors:"",
        curNav:""
    },
    onLoad:function(){
        this.getThemes();
    },


    //主题日报列表
    getThemes:function(){
        var _this = this;
         wx.request({
            url: CONFIG.API_URL.NEWS_THEMES_QUERY, 
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log("news_themes_url->"+JSON.stringify(res.data));
                 _this.setData({
                    themes:res.data.others
                })
                _this.getThemesContent(res.data.others[0].id);
            }
         })
    },

    //跳转到获取新闻主题内容方法
    toGetThemesContent:function(e){
        //新闻主题idid
        var themeid = e.currentTarget.id;
        this.getThemesContent(themeid);
    },

    //新闻主题内容
    getThemesContent:function(themeid){
        console.log(CONFIG.API_URL.NEWS_THEMES_CONTETN_QUERY+themeid);
        var _this = this;
         wx.request({
            url: CONFIG.API_URL.NEWS_THEMES_CONTETN_QUERY+themeid, 
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log("news_themes_content_url->"+JSON.stringify(res.data));
                console.log("res.data.name->"+res.data.name);
                console.log("res.data.editors->"+res.data.editors[0].avatar);
                 _this.setData({
                    stories:res.data.stories,
                    themename:res.data.name,
                    description:res.data.description,
                    themeimage:res.data.image,
                    editors:res.data.editors,
                    curNav:themeid //更新当前选中专栏id  用于在前台页面进行比对
                })

                //更新主题标题栏
                wx.setNavigationBarTitle({
                    title: res.data.name,
                    success:function(){
                        console.log("success->"+res.data.name);
                    },
                    fail:function(){
                         console.log("fail");
                    }
                })
            }
         })


    },
     //知乎日报详情页跳转
    dailyDetail:function(e){
         console.log("**************"+JSON.stringify(e));
         console.log("**************"+e.currentTarget.id);
         wx.navigateTo({
           url: '../detail/detail?id='+e.currentTarget.id
         })
    }





})
