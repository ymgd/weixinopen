const request = require('superagent')

module.exports = (appid, secret, js_code) => {
    return new Promise((resolve, reject) => {
        request
            .get('https://api.weixin.qq.com/sns/jscode2session')
            .query({
                appid,
                secret,
                js_code,
                grant_type: 'authorization_code'
            })
            .end((err, res) => {
                if (err) reject(err)
                res = JSON.parse(res.text)
                if (!!res.errcode) reject(new Error(res.errmsg))
                resolve(res)
            })
    })
}
