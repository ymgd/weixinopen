var pullData = [
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162137.jpg',
        caption:'不只是解放J6P 8吨内6×4牵引车都有谁？'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162128.jpg',
        caption:'治超又有大动作 两部委联合下发新通知'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162119.jpg',
        caption:'治超文件成废纸？ 北方4省超载现象调查'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162112.jpg',
        caption:'大板禁行4轴车36吨 成都10.21执行新规'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162103.jpg',
        caption:'违规三次吊销资质 包头超载超限出新规'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162049.jpg',
        caption:'大怪二怪将消失 一分钟教你认识变态车'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162041.jpg',
        caption:'只为期一年？ 日照将严查货车超限超载'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1009/1009185957.jpg',
        caption:'921之后高速无双排 轿运车全部单排运输'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1009/1009185948.jpg',
        caption:'超载车赚1元公路损百元 最严超载令实施'
    },
    {
        imgurl:'http://imgf.360che.com/HW_Image/2016/1009/1009185939.jpg',
        caption:'山东夫妻跑成都 9.21新规之后运费涨了'
    }
];
Page({
    data:{
        list:[
            {
                imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162241.jpg',
                caption:'未来何去何从 新政后17米5大板依然万能'
            },
            {
                imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162232.jpg',
                caption:'主要整治超载 中物联副会长解读921新政'
            },
            {
                imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162200.jpg',
                caption:'6X2前双少拉3吨 司机生存空间还剩多少?'
            },
            {
                imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162152.jpg',
                caption:'史上最全：921新政各省治超现状大盘点'
            },
            {
                imgurl:'http://imgf.360che.com/HW_Image/2016/1027/1027162144.jpg',
                caption:'为期两个月 GB1589等标准整改系统开通'
            }
        ]
    },
    onPullDownRefresh:function(e){
        var data = this.data['list'],me = this,
            random = parseInt(Math.random()*pullData.length);
        data.splice(0,0,pullData[random]);
        setTimeout(function(){
            me.setData({
                list:data
            });
            wx.stopPullDownRefresh();
        },1e3)

    }
})
