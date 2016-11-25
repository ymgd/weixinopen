 var untils = require('../utils/util.js')
 var test = require('../utils/test.js')



 var app = getApp()

Page({
    data:{
        inputVal:'',
        items:[]
    },
    bindDel:function(e){
        var id = e.target.dataset.id;

        var s_title = wx.getStorageSync('s_title')
        var parentThis = this;

        wx.showModal({
            title: '删除',
            content: '是否确认删除',
            success: function(res) {
                if (res.confirm) {

                    console.log('用户点击确定')
                    s_title.splice(id, 1);

                    wx.setStorageSync('s_title', s_title)
                    console.log(s_title);

                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1000
                    })

                    console.log(this);

                    parentThis.setData({
                        inputVal: '',
                        items:s_title
                    })

                    
                }else{
                    return false;
                }
            }
            })

            
       


    },
    bindViewTap: function(e){
        console.log(e);
        var id = e.target.dataset.id;
        
        wx.removeStorageSync('s_id');
        wx.setStorageSync('s_id', id);
        wx.navigateTo({
            url: '../list/detail/index'
        })


    },
    formSubmit: function(e) {

       

        var input = e.detail.value.input;

        if(!input){
            wx.showToast({
                title: '失败',
                icon: 'loading',
                duration: 1000
            })

            return false;
        }

        var s_title = wx.getStorageSync('s_title') || []
        
        var length = s_title.length;

        input = test.getFullChars(input)

        s_title.unshift({id:length + 1,title:input})


        wx.setStorageSync('s_title', s_title)

        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
        })
        

        wx.redirectTo({
            url: '../list/index'
         })


    },
    formReset: function() {
        console.log('form发生了reset事件')
    },
    onLoad: function () {

    console.log('onLoad')

    // console.log(untils.sayHello('aaadasds'))

    var s_title = wx.getStorageSync('s_title') || [];
    this.setData({
            inputVal: '',
            items:s_title
          })


  }
})

