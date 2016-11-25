Page({
    data: {
        array: ["京","津","粤","沪","川","冀","豫","云","辽","黑","湘",
        "皖","鲁","新","苏","浙","赣","鄂","桂","甘","晋","蒙","陕","吉",
        "闽","贵","渝","青","藏","琼",'宁'],
        index: 1,
        toastHidden: true,
        plateVal: '',
        msg: ''
    },
    bindPickerChange: function(event){
        this.setData({
            index: event.detail.value
        })
    },
    query: function(event){
        var _this = this;
        var plate = this.data.array[this.data.index] + this.data.plateVal;
        if (plate.length < 7) {
            this.showToast('请输入完整的车牌号!')
        } else {
            this.showToast('Sorry 未查到该车主的信息!')
        }
    },
    showToast: function(msg) {
        this.setData({
            msg: msg,
            toastHidden: false
        });
    },
    bindInputChange: function(event){
        this.data.plateVal = event.detail.value.toUpperCase();
        return event.detail = {value: this.data.plateVal};

    },
    toastChange: function(event){
        var _this = this;
        this.setData({
            toastHidden: !_this.data.toastHidden
        })
    }
})
