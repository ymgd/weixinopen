import API from "../../api/api.js";
const app = getApp();

const conf = {
    data: {
        title: '请输入搜索内容',
        movies: [],
        loading: false,
    },

    search(e) {
        if (!e.detail.value) {
            return;
        }

        setTimeout(() => {
            this.setData({
                title: '加载中...',
                loading: true
            });

            app.fetch(API.search + '?q=' + e.detail.value, (err, data) => {
                this.setData({
                    title: data.title,
                    movies: data.subjects,
                    loading: false
                });
            });
        }, 500);

    },

    onLoad() {

    }
}

Page(conf);
