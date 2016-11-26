# WeApp-VR-Video
微信小程序——vr视频资源推荐

![DEMO效果图1](http://upload-images.jianshu.io/upload_images/999401-d63e3b06ec008364.gif?imageMogr2/auto-orient/strip)

这周，你被微信小程序刷屏了吗？ 反正本猿被刷屏了~~~~本猿最先看到微信小程序相关的文章，应该是冯大辉老师的[「微信公众号来了」](http://mp.weixin.qq.com/s?__biz=MjM5ODIyMTE0MA==&mid=2650968689&idx=1&sn=c27c74226fe4d500ff552abc46b62812&chksm=bd38364a8a4fbf5ca2fd32caa15799a160e90295abc56a1b874d8ce14c85614b32a2cb846291&scene=0#wechat_redirect), 据MAC君透露，这篇文章寥寥几百字，一天内阅读量过百万。。。这是要全猿开发微信小程序的节奏撒！！
本猿表示绝不能落伍，于是趁着周末，开始微信小程序开发之旅！各位猿们，上车咯~


![效果图](http://upload-images.jianshu.io/upload_images/999401-20934066fe145565.gif?imageMogr2/auto-orient/strip)

一言不合就上效果图哈，辣这个demo是肿么做出来的咧？莫急莫急，且听本猿慢慢道来哈~

**环境搭建**
-----------------
开发微信小程序，首先肯定是搭建环境啦，你可以选择根据github上的这个[repo](https://github.com/gavinkwoe/weapp-ide-crack)进行下载安装，也可以下载这个[压缩包](https://pan.baidu.com/s/1o7KJkUm),快速完成安装哈，这个安装包里有如下文件：
![压缩包](http://upload-images.jianshu.io/upload_images/999401-4896d17dd4d28b3e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来的步骤是：
(**Update： 已经不用做下面这三个步骤啦，直接进repo链接下载最新的9.0版,直接安装哈**)

* 安装wechat_web_devtools_0.7.0_x64，并用它跟手机微信实现登录
* 覆盖安装wechat_web_devtools_0.9.092100_x64
* 将weapp-ide-crack-master文件夹中的三个文件，放到安装程序目录对应的地方：
 * 微信web开发者工具\package.nw\app\dist\components\create\createstep.js

 * 微信web开发者工具\package.nw\app\dist\stroes\projectStores.js

 * 微信web开发者工具\package.nw\app\dist\weapp\appservice\asdebug.js

![](http://upload-images.jianshu.io/upload_images/999401-6f05cb2d496c2376.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

做完上述步骤，就可以愉快的打开微信的IDE啦~

![](http://upload-images.jianshu.io/upload_images/999401-d9c946b9f3a04600.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来，就是程序员的惯例：helloworld！

![](http://upload-images.jianshu.io/upload_images/999401-ab2caeaaa8e91758.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
创建项目，填好相关input选项，点击添加项目，搞定！

![](http://upload-images.jianshu.io/upload_images/999401-01cac4dafdc1e100.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

太简单？没错，就是这么简单，哈哈，如果要复杂点，用IDE打开本猿提供的压缩包中的webapp-demo。

![](http://upload-images.jianshu.io/upload_images/999401-ed63c4e8958d991d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

它提供了所有组件和API的使用范例，如下图：

![](http://upload-images.jianshu.io/upload_images/999401-2379a52300cc87b4.gif?imageMogr2/auto-orient/strip)

相信玩过react native的童鞋一定会觉得似曾相识，没错，这个DEMO就像react native官方提供的UIExplorer一样哈！通过这个demo，我们就可以照着做一个DEMO啦。

**代码结构概览分析**
-------------------

搭完环境，就可以愉快的码代码了，我们先来看下刚新建项目的代码结构：
![代码结构](http://upload-images.jianshu.io/upload_images/999401-40a3fcbf56f399f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们先关注根目录下最主要的三个文件：
![](http://upload-images.jianshu.io/upload_images/999401-02d06983cd51ac34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

app.js我们暂时不需要改，首先配置好app.json，要点如下：
* 将你要建立的page路径加到pages配置项上
* 配置window配置项上的标题栏颜色 / 风格 / 内容等
* 配置tabbar配置项上的内容 / icon等
* 设置debug配置项，方便打log

```js
{
  "pages":[
    "pages/index/index",
    "pages/index/view/info-list",
    "pages/index/view/info-detail",
    "pages/logs/logs",
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#4DBBFF",
    "navigationBarTitleText": "微信VR视频资源推荐",
    "navigationBarTextStyle":"white"
  },
  "tabBar": {
    "color": "#dddddd",
    "selectedColor": "#4DBBFF",
    "borderStyle": "white",
    "backgroundColor": "#ffffff",
    "list": [{
      "pagePath": "pages/index/index",
      "iconPath": "image/wechat.png",
      "selectedIconPath": "image/wechatHL_blue.png",
      "text": "首页"
    }, {
      "pagePath": "pages/index/view/info-list",
      "iconPath": "image/wechat.png",
      "selectedIconPath": "image/wechatHL_blue.png",
      "text": "VR列表"
    }]
  },
  "networkTimeout": {
    "request": 10000,
    "connectSocket": 10000,
    "uploadFile": 10000,
    "downloadFile": 10000
  },
  "debug": true
}

```
至于app.wxss, 如果多个页面中的样式有重复，需要复用，可以在app.wxss上写哈~~

接下来就写页面啦，通过app.json,大家可以看出，我总共就三个page而已哈（另外一个自带的，log记录之类的，忽略）
![](http://upload-images.jianshu.io/upload_images/999401-14aafde8ad9bbb34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们先来了解下page的生命周期回调函数：

| 命令           |描述       |
| -------------         |:-------------:    |
|onLoad             |  生命周期函数--监听页面加载  |
|onReady             | 生命周期函数--监听页面渲染完成      |
|onShow             | 生命周期函数--监听页面显示      |
|onHide             | 生命周期函数--监听页面隐藏      |
|onUnload             | 生命周期函数--监听页面卸载      |

在写这三个page时，主要用到了三个组件，第一个是swiper，也就是滑动面板，代码如下：
```js
//index.wxml
<!--Swiper-->
<view  class="section section_gap swiper">
  <swiper style="height: 200px;" indicator-dots="{{indicatorDots}}" vertical="{{vertical}}"
          autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">

      <block wx:for-items="{{swiper_list.data}}">
          <swiper-item>
            <navigator class="swiper_nav" url="view/info-detail?title={{item.article.title}}&id={{item.article._id}}&req_type=swiper" hover-class="navigator-hover">
                <text class="swiper_txt">{{item.article.title}}</text>
                <image class="swiper_img" src="{{item.article.cover}}"></image>
            </navigator>
          </swiper-item>
      </block>

  </swiper>
</view>i

//index.js
get_vr_swiper_info: function() {
  console.log('get_vr_info')
  var swiper_offset =  parseInt( 800 * Math.random() ); 
  var that = this      
  
  wx.request({
    url: API_URL + swiper_offset,

    success: function(response) {
      that.setData({
          swiper_list: response.data.result
      })
    }

  });
}
```
第二个是可滚动视图scrollview,代码如下
```js
//index.wxml
<scroll-view class="widgets" scroll-y="true" style="height: 400px;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}">
    
    <block wx:for-items="{{vr_list.data}}">
        <navigator url="view/info-detail?title={{item.article.title}}&id={{item.article._id}}&req_type=vr_list" hover-class="navigator-hover">
            <view class="widgets__item scroll-view-item">
                <view id="form" class="widgets__info" bindtap="widgetsToggle">
                    <text class="widgets__info-name">{{item.article.title}}</text>
                    <image class="widgets__info-icon" src="resources/kind/form.png" background-size="cover" />
                </view>
                <image class="widgets__info-img" src="{{item.article.cover}}" />
            </view>
        </navigator>
    </block>

</scroll-view>

//index.js
upper: function(e) {
  console.log(e)
},
lower: function(e) {
  console.log(e)
},
scroll: function(e) {
  console.log(e)
},
scrollToTop: function(e) {
  this.setAction({
    scrollTop: 0
  })
},
tap: function(e) {
  for (var i = 0; i < order.length; ++i) {
    if (order[i] === this.data.toView) {
      this.setData({
        toView: order[i + 1],
        scrollTop: (i + 1) * 200
      })
      break
    }
  }
},
tapMove: function(e) {
  this.setData({
    scrollTop: this.data.scrollTop + 10
  })
},

```
第三个是navigator，负责页面间的跳转，代码上面其实也有了，主要就是声明好标签，并写上url路径就行啦。
```js
<navigator url="view/info-detail?id={{item.article._id}}">
</navigator>
```

另外还需要了解三个主要接口：

* wx.request()
* wx.setStorage()
* wx.getStorage()

```js
wx.request({
    url: API_URL + vr_list_offset,
    success: function(response) {
      that.setData({
          vr_list: response.data.result
      })
    }
});
      
wx.setStorage({
  key:"vr_list",
  data:that.data.vr_list
});

wx.getStorage({
    key:'vr_list',
    success:function(res){
        console.log(res.data);
    } 
  });
```
了解完这几个点之后，就可以动手做一个基础的demo啦，祝各位好运撒！

**开发观感**
-----------

1. 本猿之前也玩过react native,据我粗浅的理解，微信小程序的DEMO搭建相对RN会容易些，开发效率更高，但当前的[API文档](http://wxopen.notedown.cn/)太过简陋了，相关的组件描述也太少。

2. IDE有待改进，还木有linux环境，不嗨森！！BTW,强烈建议支持VIM

3. navigator实现page间的跳转，但缺少能跳转并传递对象的方法啊，难道只能通过setStorage()? 还是我没找到？？

4. 组件少了点啊，木有webview，木有iframe~~~

**相关参考**
----------
[微信公众平台 |小程序 API文档](http://wxopen.notedown.cn)

[微信小应用资源汇总整理](https://github.com/Aufree/awesome-wechat-weapp);
