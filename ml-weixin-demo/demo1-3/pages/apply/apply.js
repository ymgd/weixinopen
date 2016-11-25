// swiper.js

var pageObj = {
    data: {
        indicatorDots: false,
        autoplay: true,
        duration: 500,
        interval: 2000,
        bannerUrls: [
            { id: 1, img: "/img/head_small.png" },
            { id: 2, img: "/img/head_dai.jpg" },
            { id: 3, img: "/img/head_small.png" },
            { id: 4, img: "/img/head_dai.jpg" }
        ]
    },
    changeIndicatorDots: function( e ) {
        this.setData( {
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function( e ) {
        this.setData( {
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function( e ) {
        this.setData( {
            interval: e.detail.value
        })
    },
    durationChange: function( e ) {
        this.setData( {
            duration: e.detail.value
        })
    }

}

Page( pageObj );