const api = require('../../lib/api.js');
const util = require('../../lib/util.js');
// var reg=new RegExp("/<p>(.*?)<\/p>/g","gmi");
Page({
    //content data
    data: {
        text: "",
        title:"",
        author:""
    },
    onShow: function(options) {
        // Do something when page show.
    },
    onLoad: function() {
        // Do some initialize when page load.
        var that = this
        var appInstance = getApp()
        var rdn = Math.ceil(Math.random()*4)
        this.setData({
            top_style: "background-image: url(../../images/bg" +rdn+".jpg);"
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro.replace(/<p>(.*?)<\/p>/g,"$1") ||"暂无，先看看其他内容吧~")
              }),
              wx.setStorageSync('poem_text', data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
              wx.setStorageSync('poem_title', data.title)
        }); 
    },
    // go to detail page
    gotoTab() {
        wx.navigateTo({ url: '../detail/detail' });
    },
    onPullDownRefresh: function() {
        // Do something when pull down
        var that = this
        var rdn = Math.ceil(Math.random()*4)
        this.setData({
            top_style: "background-image: url(../../images/bg" +rdn+".jpg);"
        })
        util.loadBunchData(function(data){
              // console.log(data);
              that.setData({
                title: data.title,
                text: data.content.replace(/<p>(.*?)<\/p>/g,"$1"),
                author: "\n"+ data.author + "("+ data.dynasty + ")",
                intro: "赏析："+ (data.intro.replace(/<p>(.*?)<\/p>/g,"$1") ||"暂无，先看看其他内容吧~")
              }),
              wx.setStorageSync('poem_text', data.content.replace(/<p>(.*?)<\/p>/g,"$1")),
              wx.setStorageSync('poem_title', data.title)
        }); 
        wx.stopPullDownRefresh()
    },
});
