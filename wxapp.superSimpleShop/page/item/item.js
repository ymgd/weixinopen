var app = getApp();

Page({
    "data": {
        "item": {},
        // "inFavorite": false,
        // "inCart": false,
        "grayColor": "rgb(238, 238, 238)",
    },

    onLoad: function(opt) {
        var index = opt["index"];
        if (index > -1) {
            this.setData({
                "item": app.deals[index]
            });
        }

    },

    addToCart: function(e) {
        var newItem = this.data.item;
        newItem.inCartQuantity = parseInt(newItem.inCartQuantity) + 1;
        this.setData({
            item: newItem
        });

        var ind = -1;
        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].pid == this.data.item.pid) {
                ind = i;
            }
        }
        app.deals[ind] = this.data.item;
        app.cartSize = parseInt(app.cartSize) + 1;
        console.log(app.deals);
        app.saveData();

    },

    addToFavorite: function(e) {
        var curFavoritesSize = app.favoritesSize;

        var newItem = this.data.item;
        newItem.inFavorite = !this.data.item.inFavorite;
        newItem.favoriteOrder = curFavoritesSize;
        this.setData({
            item: newItem
        });

        var ind = -1;
        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].pid == this.data.item.pid) {
                ind = i;
            }
        }
        app.deals[ind] = this.data.item;
        console.log(app.deals);
        app.favoritesSize = parseInt(app.favoritesSize) + 1;
        app.saveData();
    }
});