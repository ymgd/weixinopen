/**
 * Created by violin on 2016/10/14.
 */
// 获取电影信息
var netUtils = require("../../utils/netUtil");
function getMovies(that, cName) {
    console.log("请求网络数据");
  
    netUtils.requestData("pmovie", "city=" + cName).then(res => {
        console.log(res);
        wx.showToast({
            title:'加载成功！',
            icon:'success'
        })
         setTimeout(function(){
  wx.hideToast()
},500)
    var tabTitles = [];
    var tabPages = [];
    var title = res.result.title;
    for (var i = 0; i < res.result.data.length; i++) {
        var d1 = res.result.data;
        tabTitles.push({
            title: d1[i].name,
            bColor: "#000"
        });
        var page = [];
        for (var j = 0; j < d1[i].data.length; j++) {
            if(i==0){
                var d2 = d1[i].data;
                page.push({
                    grade: "评分:" + d2[j].grade,
                    icon: d2[j].iconaddress,
                    name: d2[j].tvTitle,
                    subHead: d2[j].subHead,
                    playDate:"上映日期:"+d2[j].playDate.data2

                })
            }else {
                var d2 = d1[i].data;
                page.push({
                    grade: "上映日期:"+d2[j].playDate.data2,
                    icon: d2[j].iconaddress,
                    name: d2[j].tvTitle,
                    subHead: d2[j].subHead,
                    playDate:"上映日期:"+d2[j].playDate.data2

                })
            }

        }
        tabPages.push(page);
    }
    tabTitles[0].bColor = "#24B0FC";

    var lineWidth=100/tabTitles.length;
    that.setData({
        hideLoading: true,
        title: title,
        tabTitles: tabTitles,
        tabPages: tabPages,
        lineWidth:lineWidth,
        bannerItems:tabPages[1]
    })

},
    e =>
    {
        hideLoading:true,
            console.log(e)

    }
)
    ;

}
module.exports = {
    getMovies: getMovies
}