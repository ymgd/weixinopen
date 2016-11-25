Page({
    data: {
        array: ["京","津","粤","沪","川","冀","豫","云","辽","黑","湘",
        "皖","鲁","新","苏","浙","赣","鄂","桂","甘","晋","蒙","陕","吉",
        "闽","贵","渝","青","藏","琼",'宁'],
        index: 1,
        toastHidden: true,
        plateVal: '',
        msg: '',
        blockSend: false,
        clockNum: 61,
        clockTxt: '发送短信',
        phone: '',
        smsCode: '',
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
            var parms = {
                plate: plate,
                phone: _this.data.phone,
                smscode: _this.data.smsCode,
            }
            //ajax here
            console.log(parms);
            this.showToast('Sorry 未查到该车主的信息!')
        }
    },
    showToast: function(msg) {
        this.setData({
            msg: msg,
            toastHidden: false
        });
    },
    sendSms: function() {
        var _this = this;
        if (this.data.blockSend) {
            return;
        }
        this.setData({
            blockSend: true,
            clockTxt: '秒后重试',
            clockNum : 60,
        });
        var timer = setInterval(function(){
            if (_this.data.clockNum <= 0) {
                clearInterval(timer);
                return _this.setData({
                    clockNum: 61,
                    blockSend: false,
                    clockTxt: '发送短信'
                });
            }
            _this.setData({
                clockNum: (_this.data.clockNum - 1),
            });
        },1000);
    },
    bindPlateChange: function(event){
        this.data.plateVal = event.detail.value.toUpperCase();
        return event.detail = {value: this.data.plateVal};
    },
    bindPhoneChange: function(event){
        this.setData({
            phone: event.detail.value
        });
    },
    bindSmsChange: function(event){
        this.setData({
            smsCode: event.detail.value
        });
    },
    toastChange: function(event){
        var _this = this;
        this.setData({
            toastHidden: !_this.data.toastHidden
        })
    }
})
