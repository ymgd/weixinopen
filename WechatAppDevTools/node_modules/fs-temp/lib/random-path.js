var os = require('os')
var path = require('path')
var crypto = require('crypto')

var tmpPath = os.tmpDir()

function toChars (bytes) {
  return bytes.toString('base64').replace(/=+$/, '').replace(/[+/]/g, '-')
}

function generateName (template, bytes) {
  return template.replace(/%([%s])/g, function ($0, $1) {
    return ($1 === 's' ? toChars(bytes) : $1)
  })
}

function generatePath (template, bytes) {
  return path.join(tmpPath, generateName(template, bytes))
}

function sync (template) {
  return generatePath(template, crypto.randomBytes(8))
}

function async (template, cb) {
  crypto.randomBytes(8, function (err, bytes) {
    if (err) return cb(err)

    cb(null, generatePath(template, bytes))
  })
}

exports.sync = sync
exports.async = async
