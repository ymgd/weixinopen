const conf = {
    data: {
        
    },
    onLoad(options) {
        console.log(options);
    },
    lightAode(e) {
        const mode = e.detail.value ? '开启' : '关闭';
        wx.showToast({
            title: `已${mode}夜间模式`,
            icon: 'success',
            duration: 500
        })
    }
};

Page(conf);