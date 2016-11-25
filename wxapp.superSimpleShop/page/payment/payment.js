var app = getApp();

Page({
    "data": {
        items: [],
        selected: [],
        totalPrice: 0
    },

    onLoad: function(opt) {
        var items = [];
        var quantity = [];
        var selected = opt.selected || [];
        for (var i=0; i<app.deals.length; i++) {
            for (var j=0; j<selected.length; j++) {
                if (app.deals[i].pid == selected[j]) {
                    items.push(app.deals[i]);
                    break;
                }
                
            }
        }

        this.setData({
            "items": items,
            "selected": selected,
            "totalPrice": opt.total
        })
        // console.log(this.data);
    },

    pay: function() {
        wx.showModal({
            "title": "支付成功",
            "content": "支付金额: ￥" + this.data.totalPrice + " " + new Date(),
            "showCancel": false
        });
    }
}
);