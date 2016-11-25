const API_URL = 'http://api.golfd.cn/holeInOneUserPoints/year,2016/sort'
const block_url = 'http://cms.golfd.cn/contentBlocks/'
const recommand_clubs_url = 'http://api.golfd.cn/clubs/recommend'
const recommend_commodity_url = 'http://api.golfd.cn/commodities/recommend'
function fetchApi (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}`,
      data: params,
      success: resolve,
      fail: reject
    })
  })
}

function fetchCmsApi (id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${block_url}${id}`,
      // data: params,
      success: resolve,
      fail: reject
    })
  })
}

// 订场服务
function fetchRecommandClubsApi (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${recommand_clubs_url}`,
      data:params,
      success: resolve,
      fail: reject
    })
  })
}

function fetchRecommandCommodityApi () {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${recommend_commodity_url}`,
      success: resolve,
      fail: reject
    })
  })
}



module.exports = {
  find (pageNo, pageSize) {
    const params = { pageNo: pageNo, pageSize: pageSize }
    return fetchApi(params)
      .then(res => res.data)
  },
  findBlockById (id){
     return fetchCmsApi(id)
      .then(res => res.data)
  },
  findRecommandClubs (province) {
    const params = { province: province}
    return fetchRecommandClubsApi(params)
      .then(res => res.data)
  },
  findRecommandCommodity () {
    return fetchRecommandCommodityApi()
      .then(res => res.data)
  }
}


// class Douban {
//   // 不支持
//   // static API_URL = 'https://api.douban.com/v2/movie/'

//   constructor (title, movies) {
//     this.title = title
//     this.movies = movies
//   }
// }
