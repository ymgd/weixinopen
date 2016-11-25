var virtualData = require('../../../utils/virtualData.js');
var app = getApp()
Page({
    data: {
        hidden: false,
        curNav: 1,
        curIndex: 0,
        cart: [],
        cartTotal: 0,
        dishes: [],
        goodsList: [],
    },
    loadingChange() {
        setTimeout(() => {
            this.setData({
                hidden: true
            })
        }, 500)
    },
    selectNav(event) {
        let id = event.target.dataset.id,
            index = parseInt(event.target.dataset.index);
        self = this;
        this.setData({
            //curNav: id,
            curIndex: index
        })
    },
    // 选择菜品
    selectDish(event) {
        let dish = event.currentTarget.dataset.dish;
        let price = event.currentTarget.dataset.price * 1;
        let index = ~~event.currentTarget.dataset.dishIndex;
        let flag = true;
        let cart = this.data.cart;
        let total = this.data.cartTotal;
        if (cart.length > 0) {
            cart.forEach(function(item, index) {
                if (item == dish) {
                    cart.splice(index, 1);
                    flag = false;
                    total -= price;
                }
            })
        }
        if (flag) {
            cart.push(dish);
            total += price;
        }
        this.setData({
            cartTotal: total
        })
        this.setStatus(index)
    },
    setStatus(index) {
        // let dishes = this.data.dishesList;
        // for (let dish of dishes) {
        //     dish.forEach((item) => {
        //         if (item.id == dishId) {
        //             item.status = !item.status || false
        //         }
        //     })
        // }
        let curGood = this.data.goodsList[this.data.curIndex].GoodsList[index];
        curGood.status = !curGood.status || false;
        this.setData({
            goodsList: this.data.goodsList
        })
    },
    onLoad() {
        this.getAllGoods()
    },
    //获取所有商品列表
    getAllGoods() {
    	self = this;
        wx.request({
            url: 'http://waimaiapi.tunnel.qydev.com/Home/GetGoodsList', 
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.success){
                	self.setData({
                		goodsList: res.data.data
            		});
                }
                self.setData({
                	hidden: true
            	});
            },
            fail: function(error){
                console.log(error);
                self.setData({
                		goodsList: virtualData.goodsList
            		});
                self.setData({
                	hidden: true
            	});            	
            }
        })
    },
    //跳转到商品详情页
    viewDetail(event) {
    	let dish = event.currentTarget.dataset.dish;
        let index = ~~event.currentTarget.dataset.dishIndex;
    	wx.navigateTo({
      		url: 'detail?dishId='+dish+'&typeIndex='+this.data.curIndex+'&dishIndex='+index,
      		fail: function(error){
      			console.log(error);
      		}

    	})
    }
})
