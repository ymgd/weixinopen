Page({
  data: {
    categories: [
        {_id: 123, cateName: '数码家电', open: false},
        {_id: 1235, cateName: '箱包配饰', open: false},
        {_id: 433, cateName: '护肤/美妆/洗护', open: false},
        {_id: 3454, cateName: '母婴/玩具/乐器', open: false},
        {_id: 5435, cateName: '食品酒水', open: false},
        {_id: 765, cateName: '医药保健', open: false},
        {_id: 7658, cateName: '家具日用', open: false}
    ]
  },
  onLoad: function () {
      console.log('cate')
  },
  categoryToggle: function (e) {
    var id = e.currentTarget.id
    var list = this.data.categories
    for(var i = 0; i < list.length; ++i) {
      if (list[i]._id == id) {
        list[i].open = !list[i].open
      }
    }
    this.setData({
      categories: list
    });
  },
  closeSubCate: function (e) {
    console.log(e);
    var id = e.currentTarget.id
    var list = this.data.categories
    for(var i = 0; i < list.length; ++i) {
      if (list[i]._id == id) {
        list[i].open = !list[i].open
      }
    }
    this.setData({
      categories: list
    });
  }
})
wx.request
