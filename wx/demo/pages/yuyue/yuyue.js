var cityData=require('../../js/city.js');
var $=require('../../js/util.js');
var app=getApp();
Page({
    data: {
        province:null, //省份数据
        province_index: 0, //当前选中省份索引
        city:null, //城市数据
        city_index: 0, //当前选中的城市索引
        area:null,//面积 
        area_index:0,
        price:null,//预算
        price_index:0,
        userName:'',
        userPhone:'',
        xiaoqu:''
    },
    onReady: function() {
        //初始化数据
        this.getProvince();
        this.getAreaPrice();
    },
    //获取面积、预算
    getAreaPrice:function(){
        var self=this;
         wx.request({
            url:app.api.condition,
            data: {
                type:"area-price"
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                console.log(res);
                var area={txt:['面积'],id:[0]},price={txt:['装修预算'],id:[0]}
                $.each(res.data.data.area_list,function(i,d){
                    area.txt.push(d.name);
                    area.id.push(d.id);
                });
                $.each(res.data.data.price_list,function(i,d){
                    price.txt.push(d.name);
                    price.id.push(d.id);
                });
                self.setData({
                    area:area,
                    price:price
                })
            }
        })
    },
    //用户名、手机号码、小区名称
    bindChange:function(e){
        var val=e.detail.value;
        switch(e.target.id){
            case "userName":
                this.setData({
                    userName:val
                });
            break;
            case "userPhone":
                this.setData({
                    userPhone:val
                });
            break;
            case "xiaoqu":
                this.setData({
                    xiaoqu:val
                });
            break;
        }
    },
    //选择面积
    areaChange:function(e){
        this.setData({
            area_index:e.detail.value
        });
    },
    //选择预算
    priceChange:function(e){
        this.setData({
            price_index:e.detail.value
        });
    },
    alert:function(t){
        wx.showModal({
            title:"系统提示",
            content:t,
            showCancel: false,
            confirmColor: '#000'
        });
    },
    // 提交预约
    yuyueSubmit:function(){
        var self=this;
        if(!self.data.userName){
            self.alert('请输入您的称呼');
            return;
        }
        if(!self.data.userPhone){
            self.alert('请输入手机号码');
            return
        }else if(!/^1[3|5|8|7]\d{9}$/.test(self.data.userPhone)){
            self.alert('手机号码格式不正确');
            return
        }
        if(!self.data.xiaoqu){
            self.alert('请输入小区名称');
            return
        }
        if(!self.data.area.id[self.data.area_index]){
            self.alert('请选择面积');
            return
        }
        if(!self.data.price.id[self.data.price_index]){
            self.alert('请选择装修预算');
            return
        }
        wx.showToast({
          title: '提交中...',
          icon: 'loading',
          duration:10000
        });
        // console.log('您的称呼：'+self.data.userName)
        // console.log('您的手机：'+self.data.userPhone)
        // console.log('省份：'+self.data.province.id[self.data.province_index])
        // console.log('城市：'+self.data.city.id[self.data.city_index])
        // console.log('小区名称：'+self.data.xiaoqu)
        // console.log('面积：'+self.data.area.id[self.data.area_index])
        // console.log('预算：'+self.data.price.id[self.data.price_index])
        wx.request({
            url: app.api.yuyue,
            data: {
                name:self.data.userName,
                phone:self.data.userPhone,
                province:self.data.province.id[self.data.province_index],
                city:self.data.city.id[self.data.city_index],
                area_id:self.data.area.id[self.data.area_index],
                budget_id:self.data.price.id[self.data.price_index],
                community:self.data.xiaoqu,
                enter_url:'weixin.qq.com',
                userid:0,
                enter_type:1,
                resource:3
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                var data=JSON.parse(res.data.replace(/(\(|\))/g,''));
                if(data.status==200){
                    self.setData({
                        userName:"",
                        userPhone:"",
                        xiaoqu:"",
                        province_index:0,
                        city_index:0,
                        area_index:0,
                        price_index:0
                    });
                }
                wx.hideToast();
                self.alert(data.msg);
            }
        })
    },
    /* === 城市选择器 start === */
    getProvince:function(){//获取省份数据
        this.setData({
            province:cityData.province
        });
        this.getCity(0);
    },
    pChange: function(e) {//省份选择
        this.setData({
            province_index: e.detail.value,
            city_index:0
        });
        this.getCity(e.detail.value);
    },
    getCity:function(n){//获取城市数据
        var data={
            id:[],
            txt:[]
        }
        $.each(cityData.city.pid,function(i,d){
            if(Number(n)+1==d){
               data.txt.push(cityData.city.txt[i]);
               data.id.push(cityData.city.id[i]);
            }
        })
        this.setData({
            city:data
        });
    },
    cChange:function(e){// 城市选择
        this.setData({
            city_index: e.detail.value
        });
    }
    /* === 城市选择器 end === */
})