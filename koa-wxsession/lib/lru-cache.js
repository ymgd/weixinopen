const LRU = require('lru-cache')

module.exports = ttl => {
    const store = LRU({ maxAge: ttl })

    return {
        get(key) {
            return new Promise((resolve, reject) => {
                resolve(store.get(key))
            })
        },
        set(key, value) {
            return new Promise((resolve, reject) => {
                resolve(store.set(key, value))
            })
        }
    }
}
