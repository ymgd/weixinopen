const Api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
    data:{
        title:'话题详情',
        deatil:{},
        hidden:false
    },
    onLoad:function(opts){
        this.fetchData(opts.id)
    },
    fetchData:function(id){
        let self = this
        self.setData({
            hidden:false
        })
       wx.request({
           url:Api.getTopicById(id,{mdrender:false}),
           success:function(res){
               res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at))
               res.data.data.replies = res.data.data.replies.map(function(item){
                       item.create_at = util.getDateDiff(new Date(item.create_at))
                       return item
                   })
               self.setData({
                   detail:res.data.data
               })
              setTimeout(function(){
                    self.setData({
                        hidden:true
                    })
                },300)
           }
       }) 
    }
})