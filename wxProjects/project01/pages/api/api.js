Page({
  data:{
      apiList:[{
        id:"1",
        name:"网络",
        subList:[{
          id:"101",
          name:"发起请求",
          url:"network/network"
        },
        {
          id:"102",
          name:"上传、下载",
          url:"network/upload/upload"
        }],
        isOpen:false,
        openClass:"",
        animationData:{}
      },{
        id:"2",
        name:"媒体",
        subList:[{
          id:"201",
          name:"图片",
          url:"media/picture/picture"
        },{
          id:"201",
          name:"音乐播放控制",
          url:"media/music/music"
        }],
        isOpen:false,
        openClass:""
      },{
        id:"3",
        name:"数据",
        subList:[{
          id:"301",
          name:"数据缓存",
          url:"storage/storage"
        }],
        isOpen:false,
        openClass:""
      },{
        id:"4",
        name:"位置",
        subList:[{
          id:"401",
          name:"获取位置",
          url:"location/getLocation/getLocation"
        },{
          id:"402",
          name:"查看位置",
          url:"location/openLocation/openLocation"
        }],
        isOpen:false,
        openClass:""
      },{
        id:"5",
        name:"设备",
        subList:[{
          id:"501",
          name:"网络状态",
          url:"equipment/NetworkType/NetworkType"
        },{
          id:"502",
          name:"系统信息",
          url:"equipment/systemInfo/systemInfo"
        },{
          id:"503",
          name:"重力感应",
          url:"equipment/systemInfo/systemInfo"
        },{
          id:"504",
          name:"罗盘",
          url:"equipment/systemInfo/systemInfo"
        },{
          id:"505",
          name:"拨打电话",
          url:"equipment/phoneCall/phoneCall"
        }],
        isOpen:false,
        openClass:""
      },{
        id:"6",
        name:"界面",
        subList:[{
          id:"601",
          name:"交互反馈",
          url:"interface/showToast/showToast"
        },{
          id:"602",
          name:"设置导航条",
          url:"interface/navigationBarTitle/navigationBarTitle"
        },{
          id:"603",
          name:"导航",
          url:"interface/navigate/navigate"
        },{
          id:"604",
          name:"动画",
          url:"interface/animate/animate"
        }
        ,{
          id:"605",
          name:"绘图",
          url:"interface/canvas/canvas"
        }],
        isOpen:true,
        openClass:"show"
      }
      ]
  },
/**
 * 列表切换效果
 */
  showMenu:function(event){

      var _currentTarget = event.currentTarget.id,
          _apiList = this.data.apiList,
          i = 0,
          len = _apiList.length;

      for(;i<len;i++){
        var _apiItem = _apiList[i];
        if(_currentTarget == _apiItem.id){
          var isOpen = !_apiItem.isOpen;
          var _open = isOpen ? "show" :"";
          _apiItem.openClass = _open;
          _apiItem.isOpen = isOpen;
          break;
        }
      }
      this.setData({apiList:_apiList});
  }


})