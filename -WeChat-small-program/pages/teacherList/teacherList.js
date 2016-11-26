//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    teacherList: [
      {
        pic:"../../images/teacher1.jpg",
        name:"秦静",
        info:"曾服务于中智信达，历任董事长助理、副总经理，兼高校与政府合作部总监。擅长课程：《销售人员的营销之道》、《打造高绩效的销售团队》"
      },
      {
        pic:"../../images/teacher2.jpg",
        name:"于静晨",
        info:"省心办创始人，曾供职于未来付、酷6网等多家互联网企业，2015年1月创办“省心办”全自营创业服务机构，为数千家公司解决了工商财税难题"
      },
      {
        pic:"../../images/teacher3.jpg",
        name:"薄胜",
        info:"全国首个工商注册众创空间创始人，工信部虚拟运营商研究中心研究员，2010年-2014年联合开发“娲皇宫”、“中国好声音官方报名APP”等应用"
      },
      {
        pic:"../../images/teacher4.jpg",
        name:"简晶",
        info:"简晶老师是中国最早成名的一批程序员之一，是国内最早的综合网络、休闲、娱乐、服务商联众游戏的创始人，互联网知名创业极客。拨号精灵的创始人"
      }
    ]
  },
  onLoad: function (num) {
    if (num.num) {
      const listsShow = this.data.teacherList[num.num];
      this.setData({teacherList:[listsShow]})
    }
  }
})
