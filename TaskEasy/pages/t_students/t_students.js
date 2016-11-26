//获取应用实例
var app = getApp()
Page({
  data: {
    task: {
        teacher: "李老师",
        time: "2016-10-01 00:00:00",
        details: "背诵课文《观沧海》。"
    },
    students: [
      {
      time: "2016-10-02 08:00:00",
      student: "张三",
      status: "提交"
    }, {
      time: "2016-10-03 08:00:00",
      student: "李四",
      status: "提交"
    }, {
      time: "2016-10-04 08:00:00",
      student: "王五",
      status: "提交"
    }
    ],
    f_students: [
      {
      time: "2016-10-01 09:00:00",
      student: "赵六",
      }
    ],
    unf_students: [
        {
            serial: 1,
            name: "钱一"
        },
        {
            serial: 2,
            name: "孙二"
        }
    ]
  },
  //事件处理函数
  t_mark: function() {
    wx.navigateTo({
      url: '../t_mark/t_mark'
    })
  }
})