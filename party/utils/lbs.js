var store = require('./store.js')
var config = require('./config.js')

function getLocation(cb) {
    var location = store.location
    if (location) {
        typeof cb == "function" && cb(location)
        return
    }

    wx.getLocation({
        type: 'gcj02',
        success: function (res) {
            var locationParam = res.latitude + ',' + res.longitude
            var url = 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1'
            fetch(url).then(function (response) {
                response.json().then(function (data) {
                    store.location = data.result
                    typeof cb == "function" && cb(data.result)
                })
            })
        }
    })
}

function getCity(cb) {
    getLocation(function (location) {
        typeof cb == "function" && cb(location.addressComponent.city.replace('市', ''))
    })
}

module.exports = {
    getCity: getCity,
    getLocation: getLocation
}