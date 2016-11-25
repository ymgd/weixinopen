var app = getApp();

Page({
    
    "data": {
        "items": [],
        "inEditMode": false,
        "selected": []
    },

    reload: function() {
        var items = [];
        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].inFavorite) {
                items.push(app.deals[i]);
            }
        }
        items.sort(this.sortByOrder);
        // console.log(items);
        this.setData({
            "items": items
        });
    },

    onLoad: function() {
        this.reload();
    },

    onShow: function() {
        this.reload();
    },

    sortByOrder: function(item1, item2) {
        return item2.favoriteOrder - item1.favoriteOrder;
    },

    selectItems: function(e) {
        // console.log(e.detail);
        this.data.selected = e.detail.value;
    },

    deleteItems: function(e) {
        var items = [];
        for (var i=0; i<app.deals.length; i++) {
            for (var j=0; j<this.data.selected.length; j++) {
                if (app.deals[i].pid == this.data.selected[j]) {
                    app.deals[i].inFavorite = false;
                    app.deals[i].favoriteOrder = -1;
                    break;
                }
            }
        }

        app.saveData();
        this.reload();
    },

    changeMode: function() {
        if (this.data.inEditMode) {
            this.setData({
                "inEditMode": false
            });
        } else {
            this.setData({
                "inEditMode": true
            });
        }
    },

    moveUp: function(e) {
        var ind = parseInt(e.currentTarget.id.slice("up".length));
        console.log(ind);
        if (ind == 0) {
            return;
        }
        
        this.move('up', ind);
        // var pidToUp = this.data.items[ind].pid;
        // var pidToDown = this.data.items[ind-1].pid;

        // for (var i=0; i<app.deals.length; i++) {
        //     if (app.deals[i].pid == pidToUp) {
        //         app.deals[i].favoriteOrder += 1;
        //     } else if (app.deals[i].pid == pidToDown) {
        //         app.deals[i].favoriteOrder -= 1;
        //     }
        // }

        // var items = [];
        // for (var i=0; i<this.data.items.length; i++) {
        //     if (i == ind - 1) {
        //         items[i] = this.data.items[ind];
        //     } else if (i == ind) {
        //         items[i] = this.data.items[ind - 1];
        //     } else {
        //         items[i] = this.data.items[i];
        //     }
        // }
        // this.setData({
        //     "items": items
        // });
    },

    moveDown: function(e) {
        // console.log(e.currentTarget.id);
        var ind = parseInt(e.currentTarget.id.slice("down".length));
        console.log(ind);
        if (ind == this.data.items.length - 1) {
            return;
        }
        
        this.move('down', ind);
    },

    move: function(mode, ind) {
        var pidToUp = -1;
        var pidToDown = -1;
        if (mode == 'up') {
            pidToUp = this.data.items[ind].pid;
            pidToDown = this.data.items[ind-1].pid;
        } else {
            pidToUp = this.data.items[ind+1].pid;
            pidToDown = this.data.items[ind].pid;
        }

        for (var i=0; i<app.deals.length; i++) {
            if (app.deals[i].pid == pidToUp) {
                app.deals[i].favoriteOrder += 1;
            } else if (app.deals[i].pid == pidToDown) {
                app.deals[i].favoriteOrder -= 1;
            }
        }

        var items = [];
        for (var i=0; i<this.data.items.length; i++) {
            if (i == ind - 1) {
                if (mode == 'up') {
                    items[i] = this.data.items[ind];
                } else {
                    items[i] = this.data.items[i];
                }
            } else if (i == ind) {
                if (mode == 'up') {
                    items[i] = this.data.items[ind - 1];
                } else if (mode == 'down') {
                    items[i] = this.data.items[ind + 1];
                } else {
                    items[i] = this.data.items[i];
                }
            } else if (i == ind + 1) {
                if (mode == 'down') {
                    items[i] = this.data.items[ind];
                } else {
                    items[i] = this.data.items[i];
                }
            } else {
                items[i] = this.data.items[i];
            }
        }
        this.setData({
            "items": items
        });
    }
})