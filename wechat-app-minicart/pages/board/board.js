// Douban API 操作
const xtc = require('../../libraries/douban.js')
const storage = require('../../libraries/storage.js')
Page({
  data: {
   
    toastHidden:true,
    movies: [],
    productSources:[],
    loading: true,
    BASE_URL : 'http://ystest.minicart.cn:8080/tandroid/'
  },
  toast2Change:function(){

  this.setData({toastHidden:true})

  },
  addToCart:function(event){ 
      this.setData({toastHidden:false})
     storage.saveProduct(
       
       this.data.productSources[(event.currentTarget.dataset.idx)]
       )
     .then(()=>console.log("success"))
     .catch(e=>{
     console.log("failure")
    })
  },

  onLoad () {
    var reqOb = {
      "endStationId" : "10640",  
      "trainBottom" : "G1350",   
      "takeTrainDate" : "2016-10-10", 
       "trainNumber" : "G1359",    
      "startStationId" : "10639",
      "pageSize" : "10000"
    }
    xtc.getTrainProduct(reqOb).then(d => {this.setData
      (
       {
        productSources:d["data"]["ResultData"]["ProductItems"].filter(item=>item.is_recommend === "Y").map(item =>{
          var splitFirst = item.productPicPathRecommend.split('\r\n');
          var resultStr = splitFirst.join('')
          item.productPicPathRecommend = resultStr
          return item
        })
      }
       )
      }
      )
      .catch(e => {
        console.log("error")
        this.setData({ movies: [], loading: false })
      })


    xtc.getTrainAD()
      .then(d => this.setData({movies:d["data"]["ResultData"]["advertisingList"]}))
      .catch(e => {
        console.error(e)
        this.setData({ movies: [], loading: false })
      })
  },
})





