Page({
    data: {
        icon_types: [
            'success',
            'success_no_circle',
            'info',
            'warn',
            'waiting',
            'cancel',
            'download',
            'search',
            'clear',
            'safe_success',
            'safe_warn',
            'success_circle',
            'waiting_circle',
            'circle',
            'info_circle'
        ]
    },
    onLoad: function(options){
        this.data.title = options.title
    },
    onReady: function(){
        var title = this.data.title || "调试当前页"
        wx.setNavigationBarTitle( {
            title: title
        })
    }
})