Page({
    data:{
        title:'Load...',
		list:[]
    },
    onLoad(params){
        var latitude,longitude;
        const apiMapUrl ="http://maps.google.cn/maps/api/geocode/json?";
        const _this = this;
		const apiUrl = 'https://api.douban.com/v2/movie/'+params.type;
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                latitude = res.latitude;
                longitude = res.longitude;
                wx.request({
                    url: apiMapUrl, 
                    data: {
                    language:'CN',
                    latlng:latitude+','+longitude
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res.data.results[0].address_components[3].long_name.length);
                        var cityName;
                        cityName = res.data.results[0].address_components[3].long_name;
                        console.log(cityName.substring(0,cityName.length-1));
                        wx.request({
                            url: apiUrl, 
                            data: {
                                city:cityName.substring(0,cityName.length-1)
                            },
                            header: {
                                'Content-Type': 'application/json'
                            },
                            success: function(res) {
                                    _this.setData({
                                        list:res.data.subjects,
                                        title:res.data.title
                                    })
                            }
                        })
                    }
                })
            }
        });
        
			
        
    }
})