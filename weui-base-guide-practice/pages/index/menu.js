var am_count = 0;
const am_db = {}
const style = {
    menuItemHeight: '114rpx'
}
const subitem_db = {
    'base-ctr-lib': [
        { name: '图标', nav_url: '../base-ctr-lib/icon/icon' },
        { name: '提示', nav_url: '../base-ctr-lib/toast/toast' },
        { name: '按钮', nav_url: '../base-ctr-lib/button/button' },
        { name: '输入', nav_url: '../base-ctr-lib/input/input' },
        { name: '选择', nav_url: '../base-ctr-lib/select/select' },
        { name: '列表', nav_url: '../base-ctr-lib/list/list' },
        { name: '卡片', nav_url: '../base-ctr-lib/card/card' },
        { name: '弹框', nav_url: '../base-ctr-lib/popup/popup' } 
    ],
    'com-lib': [
        { name: '结果页', nav_url: '../comb-lib/result/result' },
        { name: '弹窗',nav_url: '../comb-lib/popup/popup' },
        { name: '页面内加载', nav_url: '../comb-lib/inner_loading/inner_loading' },
        { name: '按钮加载', nav_url: '../comb-lib/btn_loading/btn_loading' },
        { name: '搜索', nav_url: '../comb-lib/search/search' },
        { name: '搜索中', nav_url: '../comb-lib/searching/searching' },
        { name: '底部 Tab', nav_url: '../comb-lib/bottom_tab/bottom_tab'},
        { name: '顶部 Tab', nav_url: '../comb-lib/top_tab/top_tab'},
        { name: '顶部 Tab (二)', nav_url: '../comb-lib/top_tab2/top_tab2'},
        { name: '排序', nav_url: '../comb-lib/top_sort/top_sort'},
        { name: '其他', nav_url: '../comb-lib/other/other'}
    ],
    'com-example-page': [
        { name: '文档说明', nav_url: '../comb-example/doc/doc' },
        { name: '图文', nav_url: '../comb-example/img_doc/img_doc' },
        { name: '表单输入组合', nav_url: '../comb-example/form/form' },        
        { name: '表单输入报错',nav_url: '../comb-example/form_error/form_error' },
        { name: '表单输入组合（二）', nav_url: '../comb-example/form2/form2' },
        { name: '收货地址', nav_url: '../comb-example/ship_address/ship_address'},
        { name: '新增地址', nav_url: '../comb-example/add_ship_address/add_ship_address'},
        { name: '结果页', nav_url: '../comb-example/result/result'},
        { name: '发送验证码', nav_url: '../comb-example/send_form_code/send_form_code'},
        { name: '获取验证码', nav_url: '../comb-example/get_form_code/get_form_code'},
        { name: '选择控件', nav_url: '../comb-example/select_ctrl/select_ctrl'},
        { name: '只读表单', nav_url: '../comb-example/read_only_form/read_only_form'}
    ],
    'android-diff-page': [
        { name: '标题单行', nav_url: '../android-diff/title_single_line/title_single_line'},
        { name: '无标题', nav_url: '../android-diff/blank_title/blank_title'},
        { name: '单行列表', nav_url: '../android-diff/single_line_list/single_line_list' }
    ]
}

function createAm(){
    am_count += 1;
    return wx.createAnimation({
        duration:170,
        timingFunction: "linear"
    })
}

function buildIcon(menu){
    menu.icon = menu.icon || {}
    if (menu.icon.src){
        return
    }
    if (menu.icon.path){
        menu.icon.src = '../..' + menu.icon.path
    }
}

function buildSubItems(menu){
  menu.sub_items = subitem_db[menu.id]
}

function setup(page, menu_list){

  menu_list.forEach(function(menu){
      buildSubItems(menu)
      buildIcon(menu)
      am_db[menu.id] = createAm()
      menu.sub_items.forEach(function(sub_item){
          am_db[sub_item.name] = createAm()
      })
  })

  return {

    getMenu: function(menu_id){
       return menu_list.find(function(menu){
         return menu.id === menu_id
       })
    },

    amStep: function(menu, af){
      var sub_items = menu.sub_items
      sub_items.forEach(function(item){
          var am = am_db[ item.name ]
          af(am)
          am.step()
          item.am_data = am.export()
      })
    },

   rangeMenu: function(menu, h){
       var am = am_db[menu.id]
       am.height(h).step()
       menu.am_data = am.export()
   },


    closeMenus: function() {
        var that = this
        menu_list.forEach( function( m ) {
            m.toggle_class = "closed"
            that.amStep( m, function( am ) {
                am.height( 0 ).opacity( 0 )
            })
            that.rangeMenu(m, style.menuItemHeight)
        })

        return menu_list
        
    },

    closeOtherMenus: function( menu ) {
        var that = this
        menu_list.forEach( function( m ) {
            if( m.id != menu.id ) {
                m.toggle_class = "closed"
                that.amStep( m, function( am ) {
                    am.height( 0 ).opacity( 0 )
                })
                that.rangeMenu(m,style.menuItemHeight)
            }
        })

    },

    toogle: function( menu) {
        if( menu.toggle_class === "closed" ) {
            menu.toggle_class = ''
            this.closeOtherMenus(menu)
            this.amStep( menu, function( am ) {
                am.height('57rpx').opacity( 1 )
            })
            this.rangeMenu(menu, '100%')
        } else {
            menu.toggle_class = "closed"
            this.amStep( menu, function( am) {
                am.height( 0 ).opacity( 0 )
            })
            this.rangeMenu(menu, style.menuItemHeight)
        }

        return menu_list
    }

  }

}

module.exports = {
  setup: setup
}