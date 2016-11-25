const API_URL = 'https://api.douban.com/v2/movie'




// 豆瓣电影主题API，获取所有在线，即将上映和前250的电影，in_theaters  coming_soon  top250
function theme(type,page=1,count=20,result){
   const params = { start: (page - 1) * count, count: count }
   wx.request({
      url: "https://api.douban.com/v2/movie/"+type,
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
         console.log(res.data)
         result(res.data)
      }
    })
 }


// 电影搜索
function search(tag,page=1,count=20,result){
   const params = { start: (page - 1) * count, count: count,tag:tag }
   wx.request({
      url: "https://api.douban.com/v2/movie/search",
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
         console.log(res.data)
         result(res.data)
      }
    })
 }



// 电影简介
function subject(id,result){
   wx.request({
      url: "https://api.douban.com/v2/movie/subject/"+id,
      data: "",
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
         console.log(res.data)
         result(res.data)
      }
    })
 }

module.exports = {
  theme:theme,
  subject:subject, 
  search:search
}


