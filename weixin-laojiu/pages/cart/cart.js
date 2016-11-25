Page({
  data:{
    iscart:false,
    cart:[],
    count:1,
    total:0,
    goodsCount:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var arr = wx.getStorageSync('cart') || [];
    if(arr.length>0){
        for(var i in arr){
            this.data.total += Number(arr[i].price);
            this.data.goodsCount += Number(arr[i].count);
        }
        this.setData({
            iscart:true,
            cart:arr,
            total:this.data.total,
            goodsCount:this.data.goodsCount
        });
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
},
delCount: function(e) {
    if (this.data.cart[e.target.id.substring(3)].count <= 1) {
        return;
    }
    this.data.goodsCount -= 1;
    this.data.total -= Number(this.data.cart[e.target.id.substring(3)].price);
    this.data.cart[e.target.id.substring(3)].count=--this.data.cart[e.target.id.substring(3)].count;
    this.setData({
        cart:this.data.cart,
        total:this.data.total,
        goodsCount:this.data.goodsCount
    })
    try {
        wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
        console.log(e)
    }
},
addCount: function(e) {
    this.data.total += Number(this.data.cart[e.target.id.substring(3)].price);
    this.data.goodsCount += 1;
    this.data.cart[e.target.id.substring(3)].count=++this.data.cart[e.target.id.substring(3)].count;
    this.setData({
        cart:this.data.cart,
        total:this.data.total,
        goodsCount:this.data.goodsCount
    })
    try {
        wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
        console.log(e)
    }
},
delGoods:function(e){
    this.data.total -= this.data.cart[e.target.id.substring(3)].price*this.data.cart[e.target.id.substring(3)].count;
    this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].count;
    this.data.cart.splice(e.target.id.substring(3),1);
    this.setData({
        cart:this.data.cart,
        total:this.data.total,
        goodsCount:this.data.goodsCount
    })
    try {
        wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
        console.log(e)
    }
}
})
