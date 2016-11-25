// 拿到全局应用程序实例
const app = getApp()

//api地址
const API_URL = 'https://api.douban.com/v2/movie/subject/';

// 创建一个页面对象用于控制页面的逻辑
Page({
    data: {
        //页面标题
        title: '',
        //页面加载开始
        loading: true,
        //电影详情
        movie: {}
    },

    onLoad(params) {

        //请求api  params.id为上一个页面传入的id
        app.fetchApi(API_URL + params.id, (err, data) => {
            this.setData({
                //设置页面标题
                title: data.title,
                //设置页面详情
                movie: data,
                //页面加载结束
                loading: false
            }),

            //设置页面标题
            wx.setNavigationBarTitle({
                title: this.data.title + ' « 电影 « 豆瓣'
            })
        })
    },

    onReady() {
        //页面开始标题
        wx.setNavigationBarTitle({
            title: this.data.title + ' « 电影 « 豆瓣'
        })
    }
})
