var tool=require('../../utils/util')
var app=getApp()
Page({
    data: Object.assign({
        tabActive: "search",
        keyword: "",
        search_list: []
    },app.globalData.data),
    inputKeyword: function(e){
        this.setData({
            keyword: e.detail.value
        })
    },
    searchSong: function(){
        if(this.data.keyword){
            tool.search(this.data.keyword).then(data => {
                this.setData({
                    search_list: data.song
                })
            })
        }
    }
})