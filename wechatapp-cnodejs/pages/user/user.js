const Api = require('../../utils/api.js')
const util = require('../../utils/util.js')

Page({
  data:{
    loginname:"",
    createAt:"",
    avatar:"",
    score:null,
    topics:[],
    name:"i5ting",
    hidden:false,
  },
  onLoad:function(){
      if(this.data.name){
         this.getData() 
      }else{
         this.setData({
              hidden:true
          })
      }
  },
  onPullDownRefresh:function(){
    if(this.data.name){
         this.getData() 
      }else{
         this.setData({
              hidden:true
          })
      }
  },
  getData:function(){
      let self = this,
          user = this.data.user,
          url  =  Api.getUser(self.data.name)
      wx.request({
          url:url,
          success:function(res){
              let data = res.data.data
              self.setData({
                loginname:data.loginname,
                createAt:data.create_at.slice(0,10),
                avatar:data.avatar_url,
                score:data.score,
                topics:data.recent_topics
              })
              setTimeout(function(){
                    self.setData({
                        hidden:true
                    })
                },300)
          }
      })
  },
   redirectDetail:function(e){
        let id = e.currentTarget.id,
            url = '../detail/detail?id='+id
        wx.navigateTo({
            url:url
        })    
    },
})