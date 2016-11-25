# 微信小程序demo

## 介绍
- 目录结构
  - 程序主体部分由 app.js , app.json , app.wxss 三个文件组成，而且必须放在项目的根目录.
  其中，.js后缀的是脚本文件，.json后缀的文件是配置文件，.wxss后缀的是样式表文件。微信小程序会读取这些文件，并生成小程序实例.
  具体内容参考官网API: https://mp.weixin.qq.com/debug/wxadoc/dev/?t=20161107.
  - 视图层
    - 微信小程序不支持也不兼容HTML，而是微信全新定义的规范，它的视图文件的后缀名为 .wxml ，是基于xml进行的扩展，其样式表文件也并非CSS，而是 .wxss ,兼容受限的部分CSS写法。

    - 创建页面:
      每一个小程序页面是由同路径下同名的四个不同后缀文件的组成，如：index.js、index.wxml、index.wxss、index.json,.js后缀的文件是脚本文件，.json后缀的文件是配置文件，.wxss后缀的是样式表文件，.wxml后缀的文件是页面结构文件。

      视图渲染时，采用了类似单向数据绑定的方式进行数据绑定，WXML 中的动态数据均来自对应 Page 的 data ,使用Mustache语法（双大括号）将变量包起来.


- 文件介绍
    - WXML
    相当于 正常web开发中的html.WXML语言必须包括开始标签和结束标签,所有组件与属性都是小写，以连字符-连接。

    - WXML提供两种文件引入方式，import和include。
    区别在于：import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template。；
    而include就是拷贝一个公用的代码片段到目标文件中，适合做公共页面片的拆分。
    - 微信小程序中的组件 替代了 原html标签.比如:
    `view  ===  div`
    `text  ===  h1 ~ h6  , p , span`
    `navigator     ===  a`

    - 参考:https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/import.html?t=20161107.

    - WXSS
     - 用来决定 WXML 的组件应该怎么显示。相当于css文件.
     - 定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。
     - 有些选择器还不支持 ,比如:link、：visited、：hover.需要自己做测试.

     - 尺寸单位
        - rpx（responsive pixel）: rpx 微信小程序独有的单位 （会根据不同分辨率自适应相应的值）。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
        (建议：开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。
         开发者拿到750的设计稿，直接量取ps中的尺寸，可以直接定义为rpx，不需要进行2倍尺寸的换算。).
     - 微信

     - 样式导入
        - @import后跟需要导入的外联样式表的相对路径，用;表示语句结束.

     - 参考:https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html?t=20161107

    - json
        - 页面配置

    - js
        - 页面逻辑
        - 小程序中的事件机制在工作原理上来讲，和HTML DOM的事件机制一样:
            - 事件分为冒泡事件和非冒泡事件
            - 事件对象:当组件触发事件时，逻辑层绑定该事件的处理函数会收到一个事件对象(包含了事件的名称，事件目标对象信息等等)
            参考:https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html?t=20161107







