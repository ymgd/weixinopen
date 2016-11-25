Page({
    data: {
        hidden: false,
        topics: []
    },
    getData: function() {
        var ctx = this;
        wx.request({
            url: "https://www.v2ex.com/api/topics/latest.json",
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                ctx.setData({
                    topics: res.data,
                    hidden: true
                });
                console.log("Success")
            }
        })
    },
    onLoad: function() {
        this.getData();
    },
    goTopic: function(e) {
        var id = e.currentTarget.id;
        wx.navigateTo({
            url: "../topic/topic?id=" + id
        });
    },
    loadNextPage: function ( e ) {
        console.log( e );
    },
    scroll: function ( e ) {
        console.log( e );
    }
})