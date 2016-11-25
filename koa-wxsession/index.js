const redis = require('./lib/redis')
const lru = require('./lib/lru-cache')
const debug = require('debug')('koa-wxsession')
const getSessionKey = require('./lib/sessionkey')
const sha1 = require('./lib/sha1')

module.exports = wxsession

function wxsession ({
    appID,
    appSecret,
    store,
    prefix = 'wx-session:',
    ttl = 2 * 60 * 60 * 1000,
    redisConfig,
    stateKey = 'wxinfo'
}) {
    store = store || redisConfig ? redis(ttl, redisConfig) : lru(ttl)

    return {
        authorization: async (ctx, next) => {
            const {
                'x-wechat-code': code,
                'x-wechat-data': data,
                'x-wechat-signature': signature
            } = ctx.headers

            if ([code, data, signature].some(v => !v)) {
                debug('header missing')

                ctx.status = 400
                return ctx.body = {
                    msg: 'Header missing'
                }
            }

            debug('code: %s', code)

            try {
                var {openid, session_key} = await getSessionKey(appID, appSecret, code)
                debug('openid: %s, session_key: %s', openid, session_key)
            } catch (e) {
                debug(e.message)
                ctx.status = 400
                return ctx.body = {
                    msg: 'Authentication failed'
                }
            }

            if (sha1(data + session_key) !== signature) {
                debug('signature authentication failed')
                ctx.status = 400
                return ctx.body = {
                    msg: 'Signature authentication failed'
                }
            }

            try {
                const key = prefix + code
                const info = {
                    openid,
                    info: JSON.parse(data)
                }
                await store.set(key, info)
                ctx.state[stateKey] = info
            } catch (e) {
                debug(e.message)
                ctx.status = 500
                return ctx.body = {
                    msg: 'Server Error'
                }
            }
            return next()
        },
        validation: async (ctx, next) => {
            // check session
            const session = ctx.headers['x-wechat-session']
            if (!session) {
                ctx.status = 401
                return ctx.body = {
                    msg: 'Unauthorized'
                }
            }
            const key = prefix + session
            try {
                const ret = await store.get(key)
                if (ret == null) {
                    ctx.status = 401
                    return ctx.body = {
                        msg: 'Session Invalid'
                    }
                }
                ctx.state[stateKey] = ret
            } catch (e) {
                debug(e.message)
                ctx.status = 500
                return ctx.body = {
                    msg: 'Server Error'
                }
            }
            return next()
        }
    }
}
