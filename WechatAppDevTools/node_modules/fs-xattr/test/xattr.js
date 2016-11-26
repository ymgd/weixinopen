/* eslint-env mocha */

var xattr = require('../')

var fs = require('fs')
var temp = require('fs-temp')
var assert = require('assert')
var crypto = require('crypto')

var attribute0 = 'com.linusu.test'
var attribute1 = 'com.linusu.secondary'
var payload0 = crypto.randomBytes(24).toString('hex')
var payload1 = crypto.randomBytes(24).toString('hex')

describe('xattr#sync', function () {
  var path

  before(function () {
    path = temp.writeFileSync('')
  })

  it('should set an attribute', function () {
    xattr.setSync(path, attribute0, payload0)
    xattr.setSync(path, attribute1, payload1)
  })

  it('should get an attribute', function () {
    var val = xattr.getSync(path, attribute0)
    assert(Buffer.isBuffer(val))
    assert.equal(val, payload0)
  })

  it('should list the attributes', function () {
    var val = xattr.listSync(path)
    assert.ok(~val.indexOf(attribute0))
    assert.ok(~val.indexOf(attribute1))
  })

  it('should remove the attribute', function () {
    xattr.removeSync(path, attribute0)
    xattr.removeSync(path, attribute1)
  })

  it('should give useful errors', function () {
    assert.throws(function () {
      xattr.getSync(path, attribute0)
    }, function (err) {
      assert.equal(err.errno, 93)
      assert.equal(err.code, 'ENOATTR')
      return true
    })
  })

  after(function (done) {
    fs.unlink(path, done)
  })
})

describe('xattr#async', function () {
  var path

  before(function () {
    path = temp.writeFileSync('')
  })

  it('should set an attribute', function (done) {
    xattr.set(path, attribute0, payload0, function (err) {
      assert.ifError(err)
      xattr.set(path, attribute1, payload1, done)
    })
  })

  it('should get an attribute', function (done) {
    xattr.get(path, attribute0, function (err, val) {
      assert.ifError(err)
      assert(Buffer.isBuffer(val))
      assert.equal(val, payload0)
      done()
    })
  })

  it('should list the attributes', function (done) {
    xattr.list(path, function (err, list) {
      assert.ifError(err)
      assert.ok(~list.indexOf(attribute0))
      assert.ok(~list.indexOf(attribute1))
      done()
    })
  })

  it('should remove the attribute', function (done) {
    xattr.remove(path, attribute0, function (err) {
      assert.ifError(err)
      xattr.remove(path, attribute1, done)
    })
  })

  it('should give useful errors', function (done) {
    xattr.get(path, attribute0, function (err, val) {
      assert(err)
      assert.equal(err.errno, 93)
      assert.equal(err.code, 'ENOATTR')
      assert.equal(val, undefined)
      done()
    })
  })

  after(function (done) {
    fs.unlink(path, done)
  })
})

describe('xattr#utf8', function () {
  var path

  before(function () {
    path = temp.template('∞ %s').writeFileSync('')
  })

  it('should set an attribute', function (done) {
    xattr.set(path, attribute0, payload0, done)
  })

  it('should get an attribute', function (done) {
    xattr.get(path, attribute0, function (err, val) {
      assert.ifError(err)
      assert(Buffer.isBuffer(val))
      assert.equal(val, payload0)
      done()
    })
  })

  it('should list the attributes', function (done) {
    xattr.list(path, function (err, list) {
      assert.ifError(err)
      assert.ok(~list.indexOf(attribute0))
      done()
    })
  })

  it('should remove the attribute', function (done) {
    xattr.remove(path, attribute0, done)
  })

  it('should give useful errors', function (done) {
    xattr.get(path, attribute0, function (err, val) {
      assert(err)
      assert.equal(err.errno, 93)
      assert.equal(err.code, 'ENOATTR')
      assert.equal(val, undefined)
      done()
    })
  })

  after(function (done) {
    fs.unlink(path, done)
  })
})
