###这里是liujians\weApp的依赖server
由于weApp的项目不能与server的代码混杂,所以server开在这里
<br/>
关于weApp的内容请访问这里:
<br/>
> [https://github.com/liujians/WeApp](https://github.com/liujians/WeApp "https://github.com/liujians/WeApp")

###项目历程：
- 10月09日——将好友列表，消息记录数据存入server中，从server请求数据，为了方便没有用数据库，只是临时写了JSON，用作示例wx.request请求数据(分为一个get请求,一个post请求)。server 部分为单独一个项目，需要下载跑起来才能运行此项目
- 10月10日——将朋友圈数据和接口加入
- 10月13日——上传和下载接口打通，配合客户端，加入websocket和相关依赖，**需要重新install安装依赖**


###关于使用：
> 没有node的需要先安装node
> 
> 用命令行进入项目根目录下，输入npm install
> 
> 安装依赖成功后，输入npm run dev运行