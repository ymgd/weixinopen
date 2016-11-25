const util = require('../../utils/util.js')
const markdown = require('../../utils/markdown/index.js').markdown

Page({
    data: {
        name: 'linchen',
        node: []
        // node: [
        //     {
        //         name: "1",
        //         node: [
        //             {name: "a"},
        //             {name: "b"},
        //             {name: "c"},
        //         ]
        //     },
        //     {
        //         name: "2",
        //         node: [
        //             {name: "d"},
        //             {name: "e"},
        //             {name: "f"},
        //         ]
        //     }
        // ]
    },
    onLoad() {
      console.log('hello test')
      wx.request({
        url: 'https://raw.githubusercontent.com/TeamStuQ/skill-map/master/data/map-Architect.md',
        success: (res) => {
        var preNode = ''
        var data = []
        var subdata = []
        var tree = markdown.parse( res.data )
        tree.forEach((node)=>{
            // console.log(node)
            if (Array.isArray(node) && node[0] === 'header' && node[1].level === 1) {
                console.log(node[2])
                data.push({
                    name: node[2],
                    // node: subdata
                })
                preNode = 1
            }
            if (Array.isArray(node) && node[0] === 'header' && node[1].level === 2) {
                if (preNode == 1) {
                    let n = data[data.length-1].node = []
                    n.push({
                        name: node[2]
                    })
                }
                if (preNode == 2) {
                    data.push({
                        name: node[2]
                    })
                }
                preNode = 2
            }
            if (Array.isArray(node) && node[0] === 'header' && node[1].level === 3) {
                if (preNode == 1) {
                    let n = data[data.length-1].node = []
                    n.push({
                        name: node[2]
                    })
                }
                if (preNode == 2) {
                    data.push({
                        name: node[2]
                    })
                }
                preNode = 3
            }
        })
        this.setData({
            node: data
        })
      },
      fail() {
        console.log('fail');
      },
      complete() {
        console.log('complete')
      }
    })
    }
});