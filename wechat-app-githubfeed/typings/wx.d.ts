// Type definitions for wx app
// Definitions by: hellopao <https://github.com/hellopao/wx.d.ts>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/************************************************
*                                               *
*                 微信小程序  API                *
*                                               *
************************************************/

interface IAnimation {
    /**
     * 透明度，参数范围 0~1
     */
    opacity(value: number): IAnimation;
    /**
     * 颜色值
     */
    backgroundColor(color: string): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    width(length: number): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    height(length: number): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    top(length: number): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    left(length: number): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    bottom(length: number): IAnimation;
    /**
     * 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值
     */
    right(length: number): IAnimation;
    /**
     * deg的范围-180~180，从原点顺时针旋转一个deg角度
     */
    rotate(deg: number): IAnimation;
    /**
     * deg的范围-180~180，在X轴旋转一个deg角度
     */
    rotateX(deg: number): IAnimation;
    /**
     * deg的范围-180~180，在Y轴旋转一个deg角度
     */
    rotateY(deg: number): IAnimation;
    /**
     * deg的范围-180~180，在Z轴旋转一个deg角度
     */
    rotateZ(deg: number): IAnimation;
    /**
     * 同transform-function rotate3d
     */
    rotate3d(x: number, y: number, z: number, deg: number): IAnimation;
    /**
     * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
     */
    scale(sx: number, sy?: number): IAnimation;
    /**
     * 在X轴缩放sx倍数
     */
    scaleX(sx: number): IAnimation;
    /**
     * 在Y轴缩放sy倍数
     */
    scaleY(sy: number): IAnimation;
    /**
     * 在Z轴缩放sy倍数
     */
    scaleZ(sz: number): IAnimation;
    /**
     * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
     */
    scale3d(sx: number, sy: number, sz: number): IAnimation;
    /**
     * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
     */
    translate(tx: number, ty?: number): IAnimation;
    /**
     * 在X轴偏移tx，单位px
     */
    translateX(tx: number): IAnimation;
    /**
     * 在Y轴偏移tx，单位px
     */
    translateY(tx: number): IAnimation;
    /**
     * 在Z轴偏移tx，单位px
     */
    translateZ(tx: number): IAnimation;
    /**
     * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
     */
    translate3d(tx: number, ty: number, tz: number): IAnimation;
    /**
     * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
     */
    skew(ax: number, ay?: number): IAnimation;
    /**
     * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
     */
    skewX(ax: number): IAnimation;
    /**
     * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
     */
    skewY(ay: number): IAnimation;
    /**
     * 同transform-function matrix
     */
    matrix(a, b, c, d, tx, ty): IAnimation;
    /**
     * 同transform-function matrix3d
     */
    matrix3d(): IAnimation;
}

interface IContext {
    /**
     * 获取当前context上存储的绘图动作
     */
    getActions(): Array<any>;
    /**
     * 清空当前的存储绘图动作
     */
    clearActions(): void;
    /**
     * 对横纵坐标进行缩放
     */
    scale(scaleWidth: number/**横坐标缩放的倍数1 = 100%，0.5 = 50%，2 = 200%，依次类 */, scaleHeight: number/**	纵坐标轴缩放的倍数1 = 100%，0.5 = 50%，2 = 200%，依次类 */): void;
    /**
     * 对坐标轴进行顺时针旋转
     */
    rotate(deg: number/**degrees * Math.PI/180；degrees范围为0~360;旋转角度，以弧度计 */): void;
    /**
     * 对坐标原点进行缩放
     */
    translate(x: number/**水平坐标平移量 */, y: number/**竖直坐标平移量 */): void;
    /**
     * 保存当前坐标轴的缩放、旋转、平移信息
     */
    save(): void;
    /**
     * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
     */
    restore(): void;
    /**
     * 在给定的矩形区域内，清除画布上的像素
     */
    clearRect(x: number, y: number, width: number, height: number): void;
    /**
     * 在画布上绘制被填充的文本
     */
    fillText(text: string, x: number, y: number): void;
    /**
     * 在画布上绘制图像
     */
    drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;
    /**
     * 对当前路径进行填充
     */
    fill(): void;
    /**
     * 对当前路径进行描边
     */
    stroke(): void;
    /**
     * 开始一个路径
     */
    beginPath(): void;
    /**
     * 关闭一个路径
     */
    closePath(): void;
    /**
     * 把路径移动到画布中的指定点，但不创建线条。
     */
    moveTo(x: number, y: number): void;
    /**
     * 添加一个新点，然后在画布中创建从该点到最后指定点的线条。
     */
    lineTo(x: number, y: number): void;
    /**
     * 添加一个矩形路径到当前路径。
     */
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * 添加一个弧形路径到当前路径，顺时针绘制。
     */
    arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number): void;
    /**
     * 创建二次方贝塞尔曲线
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * 创建三次方贝塞尔曲线
     */
    bezierCurveTo(cpx1: number, cpy1: number, cpx2: number, cpy2: number, x: number, y: number): void;
    /**
     * 设置填充样式
     */
    setFillStyle(color: string): void;
    /**
     * 设置线条样式
     */
    setStrokeStyle(color: string): void;
    /**
     * 设置阴影
     */
    setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;
    /**
     * 设置字体大小
     */
    setFontSize(fontSize: number): void;
    /**
     * 设置线条端点的样式
     */
    setLineCap(lineCap: 'butt' | 'round' | 'square'): void;
    /**
     * 设置两线相交处的样式
     */
    setLineJoin(lineJoin: 'bevel' | 'round' | 'miter'): void;
    /**
     * 设置线条宽度
     */
    setLineWidth(lineWidth: number): void;
    /**
     * 设置最大倾斜
     */
    setMiterLimit(miterLimit: number): void;
}

