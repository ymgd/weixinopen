/* view.js  公共类
    页面显示/隐藏  
 */ 

var _switch = {
    page:"",
    view:{},
    Init:function(page,view){
      this.page = page
      this.view = view
    },
    //打开所有view
    OnAll:function(){
      for ( var i in this.view)
        this.view[i] = true
    },
    //关闭所有view
    OffAll:function(){
      for ( var i in this.view)
        this.view[i] = false
    },
    //仅打开当前view
    On:function(){
      for(var i in arguments)
        this.view[arguments[i]] = true
    },
    //仅关闭当前view
    Off:function( view ){
      for(var i in arguments)
        this.view[arguments[i]] = false

      console.log(arguments)
      console.log(this.view)
    },
    //关闭当前，打开全部
    OnAllExcept:function(){
      for ( var i in this.view)
        this.view[i] = true
      for(var i in arguments)
        this.view[arguments[i]] = false
    },
    //打开当前，关闭全部
    OffAllExcept:function(){
      // for(var i in arguments)
      //   this.view[arguments[i]] = true
      for ( var i in this.view)
        this.view[i] = false
      for(var i in arguments)
        this.view[arguments[i]] = true
    },
    //逆转，开的关，关的开
    Reverse:function(){
      for(var i in arguments)
        this.view[arguments[i]] = !this.view[arguments[i]]
    },
    //Page执行显示/隐藏操作
    Work:function(){
      this.page.setData(this.view)
      
    console.log(this.view)
    }
}

module.exports = {
  Switch: _switch
}
