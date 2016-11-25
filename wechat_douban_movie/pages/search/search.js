// 拿到全局应用程序实例
const app = getApp()

// 搜索地址
const API_URL = 'https://api.douban.com/v2/movie/search'

// 创建一个页面对象用于控制页面的逻辑
Page({
    data: {
        //初始化搜索栏内容
        title: '请输入搜索内容',
        //初始化列表
        movies: [],
        //不加载
        loading: false,
    },

    //搜索方法
    search(e) {
        //搜索关键字
        if (!e.detail.value){
            return
        }

        this.setData({
            //加载内容
            title: '加载中...',
            //开始加载
            loading: true
        })

        //调用应用实例的方法获取全局数据
        app.fetchApi(API_URL + '?q=' + e.detail.value, (err, data) => {
            //更新数据
            this.setData({
                //加载内容
                title: data.title,
                //电影列表
                movies: data.subjects,
                //加载结束
                loading: false
            })
        })
    },

    onLoad() {

    }
})
