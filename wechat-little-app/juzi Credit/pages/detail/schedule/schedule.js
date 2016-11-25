Page({
  data: {
    menuList: [{
      name: '桔子信用',
      amount:10000.00,
        validDate: '贷款期限:',
        reTime: '申请时间:',
        step1: '系统录入',
        step2: '材料核实',
        step3: '风控审批',
        step4: '系统放款',
      opened: false
    }]
  },
  tapMenuItem: function (e) {
    var menuItem = this.data.menuList[parseInt(e.currentTarget.id)] 
    if (menuItem.url) {
      wx.navigateTo({ url: menuItem.url })
    } else {
      var changeData = {}
      var opened = menuItem.opened

      changeData['menuList[' + e.currentTarget.id + '].opened'] = !opened
      this.setData(changeData)
    }
  }
})
