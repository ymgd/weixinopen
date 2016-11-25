App({
  "deals": [],
  "default": [{
      "pid": 1,
      "name": "Apple",
      "price": "10",
      "image": "apple",
      "description": "大红苹果，好吃哟！",
      "inCartQuantity": 0,
      "inFavorite": false,
      "favoriteOrder": -1 //the order with largest value is at the top
    }, {
      "pid": 2,
      "name": "Orange",
      "price": "5",
      "image": "orange",
      "description": "大橙子，好吃哟！",
      "inCartQuantity": 0,
      "inFavorite": false,
      "favoriteOrder": -1
    }, {
      "pid": 3,
      "name": "Strawberry",
      "price": "15",
      "image": "strawberry",
      "description": "新鲜草莓，好吃哟！",
      "inCartQuantity": 0,
      "inFavorite": false,
      "favoriteOrder": -1
    }, {
      "pid": 4,
      "name": "Watermelon",
      "price": "20",
      "image": "watermelon",
      "description": "薄皮红瓤西瓜，好吃哟！",
      "inCartQuantity": 0,
      "inFavorite": false,
      "favoriteOrder": -1
    }
  ],

  favoritesSize: 0,
  cartSize: 0,

  onLaunch: function() {
    this.loadData();
  },

  onShow: function() {

  },

  onHide: function() {
    
  },

  saveData: function() {
    wx.setStorage({
      key: "deals",
      data: this.deals
    });
  },

  loadData: function() {
    var that = this;
    wx.getStorage({
      key: "deals",
      success: function(res) {
        that.deals = res.data || that.default;
      },
      fail: function() {
        that.deals = that.default;
      }
    })
  }
});
