module.exports = {
    data: {
        childInputVal: ''
    },
    inputChange: function(event) {
        let inputVal = event.detail.value;
        this.setData({
            childCompVal: inputVal,
            childInputVal: inputVal
        });
    }
}