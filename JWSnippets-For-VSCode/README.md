### 引言
---
专为**VSCode&Wing**开发微信小程序编写的Snippet。联系作者，欢迎提供完善代码段。
 (已完美适配Wing，安装使用方法一样，Wing编译器基于VSCode开源框架)

### 支持IDE
---
> VScode、Wing 3.2以上

### 版本更新
---
| 时间 | 版本号 | 更新内容 |
|--------|------------|---------------|
| 2016.09.29 | 0.0.3 | 新增js->jw - app (App实例)|
|  |  | 新增js->jw - wx.hideKeyboard (收起键盘)|
|  |  | 新增js->jw - wx.stopPullDownRefresh (停止当前页面下拉刷新)|
| 2016.09.27 | 0.0.2 | 新增js.json(强化说明注释) |
|  |  | 完善html.json |
| 2016.09.25 | 0.0.1 | 新增html.json |

### 程序演示
---
![demo.gif](http://upload-images.jianshu.io/upload_images/2961518-46a377f66c376592.gif?imageMogr2/auto-orient/strip)
![demo-api.gif](http://upload-images.jianshu.io/upload_images/2961518-9c346db076eb73fc.gif?imageMogr2/auto-orient/strip)

### 安装使用
---
**1.将json文件放入IDE的sinppets目录：**

`VSCode：·`
- Windows版本：C:\Users\用户名\AppData\Roaming\Code\User\snippets
- Mac版本：/Users/用户名/Library/Application Support/Code/User/snippets

`Wing：`
- Windows版本：C:\Users\用户名\AppData\Roaming\EgretWing\User\snippets
- Mac版本：/Users/用户名/Library/Application Support/EgretWing/User/snippets


> 如果找不到上述目录，可以打开IDE菜单->首选项->用户代码片段，分别选择Javasript、HTML(或者WXML)，将下载的文件代码手动copy进去，保存即可。

**2.打开IDE菜单->首选项->用户设置，在settings.json加入以下代码：**

`VSCode：`
```
"files.associations": { "*.wxml": "html", "*.wxss": "css"}
```

`Wing：`
```
"files.associations": { "*.wxss": "css"}
```

**3.为防止和其他命令冲突，本sinppet触发命令以'jw'开头。**

### 命令说明：
---
- 组件命令和API命令分别关联wxml和wxss文件，不用担心触发命令会冲突

### 组件命令列表：
---

组件命令 | 命令说明 | 组件命令 | 命令说明
---|---|---|---
jwview | 创建view组件 | jwradio-group | 创建radio-group组件
jwscroll-view | 创建组件 | jwradio | 创建radio组件
jwswiper | 创建swiper组件 | jwslider | 创建slider组件
jwicon | 创建icon组件 | jwswitch | 创建switch组件
jwtext | 创建text组件 | jwaction-sheet | 创建action-sheet组件
jwprogress | 创建progress组件 | jwmodal | 创建modal组件
jwbutton | 创建button组件 | jwtoast | 创建toast组件
jwcheckbox-group | 创建checkbox-group组件 | jwloading | 创建loading组件
jwcheckbox| 创建checkbox组件 | jwnavigator | 创建navigator组件
jwform | 创建form组件 | jwaudio | 创建audio组件
jwinput | 创建input组件 | jwimage | 创建image组件
jwlabel | 创建label组件 | jwvideo | 创建video组件
jwpicker-selector | 创建picker-selector组件 | jwmap | 创建map组件
jwpicker-time | 创建picker-time组件 | jwcanvas | 创建canvas组件
jwpicker-date | 创建picker-date组件

其他命令 | 命令说明 | 其他命令 | 命令说明
---|---|---|---
jwtemplate | 创建template模板 | jwimport wxml | import wxml文件
jwtemplate is | 创建template组件 | jwinclude wxml | include wxml文件

### API命令列表：
---

API命令 | 命令说明 | API命令 | API说明
---|---|---|---
jwwxrequst | 创建wx.request API 网络-发起请求 | jwwxclearStorage | 创建wx.clearStorage API(异步) 数据-缓存
jwwxuploadFile | 创建wx.uploadFile API 网络-上传 | jwwxclearStorageSync | 创建wx.clearStorageSync API(同步) 数据-缓存
jwwxdownloadFile | 创建wx.downloadFile API 网络-下载 | jwwxgetLocation | 创建wx.getLocation API 位置-获取
jwwxwebSocket | 创建wx.webSocket API(全局唯一) 网络 | jwwxopenLocation | 创建wx.openLocation API 位置-查看
jwwxchooseImage | 创建wx.chooseImage API 媒体-图片| jwwxgetNetworkType | 创建wx.getNetworkType API 设置-网络状态
jwwxpreviewImage | 创建wx.previewImage API 媒体-图片 | jwwxgetSystemInfo | 创建wx.getSystemInfo API 设置-系统信息
jwwxrecord | 创建wx.start&stop Record API 媒体-录音 | jwwxonAccelerometerChange | 创建wx.onAccelerometerChange API 设置-重力感应
jwwxvoice | 创建wx.play&pause&stop Vioce API 媒体-音频播放控制 | jwwxonCompassChange | 创建wx.onCompassChange API 设置-罗盘
jwwxaudio| 创建wx.get&play&pause&seek&stop Audio API 媒体-音乐播放控制 | jwwxsetNavigationBarTitle | 创建wx.setNavigationBarTitle API 界面-导航条
jwwxsaveFile | 创建wx.saveFile API 媒体-文件 | jwwxnavigateTo | 创建wx.navigateTo API 界面-导航
jwwxchooseVideo | 创建wx.chooseVideo API 媒体-视频 | jwwxredirectTo | 创建wx.redirectTo API 界面-导航
jwwxsetStorage | 创建wx.setStorage API(异步) 数据-缓存 | jwwxnavigateBack | 创建wx.navigateBack API 界面-导航
jwwxsetStorageSync | 创建wx.setStorageSync API(同步) 数据-缓存 | jwwxlogin | 创建wx.login API 登录
jwwxgetStorage | 创建wx.getStorage API(异步) 数据-缓存| jwwxgetUserInfo | 创建wx.getUserInfo API 用户信息
jwwxgetStorageSync | 创建wx.getStorageSync API(同步) 数据-缓存 | jwwxrequestPayment | 创建wx.requestPayment API 微信支付
jwwxhideKeyboard | 创建wx.hideKeyboard API 界面-键盘 | jwwxstopPullDownRefresh | 创建wx.stopPullDownRefresh API 界面-刷新

其他命令 | 命令说明 | 其他命令 | 命令说明
---|---|---|---
jwapp | 创建App实例 | jwarray | 创建数组
jwpage | 创建Page实例 | jwlog | 日志输出
jwfunction | 创建普通方法 | jwsetData | 同步视图层数据
jwevent | 创建事件方法 |  | 

### 作者相关：
---
- 简书：http://www.jianshu.com/users/bbeb5d67076e
- GitHub：https://github.com/johnwang77/JWSnippets-For-VSCode