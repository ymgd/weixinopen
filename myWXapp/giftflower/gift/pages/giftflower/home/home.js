Page({
    data: {
        imgUrls: [],
        more: [],
        load: "loadmore",
        lowerNum:"400",
        update:"true",
        tophidden:"true",
        scroll_y:""



    },
    onLoad: function() {
         
        this.setData({
            imgUrls: [
                "http://img02.hua.com/banner/16_xingzuo_tcz_m.jpg",
                "http://img02.hua.com/banner/tsysh_m.jpg"
            ],
            footer: [{
                img: "http://img02.hua.com/app/api/pp_1.png?1",
                title: "十一年品牌"
            }, {
                img: "http://img02.hua.com/app/api/pp_2.png",
                title: "龙头企业"
            }, {
                img: "http://img02.hua.com/app/api/pp_3.png",
                title: "3小时送达"
            }, {
                img: "http://img02.hua.com/app/api/pp_4.png",
                title: "最近16万+评价"
            }],
            gift_img: ["http://img02.hua.com/app/api/jbh_1.png", "http://img02.hua.com/app/api/sjgq_1.png", "http://img02.hua.com/app/api/teselipin_3_app.png?r=1"],
            nav: [{
                src: "http://img02.hua.com/app/api/flower1.png",
                nav_name: "鲜花"
            }, {
                src: "http://img02.hua.com/app/api/cake2.png",
                nav_name: "蛋糕"
            }, {
                src: "http://img02.hua.com/app/api/flowersong3.png",
                nav_name: "永生花"
            }, {
                src: "http://img02.hua.com/app/api/gifts4.png",
                nav_name: "特色礼品"
            }, {
                src: "http://img02.hua.com/app/api/more5.png",
                nav_name: "礼品"
            }],
            title_img: [
                "http://img02.hua.com/tuijian/xinpin01_app.png?4",
                "http://img02.hua.com/app/api/aqxh01.png",
                "http://img02.hua.com/app/api/dgsd_4.png"

            ],
            logos: ["http://img02.hua.com/app/api/cake2_2.png", "http://img02.hua.com/app/api/cake2_3.png", "http://img02.hua.com/app/api/cake_xibing.png", "http://img02.hua.com/app/api/cake2_5.png", "http://img02.hua.com/app/api/cake2_6.png", "http://img02.hua.com/app/api/cake2_11.png?1", "http://img02.hua.com/app/api/cake2_8.png", "http://img02.hua.com/app/api/cake2_9.png", "http://img02.hua.com/app/api/cake2_10.png"],
            hot: [{
                    img: "http://img01.hua.com/uploadpic/newpic/9010877.jpg_220x240.jpg",
                    name: "致美丽的你",
                    price: "￥125",
                    id:"0"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9010966.jpg_220x240.jpg",
                    name: "一往情深",
                    price: "￥234",
                    id:"1"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9012011.jpg_220x240.jpg",
                    name: "阳光海岸",
                    price: "￥212",
                    id:"2"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9012147.jpg_220x240.jpg",
                    name: "纯美时光",
                    price: "￥126",
                    id:"3"
                },

                {
                    img: "http://img01.hua.com/uploadpic/newpic/9012147.jpg_220x240.jpg",
                    name: "真爱如初",
                    price: "￥182",
                    id:"4"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9010947.jpg_220x240.jpg",
                    name: "Love 99",
                    price: "￥489",
                    id:"5"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9012062.jpg_220x240.jpg",
                    name: "心上人",
                    price: "￥380",
                    id:"6"
                }, {
                    img: "http://img01.hua.com/uploadpic/newpic/9012128.jpg_220x240.jpg",
                    name: "好时光",
                    price: "￥224",
                    id:"7"

                }

            ]
        })

    },
    loadingupdate:function(){
        this.setData({
            update:false
        })

        var timer=setTimeout(function(){
        this.setData({
            update:true
        })

        }.bind(this),2000)
    }
    ,
    topshow:function(event){
        console.log(event);
        this.setData({
            scroll_y:event.detail.scrollTop
        })
        if(event.detail.scrollTop>=700){
            this.setData({
                tophidden:false
            })
        }else{
            this.setData({
                tophidden:true
            })
        }
    }
    ,
    totop:function(event){
        this.setData({
            scroll_y:1    
        })
        
    }
    ,
    loadmore: function() {
        var that = this;
        wx.request({
            url: "http://localhost/gift/mock/loadmore.json",
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {

                for (var i = 0; i < res.data.length; i++) {
                    that.setData({
                        more: that.data.more.concat({
                            img: res.data[i].img,
                            name: res.data[i].name,
                            price: res.data[i].price
                        })
                    })




                }
                //加载一次
                that.setData({
                    load: "",
                    loadfooter:"先介绍这么多吧^ ^"
                })
            }
        })
    }


})
