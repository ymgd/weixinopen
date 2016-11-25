var api=require('../../utils/util')
var app=getApp()

Page({
    data: Object.assign({
        tabActive: 'rank',
        picUrls: [],
        song_list: [],
        page: 1,
        type: ''
    },app.globalData.data),
    onReady: function(){
        wx.setNavigationBarTitle({
          title: '在线音乐'
        })
    },
    onLoad: function(option){
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        });
        if(option.type){
            var page=this.data.page;
            this.setData({
                type: option.type
            })
            api.getList(option.type,page).then(data => {
                var arr=[data.billboard.pic_s210,data.billboard.pic_s260,data.billboard.pic_s444,data.billboard.pic_s640].filter(ele => ele!='');
                if(arr.length==0){
                    arr.push('../../images/1.jpg');
                }
                this.setData({
                    picUrls: arr,
                    song_list: data.song_list
                })
                console.log(this.data.song_list)
                wx.hideToast();
            })
            this.setData({
                page: page+1
            })
        }
         
    },
    nextPage: function(e){
        wx.showToast({
            title: "加载中...",
            icon: "loading"
        });
        setTimeout(function(){
            var page=this.data.page;
            api.getList(this.data.type,page).then(data => {
                wx.hideToast();
                if(data.song_list&&data.song_list.length>0){
                    var newList=this.data.song_list.concat(data.song_list);
                    this.setData({
                        song_list: newList
                    })
                }else{
                    return;
                }
            })
            this.setData({
                page: page+1
            })
        }.bind(this),1000)
    }
    
})
