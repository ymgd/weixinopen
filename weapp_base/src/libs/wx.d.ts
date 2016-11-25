/**
 * wx模块api
 * 使用{@link .libs/webApp.d.ts}
 */
declare module "wx" {

    import { AppUserInfo } from "data";

    export interface App {
        globalData: {
            userInfo: UserInfo,
            appUserInfo: AppUserInfo,
        };
        getUserInfo(cb: (userInfo: UserInfo) => void);
    }

    export interface NavigateObj {
        url: string;
        success?: () => {};
        fail?: () => {};
        complete?: () => {};
    }

    export interface StorageObj {
        key: string;
        data?: any;
        success?: () => {};
        fail?: () => {};
        complete?: () => {};
    }

    export interface LoginType {
        errMsg?: string,
        code?: string
    }


    export interface UserInfoType {
        /**
         * 用户信息对象，不包含 openid 等敏感信息
         */
        userInfo: Object,
        /**
         *不包括敏感信息的原始数据字符串，用于计算签名。
         */
        rowData: string,
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
         */
        signature: string,
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
         */
        encryptData: string
    }

    export interface Callback<T> {
        success?: (obj?: T) => {};
        fail?: () => {};
        complete?: () => {};
    }

    export interface PaymentObj {
        /**
         * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
         */
        timeStamp: number,
        /**
         * 随机字符串，长度为32个字符以下。
         */
        nonceStr: string,
        /**
         * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
         */
        package: string,
        /**
         * 签名算法，暂支持 MD5
         */
        signType: string,
        /**
         * 签名,具体签名方案参见微信公众号支付帮助文档;
         */
        paySign: string,
        success: () => {},
        fail: () => {},
        complete: () => {}
    }

    /**
     * 微信自己的用户信息
     */
    export interface UserInfo {
        avatarUrl: string,
        city: string,
        /**
         * 性别1男0女
         */
        gender: number,
        nickName: string,
        province: string
    }

    export interface EventTarget {
        dataset: Object;
        id: string;
        offsetLeft: number;
        offsetTop: number;
    }

    export interface EventDetail {
        value: any;
    }

    export interface Event {
        currentTarget: EventTarget;
        target: EventTarget;
        detail: EventDetail;
        timeStamp: number;
        type: string;
    }
}

