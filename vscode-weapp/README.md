# 微信小程序 API 代码片段

为 VSCode 提供微信小程序 API 提示及代码片段

[![version](http://vsmarketplacebadge.apphb.com/version/coderfee.vscode-weapp-api.svg)](http://vsmarketplacebadge.apphb.com/version/coderfee.vscode-weapp-api.svg)
[![installs](http://vsmarketplacebadge.apphb.com/installs/coderfee.vscode-weapp-api.svg)](http://vsmarketplacebadge.apphb.com/installs/coderfee.vscode-weapp-api.svg)

## 安装

1. 打开编辑器，`Ctrl + Shift + X`，搜索 **weapp-api**
2. 点击 `install`

## 使用

### 小程序 API 提示

键入关键词 `wx`，就会出现提示，然后回车。关键词不区分大小写。

![vscode-weapp-api-snippets](http://oaz5uxplb.bkt.clouddn.com/vscode/api.gif)

#### API 代码示例

- wxapp

  ```javascript
  App({
    onLaunch: function() {
      
    },
    onShow: function() {
      
    },
    onHide: function() {
      
    },
    globalData: globalData
  })
  ```

- wxpage

  ```javascript
  Page({
    data: {
      
    },
    onLoad: function(options) {
      //Do some initialize when page load.
      
    },
    onReady: function() {
      //Do some when page ready.
      
    },
    onShow: function() {
      //Do some when page show.
      
    },
    onHide: function() {
      //Do some when page hide.
      
    },
    onUnload: function() {
      //Do some when page unload.
      
    },
    onPullDownRefresh: function() {
      //Do some when page pull down.
      
    }
  })
  ```

- wxgetlocation

  ```javascript
  wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      var latitude = res.latitude
      var longitude = res.longitude
    },
  })
  ```

- wxrequest

  ```javascript
  wx.request({
    url: '',
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      
    }
  })
  ```

- ······more

### app.json 配置提示

`app.json` 中请注意添加逗号。关键词只有 5 个：`pages` / `window` / `tabbar` / `network` / `debug`

![vscode-weapp-json-snippets](http://oaz5uxplb.bkt.clouddn.com/vscode/json.gif)

#### app.json 代码示例

- page

  ```json
  "pages": [
      "pages/index/index",
      "add your pages path"
  ]
  ```

- window

  ```json
  "window": {
      "navigationBarBackgroundColor": "#000000",
      "navigationBarTextStyle": "white",
      "navigationBarTitleText": "Wechat",
      "backgroundColor": "#ffffff",
      "backgroundTextStyle": "dark",
      "enablePullDownRefresh": false
  }
  ```

- tabbar

  ```json
  "tabBar": {
      "color": "#cccccc",
      "selectedColor": "#000000",
      "backgroundColor": "#ffffff",
      "borderStyle": "black",
      // list中至少2个对象，最多5个对象
      "list": [{
        "pagePath": "pages/index/index",
        "text": "text",
        "iconPath": "iconPath",
        "selectedIconPath": "selectedIconPath"
      }]
  }
  ```

- network

  ```json
  "networkTimeOut": {
      "request": $1,
      "connectSocket": $2,
      "uploadFile": $3,
      "downloadFile": $4
  }
  ```

- debug

  ```json
  "debug": true
  ```

  ​**Enjoy!**