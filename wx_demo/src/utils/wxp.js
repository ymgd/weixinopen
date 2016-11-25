module.exports = function(api, arg) {
    return new Promise(function(resolve, reject) {
        arg.success = resolve;
        arg.fail = function(res) {
            if (res && res.errMsg) {
                reject(new Error(res.errMsg));
            } else {
                reject(res);
            }
        };
        api.call(wx, arg);
    });
}