
Page({
    data : {}

    ,itemTapHandler : function(e){
        var tag = e.currentTarget.dataset.tag;
        if(typeof tag == 'undefined'){ return; }
        wx.navigateTo({url : tag + '/' + tag});
    }
    
})