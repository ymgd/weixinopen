function formatStar(num) {
    return num && num.toString().replace(/(?=(?!^)(\d{3})+$)/g, ',')
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}



module.exports = {
    formatStar: formatStar,
    b64EncodeUnicode: b64EncodeUnicode
}