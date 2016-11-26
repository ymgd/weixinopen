//获取应用实例
var app = getApp()
Page({
  data: {
    tasks: [
      {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《观沧海》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《闻王昌龄左迁龙标遥有此寄》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《次北固山下》"
    }, {
      time: "2016-10-01 08:00:00",
      details: "背诵课文《天净沙 秋思》"
    }
    ],
    actionSheetHidden: true,
    toast1Hidden: true
  },
  //事件处理函数

  // 跳转到学生列表
  t_students: function() {
    wx.navigateTo({
      url: '../t_students/t_students'
    })
  },

  // 弹出底部菜单
  actionSheet: function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  // 底部菜单-修改作业记录
  edit_task: function() {
    navigateTo({url: "../t_assignment/t_assignment"})
  },

  // 底部菜单-删除作业记录
  delete_task: function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden, // 隐藏底部菜单
      toast1Hidden: false   // 弹出消息提示框
    })
  },

  // 让提示框消失
  toast1Change(){
      this.setData({
          toast1Hidden: true
      })
  },
})