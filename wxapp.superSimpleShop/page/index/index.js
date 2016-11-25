var app = getApp();

Page({
  
    "data": {
        "origDeals": [],
        "deals": [],
        "search": undefined
    },

    onLoad: function() {
        this.setData({
            "origDeals": app.deals,
            "deals": app.deals
        });
    },

    inputSearch: function(e) {
        this.setData({
            search: e.detail.value
        });
    },

    search: function(e) {
        var result = [];
        var target = this.data.search;
        for (var i=0; i<this.data.origDeals.length; i++) {
            var name = this.data.origDeals[i].name;
            if (name.toLowerCase().match(target.toLowerCase())) {
                result.push(this.data.origDeals[i]);
            }
        }
        console.log(result);
        this.setData({
            deals: result
        });
    }

});