//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        input_value: "",
        list:"",
        lodingInfo:"",
        text:"由于网络原因，第一次查单词稍有延迟，请耐心等待",
        wstart:"",
        wend:"",
        textfalse:"",
        a:"",
        b:"",
        c:"",
        d:""
    },
    onLoad: function() {
        // console.log('onLoad')
    },
    wsearchIput: function(e) {
        this.setData({
            input_value: e.detail.value
        });
        // console.log(this.data.input_value);
    },
    searchWord: function() {
        var that = this;
        this.setData({

        });

        var reg=new RegExp("<li><span>","g");
        var reg1=new RegExp("</span><strong>","g");
        var reg2=new RegExp("</strong></li>","g");
        var reg3=new RegExp("<li><strong>","g");

        wx.request({
            method: 'GET',
            url: "http://dict.cn/"+this.data.input_value,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.indexOf('</span><strong>')>0){
                    // console.log('ressuc');
                    that.setData({
                         text:res.data.substring(res.data.indexOf('</span><strong>')+15,res.data.indexOf('</strong></li>'))
                        // a:res.data.substring(res.data.indexOf('<li><span>'),res.data.lastIndexOf('</strong></li>')+14),
                        // b:that.data.a.replace(reg,"+"),
                        // c:that.data.b.replace(reg1,"+"),
                        // d:that.data.c.replace(reg2,"+"),
                        // text:that.data.d.replace(reg3,"+")
                    })
                }else{
                    that.setData({
                        text:"没有此单词，请重新拼写输入"
                    })
                }
                // if(that.data.wstart>0){
                //     that.data.text="没有此单词，请重新拼写输入"
                //     console.log(that.data.text);
                // }else{
                //
                // }
                // console.log(that.data.wstart);
            },
            fail: function() {
                that.setData({
                    text: "搜索失败，请检查您的网络"
                });
                console.log("error");
            },
            complete: function() {
                that.setData({

                })
            }
        })
    }


})
