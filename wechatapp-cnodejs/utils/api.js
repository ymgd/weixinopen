'use strict'

const  url = "https://cnodejs.org/api/v1",
       signin = "https://cnodejs.org/signin",
       topics = "/topics",
       topic  = "/topic/",
       user   = "/user/" 
       
function obj2uri(obj){
    return Object.keys(obj).map(function(k){
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k])
    }).join('&')
}

module.exports = {
    getTopics:function(obj){
        return url + topics + '?' + obj2uri(obj)
    },
    getTopicById:function(id,obj){
        return url+topic+id+'?'+obj2uri(obj)
    },
    getUser:function(name){
        return url+user+name
    },
    signin
}