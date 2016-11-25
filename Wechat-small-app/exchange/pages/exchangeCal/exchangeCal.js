//所有货币信息
var list = require('../../utils/list.js');
var allDataList = list.allDataList;
//exchangeCal页面
Page({
    //页面数据
    data: {
        allDataList:allDataList,
        debitList:"",
        rate: "",
        calResult:"",
        dateStr:"",
        tradeCurrency:{},
        debitCurrency:{},
        debitArray:[],
        index:0,
        date:"",
        errorFlag:true,
        rateTextFlag:true
    },

    //页面初次加载
    onReady: function() {
        var self = this;
        var dateStr = this.getDateStr();
        var debitList=this.debitList();
        var debitArray=this.debitArray(debitList);
        var app = getApp();
        self.setData({
            dateStr:dateStr,
            tradeCurrency:app.tradeCurrency,
            debitCurrency:app.debitCurrency,
            debitList:debitList,
            debitArray:debitArray,
            date:dateStr
        });
        wx.clearStorage();
        this.fetchRate();
    },

    //页面显示
    onShow: function(){
        var self = this;
        var app = getApp();
        this.setData({
            tradeCurrency:app.tradeCurrency
        });
        this.fetchRate();
    },

    //页面关闭
    onUnload:function(){
        wx.clearStorage();
    },

    //获取日期字符串
    getDateStr: function(){
        var nowDate = new Date();
        var nowDateMonth = (function(month){
            if(month<10){
                return "0"+month;
            }
            else{
                return month;
            }
        })(nowDate.getMonth()+1);
        var nowDateDay = (function(day){
            if(day<10){
                return "0"+day;
            }
            else{
                return day;
            }
        })(nowDate.getDate());
        return nowDate.getFullYear() + "-" + nowDateMonth + "-" + nowDateDay;
    },

    //扣账币种列表
    debitList:function(){
        return allDataList.charge;
    },

    //扣账币种格式转换
    debitArray: function(list){
        var retArray=[];
        for (var i in list){
            retArray[i] = list[i].name + " " + list[i].description + " " + list[i].comments;
        }
        return retArray;
    },

    //调汇率接口
    fetchRate:function(){
        var self = this;
        if(self.data.date && self.data.debitCurrency && self.data.tradeCurrency){
            wx.request({
                url: 'https://wallet.95516.com/wl/entry/1.0/web.exchange.rate?date='+ self.data.date +'&baseCurrency='+ self.data.debitCurrency.description +'&transactionCurrency='+ self.data.tradeCurrency.description,
                header:{
                    "contentType":"application/json",
                    "dataType":"json"
                },
                success: function(resp) {
                    var realRateValue = parseFloat(resp.data.params.result);
                    if (realRateValue){
                        self.setData({
                            rate: resp.data.params.result,
                            rateTextFlag: false
                        });
                        wx.getStorage({
                            key:'input',
                            success:function(res){
                                self.doCal(res.data);
                            },
                            fail:function(){

                            }

                        });
                    }
                    else{
                        self.setData({
                            rateTextFlag: true,
                            errorFlag:false
                        });
                        setTimeout(function(){
                            self.setData({
                                errorFlag:true
                            });
                        },3000);
                    }
                },
                fail:function(resp){
                    self.setData({
                        rateTextFlag: true,
                        errorFlag:false
                    });
                    setTimeout(function(){
                        self.setData({
                            errorFlag:true
                        });
                    },3000);
                }
            });
        }
    },

    //监听金额输入
    calInput:function(e){
        var value = e.detail.value;
        wx.setStorage({
            key:"input",
            data:value
        });
        this.doCal(value);
    },

    //计算扣账金额
    doCal: function(value){
        var amount = value;
        if (amount != ""){
            var result = parseFloat(this.data.rate * amount).toFixed(2);
            this.setData({
                calResult:result
            });
        }
        else{
            this.setData({
                calResult:""
            });
        }
    },

    //跳转currencyList页面
    changeTrans: function(){
        wx.navigateTo({
            url:"../currencyList/currencyList"
        })
    },

    //选择扣账币种
    bindPickerChange: function(e){
        var self = this;
        var i= e.detail.value;
        this.setData({
            index: i,
            debitCurrency:{
                "name": self.data.debitList[i].name,
                "description":self.data.debitList[i].description,
                "comments":self.data.debitList[i].comments
            }
        });
        this.fetchRate();
    },

    //选择日期
    bindDateChange:function(e){
        this.setData({
            date:e.detail.value
        });
        this.fetchRate();
    }
})