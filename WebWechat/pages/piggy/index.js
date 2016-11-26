// 拿到全局应用程序实例
const app = getApp()

const API_URL = 'http://localhost:8080/ShakeingPiggyBank/piggy/findtype'

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '加载中...',
    piggys: [],
    loading: true,
  },

  onLoad () {
    //调用应用实例的方法获取全局数据
      //更新数据
      app.fetchApi(API_URL , (err, data) => {
      this.setData({ title: data.title, piggys: data.piggys, loading: false })
      // wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
    })

      
  }
})

// function loaddatadata(){

//   data = new Object();
//   data["title"] = "存钱罐类型选择";
//   subjects = new Array();
//   subject = new Object();
//   subject["id"] = 1;
//   subject["basemoney"] = 0.1;
//   subject["totalamount"] = 50;
//   subject["baseamount"] = 10;
//   subjects[0] = subject;
//   data["piggys"] = subjects;

//   return data;  
// }