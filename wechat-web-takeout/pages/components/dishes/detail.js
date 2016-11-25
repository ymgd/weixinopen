var virtualData = require('../../../utils/virtualData.js');
var app = getApp()
Page({
    data: {
        hidden: false,
        dish : {}
    },
    onLoad(option) {
        this.getcurGood(option.dishId,option.typeIndex,option.dishIndex)
    },
    //获取所有商品列表
    getcurGood(dishId,typeIndex,dishIndex) {
    	self = this;
        wx.request({
            url: 'http://localhost:1749/home/GetGoods', 
            data : {
                guid : dishId
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.success){
                	self.setData({
                		dish: res.data.data
            		});
                }
                self.setData({
                	hidden: true
            	});
            },
            fail: function(error){
                console.log(error);
                self.setData({
                		dish: virtualData.goodsList[typeIndex].GoodsList[dishIndex]
            		});
                self.setData({
                	hidden: true
            	});            	
            }
        })
    }
})
