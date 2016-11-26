function formatTime(time, format) {
    let temp = '0000000000' + time
    let len = format.length
    return temp.substr(-len)
}

//获取当前位置坐标
function getLocation(callback) {
    wx.getLocation({
        success: function (res) {
            callback(true, res.latitude, res.longitude);
        },
        fail: function () {
            callback(false);
        }
    })
}

//Reverse Geocoding 根据经纬度获取城市名称
function getCityName(latitude, longitude, callback) {
    var apiURL = "http://restapi.amap.com/v3/geocode/regeo?output=json&location=" + longitude + "," + latitude + "&key=99bdebb8ac77192c48c6956aa582e0c4";

    wx.request({
        url: apiURL,
        success: function (res) {
            var address = res.data.regeocode.addressComponent;
            var city = address.province + address.city;
            callback(city);
        }
    });
}

//获取指定位置的天气信息
function getWeatherByLocation(latitude, longitude, callback) {
    var apiKey = "51f8c2db8162b686a41cc356395399cc";
    var apiURL = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?lang=zh&units=ca";

    wx.request({
        url: apiURL,
        success: function (res) {
            var weatherData = parseWeatherData(res.data);
            getCityName(latitude, longitude, function (city) {
                weatherData.city = city;
                callback(weatherData);
            });
        }
    });
}

//解析天气数据
function parseWeatherData(data) {
    var weather = {};
    weather["current"] = data.currently;
    weather["summary"] = data.daily.summary;

    return weather;
}

//加载天气数据
function requestWeatherData(cb) {
    getLocation(function (success, latitude, longitude) {
        //如果 GPS 信息获取不成功， 设置一个默认坐标
        if (success == false) {
            latitude = 39.90403;
            longitude = 116.407526;
        }

        //请求天气数据 API
        getWeatherByLocation(latitude, longitude, function (weatherData) {
            cb(weatherData);
        });
    });
}

function loadWeatherData(callback) {

    requestWeatherData(function(data){
        //对原始数据做一些修整， 然后输出给前端
        var weatherData = {};
        data.current.temperature = parseInt(data.current.temperature) + '';

        weatherData = {
            city: data.city,
            curSummary: data.current.summary,
            temperature: data.current.temperature,
            weekSummary: data.summary
        };

        callback(weatherData);
    });
}


module.exports = {
    formatTime: formatTime,
    loadWeatherData: loadWeatherData
}