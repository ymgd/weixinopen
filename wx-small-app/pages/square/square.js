//square.js
const app = getApp()
const AV = app.AV
console.info(AV,'haha')

console.info('这是 squre page')
Page({
  data: {
    news: []
  },
  //事件处理函数
  bindViewTap: function(e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: `./detail/detail?id=${id}`
    })
  },
  onLoad: function () {
    console.info(this,'haha this')
    this.fetchNews()
  },
  onPullDownRefresh: function() {
    this.fetchNews(function(){
      wx.stopPullDownRefresh()
      wx.showToast({
        title:'多看你一眼'
      })
    });
  },
  fetchNews:function(fn) {
    fn = fn || function(){}
    let that = this;
    let arr = [];

    let query = new AV.Query('News');
    console.info(query,'')
    query.select(['id,title,updatedAt']);
    query.find().then(function(news){
      news.forEach(function( item ){
        arr.push({
          id: item.id,
          title: item.get('title'),
          updatedAt: item.get('updatedAt')
        })
      })
      console.info(arr,'arr')
      that.setData({
        news: arr
      })
    },console.error).then(fn)
  }
})
