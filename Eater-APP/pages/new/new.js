const app = getApp();

const API_URL = "http://apicloud.mob.com/v1/cook/menu/search?name=%E7%BA%A2%E7%83%A7%E8%82%89&cid=0010001007&key=17113fceca309&size=20&page="

Page({
    data: {
        caiItems: [],
        loading: true,
        hasMore: false,
        page: 1
    },
    onLoad: function () {

        this.setData({
            page: 1
        })

        this.getDataFromServer(this.data.page)
    },
    refresh: function () {
        console.log("下拉刷新....")
        this.onLoad()
    },
    loadMore: function () {

        this.setData({page: this.data.page + 1})

        console.log("上拉拉加载更多...." + this.data.page)

        this.getDataFromServer(this.data.page)
    },
    //获取网络数据的方法
    getDataFromServer: function (page) {
        this.setData({
            loading: false,
            hasMore: true
        })
        //调用网络请求
        app.httpClient(API_URL + page, (error, data) => {

            if (data.retCode == 200) {

                this.setData({caiItems: data.result.list, loading: true, hasMore: false})

            } else {
                console.log("服务器异常")
            }

        })
    },


})