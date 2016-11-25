/*
 * wxDefer
 * WeChat API jQuery-like interface
 * 
 * Illvili.me
 * v0.1
 */

var isFunction = _ => 'function' == typeof _

var Deferred = function () {
    var STATE_PENDING  = 'pending',
        STATE_RESOLVED = 'resolved',
        STATE_REJECTED = 'rejected'

    var self = this
    var res = [this]

    // resolve
    var resolve_function_list = [],
        resolve = callback => {
        if (!!callback && isFunction(callback)) {
            resolve_function_list.push(callback)
        }

        if (STATE_RESOLVED == state) {
            var list = resolve_function_list.slice()
            resolve_function_list.length = 0

            for (var i = 0; i < list.length; i++) {
                var cb = list[i]
                cb.call.apply(cb, res)
            }
        }
    }

    // reject
    var reject_function_list = [],
        reject = callback => {
        if (!!callback && isFunction(callback)) {
            reject_function_list.push(callback)
        }

        if (STATE_REJECTED == state) {
            var list = reject_function_list.slice()
            reject_function_list.length = 0

            for (var i = 0; i < list.length; i++) {
                var cb = list[i]
                cb.call.apply(cb, res)
            }
        }
    }

    // _state = pending | resolved | rejected
    var state = STATE_PENDING

    // state()
    this.state = function () {
        return state
    }

    // done(callback)
    this.done = function (callback) {
        resolve(callback)

        return this
    }

    // fail(callback)
    this.fail = function (callback) {
        reject(callback)

        return this
    }

    // always(callback)
    this.always = function (callback) {
        resolve(callback)
        reject(callback)

        return this
    }

    // resolveWith(_thisObj, ...args)
    this.resolveWith = function (...args) {
        if (STATE_PENDING == state) {
            state = STATE_RESOLVED
            res = args
            resolve()
        }
    }
    // resolve(...args)
    this.resolve = function (...args) {
        args.unshift(this)

        this.resolveWith(...args)
    }

    // rejectWith(_thisObj, ...args)
    this.rejectWith = function (...args) {
        if (STATE_PENDING == state) {
            state = STATE_REJECTED
            res = args
            reject()
        }
    }
    // reject(...args)
    this.reject = function (...args) {
        args.unshift(this)
        
        this.rejectWith(...args)
    }

    return this
}

var MakeDeferred = function (wxAPI) {
    return function (config) {
        var defer = new Deferred()

        // transform success -> done
        if (!!config['success']) {
            if (isFunction(config.success)) {
                defer.done(config.success)
            }

            delete(config.success)
        }

        // transform fail -> fail
        if (!!config['fail']) {
            if (isFunction(config.fail)) {
                defer.fail(config.fail)
            }

            delete(config.fail)
        }

        // transform complete -> always
        if (!!config['complete']) {
            if (isFunction(config.complete)) {
                defer.always(config.complete)
            }

            delete(config.complete)
        }

        // register new success and fail
        config.success = function (...args) {
            defer.resolveWith(this, ...args)
        }
        config.fail = function (...args) {
            defer.rejectWith(this, ...args)
        }

        wxAPI.call(wx, config)

        return defer
    }
}

var exportObj = { Deferred, MakeDeferred }
var wxAPIList = [
    // 网络 API 列表
    'request', // 发起网络请求
    'uploadFile', // 上传文件
    'downloadFile', // 下载文件
    'connectSocket', // 创建 WebSocket 连接
    // WebSocket 相关接口均为只接受回调函数
    // 'onSocketOpen', // 监听 WebSocket 打开
    // 'onSocketError', // 监听 WebSocket 错误
    // 'sendSocketMessage', // 发送 WebSocket 消息
    // 'onSocketMessage', // 接受 WebSocket 消息
    // 'closeSocket', // 关闭 WebSocket 连接
    // 'onSocketClose', // 监听 WebSocket 关闭

    // 媒体 API 列表
    'chooseImage', // 从相册选择图片，或者拍照
    'previewImage', // 预览图片
    'startRecord', // 开始录音
    // 'stopRecord', // 结束录音
    'playVoice', // 播放语音
    // 'pauseVoice', // 暂停播放语音
    'stopVoice', // 结束播放语音
    'getBackgroundAudioPlayerState', // 获取音乐播放状态
    'playBackgroundAudio', // 播放音乐
    // 'pauseBackgroundAudio', // 暂停播放音乐
    'seekBackgroundAudio', // 控制音乐播放进度
    // 'stopBackgroundAudio', // 停止播放音乐
    // 'onBackgroundAudioPlay', // 监听音乐开始播放
    // 'onBackgroundAudioPause', // 监听音乐暂停
    // 'onBackgroundAudioStop', // 监听音乐结束
    'chooseVideo', // 从相册选择视频，或者拍摄
    'saveFile', // 保存文件

    // 数据 API 列表
    'getStorage', // 获取本地数据缓存
    'setStorage', // 设置本地数据缓存
    // 'clearStorage', // 清理本地数据缓存

    // 位置 API 列表
    'getLocation', // 获取当前位置
    'openLocation', // 打开内置地图

    // 设备 API 列表
    'getNetworkType', // 获取网络类型
    'getSystemInfo', // 获取系统信息
    // 'onAccelerometerChange', // 监听重力感应数据
    // 'onCompassChange', // 监听罗盘数据

    // 界面 API 列表
    'setNavigationBarTitle', // 设置当前页面标题
    // 'showNavigationBarLoading', // 显示导航条加载动画
    // 'hideNavigationBarLoading', // 隐藏导航条加载动画
    'navigateTo', // 新窗口打开页面
    'redirectTo', // 原窗口打开页面
    // 'navigateBack', // 退回上一个页面
    // 'createAnimation', // 动画
    // 'createContext', // 创建绘图上下文
    // 'drawCanvas', // 绘图
    // 'hideKeyboard', // 隐藏键盘
    // 'stopPullDownRefresh', // 停止下拉刷新动画

    // 开放接口
    'login', // 登录
    'getUserInfo', // 获取用户信息
    'requestPayment' // 发起微信支付
]

for (var api of wxAPIList) {
    exportObj[api] = MakeDeferred(wx[api])
}

module.exports = exportObj
