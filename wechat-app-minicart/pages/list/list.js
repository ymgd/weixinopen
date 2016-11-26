const storage = require('../../libraries/storage.js')
// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '',
    page: 1,
    size: 20,
    type: 'in_theaters',
    subtitle: '加载中...',
    loading: true,
    hasMore: true,
    products: []
  },

  loadMore(){
    
  },
  // 页面加载
  onLoad (params) {
    // wx.showNavigationBarLoading()
    this.data.title = params.title || this.data.title
   
  },

  // 页面准备完成
  onReady () {
    wx.setNavigationBarTitle({ title: this.data.title + ' 购物车' })
  },
  onShow(){
    storage.getAllproducts()
    .then(data=>{
      this.setData({products:data.data,loading: false,subtitle:"快去结算吧 "})
    })
    .catch(e=>{
    this.setData({ subtitle: '当前购物车为空', movies: [], loading: false })
        console.error(e)
    })

  },
  


})
