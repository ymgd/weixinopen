var app = getApp()
Page({
    data: {
        battles: [],
    },
    onLoad: function () {
        // 加载时更新数据域
        this.getBattleListData()
        var battleList = wx.getStorageSync('tempBattles')

        // 只能同时发起 5 个请求
        // 这里有点问题，应该写在 getBattleListData Success 回调中，不能保证上面的异步 AjaxAjax 执行完了
        for (var i = 0; i < 4; i++) {
            var battleDetail = wx.getStorageSync('tempBattleDetail-' + battleList[i]["game_id"].toString())
            var myInfo = {}
            for (var j in battleDetail["gamer_records"]) {
                if (battleDetail["gamer_records"][j]["qquin"] == "U14762379253352991681") {
                    myInfo = battleDetail["gamer_records"][j]
                    break
                }
            }
            battleList[i]["detail_info"] = {
                "KDA": myInfo["champions_killed"].toString() + "/" + myInfo["num_deaths"].toString() + "/" + myInfo["assists"].toString(),
                "battle_result": (battleList[i]["win"] == 1) ? "胜" : "负"
            }
            battleList[i]["legend_name"] = app.globalData.idNameMap[battleList[i]["champion_id"]]
        }

        this.setData({
            battles: battleList.slice(0, 4),
            })          
        console.log(this.data.battles)
    },

    getBattleListData: function () {
        var _this = this;
        wx.request({
            url: "http://lolapi.games-cube.com/CombatList",
            data: {
                qquin: "U14762379253352991681",
                vaid: 17,
                p: 0
            },
            header: {
                'DAIWAN-API-TOKEN': app.getAccessToken(),
            },
            success: function (res) {
                var tempBattles = [];
                for (var i in res.data['data'][0]['battle_list']) {
                    tempBattles.push(res.data['data'][0]['battle_list'][i])
                }
                wx.setStorageSync('tempBattles', tempBattles)

                for (var i = 0; i < 4; i++) {
                    _this.getBattleDetailData(tempBattles[i]["game_id"])
                }
            },
            fail: function () {
                _this.showError();
            }
        })
    },

    getBattleDetailData: function (gameid) {
        var _this = this;
        wx.request({
            url: "http://lolapi.games-cube.com/GameDetail",
            data: {
                qquin: "U14762379253352991681",
                vaid: 17,
                gameid: gameid
            },
            async: false,
            header: {
                'DAIWAN-API-TOKEN': app.getAccessToken(),
            },  
            success: function (res) {
                var tempBattleDetail = res.data['data'][0]['battle']
                wx.setStorageSync('tempBattleDetail-' + gameid.toString(), tempBattleDetail)
            },
            fail: function () {
                _this.showError();
            }
        })
    }
})
