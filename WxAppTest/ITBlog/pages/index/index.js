//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        newList:[{fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://a.hiphotos.baidu.com/image/pic/item/c8ea15ce36d3d539be4d77b83f87e950352ab05c.jpg"} , 
             {fistImg:"http://h.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a2922e765c99b25bc315c607c8d.jpg"} ,
             {fistImg:"http://c.hiphotos.baidu.com/image/pic/item/3b292df5e0fe9925ae23d95736a85edf8db1718d.jpg"} ,
             {fistImg:"http://g.hiphotos.baidu.com/image/pic/item/faedab64034f78f099a529f47b310a55b3191c0e.jpg"} ,
             {fistImg:"http://g.hiphotos.baidu.com/image/pic/item/bd315c6034a85edf9ba34e244b540923dd54758d.jpg"} ,
             {fistImg:"http://f.hiphotos.baidu.com/image/pic/item/00e93901213fb80e0ee553d034d12f2eb9389484.jpg"} ,
             {fistImg:"http://img1.imgtn.bdimg.com/it/u=2955244448,132069077&fm=21&gp=0.jpg"} ,
             {fistImg:"http://image.tianjimedia.com/uploadImages/2014/127/32/VP974HZ0AXL2.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} ,
             {fistImg:"http://img0.imgtn.bdimg.com/it/u=1640246403,1832676351&fm=21&gp=0.jpg"} 
    ]
    },
    //事件处理函数
    bindViewTap: function() {},
    onLoad: function() {
        var that = this
        wx.request({
            url: 'http://sep9.cn/qt5wix',
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
            success:function(res){
                that.setData({newList: res.data})
            }
        })
    }
})
