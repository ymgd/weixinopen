// Douban API 操作
const douban = require('../../utils/douban.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data:{
    title: '',
    type: 'in_theaters',
    subtitle: '加载中...',
    loading: true,
    page:1,
    movies: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // options.type： in_theaters  coming_soon  top250
    var that = this
    this.data.type = options.type 
    this.data.title = options.title 
   
    douban.theme(this.data.type,1,10,function(data){
      //console.log(data.subjects)
      that.setData({subtitle: data.title,movies: data.subjects, loading: false })
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  
 onPullDownRefresh(){
   // 往上拉刷新页面，即清楚历史数据，重新加载
    var that = this
    douban.theme(this.data.type,1,10,function(data){
      //console.log(data.subjects)
      that.setData({subtitle: data.title,movies: data.subjects, loading: false })
    })

 },

onReachBottom(){
  // 往下拉触底加载新的数据，并将新老数据一起渲染
    var that = this;
    this.data.page +=1
    douban.theme(this.data.type,this.data.page,10,function(data){
          var newdata = data.subjects
          if(newdata.length == 0){
            console.log("没有更多数据了")
          }
          var olddata = that.data.movies
          var result = olddata.concat(newdata)
          that.setData({subtitle: data.title,movies: result, loading: false })
        })
  }

})

