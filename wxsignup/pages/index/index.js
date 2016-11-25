Page({
  data: {
    items: [
      {
        'name': '姓名',
        'input': true
      },
      {
        'name': '生日',
        'picker': true,
        'mode': 'date',
        'value': '2016-11-17'
      },
      {
        'name': '所在区域',
        'picker': true,
        'mode': 'selector',
        'value': 0,
        'range': ['姑苏区', '相城区', '园区', '吴中区']
      },
      {
        'name': '性别',
        'radio': true,
        'radios': [
          {'value': 'boy', 'name': '男', 'checked': true},
          {'value': 'girl', 'name': '女'}
        ]
      },
      {
        'name': '喜欢的颜色',
        'checkbox': true,
        'checkboxs': [
          {'value': 'red', 'name': '红色', 'checked': true},
          {'value': 'green', 'name': '绿色'},
          {'value': 'yellow', 'name': '黄色'}
        ]
      },    
      {
        'name': '一段文本',
        'textarea': true
      },
      {
        'name': '关闭通知',
        'switch': true,
        'checked': true
      },
      {
        'name': '打赏',
        'slider': true,
        'min': 0,
        'max': 200,
        'show': true
      },
      {
        'name': '我要报名',
        'button': true
      }
    ]
  },
  bindPickerChange: function (e) {
    var index = e.target.dataset.index,
        newItems = this.data.items

    newItems[index].value = e.detail.value

    this.setData({
      items: newItems
    })
  }
})
