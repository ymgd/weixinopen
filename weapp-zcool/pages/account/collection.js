
Page({
  data: {
    collection: [
      {
        imgUrl: 'http://img.zcool.cn/community/031e7d2581a93b5a84a0d304f564ac3.jpg@250w_188h_1c_1e_2o_100sh.jpg',
        title: '归鸿',
        desc: '摄影 - 人像',
        author: '七味zoe'
      }, {
        imgUrl: 'http://img.zcool.cn/community/03140e057db6d610000012e7ec57000.jpg@250w_188h_1c_1e_2o_100sh.jpg',
        title: '僵生若只如初见',
        desc: '动漫 - 三维动画',
        author: '僵小鱼'
      }, {
        imgUrl: 'http://img.zcool.cn/community/0313c3e5816e1b3a84a0d304fca2010.jpg@250w_188h_1c_1e_2o_100sh.jpg',
        title: '万圣节回归的僵小鱼',
        desc: '动漫 - 三维动画',
        author: '僵小鱼'
      }, {
        imgUrl: 'http://img.zcool.cn/community/03111a757a80ffd0000012e7e0d3aeb.jpg@250w_188h_1c_1e_2o_100sh.jpg',
        title: 'Q僵版植物大战僵尸',
        desc: '动漫 - 三维动画',
        author: '僵小鱼'
      }, {
        imgUrl: 'http://img.zcool.cn/community/0312b3e572091b3000001f2c1b6f7e9.jpg@250w_188h_1c_1e_2o_100sh.jpg',
        title: '啼魄一天涯，雾血染烟霞',
        desc: '摄影 - 人像',
        author: '夏筱丫'
      }
    ]
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })
  }
});