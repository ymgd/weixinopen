module.exports = {
    codeWaiting(data, f, t){
        var code = data.code
        var t = setInterval(function () {
            var timeCount = data.timeCount - 1
            if (timeCount === 0) {
                clearInterval(t)
                code.get_hidden = ''
                code.resend_hidden = 'hidden'
            }
            
            f({
                timeCount: timeCount,
                code: code
            })
        }, t)
    }
}

