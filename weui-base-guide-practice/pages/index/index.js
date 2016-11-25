var menu = require('menu.js')
//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
      menu_list: [
          {
            id: 'base-ctr-lib',
            name: '基础控件',
            icon:{
              path: '/assets/images/icon_nav_form.png',
              mode: 'aspectFit'
            },
            sub_items: []
          },
          {
            id: 'com-lib',
            name: '组合组件',
             icon:{
              path: '/assets/images/icon_nav_layout.png',
              mode: 'aspectFit'
            },
            sub_items: []
          },
          {
            id: 'com-example-page',
            name: '组合范例',
             icon:{
              path: '/assets/images/icon_nav_feedback.png',
              mode: 'aspectFit'
            },
            sub_items: []
          },
          {
            id: 'android-diff-page',
            name: '安卓差异',
             icon:{
              path: '/assets/images/icon_nav_z-index.png',
              mode: 'aspectFit'
            },
            sub_items: []
          }
      ]
  },

  onReady: function(){
    this.$m = menu.setup(this, this.data.menu_list)
    var menu_list = this.$m.closeMenus()
    this.setData({menu_list: menu_list})
  },

  toogleMenu: function(e){
    var m = this.$m.getMenu( e.currentTarget.id )
    var menu_list = this.$m.toogle( m)
    this.setData({menu_list: menu_list})
  }
})
