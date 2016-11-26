# we_flappybird
微信小程序-像素鸟游戏

##注意：
微信小程序绘图API中drawImage不支持图片裁剪，其实微信是支持裁剪的只是接口没有实现，可以通过修改WAService.js使其支持裁剪。
修改如下：
``` stata
//修改前
"drawImage" == e ? u.prototype[e] = function(t, n, o, i, a) {
            "devtools" == (0, p.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, p.getRealRoute)(g, t).replace(/.html$/, "")),
            r(i) && r(a) ? data = [t, n, o, i, a] : data = [t, n, o],
            this.actions.push({
                method: e,
                data: data
            })
        }
//修改后
"drawImage" == e ? s.prototype[e] = function(t, n, o, i, a,xx,yy,ww,hh) {
            "devtools" == (0, l.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, l.getRealRoute)(v, t).replace(/.html$/, "")),
            r(xx) && r(yy) ? data = [t, n, o, i, a,xx,yy,ww,hh] :r(i) && r(a) ? data = [t, n, o, i, a] : data = [t, n, o],
            this.actions.push({
                method: e,
                data: data
            })
        }
```
修改后替换两处文件：

 1. 安装目录\package.nw\app\dist\weapp\onlinevendor下的WAService.js
 2. C:\Users\用户名\AppData\Local\微信web开发者工具\User Data\WeappVendor下的WAService.js
 
 修改好的WAService.js文件在refile文件夹中
 
 不支持手机预览
 
 


