function saveProduct(product){
    var productInstorage=[]
    return new Promise((resolve,reject)=>{
        var inArr = false
        wx.getStorage({
            key:"product",
            success:function(res){
                var selectpros = res.data.map((pro)=>{
                   if (pro.productId === product.productId){
                       pro.count = pro.count +1
                       inArr = true
                   }else{
                   }
                   return pro
                })
                ///如果 product不在 数组里面
               if(inArr == false){
                   product.count = 1
                   selectpros.push(product)
                   saveToStrorageSingle(selectpros)
               }else{
               saveToStrorageSingle(selectpros)
               }
            },
            fail:function(res){
            product.count = 1    
            wx.setStorage({
            key:"product",
            data:[product],
            success:resolve,
            fail:reject
              })
            },
        })
    })
}



function saveToStrorageSingle(arrs){
            wx.setStorage({
            key:"product",
            data:arrs,
          })           
}



function getAllproducts(trainID){
      return new Promise((resolve,reject)=>{
        wx.getStorage({
            key:"product",
            success:resolve,
            fail:reject
     })
    })

}

module.exports = {
saveProduct: saveProduct,
getAllproducts:getAllproducts
}