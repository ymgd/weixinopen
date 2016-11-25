function alert(msg,icon,duration){
    wx.showToast({
        title: msg,
        icon: icon,
        duration: duration
    })
}

function modal(title,content,sureFunc,cancelFunc){
    wx.showModal({
        title: title,
        content: content,
        success: function(res) {
            if (res.confirm) {
                sureFunc();
            }else{
                cancelFunc();
            }
        }
    })
}

function setData(key,value){
    wx.setStorageSync({
        key:key,
        data:value
    })
}

function setTimeOut(time,func){
    setTimeout(func(),time)
}

module.exports = {
    alert:alert,
    modal:modal,
    setData:setData,
    setTimeOut:setTimeOut
}