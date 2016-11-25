import common from '../../common/app'
import API from '../../common/API'
import { handleTitle, fetch } from '../../utils/utils'
/*
  TODO:
  1. onLoad 为什么不执行？
     答：因为common.js中已经写了onLoad函数，然后使用Object.assign合并page和common时，common的onLoad给page上的onLoad覆盖了
  2. 在app.js中ajax回调中把数据挂到app对象上，为什么在其他文件引用不到？
*/
const page = {
  onLoad(){
    // fetch(API.giftDefault.url).then(res => console.log(res)).catch(res => console.log(res))
    wx.showToast({  title: '玩命加载中',icon: 'loading' })
    fetch(API.giftDefault.url).then(result => {
      console.log(`${API.giftDefault.url}返回的数据：`,result);
      const {aids, meta_infos} = result.data
      const mis = []
      aids.forEach(id => {
        const each = meta_infos[id]
        const meta_info = each.data
        meta_info.title = handleTitle(meta_info.format_title)
        meta_info.read_count = each.read_count
        meta_info.author.pic = `http://c.diaox2.com/cms/diaodiao/${meta_info.author.pic}`
        mis.push(meta_info)
      })
      this.setData({meta_infos: mis})
    }).catch(result => console.log(`${API.giftDefault.url}接口失败：`,result))

    // wx.request({
    //   url: API.giftDefault.url,
    //   header: header,
    //   success(result) {
    //     console.log(`${API.giftDefault.url}返回的数据：`,result);
    //     const {aids, meta_infos} = result.data
    //     const mis = []
    //     aids.forEach(id => {
    //       const each = meta_infos[id]
    //       const meta_info = each.data
    //       meta_info.title = handleTitle(meta_info.format_title)
    //       meta_info.read_count = each.read_count
    //       meta_info.author.pic = `http://c.diaox2.com/cms/diaodiao/${meta_info.author.pic}`
    //       mis.push(meta_info)
    //     })
    //     self.setData({meta_infos: mis})
    //   },
    //   fail(result){
    //     console.log(`${API.giftDefault.url}接口失败：`,result);
    //   },
    //   complete(){
    //     wx.hideToast()
    //   }
    // })

  }
  ,confirm(){
    const query = this.data.query
    // if(!query){return wx.showModal({content: '您还没有填写任何礼物～',showCancel: false})}
    wx.navigateTo({url:`../gift-result/gift-result?queryParameter=${JSON.stringify({query})}`})
  }

  ,bindChange(e) {
    console.log( e.detail.value )
    const query = (e.detail.value || '').trim()
    if(query){this.setData({query})}
  }
}

Object.assign(page, common)
Page(page)
