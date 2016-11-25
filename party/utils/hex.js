function getAbsolutePath(key) {
    if (key.startsWith('http')) {
        return key
    } else {
        return 'http://occ9obkqm.bkt.clouddn.com/' + key
    }
}

module.exports = {
    getAbsolutePath: getAbsolutePath
}