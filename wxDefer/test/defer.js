var wxDefer = require('../wxDefer')

console.log(wxDefer)

var defer = new wxDefer.Deferred()
console.log(defer)
console.log(defer.state())

defer.done(function (data) {
    console.info('done', data)
}).fail(function (data) {
    console.info('fail', data)
}).always(function (data) {
    console.info('always', data)
    console.log(this)

    defer.done(_ => console.log('in always', 'done', _))
    defer.fail(_ => console.log('in always', 'fail', _))
})

defer.resolve(['test data', 1])
