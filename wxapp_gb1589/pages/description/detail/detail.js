var detailData = [
    {
        caption:'GB1589对于半挂车的规定有哪些？',
        article:'半挂车长度限值由2004版的13米增加到了目前的13.75米，运送45英尺集装箱的半挂车长度最大限值为13.95米，仓栅式、栏板式、平板式、自卸式半挂车在长度限值方面依旧是2004版对半挂车标准，一轴8.6米，二轴10米、三轴13米；取消整体封闭式厢式半挂车、低平板半挂车、集装箱半挂车的长度限值特例；半挂车前回转半径不应大于2040mm',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804200019.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200037.jpg']
    },
    {
        caption:'新政中对长头车市场的规定知多少？',
        article:'长头铰接列车（长头牵引车+半挂车）长度限值为18.1米，相比16.5米增长了1.6米，长头半挂牵引车必须同时满足三个条件：第一是发动机本体一半以上位于前风窗玻璃最前点以前，第二是转向盘中心位置位于车辆驾驶室（整个车头）总长的前四分之一部分之后；第三是前轴中心线位于前风窗玻璃最前点之前。',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804200310.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200323.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200340.jpg']
    },
    {
        caption:'GB1589对于轿运车市场有哪些影响？',
        article:'为了治理规范国内轿运车市场，在标准中新增中置轴车辆运输车挂车，规定长度限值为12米，中置轴车辆运输列车的长度限值为22米，能够装载8（大中型）~10（中小型）乘用车，在法规标准允许范围内相比原有的半挂车辆运输车运输效率高。',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804200643.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200700.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200713.jpg']
    },
    {
        caption:'GB1589对货车和挂车的宽度做出哪些改变？',
        article:'在车辆的宽度方面，标准中宽度限值也由2004版的2.5米放宽到2.55米，这样修改主要是为了满足车辆装载两排托盘的宽度需求；考虑到冷藏车增加了保温层厚度，所以冷藏车宽度限值2.6米。',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804200931.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804200943.jpg']
    },
    {
        caption:'不同轴数的车辆的最大允许总质量限值是多少？',
        article:'二轴货车及半挂牵引车总重限值18吨，三轴货车及半挂牵引车总重限值25吨，双转向轴四轴货车总重限值31吨（当驱动轴为每轴每侧双轮胎且装备空气悬架时，最大允许总质量限值增加1000kg），四轴汽车列车总重限值36吨（当驱动轴为每轴每侧双轮胎并装备空气悬架、且半挂车的两轴之间的距离d 大于等于 1800mm的铰接列车，最大允许总质量限值为37吨），五轴车限重43吨，六轴车限重49吨。',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804201457.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804201508.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804201518.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804201529.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804201540.jpg']
    },
    {
        caption:'在新版的GB1589对于货车列车有哪些规定？',
        article:'货车列车指的是货车和牵引杆挂车或中置轴挂车的组合，也就是说货车列车包括牵引杆挂车列车和中置轴挂车列车，在外廓尺寸限值中，规定货车列车的长度限值为20米（长度限值不包括中置轴车辆运输列车），车宽为2.55米（冷藏车2.6米），高度限值4米。',
        gallery:['http://imgf.360che.com/HW_Image/2016/0804/0804202057.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804202107.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804202117.jpg','http://imgf.360che.com/HW_Image/2016/0804/0804202126.jpg']
    }
]
Page({
    data:detailData[0],
    onLoad:function(o){
        var data = detailData[parseInt(o['id'])];
        this.setData(data);
        wx.setNavigationBarTitle({
            title:data['caption']
        });
        exports.galleryData = data['gallery'];
    },
    previewGallery:function(e){
        var index = parseInt(e.target['id']),data = exports.galleryData;
        wx.previewImage({
            current:data[index],
            urls:data
        });
    }
})
