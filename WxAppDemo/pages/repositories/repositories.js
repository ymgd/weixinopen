//获取应用实例
const app = getApp()
const urlByStars = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100"
const urlByForks = "https://api.github.com/search/repositories?q=language:javascript&sort=forks&order=desc&per_page=100"

Page({
  data: {
    starsBtnStyle: 'btn clicked',
    forksBtnStyle: 'btn ',
    repositories: [],
    loading: false
  },
  //事件处理函数
  onLoad() {
    console.log('onLoad repositories')
    this.sortByStars()
  },
  sortByStars() {
    this.setData({
      loading: true
    })
    wx.request({
      url: urlByStars,
      success: (res) => {
        const repositories = []
        res.data.items.forEach(item => {
          repositories.push({
            name: item.name || '',
            stars: item.stargazers_count || 0,
            url: item.html_url || '',
            owner: item.owner.login || '',
            ownerUrl: item.owner.html_url || '',
            desc: item.description || ''
          })
        })
        this.setData({
          loading: false,
          starsBtnStyle: 'btn clicked',
          forksBtnStyle: 'btn',
          repositories
        })
      }
    })
  },
  sortByForks() {
    this.setData({
      loading: true
    })
    wx.request({
      url: urlByForks,
      success: (res) => {
        const repositories = []
        res.data.items.forEach(item => {
          repositories.push({
            name: item.name || '',
            stars: item.stargazers_count || 0,
            url: item.html_url || '',
            owner: item.owner.login || '',
            ownerUrl: item.owner.html_url || '',
            desc: item.description || ''
          })
        })
        this.setData({
          loading: false,
          starsBtnStyle: 'btn',
          forksBtnStyle: 'btn clicked',
          repositories
        })
      }
    })
  }
})
