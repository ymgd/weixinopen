Page({
    data: {
        hidden: false,
        topic: []
    },
    getData: function(id) {
        var ctx = this;
        wx.request({
            url: "https://www.v2ex.com/api/topics/show.json?id=" + id,
            success: function(res) {
                ctx.setData({
                    topic: res.data[0],
                    hidden: true
                });
                console.log("get topic " + id + " info success");
            },
            fail: function() {
                console.log("get topic info fail");
            }
        })
    },
    onLoad: function(options) {
        this.getData(options.id);
    }
})

