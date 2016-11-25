# 微信小程序 wxml

为 VSCode 提供 wxml 语法支持及代码片段

[![version](http://vsmarketplacebadge.apphb.com/version/coderfee.vscode-wxml.svg)](http://vsmarketplacebadge.apphb.com/version/coderfee.vscode-wxml.svg)
[![installs](http://vsmarketplacebadge.apphb.com/installs/coderfee.vscode-wxml.svg)](http://vsmarketplacebadge.apphb.com/installs/coderfee.vscode-wxml.svg)

## 安装

1. 打开编辑器，`Ctrl + Shift + X`，搜索 **weapp-wxml**。
2. 点击 `install`

## 使用

键入关键词，然后回车。关键词不区分大小写

![vscode-weapp-snippets](http://oaz5uxplb.bkt.clouddn.com/vscode-wxml.gif)

#### 代码示例

- swiper

  ```html
  <swiper indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
    <block wx:for="{{imgUrls}}">
      <swiper-item>
        <image src="{{item}}" class="slide-image" />
      </swiper-item>
    </block>
  </swiper>
  ```

- actionsheet

  ```html
  <action-sheet>
    <block wx:for="{{actionSheetItems}}">
      <action-sheet-item class="item" data-name="{{item}}" />{{item}}</action-sheet-item>
    </block>
  </action-sheet>
  ```

- checkgroup

  ```html
  <checkbox-group>
    <label class="" wx:for="{{item}}">
      <checkbox value="item.name" />{{item.value}}
    </label>
  </checkbox-group>
  ```

- wxfor

  ```html
  wx:for="{{item in items}}"
  ```

- button

  ```html
  <button type="" size="" loading="" plain="" bindtap=""></button>
  ```

- ······more


**Enjoy!​​**