Page({
  data: {
    title: '',
    items: [{"mprice":0,"maxpacks":100,"price":12800,"subcate":210,"remains":998,"type":1,"freight":0,"title":"北京油鸡（小公鸡）","imgs":["https://hamlet.b0.upaiyun.com/1609/22170/362ba7ea685440e5891d6f6c661d0552.jpg"],"unit":"只","id":302,"quantity":"1"},{"mprice":0,"maxpacks":14,"price":1600,"subcate":410,"remains":14,"type":4,"freight":1000,"title":"红糖粉","imgs":["https://hamlet.b0.upaiyun.com/1604/06200/34088f0a883f4b85ae573a822ff68381.jpg"],"unit":"g","id":93,"quantity":"400"},{"mprice":0,"maxpacks":100,"price":4800,"subcate":202,"remains":5,"type":1,"freight":1000,"title":"极致Q弹肉丸子","imgs":["https://hamlet.b0.upaiyun.com/1601/27161/2e8c13bc2d0847718c223bcd0f5f6fe3.png"],"unit":"g","id":69,"quantity":"300"},{"mprice":2200,"maxpacks":100,"price":1980,"subcate":410,"remains":42,"type":1,"freight":1000,"title":"女生红糖","imgs":["https://hamlet.b0.upaiyun.com/1604/06150/c500467218ea4ce8ace753a05e31a49e.jpg"],"unit":"g","id":91,"quantity":"220"},{"mprice":2280,"maxpacks":100,"price":1880,"subcate":410,"remains":29,"type":1,"freight":1000,"title":"姜母红糖","imgs":["https://hamlet.b0.upaiyun.com/1604/06150/bef4cca020764e91a194bba87c627a8a.jpg"],"unit":"g","id":90,"quantity":"215"},{"mprice":0,"maxpacks":100,"price":1800,"subcate":301,"remains":999936,"type":1,"freight":1000,"title":"“沁州黄”小米","imgs":["https://hamlet.b0.upaiyun.com/1511/12100/e31c7dc53a874d368fa4af8e54fbffb5.jpg"],"unit":"g","id":20,"quantity":"1000"},{"mprice":0,"maxpacks":1000,"price":12800,"subcate":301,"remains":9994,"type":4,"freight":0,"title":"富硒米家庭装","imgs":["https://hamlet.b0.upaiyun.com/1606/12101/e6bbd6b6cd474a97a1786b43a063f510.jpg"],"unit":"kg","id":171,"quantity":"5"},{"mprice":0,"maxpacks":10,"price":3000,"subcate":201,"remains":99885,"type":1,"freight":1000,"title":"优选香草贵妃鸡蛋","imgs":["https://hamlet.b0.upaiyun.com/1606/24001/5cdfc1d626a7407c86d82a3c99daeaa3.jpg"],"unit":"g","id":22,"quantity":"500"},{"mprice":0,"maxpacks":100,"price":16800,"subcate":210,"remains":49956,"type":4,"freight":1000,"title":"有菜推荐香草贵妃鸡","imgs":["https://hamlet.b0.upaiyun.com/1606/24001/c40521bd9f054e2988fde39527d8e6f0.jpg"],"unit":"g","id":19,"quantity":"1250"},{"mprice":0,"maxpacks":100,"price":3800,"subcate":202,"remains":999980,"type":1,"freight":1000,"title":"深山散养黑猪后臀尖","imgs":["https://hamlet.b0.upaiyun.com/1512/15160/620395fd67164f41aba7bdfdcabe5379.jpg"],"unit":"g","id":44,"quantity":"400"},{"mprice":2480,"maxpacks":100,"price":2280,"subcate":410,"remains":0,"type":1,"freight":1000,"title":"玫瑰红糖","imgs":["https://hamlet.b0.upaiyun.com/1604/06141/92c264a3dc5d4c49ae33c9a1fbdf54e5.jpg"],"unit":"g","id":89,"quantity":"175"}]
  },
  //事件处理函数
  onLoad: function (options) {
    this.title = options.type || '列表'
  },
  go: function(event) {
    wx.navigateTo({
      url: '../template/index?type=' + event.currentTarget.dataset.type
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.title
    })
  },
})
