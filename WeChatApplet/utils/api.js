var utils = require('./util.js')

function request(url, method, data, sucessCb, failCb, completeCb){
    wx.request({
        url:url,
        header: {
                'Content-Type': 'application/json;charset=UTF-8'
        },
        method:method,
        data:data,
        success: function(res){
            utils.isFunction(sucessCb) && sucessCb(res.data)
        },
        fail: function(res){
            utils.isFunction(failCb) && failCb(res.data)
        },
        complete: function(){
            utils.isFunction(completeCb) && completeCb()
        }
    })
}

function getAllRequests(sdp, sucessCb, failCb,completeCb){

    var apiUrl = '_HTTP_://_HOST_:_PORT_/sdpapi/request?TECHNICIAN_KEY=_KEY_'
    var url = apiUrl.replace('_HTTP_',sdp.protocol).replace('_HOST_',sdp.host).replace('_PORT_',sdp.port).replace('_KEY_',sdp.key)
    console.log('[api.js - getAllRequests] The request url is :')
    console.log(url)
    var method = 'GET'  //I do not know why the POST does not work..... :(:(:(
    var postdata = {
               OPERATION_NAME:"GET_REQUESTS",
               format:"json",
               INPUT_DATA:{
                    "operation": {
                        "details": {
                            "from": "0",
                            "limit": "100", //TOFIX: scoll in UI to fetch more request....
                            "filterby": "All_Requests"
                        }
                    }
                }
            }
    request(url,method,postdata,sucessCb,failCb,completeCb)
}

function getRequestDetails(sdp, id, sucessCb , failCb, completeCb){
    var apiUrl = '_HTTP_://_HOST_:_PORT_/sdpapi/request/_ID_?TECHNICIAN_KEY=_KEY_'
    var url = apiUrl.replace('_HTTP_',sdp.protocol).replace('_HOST_',sdp.host).replace('_PORT_',sdp.port).replace('_ID_',id).replace('_KEY_',sdp.key)
    console.log('[api.js - getRequestDetails] The request url is :')
    console.log(url)
    var method = 'GET'
    var data = {
        OPERATION_NAME:"GET_REQUEST",
        format:"json"
    }
    request(url,method,data,sucessCb,failCb,completeCb)

}

function getRequestTemplates(sdp, sucessCb , failCb, completeCb){
    var apiUrl = '_HTTP_://_HOST_:_PORT_/sdpapi/admin/request_template?TECHNICIAN_KEY=_KEY_'
    var url = apiUrl.replace('_HTTP_',sdp.protocol).replace('_HOST_',sdp.host).replace('_PORT_',sdp.port).replace('_KEY_',sdp.key)
    console.log('[api.js - getRequestTemplates] The request url is :')
    console.log(url)
    var method = 'GET'
    var data = {
        OPERATION_NAME:"GET_ALL",
        format:"json"
    }
    request(url,method,data,sucessCb,failCb,completeCb)

}

function addRequest(sdp, objdata, sucessCb , failCb, completeCb){
    var description = objdata.des_esc?objdata.des_esc:objdata.des
    var apiUrl = '_HTTP_://_HOST_:_PORT_/sdpapi/request?TECHNICIAN_KEY=_KEY_'
    var url = apiUrl.replace('_HTTP_',sdp.protocol).replace('_HOST_',sdp.host).replace('_PORT_',sdp.port).replace('_KEY_',sdp.key)
    console.log('[api.js - addRequest] The request url is :')
    console.log(url)
    var method = 'GET'
    var data = {
        OPERATION_NAME:"ADD_REQUEST",
        format:"json",
        INPUT_DATA:{
            "operation": {
                "details": {
                    "requester": objdata.requester,
                    "subject": objdata.sub,
                    "description": description,
                    "requesttemplate": objdata.templateName
                }
            }
        }
    }
    request(url,method,data,sucessCb,failCb,completeCb)

}

module.exports = {
    getAllRequests:getAllRequests,
    getRequestDetails:getRequestDetails,
    getRequestTemplates:getRequestTemplates,
    addRequest:addRequest
}