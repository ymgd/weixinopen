#WechatAppSessionBundle


[WechatAppSessionBundle][2] 是一个用于处理微信小程序的 Symfony Bundle，实现思路参照了腾讯云官方-微信小程序云端解决方案中的 [会话管理场景][1]，即这个 Bundle 是其 PHP(Symfony) 版本的一种实现。(只是不知道有多少使用 Symfony 的童鞋😂)


>微信的定位并不是 HTML5，这里很多人都有误解。在一些实现上，并不能想当然地用 HTML5 的思路来思考。比如，微信的请求接口 `wx.request` 并不支持 cookie 传递，所以会话层不能使用传统的 Session 方式。 ——腾讯云官方的微信小程序云端解决方案

该 Bundle 包含的功能：

 - 针对特定的控制器获取微信用户信息并校验合法性
 - 将用户信息缓存到 Redis
 - 将用户信息设置到 `Symfony/Component/HttpFoundation/Request` 对象中

#安装和配置

## 第一步：使用 composer 安装 Bundle
```bash
composer require wechat-app/session-bundle
```

## 第二步：启用 Bundle
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Sensio\Bundle\BuzzBundle\SensioBuzzBundle(),
        new Snc\RedisBundle\SncRedisBundle(),
        new WechatApp\SessionBundle\WechatAppSessionBundle(),
        // ...
    );
}
```

## 第三步：配置依赖 Bundle

 - [snc/redis-bundle][3] 处理Redis操作的部分（配置）
 - [sensio/buzz-bundle][4] 处理 HTTP 请求的部分（可不配置）

相关依赖的深入配置，请参考其对应的文档。


## 第四步：配置
```yaml
# app/config/config.yml
snc_redis:
    clients:
        default:
            type: predis
            alias: default
            dsn: "redis://passwd@localhost"

wechat_app_session:
    app_id:     "wx66666"   # 小程序的app id
    app_secret: "wx*****"   # 小程序的app secret
    key_prefix: "wx-user:"  # Redis中，用户信息的key前缀
    expires_in: 7200        # 会话过期时间（单位：秒），非必须，默认7200
```

## 第五步：使用
在安装和配置完成之后，Bundle 的功能马上就可以投入使用了，该 Bundle 只会对实现了 `WechatApp/SessionBundle/Controller/SessionAuthController` 接口的控制器生效，对其他不是用于处理小程序请求的接口不会有影响。

**处理流程请参照腾讯云提供的[官方文档][5]。**

下面举个例子：
```php
// src/DemoBundle/Controller/DemoController.php
namespace DemoBundle\Controller;

use AppBundle\Controller\BaseController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use WechatApp\SessionBundle\Controller\SessionAuthController;

/**
 * @Route("/demo")
 */
class DemoController extends Controller implements SessionAuthController
{
    /**
     * @Route("/test")
     */
    public function testAction(Request $request) 
    {
        // 从 Request 的 header 的属性中获取当前请求的微信用户信息
        $wxUser = $request->attributes->get('wx_user');
        return $this->json($wxUser);
    }
}
```
访问上面 action 对应的路由，将返回一个包含用户信息 json，大致是：
```json
{
  "nickName": "MJ",
  "gender": 1,
  "language": "zh_CN",
  "city": "Zhuhai",
  "province": "Guangdong",
  "country": "CN",
  "avatarUrl": "头像URL",
  "openId": "owVxxxxxxxxxxx"
}
```
此时登入到 Redis 中：
```redis
keys *
1) "wx-user:session:xxxxxxxxxxx"
2) "wx-user:code:owVxxxxxxxxxxx"
```
- `wx-user:code:***` 维护用户 openid 对应的 session
- `wx-user:session:***` 保存着对应于前者的用户信息

以上两个 key 都设置了过期时间，默认为7200秒。

以上是后端接口部分的使用，小程序端的部分相对来说比较简单。

 - 在首次获取用户信息的时候，需要调用 `wx.login` 和 `wx.getUserInfo` 接口，把获取到的 `code`、`rawData` 和 `signature` 一同设置到 `wx.request` 接口的 `header` 中，设置时，有特定的名称，分别是 `X-WX-Code`、`X-WX-RawData` 和 `X-WX-Signature`
 - 如接口非正常返回的信息，请参照腾讯云提供的[官方文档][5]

该 Bundle 暂时没有提供小程序端的部分，小程序端的实现可以参考上面的说明去自行实现，或借鉴腾讯云官方提供的一个[实现方式][6]，记住，是借鉴而不是照搬，因为这个 Bundle 并非是为了搭配腾讯云提供的实现方案的，另外要注意的是，其小程序端的实现方式只实现了 `wx.request` 接口的包装，而关于文件上传、WebSocket 的实现都还没有包装，使用时还是需要考虑自己完善其他请求的包装。


  [1]: https://www.qcloud.com/doc/product/448/6424
  [2]: https://github.com/jwma/WechatAppSessionBundle
  [3]: https://packagist.org/packages/snc/redis-bundle
  [4]: https://packagist.org/packages/sensio/buzz-bundle
  [5]: https://www.qcloud.com/doc/product/448/6424
  [6]: https://github.com/CFETeam/weapp-session-client