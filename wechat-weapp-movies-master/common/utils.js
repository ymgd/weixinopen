/**
 * 判断是否为函数
 * @param val
 * @returns {boolean}
 */
function isFunction(val) {
    return typeof val === 'function';
}

/**
 * 字符串转换为数字
 */
function str2int(s) {
    return s.split('').map(function(x) {
        return x - 0;
    }).reduce(function(x, y) {
        return x * 10 + y;
    });
}

function array2str(array) {
    return array.map(String);
}

module.exports.isFunction = isFunction