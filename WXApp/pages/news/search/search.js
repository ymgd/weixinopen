Page({
    data: {
        indexList: []
    },
    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://localhost/mock/list0.json',
            // url: 'http://felixlu.bceapp.com/list.php',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data);
                setTimeout(function() {
                    that.setData({
                        indexList: res.data,
                        loadingHidden: true
                    });
                }, 1500);
            },
            fail: function(error) {
                console.log(error);
            }
        });
    },
});
