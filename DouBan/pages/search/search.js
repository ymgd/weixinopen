Page({
    data:{
        placeholder_data:"请输入关键字进行搜索",
        list:[],
        title:""
    },
    onLoad(){
        list:[]
    },
    onsubmit(e){
        const _this = this;
        const _apiUrl = "https://api.douban.com/v2/movie/search";
        console.log('form发生了submit事件，携带数据为：', e.detail.value.search_key);
        wx.request({
            url: _apiUrl, 
            data: {
               q : e.detail.value.search_key
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                _this.setData({
                    title:res.data.title,
                    list:res.data.subjects
                })
            }
            });
    }
})