declare var wx: {


    // # 网络 API 列表： #

    /**
     * 发起网络请求
     */
    request(obj: {
        /**
         * 开发者服务器接口地址
         */
        url: string;
        /**
         * 请求的参数
         */
        data?: any | string;
        /**
         * 设置请求的 header , header 中不能设置 Referer
         */
        header?: any;
        /**
         * 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         */
        method?: string;
        /**
         * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 上传文件
     */
    uploadFile(obj: {
        /**
         * 开发者服务器 url
         */
        url: string;
        /**
         * 要上传文件资源的路径
         */
        filePath: string;
        /**
         * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
         */
        name: string;
        /**
         * HTTP 请求 Header , header 中不能设置 Referer
         */
        header?: any;
        /**
         * HTTP 请求中其他额外的 form data
         */
        formData?: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 下载文件
     */
    downloadFile(obj: {
        /**
         * 下载资源的 url
         */
        url: string;
        /**
         * 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
         */
        type?: string;
        /**
         * HTTP 请求 Header
         */
        header?: any;
        /**
         * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 创建 WebSocket 连接
     */
    connectSocket(obj: {
        /**
         * 开发者服务器接口地址，必须是 HTTPS 协议，且域名必须是后台配置的合法域名
         */
        url: string;
        /**
         * 请求的数据
         */
        data?: any;
        /**
         * HTTP Header , header 中不能设置 Referer
         */
        header?: any;
        /**
         * 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         */
        method?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 监听 WebSocket 打开
     */
    onSocketOpen(callback: (res: any) => void): void;

    /**
     * 监听 WebSocket 错误
     */
    onSocketError(callback: (res: any) => void): void;

    /**
     * 发送 WebSocket 消息
     */
    sendSocketMessage(obj: {
        /**
         * 需要发送的内容
         */
        data: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 接受 WebSocket 消息
     */
    onSocketMessage(callback: (res: {
		/**
		 * 服务器返回的消息
		 */
        data: string;
    }) => void): void;

    /**
     * 关闭 WebSocket 连接
     */
    closeSocket(): void;

    /**
     * 监听 WebSocket 关闭
     */
    onSocketClose(callback: (res: any) => void): void;

    // # 媒体 API 列表： #

    /**
     * 从相册选择图片，或者拍照
     */
    chooseImage(obj: {
        /**
         * 最多可以选择的图片张数，默认9
         */
        count?: number;
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        sizeType?: string[];
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        sourceType?: string[];
        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths
         */
        success: (res: {
			/**
			 * 选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
			 */
            tempFilePaths: string;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 预览图片
     */
    previewImage(obj: {
        /**
         * 当前显示图片的链接，不填则默认为 urls 的第一张
         */
        current?: string;
        /**
         * 需要预览的图片链接列表
         */
        urls: string[];
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 开始录音
     */
    startRecord(obj: {
        /**
         * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
         */
        success: (res: {
			/**
			 * 录音文件的临时路径片
			 */
            tempFilePath: string;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 结束录音
     */
    stopRecord(): void;

    /**
     * 播放语音
     */
    playVoice(obj: {
        /**
         * 需要播放的语音文件的文件路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 暂停播放语音
     */
    pauseVoice(): void;

    /**
     * 结束播放语音
     */
    stopVoice(): void;

    /**
     * 获取音乐播放状态
     */
    getBackgroundAudioPlayerState(obj: {
        /**
         * 接口调用成功的回调函数
         */
        success?: (res: {
			/**
			 * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
			 */
            duration: number;
			/**
			 * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回 
			 */
            currentPosition: number;
			/**
			 * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
			 */
            status: 0 | 1 | 2;
			/**
			 * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
			 */
            downloadPercent: number;
			/**
			 * 歌曲数据链接，只有在当前有音乐播放时返回
			 */
            dataUrl: string;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 播放音乐
     */
    playBackgroundAudio(obj: {
        /**
         * 音乐链接
         */
        dataUrl: string;
        /**
         * 音乐标题
         */
        title?: string;
        /**
         * 封面URL
         */
        coverImgUrl?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 暂停播放音乐
     */
    pauseBackgroundAudio(): void;

    /**
     * 控制音乐播放进度
     */
    seekBackgroundAudio(obj: {
        /**
         * 音乐位置，单位：秒
         */
        position: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 停止播放音乐
     */
    stopBackgroundAudio(): void;

    /**
     * 监听音乐开始播放
     */
    onBackgroundAudioPlay(callback: Function): void;

    /**
     * 监听音乐暂停
     */
    onBackgroundAudioPause(callback: Function): void;

    /**
     * 监听音乐结束
     */
    onBackgroundAudioStop(callback: Function): void;

    /**
     * 从相册选择视频，或者拍摄
     */
    chooseVideo(obj: {
        /**
         * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
         */
        sourceType?: string[];
        /**
         * 拍摄视频最长拍摄时间，单位秒。最长支持60秒
         */
        maxDuration?: number;
        /**
         * 前置或者后置摄像头，默认为前后都有，即：['front', 'back']
         */
        camera?: string[];
        /**
         * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
         */
        success?: (res: {
			/**
			 * 选定视频的临时文件路径
			 */
            tempFilePath: string;
			/**
			 * 选定视频的时间长度
			 */
            duration: number;
			/**
			 * 选定视频的数据量大小
			 */
            size: number;
			/**
			 * 返回选定视频的长
			 */
            height: number;
			/**
			 * 返回选定视频的宽
			 */
            width: number;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 保存文件
     */
    saveFile(obj: {
        /**
         * 需要保存的文件的临时路径
         */
        tempFilePath: string;
        /**
         * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
         */
        success?: (res: {
			/**
			 * 文件的保存路径
			 */
            savedFilePath: string;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    // # 数据 API 列表： #

    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
     */
    setStorage(obj: {
        /**
         * 本地缓存中的指定的 key
         */
        key: string;
        /**
         * 需要存储的内容
         */
        data: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     */
    setStorageSync(key: string, data: any, ): void;

    /**
     * 从本地缓存中异步获取指定 key 对应的内容。
     */
    getStorage(obj: {
        /**
         * 本地缓存中的指定的 key
         */
        key: string;
        /**
         * 接口调用的回调函数,res = {data: key对应的内容}
         */
        success: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     */
    getStorageSync(key: string): void;

    /**
     * 清理本地数据缓存。
     */
    clearStorage(): void;

    /**
     * 同步清理本地数据缓存
     */
    clearStorageSync(): void;

    // # 位置 API 列表： #

    /**
     * 获取当前位置
     */
    getLocation(obj: {
        /**
         * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
         */
        type?: string;
        /**
         * 接口调用成功的回调函数，返回内容详见返回参数说明。
         */
        success: (res: {
            /**
             * 纬度，浮点数，范围为-90~90，负数表示南纬
             */
            latitude: number;	
            /**
             * 经度，浮点数，范围为-180~180，负数表示西经
             */
            longitude: number;	
            /**
             * 速度，浮点数，单位m/s
             */
            speed: number;	
            /**
             * 位置的精确度
             */
            accuracy: number;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 打开内置地图
     */
    openLocation(obj: {
        /**
         * 纬度，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number;
        /**
         * 缩放比例，范围1~28，默认为28
         */
        scale?: number;
        /**
         * 位置名
         */
        name?: string;
        /**
         * 地址的详细说明
         */
        address?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    // # 设备 API 列表： #

    /**
     * 获取网络类型
     */
    getNetworkType(obj: {
        /**
         * 接口调用成功，返回网络类型 networkType
         */
        success: (res: {
            /**
             * 网络类型 
             */
            networkType: "2g"| "3g"| "4g"| "wifi";
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 获取系统信息
     */
    getSystemInfo(obj: {
        /**
         * 接口调用成功的回调
         */
        success: (res: {
            /**
             * 手机型号
             */
            model: string;	
            /**
             * 设备像素比
             */
            pixelRatio: number;	
            /**
             * 窗口宽度
             */
            windowWidth: number;	
            /**
             * 窗口高度
             */
            windowHeight: number;	
            /**
             * 微信设置的语言
             */
            language: string;	
            /**
             * 微信版本号
             */
            version: string;
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 监听重力感应数据
     */
    onAccelerometerChange(callback: (
        res: {
            /**
             * X轴
             */
            x: number;
            /**
             * Y轴
             */
            y: number;
            /**
             * Z轴
             */
            z: number;
        }
    ) => void): void;

    /**
     * 监听罗盘数据
     */
    onCompassChange(callback: (res: {
        /**
         * 面对的方向度数
         */
        direction: number;
    }) =>void): void;

    // # 界面 API 列表： #

    /**
     * 设置当前页面标题
     */
    setNavigationBarTitle(obj: {
        /**
         * 页面标题
         */
        title?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 显示导航条加载动画
     */
    showNavigationBarLoading(): void;

    /**
     * 隐藏导航条加载动画
     */
    hideNavigationBarLoading(): void;

    /**
     * 新窗口打开页面
     */
    navigateTo(obj: {
        /**
         * 需要跳转的应用内页面的路径
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 原窗口打开页面
     */
    redirectTo(obj: {
        /**
         * 需要跳转的应用内页面的路径
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 退回上一个页面
     */
    navigateBack(): void;

    /**
     * 动画
     */
    createAnimation(obj: {
        /**
         * 动画持续时间，单位ms，默认值 400
         */
        duration?: number;
        /**
         * 定义动画的效果，默认值"linear"，有效值："linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
         */
        timingFunction?: string;
        /**
         * 动画持续时间，单位 ms，默认值 0
         */
        delay?: number;
        /**
         * 设置transform-origin，默认为"50% 50% 0"
         */
        transformOrigin?: string;
    }): IAnimation;

    /**
     * 创建绘图上下文
     */
    createContext(): IContext;

    /**
     * 绘图
     */
    drawCanvas(obj: {
        /**
         * 画布标识，传入 <canvas/> 的 cavas-id
         */
        canvasId: string;
        /**
         * 绘图动作数组，由 wx.createContext 创建的 context，调用 getActions 方法导出绘图动作数组。
         */
        actions: Array<any>;
    }): void;

    /**
     * 隐藏键盘
     */
    hideKeyboard(): void;

    /**
     * 停止下拉刷新动画
     */
    stopPullDownRefresh(): void;

    // # 开放接口： #

    /**
     * 登录
     */
    login(obj: {
        /**
         * 接口调用成功的回调函数
         */
        success?: (res: { code?: string; errMsg?: string }) => void;    
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function
    }): void;

    /**
     * 获取用户信息
     */
    getUserInfo(obj: {
        /**
         * 接口调用成功的回调函数
         */
        success?: (res: {
            /**
             * 用户信息对象，不包含 openid 等敏感信息
             */
            userInfo: {
                /**
                 * 昵称
                 */
                nickName: string;
                /**
                 * 性别， 0：未知、1：男、2：女 
                 */
                gender: 0 | 1 | 2;
                /**
                 * 城市
                 */
                city: string;
                /**
                 * 省份
                 */
                province: string;
                /**
                 * 国家
                 */
                country: string;
                /**
                 * 头像地址
                 */
                avatarUrl: string;
            };
            /**
             * 不包括敏感信息的原始数据字符串，用于计算签名。
             */
            rawData: string; 
            /**
             * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
             */
            signature: string; 
            /**
             * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
             */
            encryptData: string;  
        }) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

    /**
     * 发起微信支付
     */
    requestPayment(obj: {
        /**
         * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
         */
        timeStamp: number;
        /**
         * 随机字符串，长度为32个字符以下。
         */
        nonceStr: string;
        /**
         * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
         */
        package: string;
        /**
         * 签名算法，暂支持 MD5
         */
        signType: string;
        /**
         * 签名,具体签名方案参见微信公众号支付帮助文档;
         */
        paySign: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: Function;
        /**
         * 接口调用失败的回调函数
         */
        fail?: Function;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: Function;
    }): void;

}

interface Application {
    setData: (obj: any) => void;
    getCurrentPage: () => Page;
}

interface AppConstructor {
    new (): Application;
    (opts: {
        /**
         * 生命周期函数--监听小程序初始化
         */
        onLaunch?: () => void;
        /**
         * 生命周期函数--监听小程序显示
         */
        onShow?: () => void;
        /**
         * 生命周期函数--监听小程序隐藏
         */
        onHide?: () => void;
    }): Application;
}

declare var App: AppConstructor;
declare function getApp(): Application;

interface Page {
    setData: (obj: any) => void;
}

interface PageConstructor {
    new (): Page;
    (opts: {
        /**
         * 页面的初始数据
         */
        data?: any;
        /**
         * 页面的初始数据
         */
        onLoad?: () => void;
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady?: () => void;
        /**
         * 生命周期函数--监听页面显示
         */
        onShow?: () => void;
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide?: () => void;
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload?: () => void;
        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefreash?: () => void;
    }): Page;
}

declare var Page: PageConstructor;