//logs.js
var util = require('../../utils/util.js')
Page({
    data: {
        tomonth: '',
        love:false,
        monthly:false,
        danger:false,
        list:[],
        ymd:"",
        modalHidden:"hidden",
        selected_ymd:"",
        selected_action:"",
    },
    onLoad: function (options) {
        var that = this
        this.title = options.title
        tomonth = this.this_month()
        that.setData({
            tomonth:tomonth
        })
        that.draw_calendar(tomonth);
        
    },
    prev:function(e){
        var that = this
        var now = that.data.tomonth;
        var arr = now.split('-');
        var year,month
        if (arr[1]-1 == 0) {//如果是1月份，则取上一年的12月份
            year = arr[0] - 1;
            month = 12;
        }else{
            year = arr[0];
            month = arr[1]-1;
        }
        month =(month<10 ? "0"+month:month); 
        var tomonth = year+"-"+month;
        that.setData({
            tomonth:tomonth
        })
        that.draw_calendar(tomonth);
        
    },
    next:function(e){
        var that = this
        var now = that.data.tomonth;
        var arr = now.split('-');
        var year,month
        if (arr[1]-0+1 == 13) {//如果是1月份，则取上一年的12月份
            year = arr[0]-0+1;
            month = 1;
        }else{
            year = arr[0];
            month = arr[1]-0+1;
        }
        month =(month<10 ? "0"+month:month); 
        var tomonth = year+"-"+month;
        that.setData({
            tomonth:tomonth
        })
        that.draw_calendar(tomonth);
    },
    this_month:function(e){
        var that = this;
        var date=new Date;
        var month=date.getMonth()+1;
        month =(month<10 ? "0"+month:month); 
        var year=date.getFullYear(); 
        var tomonth = year+"-"+month;
        console.log(tomonth);
        return tomonth;
    },
    draw_calendar: function (now) {
        var arr = now.split('-');
        year = arr[0];
        month = arr[1];
        var that = this;
        var list = [];
        var d = new Date(year,month-1,1,1,1,1);
        console.log(d);
        var firstDay = d.getDay();
        var allDate = new Date(d.getFullYear(), (d.getMonth()+1), 0).getDate();
        var ymd;
        for(var i=0; i<firstDay;i++){
            list.push({
                ymd : "",
                date : "",
                love : false,
                danger : false,
                monthly : false,
                today : false,
            })
        }
        var j = 1;
        var k = i;
        for(i;i<allDate+k;i++){
            var dd = new Date(); 
            y = dd.getFullYear(); 
            m = dd.getMonth()+1;//获取当前月份的日期 
            d = dd.getDate(); 
            ymd = year+"-"+month+"-"+j;
            if(year==y && month==m && d==j){
                today = true;
                that.setData({
                    ymd:ymd
                })
            }else{
                today = false;
            }
            
            var action = wx.getStorageSync(ymd);
            list.push({
                ymd :ymd,
                date : j,
                love : action=="love"?true:false,
                danger : false,
                monthly : action=="monthly"?true:false,
                today : today
            })
            j++;
        }
        
        var lastDay = new Date(year,month-1,allDate,1,1,1).getDay();
        console.log(lastDay);
        var k = i;
        for(i; i<(6-lastDay+k);i++){
            list.push({
                ymd : "",
                date : "",
                love : false,
                danger : false,
                monthly : false,
                today : 0,
            })
        }
        that.setData({
            list:list
        })
    },
    love: function(e){
        var action = wx.getStorageSync(this.data.ymd);
        if(action=="monthly"){
            this.setData({
                modalHidden:""
            })
            return false;
        }
        var selected = e.currentTarget.dataset.selected
        if(selected==1){
            this.setData({
                love:false,
            })
            wx.setStorageSync(this.data.ymd,"")
        }else{
            this.setData({
                love:true,
            })
            wx.setStorageSync(this.data.ymd,"love")
        }
        this.draw_calendar(this.data.tomonth)
    },
    monthly: function(e){
        var action = wx.getStorageSync(this.data.ymd);
        if(action=="love"){
            this.setData({
                modalHidden:""
            })
            return false;
        }
        var selected = e.currentTarget.dataset.selected
        if(selected==1){
            this.setData({
                monthly:false,
            })
            wx.setStorageSync(this.data.ymd,"")
        }else{
            this.setData({
                monthly:true,
            })
            wx.setStorageSync(this.data.ymd,"monthly")
        }
        this.draw_calendar(this.data.tomonth)
        
    },
    selected_day: function(e){
        ymd = e.currentTarget.dataset.ymd;
         this.setData({
            ymd:ymd
        })
        var action = wx.getStorageSync(ymd);
        if(action=="monthly"){
            this.setData({
                monthly:true
            })
        }else{
             this.setData({
                monthly:false
            })
        }
        if(action=="love"){
            this.setData({
                love:true
            })
        }else{
            this.setData({
                love:false
            })
        }
    },
    modalChange:function(e){
        this.setData({
            modalHidden:"hidden"
        })
    }

  
})
