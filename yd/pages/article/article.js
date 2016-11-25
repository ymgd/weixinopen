import common from '../../common/app'
import API, { HEADER as header } from '../../common/API'
import { fetch } from '../../utils/utils'
const page = {
  onLoad(options){
    wx.showToast({ title: '玩命加载中',icon: 'loading',duration: 10000 })
    fetch(`${API.getArticle.url}/${options.id || 1211}.html`).then(result => {
      const {errMsg, statusCode, data} = result
      if(errMsg === 'request:ok' && statusCode === 200){
        console.log(`${API.getArticle.url}/${options.id || 1211}.html接口返回的数据：`,result);
        const {header, contents} = data
        this.setData({header,contents})
      }else{
        console.log(`${API.getArticle.url}/${options.id || 1211}.html接口失败：`,result);
      }
    }).catch(result => {
      console.log(`${API.getArticle.url}/${options.id || 1211}.html接口错误：`,result);
      this.setData({
        header: {banners: [],title: '有调机器人',  price: {type: 'datetime',value: '-0-0'},  author: {url: 'http://c.diaox2.com/cms/diaodiao/people/robot.jpg',value: '有调机器人'}},
        contents: [{type: 'p',value: '有调机器人正在写文章...'}]
      })
    })

    // wx.request({
    //   url: `${API.getArticle.url}/${options.id || 1211}.html`,
    //   header: header,
    //   success: function(result) {
    //     const {errMsg, statusCode, data} = result
    //     if(errMsg === 'request:ok' && statusCode === 200){
    //       console.log(`${API.getArticle.url}/${options.id || 1211}.html接口返回的数据：`,result);
    //       const {header, contents} = data
    //       self.setData({header,contents})
    //     }else{
    //       console.log(`${API.getArticle.url}/${options.id || 1211}.html接口失败：`,result);
    //     }
    //   },
    //   fail: function(result){
    //     console.log(`${API.getArticle.url}/${options.id || 1211}.html接口错误：`,result);
    //     self.setData({
    //       header: {banners: [],title: '有调机器人',  price: {type: 'datetime',value: '-0-0'},  author: {url: 'http://c.diaox2.com/cms/diaodiao/people/robot.jpg',value: '有调机器人'}},
    //       contents: [{type: 'p',value: '有调机器人正在写文章...'}]
    //     })
    //   },
    //   complete: function(){
    //     // 隐藏掉加载状态
    //     setTimeout(() => {
    //       wx.hideToast()
    //     })
    //   }
    // })

  }
}
Object.assign(page, common)
Page(page)
