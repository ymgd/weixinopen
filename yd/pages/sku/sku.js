import common from '../../common/app'
import API, { HEADER as header } from '../../common/API'
import { fetch } from '../../utils/utils'
const page = {
  onLoad(options) {
    wx.showToast({title: '玩命加载中',icon: 'loading'})
    // SKU售卖链接各个常见电商的log
    fetch(`${API.getFullSku.url}/${options.sid || 1124}.html`).then(result => {
      const {errMsg, statusCode, data} = result
      if(errMsg === 'request:ok' && statusCode === 200){
        console.log(`${API.getFullSku.url}/${options.sid || 1124}.html接口错误：`, result);
        const sku = data.data[0]
        let png = 'default.png'
        let ratio = 2.416
        sku.sales = sku.sales.map(sale => {
          const link = sale.link_m_cps || sale.link_pc_cps || sale.link_m_raw || sale.link_pc_raw
          if(/tmall|天猫/.test(sale.mart) || link.indexOf('tmall.com') !== -1 ){
            png = 'tmall.png'
            ratio = 7.138
          }else if (link.indexOf('taobao.com') !== -1 ) {
            png = 'tb.png'
          }else if (link.indexOf('jd.com') !== -1 ) {
            png = 'jd.png'
            ratio = 2.722
          }else if(link.indexOf('amazon.cn') !== -1 ){
            png = 'amazoncn.png'
            ratio = 2.25
          }else if (link.indexOf('amazon.jp') !== -1 ) {
            png = 'amazonjp.png'
            ratio = 4
          }else if (link.indexOf('shopbop.com') !== -1 ) {
            png = 'shopbop.png'
            ratio = 6.25
          }else if (link.indexOf('rakuten.com') !== -1 ) {
            png = 'rakuten.png'
            ratio = 2
          }else if (link.indexOf('amazon.') !== -1 ) {
            png = 'amazon.png'
            ratio = 3.194
          }
          sale.url = `http://c.diaox2.com/cms/diaodiao/mart2/${png}`
          sale.ratio = ratio
          return sale
        })
        this.setData({sku})
      }else{
        console.log(`${API.getFullSku.url}/${options.sid || 1124}.html接口失败：`, result);
      }
    }).catch(result => {
      console.log(`${API.getFullSku.url}/${options.sid || 1124}.html接口错误：`, result);
    })

    // wx.request({
    //   url: `${API.getFullSku.url}/${sid}.html`,
    //   header: header,
    //   success: function(result) {
    //     const {errMsg, statusCode, data} = result
    //     if(errMsg === 'request:ok' && statusCode === 200){
    //       console.log(`${API.getFullSku.url}/${sid}.html接口错误：`, result);
    //       const sku = data.data[0]
    //       let png = 'default.png'
    //       let ratio = 2.416
    //       sku.sales = sku.sales.map(sale => {
    //         const link = sale.link_m_cps || sale.link_pc_cps || sale.link_m_raw || sale.link_pc_raw
    //         if(/tmall|天猫/.test(sale.mart) || link.indexOf('tmall.com') !== -1 ){
    //           png = 'tmall.png'
    //           ratio = 7.138
    //         }else if (link.indexOf('taobao.com') !== -1 ) {
    //           png = 'tb.png'
    //         }else if (link.indexOf('jd.com') !== -1 ) {
    //           png = 'jd.png'
    //           ratio = 2.722
    //         }else if(link.indexOf('amazon.cn') !== -1 ){
    //           png = 'amazoncn.png'
    //           ratio = 2.25
    //         }else if (link.indexOf('amazon.jp') !== -1 ) {
    //           png = 'amazonjp.png'
    //           ratio = 4
    //         }else if (link.indexOf('shopbop.com') !== -1 ) {
    //           png = 'shopbop.png'
    //           ratio = 6.25
    //         }else if (link.indexOf('rakuten.com') !== -1 ) {
    //           png = 'rakuten.png'
    //           ratio = 2
    //         }else if (link.indexOf('amazon.') !== -1 ) {
    //           png = 'amazon.png'
    //           ratio = 3.194
    //         }
    //         sale.url = `${URL_PREFIX}/${png}`
    //         sale.ratio = ratio
    //         return sale
    //       })
    //       self.setData({sku})
    //     }else{
    //       console.log(`${API.getFullSku.url}/${sid}.html接口失败：`, result);
    //     }
    //   },
    //   fail(result){
    //     console.log(`${API.getFullSku.url}/${sid}.html接口错误：`, result);
    //   },
    //   complete(){
    //     wx.hideToast()
    //   }
    // })
  }
  ,buy(event){
    const url = event.target.dataset.url
    if(url){
      wx.showModal({
        title: '长按复制下列链接，在浏览器下打开',
        content: url,
        showCancel: false
      })
    }
  }
}
Object.assign(page, common)
Page(page)
