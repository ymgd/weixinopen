var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
var app = getApp()

Page({
    data: {
    pagedata:null,
  },
    onLoad: function(option){
        var request_id = option.id
        var _this = this
        api.getRequestDetails(
            app.globalData.sdp,
            request_id,
            (data) => {
                for(var x in data){
                    if (data.hasOwnProperty(x) && ["CREATEDTIME", "COMPLETEDTIME","DUEBYTIME","FR_DUETIME","RESOLVEDTIME","RESPONDEDTIME","RESPONSEDUEBYTIME"].includes(x)){
                        if(data[x]>0) data[x] = utils.formatTime(new Date(parseInt(data[x])))
                    }
                }
                _this.setData({pagedata:data})
            },
            (data) => {
                console.log('Can  not get request details for the ID: '+ request_id)
                console.log(data)
            },
            () => {
                this.setData(
                    {loaded:true}
                )
            }
        )
    },
    editRequest: function(){
        //TODO:coding
    },
    closeRequest: function(){
        //TODO:coding
    },
    assignRequest: function(){
        //TODO:coding
    },
    pickupRequest: function(){
        //TODO:coding
    },
    deleteRequest: function(){
        //TODO:coding
    }
})