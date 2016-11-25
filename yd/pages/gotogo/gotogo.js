import common from '../../common/app'
import { uniquePush, getLikesFromStorage, setLikesToStorage, removeLikesFromStorate, fetch } from '../../utils/utils'
import API, { HEADER as header } from '../../common/API'
let currentIndex = 0

/**
 * [page description]
 * @type {Object}
 *  逛一逛整体逻辑
 *   0. 创建一个队列，放置要进行动画的数据
 *   1. 从服务端拿到的数据放置到全局
 *     1.1 从本地取出历史上的“喜欢”数据
 *     1.2 从服务端拿到的数据若已经存在于上面的“喜欢”数据中，则过滤掉
 *   2. 从已经经过过滤操作的全局数据中拿2条数据
 *   3. 点击“喜欢” or “不喜欢”（若点击“喜欢”则放置到本地中的“喜欢列表中”）
 *     3.1 第一条数据卡片飞走
 *     3.2 飞走之后，偷偷地原路飞回，并把其zindex从1置为0
 *     3.3 飞回的卡片进行数据填充
 */
// 全局变量 --start
// const queueLength = 2
// const getDataLength = 10
// const vendor = {
//   originDataPool: null,
//   // 把需要做动画的数据放入队列中。以右边作为队头，左边作为队尾
//   queue: null,
//   dataPool: null,
//   startID: 0,
//   endID: 0
// }
// // 全局变量 --end
const page = {
  onLoad(){
    console.log('gotogo onLoad');
    // 为了防止页面缓存，每次刷新页面之后都会重置currentIndex
    currentIndex = 0
    this.renderByDataFromServer()
    // 拿到原始数据
    // const originDataPool = this.getDataFromServer()
    // 处理原始数据
    // const dataPool = this.handleOriginDataPool(originDataPool)

  }
  // 补充队列数据
  ,queueRecruit(){
    const vendor = this.data.vendor
    const queue = vendor.queue
    if( queue.length < queueLength ){
      const dataPool = vendor.dataPool

    }
  }

  ,renderByDataFromServer(){
    wx.showToast( { title: '玩命搜索中',icon: 'loading' } )
    fetch({
      url: API.giftBrowser.url
    }).then(result => {
      const { errMsg, statusCode, data } = result
      if(errMsg === 'request:ok' && statusCode === 200){
        console.log(`${API.giftBrowser.url}接口返回的数据：`, result);
        const cids = []
        // 处理数据。出于性能上的考虑，我们在一次循环中处理完毕。
        // 过滤掉已经存在于“喜欢”列表中的数据
        const likes = getLikesFromStorage()
        const gotogos = data.meta_infos.map(meta_info => {
          const cid = Number(meta_info.data.nid )
          cids.push( cid )
          meta_info.data.cid = cid
          meta_info.data.title = meta_info.title
          return meta_info.data
        }).slice(0,2)
        // console.log('经过处理后的逛一逛数据：', gotogos);
        this.setData({gotogos, cids})
      }else{
        console.log(`${API.giftBrowser.url}接口失败：`, result);
      }
    }).catch(result => {
      console.log(`${API.giftBrowser.url}接口错误：`, result);
    })
    // wx.request({
    //   url: API.giftBrowser.url,
    //   header: header,
    //   success( result ) {
    //     const { errMsg, statusCode, data } = result
    //     if(errMsg === 'request:ok' && statusCode === 200){
    //       console.log(`${API.giftBrowser.url}接口返回的数据：`, result);
    //       const cids = []
    //       // 处理数据。出于性能上的考虑，我们在一次循环中处理完毕。
    //       // 过滤掉已经存在于“喜欢”列表中的数据
    //       const likes = getLikesFromStorage()
    //       const gotogos = data.meta_infos.map(meta_info => {
    //         const cid = Number(meta_info.data.nid )
    //         cids.push( cid )
    //         meta_info.data.cid = cid
    //         meta_info.data.title = meta_info.title
    //         return meta_info.data
    //       }).slice(0,2)
    //       // console.log('经过处理后的逛一逛数据：', gotogos);
    //       self.setData({gotogos, cids})
    //     }else{
    //       console.log(`${API.giftBrowser.url}接口失败：`, result);
    //     }
    //   },
    //   fail(result){
    //     console.log(`${API.giftBrowser.url}接口错误：`, result);
    //   },
    //   complete(){
    //     wx.hideToast()
    //   }
    // })
  }
  ,animate(ani={rotate:-20, translateX:-300}){
    const cids = this.data.cids
    // 如果到最后，提示用户并返回
    if(currentIndex === cids.length - 1){
      wx.showToast({title: '已经到最后啦亲~', duration: 1000})
      return;
    }

    const {rotate, translateX} = ani
    /**
     * 创建一个动画实例animation。调用实例的方法来描述动画。最后通过动画实例的export方法
     * 导出动画数据传递给组件的animation属性
     * 注意；export方法每次调用后会清理掉之前的动画操作
     */
    let currentCid = cids[currentIndex++]
    this.setData({
      currentCid,
      // duration: 410, // 默认是400ms
      animationData: wx.createAnimation({ timingFunction:'ease' })
                        .scale3d(1.5,1.5,1).rotate(rotate).translate3d(translateX,0,0).opacity(0).step().export()
      })

      // setTimeout(() => {
      //   this.setData({
      //     currentCid,
      //     // duration: 410, // 默认是400ms
      //     animationData: wx.createAnimation({ timingFunction:'ease', duration:16.7 }).opacity(1)
      //                       .scale3d(1,1,1).rotate(0).translate3d(0,0,0).step().export()
      //   })
      // }, 410)

    return currentCid
  }

  /**
   * 喜欢和不喜欢需要做一下函数节流。
   * 防止用户点击过快
   */
  ,dislike(){
    // console.log(this.data.cids);
    this.animate()
  }

  ,like(){
    // console.log(this.data.cids);
    const cid = this.animate({rotate:20,translateX:300})
    // 在客户端维护一个喜欢列表
    // -- test start
      // removeLikesFromStorate()
    // -- test end
    // let likes = getLikesFromStorage()
    // setLikesToStorage(likes, cid)
  }
}

// assign会进行递归拷贝
Object.assign(page, common)
Page(page)
