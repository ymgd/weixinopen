# wxAppendDom

@(自造轮子)

解决微信小程序不支持动态插入DOM节点

##使用
将pages/tmpl文件夹复制进你的项目中，在需要动态插入节点的wxml引用tmpl.wxml
```xml
<!--index.wxml-->
<import src="../tmpl/tmpl.wxml"/>

<view>
	<template is="Tmpl" data="{{wxAppendData}}"/>
</view>
```

在JS中构造节点
```javascript


var app = getApp()
Page({
    data: {
        wxAppendData: [],
    },
    onReady: function() {
        this.data.wxAppendData = [
            {
                node: 'element',
                tag: 'view',
                class: ['a b'],
                content: '父节点',
                child: [
                    {
                        node: 'element',
                        tag: 'img',
                        class: ['a b'],
                        src: '../../img/user_hover.png',
                    },
                    {
                        node: 'element',
                        tag: 'text',
                        class: ['a b'],
                        content: "text标签",
                        child: [
                            {
                                node: 'element',
                                tag: 'text',
                                class: ['a b'],
                                content: "嵌套text标签"
                            }
                        ]
                    },
                    {
                        node: 'element',
                        tag: 'view',
                        content: 'view标签',
                    },
                ]
            },
            {
                node: 'element',
                tag: 'view',
                class: ['a b'],
                content: '父节点',
                child: [
                    {
                        node: 'element',
                        tag: 'img',
                        class: ['a b'],
                        src: '../../img/user_hover.png',
                    },
                    {
                        node: 'element',
                        tag: 'text',
                        class: ['a b'],
                        content: "text标签",
                        child: [
                            {
                                node: 'element',
                                tag: 'text',
                                class: ['a b'],
                                content: "嵌套text标签"
                            }
                        ]
                    },
                    {
                        node: 'element',
                        tag: 'view',
                        content: 'view标签',
                    },
                ]
            }
        ]
    },
    
})
```

渲染的结果
![Alt text](./1479196409259.png)



##功能清单
1. 支持标签嵌套
2. 支持添加class

##注意事项
1. 目前只支持基础节点的添加（view、text、img）
2. 嵌套标签最多只有4层