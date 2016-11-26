var page = {

    data: {
        // text:"这是一个页面"
        animationData: {}
    },
    onLoad: function () {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onShow: function () {
        // 页面显示的时候的动画
        var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease-in-out',
            transformOrigin: "50% 50%",
        })

        this.animation = animation

        animation.scale(1).opacity(0).step()

        this.setData({
            animationData: animation.export(),
        })

        setTimeout(function () {
            animation.scale(1, 1).opacity(1).step()
            this.setData({
                animationData: animation.export(),
            })
        }.bind(this), 1000)

        setTimeout(function(){
        	wx.navigateTo({
	            url: '../index/index'
	        })
        },3000)
        

    }

}

Page(page)


