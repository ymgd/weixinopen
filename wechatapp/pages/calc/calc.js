Page({
    data: {
        //String1
        num1: '1010',
        num2: '0101'
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.debug('onLoad');
    },
    onReady: function () {
        // 页面渲染完成
        //String3
        console.debug('onReady');
    },
    onShow: function () {
        // 页面显示
        //String4
        console.debug('onShow');
    },
    onHide: function () {
        // 页面隐藏
        //String5
        console.debug('onHide');
    },
    onUnload: function () {
        // 页面关闭
        //String6
        console.debug('onUnload');
    },
    calcSubmit: function (e) {
        let num1 = +e.detail.value.num1; // parseInt
        let num2 = +e.detail.value.num2;
        let result = num1 + num2;
        this.setData({ value: result });
    }
});