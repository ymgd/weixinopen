Page({
  data:{
    tabs: ['首页', '新闻', '资讯'],
    activeTab: 0
  },
  itemChange: function ( e ) {
    this.setData({activeTab: e.detail.current});
  },
  changeItem: function ( e ) {
    this.setData({activeTab: e.target.dataset.id});
  }
})