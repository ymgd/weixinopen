const markdown = require('../../utils/markdown/index.js').markdown
const store = require('../../store/store.js')

/**
 * @param {integer} n    影响 style 的值
 */
const parseList = (node, n, data) => {
    function addItem(item, n, data) {
      if (Array.isArray(item)) {
        console.log(item)
        if (Array.isArray(item[1])) {
          data.push({
              style: 'l'+n,
              content: item[1][2],
          })
        } else {
          if (item[2]) {
            data.push({
                style: 'l'+n,
                content: item[2],
            })
          } else {
            data.push({
                style: 'l'+n,
                content: item[1],
            })
          }
        }
      } else {
        data.push({
            style: 'l'+n,
            content: item,
        })
      }
    }
    for (let i=1; i<node.length; i++) {
        if ( node[i][2] && Array.isArray(node[i][2]) ) {
            addItem(node[i][1], n, data)
            parseList(node[i][2], n+1, data)
        } else {
            addItem(node[i][1], n, data)
        }
    }
}

Page({
    data: {
        skill: {},
        node: [],
        // loading: false,
    },
    onLoad(option) {
        if(option.index === undefined) return;
        wx.setNavigationBarTitle({
            title: store.skills[option.index].name
        })
        // wx.showNavigationBarLoading()
        // this.setData({loading: true});
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        })

        wx.request({
            url: store.skills[option.index].link,
            success: (res) => {
                this.setData({
                    skill: store.skills[option.index]
                })
                var data = []
                var tree = markdown.parse( res.data )
                tree.forEach((node)=>{
                    if (Array.isArray(node) && node[0] === 'header' && node[1].level === 1) {
                        // data.push({
                        //     style: 'h1',
                        //     content: node[2],
                        // })
                    }
                    if (Array.isArray(node) && node[0] === 'header' && node[1].level === 2) {
                        data.push({
                            style: 'h2',
                            content: node[2],
                        })
                    }
                    if (Array.isArray(node) && node[0] === 'header' && node[1].level === 3) {
                        data.push({
                            style: 'h3',
                            content: node[2],
                        })
                    }
                    if (Array.isArray(node) && node[0] === 'bulletlist') {
                        parseList(node, 1, data)
                    }
                })
                this.setData({
                    node: data
                })
            },
          fail() {
          },
          complete: () => {
              // wx.hideNavigationBarLoading()
              wx.hideToast()
              // this.setData({loading: false})
          }
        })
    }
});
