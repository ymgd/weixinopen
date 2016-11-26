
const app = getApp()

const API_URL="http://apicloud.mob.com/v1/cook/menu/query?key=17113fceca309&id="

//初始化
var page = {
    data: {
        // text:"这是一个页面"
        id: '',
        detail:''
    },
    onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数

    this.setData({
      id: options.id,
    })

     console.log(this.data.id)

    //通过订单继续查询菜谱详细信息
    app.httpClient( API_URL +this.data.id, ( error, data ) => {

      if( data.retCode == 200 ) {
        this.setData( {
          detail:data.result,
        })
      }else{
          console.log("服务器异常")
      }
      
    })
    },

}
Page( page)