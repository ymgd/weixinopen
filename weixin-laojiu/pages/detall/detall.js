Page({
    data: {
        imgUrls: [
            'http://101.200.187.94/images/201601/source_img/429_G_1453944899294.jpg',
            'http://101.200.187.94/images/201601/goods_img/429_P_1453944899443.jpg',
            'http://101.200.187.94/images/201601/goods_img/429_P_1453944899241.jpg',
            'http://101.200.187.94/images/201601/goods_img/429_P_1453944899502.jpg'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        count: 1,
        toastHidden:true,
        goods:{
            id:'',
            name:'',
            price:'',
            img:''
        }

    },
    onLoad: function(options) {
        this.data.imgUrls[0]=options.img;
        this.setData({
            goods:{
                id:options.id,
                name:options.name,
                price:options.price,
                img:options.img,
            }
        })
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    delCount: function() {
        if (this.data.count == 1) {
            return;
        }
        this.setData({
            count: --this.data.count
        })
    },
    addCount: function() {
        this.setData({
            count: ++this.data.count
        })
    },
    toastChange:function(){
       this.setData({
           toastHidden:true
       })
   },
   addcart:function(){
       this.setData({
            toastHidden:false
        });
        this.data.goods.count = this.data.count;
        var arr = wx.getStorageSync('cart') || [];
        if(arr.length>0){
            for(var i in arr){
                if(arr[i].id == this.data.goods.id){
                    arr[i].count = arr[i].count + this.data.goods.count;
                    try {
                        wx.setStorageSync('cart', arr)
                    } catch (e) {
                        console.log(e)
                    }
                    return;
                }
            }
            arr.push(this.data.goods);
        }else{
            arr.push(this.data.goods);
        }
        try {
            wx.setStorageSync('cart', arr)
        } catch (e) {
            console.log(e)
        }
   }
})
