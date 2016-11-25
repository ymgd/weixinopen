var aliyun_auth = require('../../../utils/aliyun_auth.js');
Page({
    data:{
        CdnTypeName:[
            "图片及小文件分发",
            "大文件下载加速",
            "视音频点播加速",
            "直播流媒体加速",
        ],
        CdnType:[
            'web',
            'download',
            'video',
            'liveStream',
        ],
        type_index:-1,
        SourceTypeName:[
            "IP源站",
            "域名源站",
            "OSS源站"
        ],
        SourceType:[
            "ipaddr",
            "domain",
            "OSS"
        ],
        source_index:-1,
        is_port:false,
        ipItems:[
            // {name:"127.0.0.1"},
            // {name:"127.0.0.2"},
            // {name:"127.0.0.3"}
        ],
        is_ip_show:'hide',
        is_domain_show:'hide',
        is_oss_domain_show:'hide',

        add_ip_dialog_show:'hide',
        clear_input:'',
    },
    onLoad:function(){

    },
    SelectedType:function(e){
        this.setData({
            type_index: e.detail.value
        })
    },
    /**
     * 选择来源类型
     */
    SelectedSource:function(e){
        this.setData({
            source_index: e.detail.value
        });
        if(e.detail.value== 0){
            this.setData({
                is_ip_show:'',
                is_domain_show:'hide',
                is_oss_domain_show:'hide',
            });
        }else if(e.detail.value== 1){
            this.setData({
                is_ip_show:'hide',
                is_domain_show:'',
                is_oss_domain_show:'hide',
            });
        }else{
            this.setData({
                is_ip_show:'hide',
                is_domain_show:'hide',
                is_oss_domain_show:'',
            });
        }
    },
    /**ip选择 */
    ipChange:function(e){
        var ipItems = this.data.ipItems, values = e.detail.value;
        for (var i = 0, lenI = ipItems.length; i < lenI; ++i) {
            ipItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(ipItems[i].name == values[j]){
                    ipItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            ipItems: ipItems
        });
    },
    /**添加域名弹框 显示 */
    add_ip:function(){
        //以后加数量限制 20
        this.setData({
            add_ip_dialog_show:''
        });
    },
    /*隐藏dialog */
    hide_dialog:function(){
        this.setData({
            add_ip_dialog_show:'hide'
        });
    },
    /**保存添加ip */
    add_ip_form:function(e){
        var ip = e.detail.value.ip;
        if(ip ==''){
            return;
        }
        e.detail.value.ip = '';
        var ipItems = this.data.ipItems;
        ipItems.push({name:ip,checked:true});
        this.setData({
            ipItems: ipItems,
            add_ip_dialog_show:'hide',
        });

    },
    /*长按ip地址 */
    to_ip_menu:function(e){
        var index = e.target.dataset.index;
        console.log(e);
        var obj = this;
        var ipItems = this.data.ipItems;
        
        wx.showModal({
            title:'确认删除该ip？',
            content:ipItems[index].name,
            confirmText:'删除',
            success:function(res){
                if(res.confirm==true){
                    ipItems.splice(index, 1);
                    obj.setData({
                        ipItems: ipItems,
                    });
                }
            }
        });
    },
    /**
     * 选择https方式
     */
    ChangePort:function(e){
        this.setData({
            is_port: !this.data.is_port
        })
    },
    submit_add:function(e){
        var formvalue = e.detail.value;
        console.log(formvalue);
        if(formvalue['DomainName']==''){
            this.error_msg('域名必填');
            return;
        }
        if(formvalue['CdnType']<0){
            this.error_msg('业务类型必填');
            return;
        }
        
        switch(formvalue['SourceType']){
            case "0":
                if(formvalue['SourcesIp'].length==0){
                    this.error_msg('ip地址必填');
                }
                formvalue['Sources'] = formvalue['SourcesIp'].join(',');
                break;
            case "1":
                if(formvalue['SourcesDomain'] == ''){
                    this.error_msg('源站地址必填');
                }
                formvalue['Sources'] = formvalue['SourcesDomain'];
                break;
            case "2":
                if(formvalue['SourcesOSS'] == ''){
                    this.error_msg('OSS地址必填');
                }
                formvalue['Sources'] = formvalue['SourcesOSS'];
                break;
            default:
                this.error_msg('源站类型必填');
                return;
        }
        formvalue['SourcePort'] = 80;
        if(formvalue['is_port'].length>0 && formvalue['SourceType'] !=2){
            formvalue['SourcePort'] =  443;
        }
        var post_data = [
            {'DomainName':formvalue['DomainName']},
            {'CdnType':this.data.CdnType[formvalue['CdnType']]},
            {'SourceType':this.data.SourceType[formvalue['SourceType']]},
            {'Sources':formvalue['Sources']},
            {'SourcePort':formvalue['SourcePort']},
        ];
        this.AddCdnDomain(post_data);
    },
    AddCdnDomain:function(post_data){
        post_data.push({
            'Action':'AddCdnDomain',
            "Version":"2014-11-11",
        });
        console.log(post_data);
        var url = aliyun_auth.init_request({
            url:'https://cdn.aliyuncs.com',
            args:post_data
        });
        var obj = this;
        wx.request({
            url:url,
            success:function(data){
                console.log(data);
                if(data.statusCode==200){
                    var app = getApp();
                    app.globalData.is_cdn_reload = true;
                    wx.navigateBack({
                      delta: 1, 
                    })
                }else{
                    //获取可用区列表失败，请下拉刷新
                }
            },
            fail:function(data){
                console.log('aliyun:false');
            }
        });
    },
    error_msg:function(msg){
        wx.showModal({
            title:"提示",
            content:msg,
            showCancel:false,
        });
    }
});