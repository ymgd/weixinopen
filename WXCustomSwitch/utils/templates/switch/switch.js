var tapSwitch =  function() {
    console.log('tap', this.data.isClick);
    this.setData({
        isClick: !this.data.isClick
    });
}
