
module.exports = {
  
  fetchFilms: function(url, cb){
    var that = this
    fetch(url).then(function(response){
      response.json().then(function(data){
        
        if(data.data.courses.length === 0){
          that.setData({
            hasMore: false,
          })
        }else{
           console.log(666)
          that.setData({ 
             
             courses: that.data.courses.concat(data.data.courses)
          })
        }
        cb(data)
      })
    })
  }
}