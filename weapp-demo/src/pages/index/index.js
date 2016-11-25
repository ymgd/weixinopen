// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    lists: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    console.log(' ---------- onLoad ----------')
    this.fetchSlides().then(data => {
      this.setData({ slides: data })
    })

    this.fetchFeedsDigestOffset().then(data => {
      this.setData({ lists: data })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
  },

  fetchSlides() {
    return app.myXhr.get('/v1/slides', {
      place: 1,
      platform: 1
    }).then(res => res.data.data)
  },

  fetchFeedsDigestOffset() {
    return app.myXhr.get('/v2/feeds/digest-offset', {
      feed_type: 'Tutorial',
      offset: 0,
      show_vote: 1,
      per_page: 30
    }).then(res => res.data.data)
  },
})
