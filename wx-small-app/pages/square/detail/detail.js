const app = getApp()
const AV = app.AV
console.info('这是 detail page')
Page({
    data: {
        news: {}
    },
    onLoad:function( params ) {
        console.info(getCurrentPages())
       
        let id = params.id
        console.info(id)
        let that = this
        let query = new AV.Query('News')
        query.get(id).then(function( news ){
            console.info(news)
            that.setData({
                news: {
                    title: news.get('title'),
                    content: news.get('content')
                }
            })
        },function( error ){
            if( error )
            wx.showToast({
                title: '拉取失败',
                duration: 1000
            })
        })

    }
})