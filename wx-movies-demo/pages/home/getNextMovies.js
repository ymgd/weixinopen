/**
 * Created by violin on 2016/10/14.
 */
// 获取电影信息
var netUtils = require("../../utils/netUtil");
function getNextMovies(that, cName) {
    netUtils.requestData("pmovie", "city=" + cName).then(res => {
        console.log(res);

    var tabPages = [];
    var data = {};
    for (var i = 0; i < res.result.data.length; i++) {
        var d1 = res.result.data;
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


    //'tabPages[0]'数组的下标还不知道怎么用变量拼接，所以先这样写了
    that.setData({
        'tabPages[0]': that.data.tabPages[0].concat(tabPages[0]),
        'tabPages[1]': that.data.tabPages[1].concat(tabPages[1]),
        pageIndex: that.data.pageIndex + 1,
        hasNext: true,
        hideFooter: true
    })

},
    e =>
    {
        console.log(e)

    }
)
    ;

}
module.exports = {
    getNextMovies: getNextMovies
}