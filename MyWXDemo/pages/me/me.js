var types = ['default', 'primary', 'warn']
Page({
  data: {
    text:'页面初始化的数据',
    msgList:[{msg:'1'},{msg:'2'}],
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    object:{
        title:'init title',
        subtitle:'init subtitle'
    }

  },
  //生命周期函数--监听页面加载
  onLoad: function () {
      //获取APP实例
      var appInstance = getApp()
      console.log(appInstance.globalData)
      this.setData({
          'staticValue':appInstance.globalData.appkey
      })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady:function(){

  },
  //生命周期函数--监听页面显示
  onShow:function(){

  },
  //生命周期函数--监听页面隐藏
  onHidee:function(){

  },
  //生命周期函数--监听页面卸载
  onUnload:function(){

  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh:function(){

  },
  //点击事件
  onChangePageData:function(){
      this.setData({
          text:'什么',
          'array[0].msg':'900',
          'object.subtitle':'WTF',
          'newField.text':'new Data',
          
      })
  },
  onPullDownRefresh:function(){
      console.log('下拉刷新')
  }

})