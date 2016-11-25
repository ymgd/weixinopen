const app = getApp()

const API_URL = require('../../libraries/HttpRequestFacade.js')

Page({
  data:{
    blockId:17,
    count: 100,
    pageNo: 1,
    pageSize: 20,
    subtitle: '加载中...',
    loading: true,
    hasMore: true,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    itemsArray: [],
     navs: [
      {
        image: '../../images/holeinone_introduce_icon@2x.png',
        text: '赛事介绍'
      }, {
        image: '../../images/holeinone_award_icon@2x.png',
        text: '奖品介绍'
      }, {
        image: '../../images/holeinone_my_point_icon@2x.png',
        text: '我的积分'
      }, {
        image: '../../images/icon_rank@2x.png',
        text: '区域排名'
      }
    ],
    contentBlockItemsArray:[]
  },

 loadMore: function(){
    if (!this.data.hasMore) return
    this.setData({ subtitle: '加载中...', loading: true })
    console.log("来这里了00000000-----"+this.data.pageNo)
    API_URL.find(this.data.pageNo++, this.data.pageSize)
      .then(d => {
        if (d.items.length) {
          console.log("来这里了11111111"+this.data.pageNo)
          this.setData({subtitle: d.title,itemsArray: this.data.itemsArray.concat(d.items), loading: false })
        } else {
          console.log("来这里了222222222"+this.data.pageNo)
          this.setData({subtitle: d.title,hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },

  // 页面加载
  onLoad: function(params) {
    API_URL.findBlockById(this.data.blockId).then(d => {
      if (d.contentBlockItems.length) {
          console.log(d)
          this.setData({contentBlockItemsArray: d.contentBlockItems, loading: false })
        } else {
          // this.setData({hasMore: false, loading: false })
        }
    })

    API_URL.find(this.data.pageNo++, this.data.pageSize)
      .then(d => {
        if (d.items.length) {
          console.log(d.items)
          this.setData({subtitle: d.title, itemsArray: d.items, loading: false })
        } else {
          this.setData({hasMore: false, loading: false })
        }
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', itemsArray: [], loading: false })
        console.error(e)
      })
  },
  formatPhone: function(phone) {
            return phone.substr(0, 3) + '****' + phone.substr(7, 11);
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
  }
})