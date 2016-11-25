
// hotest.js
var Api = require('../../utils/api.js');
var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');

var KEY = require('../../utils/storage_key.js');

var t_id = 0
var GLOBAL_PAGE
var app = getApp()
Page({
  data: {
    myCategory:["t1","t2"],
    tempCategory:["t1","t2"],
    hasImg:["true","false"],

    category:[],
    tCategory:[],
    // t_index:0,

    isAdd:false, //是否增加新目录
    addCategoryInput:"", //新目录名字输入
  },

  //focus离开input后，更新临时缓存
  inputBlur:function(e){
      GLOBAL_PAGE.setData({addCategoryInput:e.detail.value })
  },
  addCategory:function(){
      GLOBAL_PAGE.setData({
          isAdd:true,
      })
  },

  addCategoryOK:function(){
      if (GLOBAL_PAGE.data.addCategoryInput == "")
      {
         wx.showToast({
            title: '请输入目录名称',
            icon: 'loading',
            duration: 800
        })
        return
      }

        GLOBAL_PAGE.setData({
            isAdd:false,
        })

        wx.request({
            url: Api.categoryAdd(),
            method:"GET",
            data: {
                session: wx.getStorageSync(KEY.session) ,
                category_name:GLOBAL_PAGE.data.addCategoryInput,
            },
            success: function(res) {
                var object = res.data
                if(object.status == "true")
                {
                    var c = wx.getStorageSync(KEY.category)
                    c.push(object.category)
                    wx.setStorageSync(
                        KEY.category,
                        c
                    )
                    GLOBAL_PAGE.renderCategory()
                }
                 
            }
        })
  },

  addCategoryCancel:function(){
      GLOBAL_PAGE.setData({
          isAdd:false,
      })
  },


  fixCategory:function(){


      var _my = GLOBAL_PAGE.data.myCategory
      var _temp = GLOBAL_PAGE.data.tempCategory

      if( _my.toString() == _temp.toString())
      {
        wx.showToast({
            title: '未做任何修改',
            icon: 'loading',
            duration: 500,
            success:function(){}
        })
      }
      else
      {
          //TodoTodo 上传修改书局
          //本地Storage保存

          
        wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 500,
            success:function(){}
        })
      }
  },

  deleteCategory:function(e){
        if (e.currentTarget.dataset.has_img == "true" || e.currentTarget.dataset.has_img == true)
        {
        wx.showToast({
            title: '请先移除该分类的表情图',
            icon: 'loading',
            duration: 800
        })
        return
        }
        if (e.currentTarget.dataset.is_default == "1" || e.currentTarget.dataset.is_default == 1)
        {
            wx.showToast({
                title: '默认目录不能删除',
                icon: 'loading',
                duration: 800
            })
            return
        }
     
        wx.request({
            url: Api.categoryDelete(), //仅为示例，并非真实的接口地址
            method:"GET",
            data: {
                session : wx.getStorageSync(KEY.session),
                category_id : e.currentTarget.dataset.category_id
            },
            success: function(res) {
                var object = res.data
                wx.setStorageSync(
                    KEY.category,
                    object.category_list
                )
                GLOBAL_PAGE.renderCategory()
            }
        })
    
  },
  onReady:function(){

  },
  
  onLoad: function (param) {
    GLOBAL_PAGE = this
    console.log(param["category"])
    
    //数据初始化 目录
    var url = Api.categoryQuery() 
    wx.request({
        url: Api.categoryQuery(), //仅为示例，并非真实的接口地址
        method:"GET",
        data: {
            session:  wx.getStorageSync(KEY.session),
        },
        success: function(res) {
            var object = res.data
            wx.setStorageSync(
                KEY.category,
                object.category_list
            )
            GLOBAL_PAGE.renderCategory()
        }
    })
    
    // wx.request({
    //     url: Api.categoryQuery(),
    //     method:"POST",
    //     data: Api.json2Form({
    //         session: wx.getStorageSync(KEY.session) ,
    //     }),
    //     header: {  
    //         "Content-Type": "application/x-www-form-urlencoded"  
    //     },
    //     success: function(res) {
    //         var object = res.data
    //         wx.setStorageSync(
    //             KEY.category,
    //             object.category_list
    //         )
    //         GLOBAL_PAGE.renderCategory()
    //     }
    // })
    
  },

  renderCategory:function(){
    GLOBAL_PAGE.setData({category:wx.getStorageSync(KEY.category)})
  },

})