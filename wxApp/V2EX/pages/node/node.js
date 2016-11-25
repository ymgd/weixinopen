Page({
    data: {
        hidden: false,
        topics: []
    },
    getData: function(id) {
        var ctx = this;
        wx.request({
            url: "https://www.v2ex.com/api/topics/show.json?node_id=" + id,
            success: function(res) {
                ctx.setData({
                    topics: res.data,
                    hidden: true
                });
                console.log("Success")
            }
        })
    },
    onLoad: function(options) {
        this.getData(options.id);
    },
    goTopic: function(e) {
        var id = e.currentTarget.id;
        wx.navigateTo({
            url: "../topic/topic?id=" + id
        });
    }
})