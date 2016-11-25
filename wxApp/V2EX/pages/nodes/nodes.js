Page({
    data: {
        hidden: false,
        nodes: []
    },
    getData: function() {
        var ctx = this;
        wx.request({
            url: "https://www.v2ex.com/api/nodes/all.json",
            success: function(res) {
                ctx.setData({
                    nodes: res.data,
                    hidden: true
                });
                console.log("Success")
            }
        })
    },
    onLoad: function() {
        this.getData();
    },
    goNode: function(e) {
        var id = e.currentTarget.id;
        wx.navigateTo({
            url: "../node/node?id=" + id
        });
    }
})