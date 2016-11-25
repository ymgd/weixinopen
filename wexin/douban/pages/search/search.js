// 拿到全局应用程序实例
const app = getApp()
// Douban API 操作
const douban = require('../../utils/douban.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    subtitle: '请在此输入搜索内容',
    movies: [],
    loading: false,
    page:1,
    tag:"张艺谋"
  },

  search (e) {
    if (!e.detail.value) return
    this.setData({ subtitle: '加载中...', loading: true })
     
    var that = this
    this.data.tag = e.detail.value
   
    douban.search(this.data.tag,1,10,function(data){
      //console.log(data.subjects)
      that.setData({subtitle: data.title,movies: data.subjects, loading: false })
    })
  },

  onReachBottom(){
  // 往下拉触底加载新的数据，并将新老数据一起渲染
    var that = this;
    this.data.page +=1
    douban.search(this.data.tag,this.data.page,10,function(data){
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
