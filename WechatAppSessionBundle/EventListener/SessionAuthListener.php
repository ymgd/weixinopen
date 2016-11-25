<?php

namespace WechatApp\SessionBundle\EventListener;


use Buzz\Browser;
use Predis\Client;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use WechatApp\SessionBundle\Exception\SessionAuthException;
use WechatApp\SessionBundle\Controller\SessionAuthController;

class SessionAuthListener
{
    /**
     * @var Client
     */
    protected $redis;

    /**
     * @var Browser
     */
    protected $browser;

    /**
     * @var string
     */
    protected $appId;

    /**
     * @var string
     */
    protected $appSecret;

    /**
     * @var string
     */
    protected $keyPrefix;

    /**
     * @var integer
     */
    protected $expiresIn;

    const USER_IN_REQUEST_KEY = 'wx_user';

    /**
     * 会话过期
     */
    const ERR_SESSION_EXPIRED = 'ERR_SESSION_EXPIRED';

    /**
     * 换取 session key 失败
     */
    const ERR_SESSION_KEY_EXCHANGE_FAILED = 'ERR_SESSION_KEY_EXCHANGE_FAILED';

    /**
     * 不可信的 raw data
     */
    const ERR_UNTRUSTED_RAW_DATA = 'ERR_UNTRUSTED_RAW_DATA';

    /**
     * WXSessionAuthListener constructor.
     * @param Client $redis
     * @param Browser $browser
     * @param $appId
     * @param $appSecret
     * @param $keyPrefix
     * @param $expiresIn
     */
    public function __construct(Client $redis, Browser $browser, $appId, $appSecret, $keyPrefix, $expiresIn)
    {
        $this->redis = $redis;
        $this->browser = $browser;
        $this->appId = $appId;
        $this->appSecret = $appSecret;
        $this->keyPrefix = $keyPrefix;
        $this->expiresIn = $expiresIn;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        if (!is_array($controller)) {
            return;
        }

        if ($controller[0] instanceof SessionAuthController) {
            $request = $event->getRequest();

            $jsCode = $request->headers->get('X-WX-Code');
            $rawData = $request->headers->get('X-WX-RawData');
            $signature = $request->headers->get('X-WX-Signature');

            if (is_null($jsCode)) {
                // 没有传递 code
                throw new SessionAuthException('missing `code`');
            }

            // 只传递了 `code`
            if (is_null($rawData)) {
                $userInfo = $this->redis->get($this->keyPrefix . 'session:' . $jsCode);

                if (!$userInfo) {
                    // jsCode没有对应的用户信息
                    throw new SessionAuthException(self::ERR_SESSION_EXPIRED);
                }

                $request->attributes->set(self::USER_IN_REQUEST_KEY, json_decode($userInfo, true));
                return;
            }

            // 尝试使用传递过来的 `code` 换 `session_key`和 `openid`
            $jsCode2SessionResult = $this->jsCode2Session($jsCode);
            if (isset($jsCode2SessionResult['errcode'])) {
                throw new SessionAuthException(self::ERR_SESSION_KEY_EXCHANGE_FAILED);
            }

            $openId = $jsCode2SessionResult['openid'];
            $sessionKey = $jsCode2SessionResult['session_key'];
            // $expiresIn = $jsCode2SessionResult['expires_in']; // 官方提供的过期时间

            $userInfoStr = urldecode($rawData);
            if (sha1($userInfoStr . $sessionKey) != $signature) {
                throw new SessionAuthException(self::ERR_UNTRUSTED_RAW_DATA);
            }

            $userInfo = json_decode($userInfoStr, true);
            $userInfo['openId'] = $openId;

            $sk = $this->keyPrefix . 'code:' . $openId;

            $oldCode = $this->redis->get($sk);
            if ($oldCode) {
                $this->redis->del([$this->keyPrefix . 'session:' . $oldCode]);
            }

            $this->redis->setex($sk, $this->expiresIn, $jsCode);
            $this->redis->setex($this->keyPrefix . 'session:' . $jsCode, $this->expiresIn, json_encode($userInfo));
            $request->attributes->set(self::USER_IN_REQUEST_KEY, $userInfo);
        }
    }

    /**
     * code 换取 session_key
     * 文档地址：https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html
     *
     * @param $jsCode
     * @return mixed
     */
    private function jsCode2Session($jsCode)
    {
        $jsCode2SessionUrl = sprintf('https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
            $this->appId, $this->appSecret, $jsCode);

        $response = $this->browser->get($jsCode2SessionUrl);
        $content = $response->getContent();

        return json_decode($content, true);
    }
}