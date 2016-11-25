// TODO: tabbar以及分类需要修改
Page({
  data: {
    text: "Page add",
    datas: [],
    help: '#000000',
    notice: '#cbcccd',
    activity: '#cbcccd',
    flag_position: '0%',
    placeholder: "希望邻居能帮你什么？",
    class_category: ["借东西", "搭把手","寻人","打听周边信息", "寻物"]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;

    self.setData({
      help: '#cbcccd',
      notice: '#cbcccd',
      activity: '#cbcccd',
    });
    if (tab === 'help') {
      self.setData({
        help: '#000000',
        flag_position: '0%',
        placeholder: "希望邻居能帮你什么？",
        class_category: ["借东西", "搭把手","寻人","打听周边信息", "寻物"]
      });
    }
    if (tab === 'notice') {
      self.setData({
        notice: '#000000',
        flag_position: '33%',
        placeholder: "你有什么相对邻居说的？",
        class_category: ["停电停水", "挪车"]
      });
    }
    if (tab === 'activity') {
      self.setData({
        activity: '#000000',
        flag_position: '66%',
        placeholder: "和邻居面对面的机会",
        class_category: ["邻里特产", "闲置处理"]
      });
    }
  },
  // TODO: 上传照片
  uploadPhoto: function () {
    console.log("上传照片");
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})