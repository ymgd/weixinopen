var netUtils = require("../../utils/netUtil");

function getDetails(that, mName) {
    netUtils.requestData("video", "q=" + mName).then(res => {
        console.log(res);
      
  wx.showToast({
            title:'加载成功！',
            icon:'success'
        })
         setTimeout(function(){
  wx.hideToast()
},500)
    if (res.result==null){
        that.setData({
            hasResult:false,
            hideLoadding:true
        })
        return;
    }
    var title = res.result.title;
    var icon = res.result.cover;
    var desc = res.result.desc;
    var acts = [];
    for (var i = 0; i < res.result.act_s.length; i++) {
        var d = res.result.act_s[i];
        acts.push({
            image: d.image,
            name: d.name,
        });
    }
    ;
    var recommend = [];
    for (var i = 0; i < res.result.video_rec.length; i++) {
        var d = res.result.video_rec[i];
        recommend.push({
            image: d.cover,
            title: d.title,
        })
    }

    that.setData({
        hideLoadding: true,
        mIcon: icon,
        movieDesc: desc.substr(0, 80).concat("..."),
        shortDesc: desc.substr(0, 80).concat("..."),
        longDesc: desc,
        acts: acts,
        recommends: recommend,
        hasResult:true

    })

},
    err =>
    {

    }
)
    ;


}
module.exports = {
    getDetails: getDetails
}