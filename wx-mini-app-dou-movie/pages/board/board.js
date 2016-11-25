
Page({
    data: {
        boards: [
            { key: 'in_theaters', name: '正在热映' },
            { key: 'coming_soon', name: '即将上映' },
            { key: 'top250', name: 'TOP250' },
            // { key: 'weekly', name: '口碑榜' },
            // { key: 'new_movies', name: '新片榜' },
            { key: 'us_box', name: '北美票房榜' }],
        movies: [],
        loading: true
    },
    onLoad() {
        console.log("~~~onLoad~~~");
    },
    scroll(e) {
        console.log(e);
    },
    onReady () {
        console.log("~~~onReady~~~");
        // wx.setNavigationBarTitle({
        //     title: this.data.title
        // })
    }
});
