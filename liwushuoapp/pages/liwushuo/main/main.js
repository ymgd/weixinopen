Page({
  data: {
    list:[],
    imgUrls: [
      'http://img02.liwushuo.com/image/161010/s1o9fylh6.jpg?imageView2/2/w/720/q/85/format/webp',
      'http://img02.liwushuo.com/image/161011/rbl062la2.jpg?imageView2/2/w/720/q/85/format/webp',
      'http://img01.liwushuo.com/image/161017/wjpfcbg7k.jpg?imageView2/2/w/720/q/85/format/webp',
      'http://img01.liwushuo.com/image/160928/w1tyv9dtu.jpg?imageView2/2/w/720/q/85/format/webp',
      'http://img02.liwushuo.com/image/160926/oix8miqtk.png-w720',
      'http://img02.liwushuo.com/image/160926/eiimnc0vo.jpg-w720',
    ],
    ulli:[
      '精选',
      '送女票',
      '海淘',
      '创意生活',
      '送基友',
      '送爸妈',
      '设计感',
      '文艺风',  '奇葩搞怪',
        '科技范',  '数码',
          '萌萌哒',  '爱读书'
    ],

    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost/mock/list.json',
      // url: 'http://felixlu.bceapp.com/list.php',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        setTimeout(function () {
          that.setData({
            list: res.data,
          });
        }, 1500);
      },
      fail: function (error) {
        console.log(error);
      }
    });

  },
})
