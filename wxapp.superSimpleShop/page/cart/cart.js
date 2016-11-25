var app = getApp();

Page({
    "data": {
        "items": [],
        "inEditMode": false,
        "selected": [],
        "quantity": [],
        "totalPrice": 0
    },

    reload: function() {
        var items = [];
        var quantity = [];
        var totalPrice = 0;
        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].inCartQuantity > 0) {
                items.push(app.deals[i]);
                quantity.push(
                    // "pid": app.deals[i].pid,
                    // "qty": app.deals[i].inCartQuantity
                    app.deals[i].inCartQuantity
                );
                // totalPrice += app.deals[i].price * app.deals[i].inCartQuantity;
            }
        }
        // console.log(items);
        this.setData({
            "items": items,
            "quantity": quantity,
            // "totalPrice": totalPrice
        });
        // console.log(this.data.totalPrice);
    },

    onLoad: function() {
        this.reload();
    },

    onShow: function() {
        this.reload();
    },

    selectItems: function(e) {
        console.log(e.detail);
        this.data.selected = e.detail.value;
        // console.log(this.data.selected);
        var totalPrice = 0;
        for (var i=0; i<this.data.items.length; i++) {
            for (var j=0; j<this.data.selected.length; j++) {
                if (this.data.items[i].pid == this.data.selected[j]) {
                    totalPrice += this.data.items[i].price * this.data.items[i].inCartQuantity;
                }
            }
        }
        this.setData({
            "totalPrice": totalPrice
        })
        console.log(this.data.totalPrice);
    },

    deleteItems: function(e) {
        var items = [];
        for (var i=0; i<app.deals.length; i++) {
            for (var j=0; j<this.data.selected.length; j++) {
                if (app.deals[i].pid == this.data.selected[j]) {
                    app.deals[i].inCartQuantity = 0;
                    break;
                }
            }
        }

        app.saveData();
        this.reload();
    },

    edit: function() {
        if (this.data.inEditMode) {
            var items = [];
            for (var i=0; i<app.deals.length; i++) {
                for (var j=0; j<this.data.items.length; j++) {
                    if (app.deals[i].pid == this.data.items[j].pid) {
                        app.deals[i].inCartQuantity = this.data.quantity[j];
                    }
                }
            }

            var totalPrice = 0;
            for (var i=0; i<this.data.items.length; i++) {
                for (var j=0; j<this.data.selected.length; j++) {
                    if (this.data.items[i].pid == this.data.selected[j]) {
                        totalPrice += this.data.items[i].price * this.data.items[i].inCartQuantity;
                    }
                }
            }

            this.reload();

            this.setData({
                "inEditMode": false,
                "totalPrice": totalPrice
            });

            console.log(app.deals);
        } else {
            this.setData({
                "inEditMode": true
            });
        }
    },

    editQty: function(e) {
        var ind = parseInt(e.currentTarget.id.slice(3));
        this.data.quantity[ind] = e.detail.value;
        console.log(this.data.quantity);
    },

    increase: function(e) {
        var ind = parseInt(e.currentTarget.id.slice(3));
        var qty = this.data.quantity;
        qty[ind] = parseInt(qty[ind]) + 1;
        if (parseInt(qty[ind]) > 999) {
            qty[ind] = 999;
        }
        this.setData({
            quantity: qty
        });
        var items = this.data.items;
        items[ind].inCartQuantity = qty[ind];
        this.setData({
            items: items
        });
        // console.log(this.data.quantity);
    },

    decrease: function(e) {
        var ind = parseInt(e.currentTarget.id.slice(3));
        var qty = this.data.quantity;
        qty[ind] = parseInt(qty[ind]) - 1;
        if (parseInt(qty[ind]) < 0) {
            qty[ind] = 0;
        }
        this.setData({
            quantity: qty
        });
        var items = this.data.items;
        items[ind].inCartQuantity = qty[ind];
        this.setData({
            items: items
        });
    },

    placeOrder: function(e) {
        wx.navigateTo({
            url: "../payment/payment?selected=" + this.data.selected + "&total=" + this.data.totalPrice
        });
    }
})