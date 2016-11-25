const hash = require('crypto').createHash('sha1')

module.exports = str => hash.update(str).digest('hex')
